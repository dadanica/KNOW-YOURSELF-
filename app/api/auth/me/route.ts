import { NextResponse } from "next/server";
import { getAuthedUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const user = await getAuthedUser();
  if (!user) return NextResponse.json({ ok: true, user: null });
  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
}
