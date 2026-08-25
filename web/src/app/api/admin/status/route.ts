import { isAdminAuthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";

const statuses = ["pending", "confirmed", "waitlisted", "cancelled"] as const;

export async function POST(request: Request) {
  if (!isAdminAuthorized(request.headers.get("authorization"))) {
    return new Response("관리자 인증이 필요합니다.", { status: 401 });
  }

  const origin = request.headers.get("origin");
  const requestHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && (!requestHost || new URL(origin).host !== requestHost)) {
    return new Response("잘못된 요청입니다.", { status: 403 });
  }

  const formData = await request.formData();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const paidField = formData.get("paid");
  const paid = paidField === null ? undefined : String(paidField);
  if (
    !/^[a-f0-9]{24}$/.test(id) ||
    (status === "" && paid === undefined) ||
    (status !== "" && !statuses.includes(status as (typeof statuses)[number])) ||
    (paid !== undefined && paid !== "true" && paid !== "false")
  ) {
    return new Response("신청 상태를 확인해 주세요.", { status: 400 });
  }

  const endpoint = process.env.AMSR_APPLICATION_API_URL;
  const token = process.env.AMSR_APPLICATION_API_TOKEN;
  if (!endpoint || !token) return new Response("신청 API 연결 설정이 필요합니다.", { status: 503 });

  try {
    const response = await fetch(`${endpoint.replace(/\/$/, "")}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...(status !== "" && { status }),
        ...(paid !== undefined && { paid: paid === "true" }),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return new Response("신청 상태를 저장하지 못했습니다.", { status: 502 });
  } catch {
    return new Response("신청 서버에 연결할 수 없습니다.", { status: 502 });
  }

  return new Response(null, { status: 303, headers: { Location: "/admin" } });
}
