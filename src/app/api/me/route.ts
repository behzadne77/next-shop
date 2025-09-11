// src/app/api/me/route.ts
import { cookies } from "next/headers";

export async function GET() {
    const jar = await cookies()
  const token = jar.get("access_token")?.value;
  if (!token) return new Response("Unauthorized", { status: 401 });

  const res = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return new Response("Unauthorized", { status: 401 });
  return Response.json(await res.json());
}