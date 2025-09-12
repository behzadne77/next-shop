// src/app/api/auth/login/route.ts
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // تماس با بک‌اند اصلی (آدرس را با ENV تنظیم کن)
    const backendRes = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!backendRes.ok) {
      const text = await backendRes.text();
      return new Response(text || "Invalid credentials", { status: backendRes.status });
    }
    const { accessToken, refreshToken, firstName, gender, id, image, lastName, username } = await backendRes.json();
    const user = {firstName, gender, id, image, lastName, username}
    // ست کردن کوکی‌های HttpOnly
    const jar = await cookies();
    const isProd = process.env.NODE_ENV === "production";

    jar.set("access_token", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 دقیقه
    });

    jar.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 روز
    });

    return Response.json({ user });
  } catch (err) {
    return new Response(JSON.stringify({
      "message": "Server Error",
      err
    }), { status: 500 });
  }
}