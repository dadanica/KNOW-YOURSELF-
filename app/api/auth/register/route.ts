import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession, hashPassword } from "@/lib/auth";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(72),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const email = body.email.trim().toLowerCase();

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { ok: false, error: "EMAIL_EXISTS" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(body.password);
    const user = await prisma.user.create({
      data: { email, passwordHash },
      select: { id: true, email: true },
    });

    await createSession(user.id);
    return NextResponse.json({ ok: true, user });
  } catch (err) {
    // helpful during local development
    // eslint-disable-next-line no-console
    console.error("[auth/register] error", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "INVALID_BODY", details: err.flatten() },
        { status: 400 }
      );
    }
    if (process.env.NODE_ENV === "development" && err instanceof Error) {
      return NextResponse.json(
        { ok: false, error: "INTERNAL_ERROR", message: err.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: false, error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
