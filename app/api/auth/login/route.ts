import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(72),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const email = body.email.trim().toLowerCase();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "INVALID_CREDENTIALS" },
        { status: 401 }
      );
    }

    const ok = await verifyPassword(body.password, user.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "INVALID_CREDENTIALS" },
        { status: 401 }
      );
    }

    await createSession(user.id);
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "INVALID_BODY", details: err.flatten() },
        { status: 400 }
      );
    }
    return NextResponse.json({ ok: false, error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
