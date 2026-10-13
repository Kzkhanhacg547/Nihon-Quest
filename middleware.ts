import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

function getSecret(): string {
  return process.env.NEXTAUTH_SECRET || "dev-only-change-me-min-32-chars-long-secret";
}

export async function middleware(req: NextRequest) {
  const secret = getSecret();

  // Kiểm tra cookie: Hỗ trợ cả HTTPS (__Secure-) và HTTP/Proxy chuẩn của Netlify
  const isSecure = Boolean(req.cookies.get("__Secure-next-auth.session-token"));
  const primaryCookieName = isSecure ? "__Secure-next-auth.session-token" : "next-auth.session-token";

  let token = await getToken({
    req,
    secret,
    cookieName: primaryCookieName,
  });

  // Fallback: nếu chưa lấy được qua tên chính, thử kiểm tra tên cookie còn lại
  if (!token && !isSecure) {
    token = await getToken({
      req,
      secret,
      cookieName: "__Secure-next-auth.session-token",
    });
  } else if (!token && isSecure) {
    token = await getToken({
      req,
      secret,
      cookieName: "next-auth.session-token",
    });
  }

  if (!token) {
    const signInUrl = new URL("/login", req.url);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/onboarding"],
};