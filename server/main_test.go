package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"testing"
)

const testToken = "test-token-with-enough-entropy"

func newTestHandler(t *testing.T) (http.Handler, string) {
	t.Helper()
	path := filepath.Join(t.TempDir(), "applications.json")
	applicationStore, err := newStore(path)
	if err != nil {
		t.Fatal(err)
	}
	return (&api{store: applicationStore, token: testToken}).routes(), path
}

func request(t *testing.T, handler http.Handler, method, path string, body any, authenticated bool) *httptest.ResponseRecorder {
	t.Helper()
	var payload []byte
	if body != nil {
		var err error
		payload, err = json.Marshal(body)
		if err != nil {
			t.Fatal(err)
		}
	}
	req := httptest.NewRequest(method, path, bytes.NewReader(payload))
	if authenticated {
		req.Header.Set("Authorization", "Bearer "+testToken)
	}
	req.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()
	handler.ServeHTTP(response, req)
	return response
}

func validApplication() createApplicationRequest {
	return createApplicationRequest{
		AttendanceType: "first",
		InvitedBy:      "초대한 사람",
		Name:           "테스트 참가자",
		Phone:          "010-1234-5678",
		BirthYear:      "1996",
		MBTI:           "ENFP",
		DrinkLevel:     "light",
		OneLiner:       "낯가리지만 금방 친해지는 편",
		Requirements:   "채식 메뉴가 있으면 좋아요.",
		PrivacyConsent: true,
		ConsentVersion: "2026-08-21",
		ConsentedAt:    "2026-08-21T07:00:00Z",
	}
}

func TestApplicationsRequireAuthentication(t *testing.T) {
	handler, _ := newTestHandler(t)
	response := request(t, handler, http.MethodGet, "/applications", nil, false)
	if response.Code != http.StatusUnauthorized {
		t.Fatalf("expected 401, got %d", response.Code)
	}
}

func TestApplicationLifecycleAndPersistence(t *testing.T) {
	handler, path := newTestHandler(t)
	created := request(t, handler, http.MethodPost, "/applications", validApplication(), true)
	if created.Code != http.StatusCreated {
		t.Fatalf("expected 201, got %d: %s", created.Code, created.Body.String())
	}

	var createPayload struct {
		ID string `json:"id"`
	}
	if err := json.Unmarshal(created.Body.Bytes(), &createPayload); err != nil {
		t.Fatal(err)
	}
	if createPayload.ID == "" {
		t.Fatal("expected application id")
	}

	duplicate := request(t, handler, http.MethodPost, "/applications", validApplication(), true)
	if duplicate.Code != http.StatusConflict {
		t.Fatalf("expected 409, got %d", duplicate.Code)
	}

	updated := request(t, handler, http.MethodPatch, "/applications/"+createPayload.ID, updateStatusRequest{Status: "confirmed"}, true)
	if updated.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d: %s", updated.Code, updated.Body.String())
	}

	reloaded, err := newStore(path)
	if err != nil {
		t.Fatal(err)
	}
	items := reloaded.list()
	if len(items) != 1 || items[0].Status != "confirmed" || items[0].MBTI != "ENFP" || items[0].Requirements == "" {
		t.Fatalf("unexpected persisted applications: %#v", items)
	}
}

func TestPaidToggle(t *testing.T) {
	handler, path := newTestHandler(t)
	created := request(t, handler, http.MethodPost, "/applications", validApplication(), true)
	var payload struct {
		ID string `json:"id"`
	}
	if err := json.Unmarshal(created.Body.Bytes(), &payload); err != nil {
		t.Fatal(err)
	}

	paid := true
	updated := request(t, handler, http.MethodPatch, "/applications/"+payload.ID, updateStatusRequest{Paid: &paid}, true)
	if updated.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d: %s", updated.Code, updated.Body.String())
	}

	reloaded, err := newStore(path)
	if err != nil {
		t.Fatal(err)
	}
	items := reloaded.list()
	if len(items) != 1 || !items[0].Paid || items[0].Status != "pending" {
		t.Fatalf("expected paid pending application, got %#v", items)
	}

	empty := request(t, handler, http.MethodPatch, "/applications/"+payload.ID, updateStatusRequest{}, true)
	if empty.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for empty update, got %d", empty.Code)
	}
}

func TestApplicationValidation(t *testing.T) {
	handler, _ := newTestHandler(t)
	input := validApplication()
	input.Phone = "01012"
	response := request(t, handler, http.MethodPost, "/applications", input, true)
	if response.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", response.Code)
	}
}

func TestApplicationRejectsWrongOneLinerLength(t *testing.T) {
	handler, _ := newTestHandler(t)
	for _, oneLiner := range []string{"", "공백 제외 열두 자가 넘어가는 소개"} {
		input := validApplication()
		input.OneLiner = oneLiner
		response := request(t, handler, http.MethodPost, "/applications", input, true)
		if response.Code != http.StatusBadRequest {
			t.Fatalf("expected 400 for %q, got %d", oneLiner, response.Code)
		}
	}
}

func TestApplicationRejectsInvalidMBTI(t *testing.T) {
	handler, _ := newTestHandler(t)
	input := validApplication()
	input.MBTI = "ABCD"
	response := request(t, handler, http.MethodPost, "/applications", input, true)
	if response.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", response.Code)
	}
}

func TestCancelledApplicationAllowsReapplication(t *testing.T) {
	handler, _ := newTestHandler(t)
	created := request(t, handler, http.MethodPost, "/applications", validApplication(), true)
	var payload struct {
		ID string `json:"id"`
	}
	if err := json.Unmarshal(created.Body.Bytes(), &payload); err != nil {
		t.Fatal(err)
	}

	request(t, handler, http.MethodPatch, "/applications/"+payload.ID, updateStatusRequest{Status: "cancelled"}, true)
	reapplied := request(t, handler, http.MethodPost, "/applications", validApplication(), true)
	if reapplied.Code != http.StatusCreated {
		t.Fatalf("expected 201, got %d: %s", reapplied.Code, reapplied.Body.String())
	}
}
