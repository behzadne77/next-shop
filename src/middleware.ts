import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: [
    "/login",
    "/panel/:path*"
  ]
};

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname, origin } = nextUrl;

  const accessToken = req.cookies.get("access_token")?.value;
  const isProtected = pathname.startsWith("/panel");
  const isLogin = pathname === "/login";

  // If user is logged in and tries to access login page, redirect to dashboard
  if (isLogin) {
    if (accessToken) {
      const dashboardUrl = new URL("/panel/dashboard", origin);
      return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
  }

  // Protected routes
  if (isProtected) {
    if (accessToken) {
      return NextResponse.next();
    }
    // Try a one-time refresh by calling internal API with current cookies
    try {
      const refreshUrl = new URL("/api/auth/refresh", origin);
      const refreshRes = await fetch(refreshUrl, {
        method: "POST",
        headers: { cookie: req.headers.get("cookie") ?? "" },
        cache: "no-store",
      });
      console.log("refresh url", refreshRes.ok)

      if (refreshRes.ok) {
        const res = NextResponse.next();
        const setCookie = refreshRes.headers.get("set-cookie");
        if (setCookie) {
          res.headers.set("set-cookie", setCookie);
        }
        return res; // بدون redirect
      }
    } catch {
      console.log("in catch")
    }

    // Refresh failed: redirect to login with next param
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
