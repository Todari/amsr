type ApplicationPayload = {
  attendanceType?: string;
  guestName?: string;
  invitedBy?: string;
  name?: string;
  phone?: string;
  birthYear?: string;
  mbti?: string;
  drinkLevel?: string;
  requirements?: string;
  privacyConsent?: boolean;
  website?: string;
};

export const runtime = "nodejs";

const text = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export async function POST(request: Request) {
  if (process.env.AMSR_APPLICATIONS_OPEN !== "true") {
    return Response.json({ message: "아직 신청 접수가 열리지 않았어요." }, { status: 503 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 20_000) {
    return Response.json({ message: "신청서가 너무 큽니다." }, { status: 413 });
  }

  let raw: ApplicationPayload;
  try {
    raw = (await request.json()) as ApplicationPayload;
  } catch {
    return Response.json({ message: "신청서 형식을 확인해 주세요." }, { status: 400 });
  }

  if (text(raw.website, 200)) {
    return Response.json({ ok: true }, { status: 202 });
  }

  const payload = {
    attendanceType: text(raw.attendanceType, 16),
    guestName: text(raw.guestName, 40),
    invitedBy: text(raw.invitedBy, 40),
    name: text(raw.name, 40),
    phone: text(raw.phone, 20).replace(/\D/g, ""),
    birthYear: text(raw.birthYear, 4),
    mbti: text(raw.mbti, 4).toUpperCase(),
    drinkLevel: text(raw.drinkLevel, 16),
    requirements: text(raw.requirements, 500),
    privacyConsent: raw.privacyConsent === true,
    consentedAt: new Date().toISOString(),
    consentVersion: "2026-08-21",
  };

  const validAttendance = payload.attendanceType === "first" || payload.attendanceType === "returning";
  const validPhone = /^01[016789]\d{7,8}$/.test(payload.phone);
  const year = Number(payload.birthYear);
  const validYear = Number.isInteger(year) && year >= 1980 && year <= 2010;
  const validMbti = /^(ISTJ|ISFJ|INFJ|INTJ|ISTP|ISFP|INFP|INTP|ESTP|ESFP|ENFP|ENTP|ESTJ|ESFJ|ENFJ|ENTJ)$/.test(payload.mbti);
  const hasRequiredGuest = payload.attendanceType !== "returning" || payload.guestName.length >= 2;

  if (
    !validAttendance ||
    payload.name.length < 2 ||
    !validPhone ||
    !validYear ||
    !validMbti ||
    !payload.drinkLevel ||
    !payload.privacyConsent ||
    !hasRequiredGuest
  ) {
    return Response.json({ message: "필수 항목을 다시 확인해 주세요." }, { status: 400 });
  }

  const endpoint = process.env.AMSR_APPLICATION_API_URL;
  if (!endpoint) {
    return Response.json({ message: "신청 서버 연결이 아직 끝나지 않았어요." }, { status: 503 });
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.AMSR_APPLICATION_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.AMSR_APPLICATION_API_TOKEN}`;
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (!upstream.ok) {
      const payload = (await upstream.json().catch(() => null)) as { message?: string } | null;
      const status = upstream.status >= 400 && upstream.status < 500 ? upstream.status : 502;
      return Response.json(
        { message: payload?.message || "신청 서버가 응답하지 않았어요. 잠시 후 다시 시도해 주세요." },
        { status },
      );
    }

    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ message: "신청 서버에 연결할 수 없어요. 잠시 후 다시 시도해 주세요." }, { status: 502 });
  }
}
