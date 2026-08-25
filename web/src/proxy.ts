import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuthConfigured, isAdminAuthorized } from "./lib/admin-auth";

export function proxy(request: NextRequest) {
  if (!adminAuthConfigured()) {
    return new NextResponse("관리자 인증 설정이 아직 완료되지 않았습니다.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  if (!isAdminAuthorized(request.headers.get("authorization"))) {
    return new NextResponse("관리자 인증이 필요합니다.", {
      status: 401,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
        "WWW-Authenticate": 'Basic realm="AMSR Admin", charset="UTF-8"',
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
