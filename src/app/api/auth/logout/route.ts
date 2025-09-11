// src/app/api/auth/logout/route.ts
import { cookies } from "next/headers";

export async function POST() {
  const jar = await cookies();

  // پاک‌کردن با maxAge=0 یا set بر مقدار خالی
  jar.set("access_token", "", { httpOnly: true, path: "/", maxAge: 0 });
  jar.set("refresh_token", "", { httpOnly: true, path: "/", maxAge: 0 });

  return new Response(null, { status: 204 });
}