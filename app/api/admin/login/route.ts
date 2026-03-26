import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const COOKIE_NAME = "admin_auth";

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as {
    password?: string;
  };

  if (!password) {
    return NextResponse.json(
      { ok: false, error: "MISSING_PASSWORD" },
      { status: 400 }
    );
  }

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, error: "INVALID_CREDENTIALS" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 4, // 4 hours
  });
  return res;
}

