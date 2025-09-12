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

      if (refreshRes.ok) {
        // After refresh, redirect back to the same URL so the browser includes new cookies
        return NextResponse.redirect(nextUrl);
      }
    } catch {}

    // Refresh failed: redirect to login with next param
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
