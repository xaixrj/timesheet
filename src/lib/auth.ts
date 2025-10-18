import { NextResponse } from "next/server";

const COOKIE_NAME = "ts_session";

export function createSessionResponse(token: string) {
  const response = NextResponse.json({ ok: true, token });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  return response;
}

export function clearSessionResponse() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}


