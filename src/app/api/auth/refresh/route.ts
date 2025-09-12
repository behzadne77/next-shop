import { cookies } from "next/headers";

export async function POST() {
  const jar = await cookies();
  const refreshToken = jar.get("refresh_token")?.value;
  if (!refreshToken) {
    return new Response("Missing refresh token", { status: 401 });
  }

  try {
    const backendRes = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!backendRes.ok) {
      return new Response("Invalid refresh token", { status: 401 });
    }

    const { accessToken, refreshToken: newRefreshToken } = await backendRes.json();

    const isProd = process.env.NODE_ENV === "production";

    jar.set("access_token", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    if (newRefreshToken) {
      jar.set("refresh_token", newRefreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
