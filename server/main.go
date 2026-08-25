package main

import (
	"crypto/rand"
	"crypto/subtle"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"slices"
	"strconv"
	"strings"
	"sync"
	"time"
)

const maxRequestBody = 20_000

var (
	phonePattern    = regexp.MustCompile(`^01[016789][0-9]{7,8}$`)
	nonDigitPattern = regexp.MustCompile(`[^0-9]`)
	mbtiTypes       = []string{
		"ISTJ", "ISFJ", "INFJ", "INTJ",
		"ISTP", "ISFP", "INFP", "INTP",
		"ESTP", "ESFP", "ENFP", "ENTP",
		"ESTJ", "ESFJ", "ENFJ", "ENTJ",
	}
	statuses     = []string{"pending", "confirmed", "waitlisted", "cancelled"}
	errDuplicate = errors.New("duplicate application")
	errNotFound  = errors.New("application not found")
)

type application struct {
	ID             string `json:"id"`
	AttendanceType string `json:"attendanceType"`
	GuestName      string `json:"guestName"`
	InvitedBy      string `json:"invitedBy"`
	Name           string `json:"name"`
	Phone          string `json:"phone"`
	BirthYear      int    `json:"birthYear"`
	MBTI           string `json:"mbti"`
	DrinkLevel     string `json:"drinkLevel"`
	Requirements   string `json:"requirements"`
	PrivacyConsent bool   `json:"privacyConsent"`
	ConsentVersion string `json:"consentVersion"`
	ConsentedAt    string `json:"consentedAt"`
	Status         string `json:"status"`
	Paid           bool   `json:"paid"`
	CreatedAt      string `json:"createdAt"`
	UpdatedAt      string `json:"updatedAt"`
}

type createApplicationRequest struct {
	AttendanceType string `json:"attendanceType"`
	GuestName      string `json:"guestName"`
	InvitedBy      string `json:"invitedBy"`
	Name           string `json:"name"`
	Phone          string `json:"phone"`
	BirthYear      string `json:"birthYear"`
	MBTI           string `json:"mbti"`
	DrinkLevel     string `json:"drinkLevel"`
	Requirements   string `json:"requirements"`
	PrivacyConsent bool   `json:"privacyConsent"`
	ConsentVersion string `json:"consentVersion"`
	ConsentedAt    string `json:"consentedAt"`
}

type updateStatusRequest struct {
	Status string `json:"status"`
	Paid   *bool  `json:"paid"`
}

type storedData struct {
	Version      int           `json:"version"`
	Applications []application `json:"applications"`
}

type store struct {
	mu           sync.RWMutex
	path         string
	applications []application
}

func newStore(path string) (*store, error) {
	s := &store{path: path, applications: []application{}}
	data, err := os.ReadFile(path)
	if errors.Is(err, os.ErrNotExist) {
		return s, nil
	}
	if err != nil {
		return nil, fmt.Errorf("read application store: %w", err)
	}
	if len(data) == 0 {
		return s, nil
	}

	var saved storedData
	if err := json.Unmarshal(data, &saved); err != nil {
		return nil, fmt.Errorf("decode application store: %w", err)
	}
	s.applications = saved.Applications
	return s, nil
}

func (s *store) list() []application {
	s.mu.RLock()
	defer s.mu.RUnlock()

	result := slices.Clone(s.applications)
	slices.Reverse(result)
	return result
}

func (s *store) add(item application) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	for _, existing := range s.applications {
		if existing.Phone == item.Phone && existing.Status != "cancelled" {
			return errDuplicate
		}
	}

	s.applications = append(s.applications, item)
	if err := s.persistLocked(); err != nil {
		s.applications = s.applications[:len(s.applications)-1]
		return err
	}
	return nil
}

func (s *store) updateStatus(id, status string, paid *bool, updatedAt string) (application, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	for index := range s.applications {
		if s.applications[index].ID != id {
			continue
		}

		previous := s.applications[index]
		if status != "" {
			s.applications[index].Status = status
		}
		if paid != nil {
			s.applications[index].Paid = *paid
		}
		s.applications[index].UpdatedAt = updatedAt
		if err := s.persistLocked(); err != nil {
			s.applications[index] = previous
			return application{}, err
		}
		return s.applications[index], nil
	}

	return application{}, errNotFound
}

func (s *store) persistLocked() error {
	directory := filepath.Dir(s.path)
	if err := os.MkdirAll(directory, 0o700); err != nil {
		return fmt.Errorf("create data directory: %w", err)
	}

	temporary, err := os.CreateTemp(directory, ".applications-*.tmp")
	if err != nil {
		return fmt.Errorf("create temporary store: %w", err)
	}
	temporaryName := temporary.Name()
	defer os.Remove(temporaryName)

	if err := temporary.Chmod(0o600); err != nil {
		temporary.Close()
		return fmt.Errorf("secure temporary store: %w", err)
	}

	encoder := json.NewEncoder(temporary)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(storedData{Version: 1, Applications: s.applications}); err != nil {
		temporary.Close()
		return fmt.Errorf("encode application store: %w", err)
	}
	if err := temporary.Sync(); err != nil {
		temporary.Close()
		return fmt.Errorf("sync application store: %w", err)
	}
	if err := temporary.Close(); err != nil {
		return fmt.Errorf("close application store: %w", err)
	}
	if err := os.Rename(temporaryName, s.path); err != nil {
		return fmt.Errorf("replace application store: %w", err)
	}
	return nil
}

type api struct {
	store *store
	token string
}

func (a *api) routes() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", a.handleHealth)
	mux.HandleFunc("POST /applications", a.requireAuth(a.handleCreateApplication))
	mux.HandleFunc("GET /applications", a.requireAuth(a.handleListApplications))
	mux.HandleFunc("PATCH /applications/{id}", a.requireAuth(a.handleUpdateStatus))
	return a.withSecurityHeaders(mux)
}

func (a *api) requireAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		provided := strings.TrimPrefix(request.Header.Get("Authorization"), "Bearer ")
		if provided == request.Header.Get("Authorization") || !secureEqual(provided, a.token) {
			writeJSON(response, http.StatusUnauthorized, map[string]string{"message": "인증이 필요합니다."})
			return
		}
		next(response, request)
	}
}

func (a *api) withSecurityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(response http.ResponseWriter, request *http.Request) {
		response.Header().Set("Cache-Control", "no-store")
		response.Header().Set("X-Content-Type-Options", "nosniff")
		response.Header().Set("X-Frame-Options", "DENY")
		next.ServeHTTP(response, request)
	})
}

func (a *api) handleHealth(response http.ResponseWriter, _ *http.Request) {
	writeJSON(response, http.StatusOK, map[string]bool{"ok": true})
}

func (a *api) handleCreateApplication(response http.ResponseWriter, request *http.Request) {
	request.Body = http.MaxBytesReader(response, request.Body, maxRequestBody)
	decoder := json.NewDecoder(request.Body)
	decoder.DisallowUnknownFields()

	var input createApplicationRequest
	if err := decoder.Decode(&input); err != nil {
		writeJSON(response, http.StatusBadRequest, map[string]string{"message": "신청서 형식을 확인해 주세요."})
		return
	}

	item, message := buildApplication(input)
	if message != "" {
		writeJSON(response, http.StatusBadRequest, map[string]string{"message": message})
		return
	}

	if err := a.store.add(item); err != nil {
		if errors.Is(err, errDuplicate) {
			writeJSON(response, http.StatusConflict, map[string]string{"message": "이미 같은 전화번호로 접수된 신청이 있어요."})
			return
		}
		log.Printf("store application: %v", err)
		writeJSON(response, http.StatusInternalServerError, map[string]string{"message": "신청서를 저장하지 못했어요."})
		return
	}

	writeJSON(response, http.StatusCreated, map[string]any{
		"ok":      true,
		"id":      item.ID,
		"message": "신청서를 받았어요.",
	})
}

func (a *api) handleListApplications(response http.ResponseWriter, _ *http.Request) {
	items := a.store.list()
	writeJSON(response, http.StatusOK, map[string]any{
		"applications": items,
		"total":        len(items),
	})
}

func (a *api) handleUpdateStatus(response http.ResponseWriter, request *http.Request) {
	request.Body = http.MaxBytesReader(response, request.Body, maxRequestBody)
	decoder := json.NewDecoder(request.Body)
	decoder.DisallowUnknownFields()

	var input updateStatusRequest
	if err := decoder.Decode(&input); err != nil ||
		(input.Status == "" && input.Paid == nil) ||
		(input.Status != "" && !slices.Contains(statuses, input.Status)) {
		writeJSON(response, http.StatusBadRequest, map[string]string{"message": "신청 상태를 확인해 주세요."})
		return
	}

	item, err := a.store.updateStatus(request.PathValue("id"), input.Status, input.Paid, time.Now().UTC().Format(time.RFC3339))
	if errors.Is(err, errNotFound) {
		writeJSON(response, http.StatusNotFound, map[string]string{"message": "신청 내역을 찾지 못했어요."})
		return
	}
	if err != nil {
		log.Printf("update application status: %v", err)
		writeJSON(response, http.StatusInternalServerError, map[string]string{"message": "신청 상태를 저장하지 못했어요."})
		return
	}

	writeJSON(response, http.StatusOK, map[string]any{"ok": true, "application": item})
}

func buildApplication(input createApplicationRequest) (application, string) {
	input.AttendanceType = strings.TrimSpace(input.AttendanceType)
	input.GuestName = strings.TrimSpace(input.GuestName)
	input.InvitedBy = strings.TrimSpace(input.InvitedBy)
	input.Name = strings.TrimSpace(input.Name)
	input.Phone = nonDigitPattern.ReplaceAllString(input.Phone, "")
	input.BirthYear = strings.TrimSpace(input.BirthYear)
	input.MBTI = strings.ToUpper(strings.TrimSpace(input.MBTI))
	input.DrinkLevel = strings.TrimSpace(input.DrinkLevel)
	input.Requirements = strings.TrimSpace(input.Requirements)
	input.ConsentVersion = strings.TrimSpace(input.ConsentVersion)

	if input.AttendanceType != "first" && input.AttendanceType != "returning" {
		return application{}, "참가 경험을 확인해 주세요."
	}
	if input.AttendanceType == "returning" && len([]rune(input.GuestName)) < 2 {
		return application{}, "함께 오는 새 사람의 이름을 확인해 주세요."
	}
	if len([]rune(input.Name)) < 2 || len([]rune(input.Name)) > 40 {
		return application{}, "이름을 확인해 주세요."
	}
	if !phonePattern.MatchString(input.Phone) {
		return application{}, "휴대전화 번호를 확인해 주세요."
	}
	year, err := strconv.Atoi(input.BirthYear)
	if err != nil || year < 1980 || year > 2010 {
		return application{}, "출생연도를 확인해 주세요."
	}
	if !slices.Contains(mbtiTypes, input.MBTI) {
		return application{}, "MBTI를 확인해 주세요."
	}
	if input.DrinkLevel != "none" && input.DrinkLevel != "light" && input.DrinkLevel != "enjoy" {
		return application{}, "음주 정도를 확인해 주세요."
	}
	if !input.PrivacyConsent {
		return application{}, "개인정보 수집·이용 동의가 필요합니다."
	}
	if len([]rune(input.GuestName)) > 40 || len([]rune(input.InvitedBy)) > 40 {
		return application{}, "이름 입력값을 확인해 주세요."
	}
	if len([]rune(input.Requirements)) > 500 {
		return application{}, "요구사항은 500자 이내로 입력해 주세요."
	}

	now := time.Now().UTC().Format(time.RFC3339)
	return application{
		ID:             newID(),
		AttendanceType: input.AttendanceType,
		GuestName:      input.GuestName,
		InvitedBy:      input.InvitedBy,
		Name:           input.Name,
		Phone:          input.Phone,
		BirthYear:      year,
		MBTI:           input.MBTI,
		DrinkLevel:     input.DrinkLevel,
		Requirements:   input.Requirements,
		PrivacyConsent: true,
		ConsentVersion: input.ConsentVersion,
		ConsentedAt:    now,
		Status:         "pending",
		CreatedAt:      now,
		UpdatedAt:      now,
	}, ""
}

func newID() string {
	buffer := make([]byte, 12)
	if _, err := rand.Read(buffer); err != nil {
		panic(fmt.Sprintf("generate application id: %v", err))
	}
	return hex.EncodeToString(buffer)
}

func secureEqual(left, right string) bool {
	if left == "" || right == "" || len(left) != len(right) {
		return false
	}
	return subtle.ConstantTimeCompare([]byte(left), []byte(right)) == 1
}

func writeJSON(response http.ResponseWriter, status int, value any) {
	response.Header().Set("Content-Type", "application/json; charset=utf-8")
	response.WriteHeader(status)
	if err := json.NewEncoder(response).Encode(value); err != nil {
		log.Printf("encode response: %v", err)
	}
}

func main() {
	token := os.Getenv("AMSR_API_TOKEN")
	if token == "" {
		log.Fatal("AMSR_API_TOKEN is required")
	}

	dataPath := os.Getenv("AMSR_DATA_PATH")
	if dataPath == "" {
		dataPath = "./data/applications.json"
	}
	applicationStore, err := newStore(dataPath)
	if err != nil {
		log.Fatalf("initialize store: %v", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	server := &http.Server{
		Addr:              ":" + port,
		Handler:           (&api{store: applicationStore, token: token}).routes(),
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      10 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	log.Printf("AMSR API listening on :%s", port)
	if err := server.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
		log.Fatal(err)
	}
}
