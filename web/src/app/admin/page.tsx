import type { Metadata } from "next";
import Link from "next/link";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "신청 확인 | 아무사람대잔치",
  robots: { index: false, follow: false },
};

type ApplicationStatus = "pending" | "confirmed" | "waitlisted" | "cancelled";

type Application = {
  id: string;
  attendanceType: "first" | "returning";
  guestName: string;
  invitedBy: string;
  name: string;
  gender: "male" | "female" | "";
  phone: string;
  birthYear: number;
  mbti: string;
  drinkLevel: "none" | "light" | "enjoy";
  oneLiner: string;
  requirements: string;
  privacyConsent: boolean;
  consentedAt: string;
  status: ApplicationStatus;
  paid: boolean;
  createdAt: string;
  updatedAt: string;
};

type ApplicationResponse = {
  applications: Application[];
  total: number;
};

const statusLabels: Record<ApplicationStatus, string> = {
  pending: "확인 전",
  confirmed: "참가 확정",
  waitlisted: "대기",
  cancelled: "취소",
};

const drinkLabels: Record<Application["drinkLevel"], string> = {
  none: "안마셔요",
  light: "가볍게",
  enjoy: "잘 마시는 편",
};

const formatPhone = (phone: string) =>
  phone.length === 11
    ? `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`
    : `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

async function getApplications(): Promise<{ data?: ApplicationResponse; error?: string }> {
  const endpoint = process.env.AMSR_APPLICATION_API_URL;
  const token = process.env.AMSR_APPLICATION_API_TOKEN;
  if (!endpoint || !token) return { error: "신청 API 연결 설정이 필요합니다." };

  try {
    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return { error: "신청 목록을 불러오지 못했습니다." };
    return { data: (await response.json()) as ApplicationResponse };
  } catch {
    return { error: "신청 서버에 연결할 수 없습니다." };
  }
}

export default async function AdminPage() {
  const result = await getApplications();
  const applications = result.data?.applications ?? [];
  const counts = applications.reduce<Record<ApplicationStatus, number>>(
    (current, application) => ({ ...current, [application.status]: current[application.status] + 1 }),
    { pending: 0, confirmed: 0, waitlisted: 0, cancelled: 0 },
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>AMSR</Link>
        <span>ADMIN / APPLICATIONS</span>
        <span>총 {result.data?.total ?? 0}명 · 입금 {applications.filter((application) => application.paid).length}명</span>
      </header>

      <section className={styles.intro}>
        <p>2026 / 아무사람대잔치</p>
        <h1>신청 확인</h1>
        <div className={styles.stats}>
          {(Object.keys(statusLabels) as ApplicationStatus[]).map((status) => (
            <div key={status} data-status={status}>
              <span>{statusLabels[status]}</span>
              <strong>{counts[status]}</strong>
            </div>
          ))}
        </div>
      </section>

      {result.error && <p className={styles.error}>{result.error}</p>}

      {!result.error && applications.length === 0 && (
        <section className={styles.empty}>
          <strong>아직 신청이 없어요.</strong>
          <p>첫 신청이 들어오면 이곳에 바로 표시됩니다.</p>
        </section>
      )}

      <section className={styles.list} aria-label="참가 신청 목록">
        {applications.map((application, index) => (
          <article className={styles.card} key={application.id} data-status={application.status}>
            <div className={styles.cardIndex}>{String(applications.length - index).padStart(2, "0")}</div>
            <div className={styles.identity}>
              <span>{application.attendanceType === "returning" ? "재참가" : "첫 참가"}</span>
              <h2>{application.name}</h2>
              <a href={`tel:${application.phone}`}>{formatPhone(application.phone)}</a>
            </div>
            <div className={styles.applicationInfo}>
              <dl className={styles.details}>
                <div><dt>성별</dt><dd>{application.gender === "male" ? "남성" : application.gender === "female" ? "여성" : "미입력"}</dd></div>
                <div><dt>출생</dt><dd>{application.birthYear}년</dd></div>
                <div><dt>MBTI</dt><dd>{application.mbti || "미입력"}</dd></div>
                <div><dt>음주</dt><dd>{drinkLabels[application.drinkLevel]}</dd></div>
                <div>
                  <dt>{application.attendanceType === "returning" ? "동행" : "초대"}</dt>
                  <dd>
                    {application.attendanceType === "returning"
                      ? application.guestName
                      : application.invitedBy || "혼자 신청"}
                  </dd>
                </div>
                <div><dt>접수</dt><dd>{formatDate(application.createdAt)}</dd></div>
                <div><dt>한줄</dt><dd>{application.oneLiner || "미입력"}</dd></div>
              </dl>
              {application.requirements && (
                <div className={styles.requirements}>
                  <span>요구사항</span>
                  <p>{application.requirements}</p>
                </div>
              )}
            </div>
            <div className={styles.controls}>
              <form className={styles.statusForm} action="/api/admin/status" method="post">
                <input type="hidden" name="id" value={application.id} />
                <label>
                  <span>상태</span>
                  <select name="status" defaultValue={application.status} aria-label={`${application.name} 신청 상태`}>
                    {(Object.keys(statusLabels) as ApplicationStatus[]).map((status) => (
                      <option value={status} key={status}>{statusLabels[status]}</option>
                    ))}
                  </select>
                </label>
                <button type="submit">저장 ↗</button>
              </form>
              <form action="/api/admin/status" method="post">
                <input type="hidden" name="id" value={application.id} />
                <input type="hidden" name="paid" value={application.paid ? "false" : "true"} />
                <button
                  type="submit"
                  className={styles.paidButton}
                  data-paid={application.paid || undefined}
                  aria-label={`${application.name} 입금 ${application.paid ? "확인 취소" : "확인"}`}
                >
                  {application.paid ? "입금 확인됨 ✓" : "입금 전 → 확인"}
                </button>
              </form>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
