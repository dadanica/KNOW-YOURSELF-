import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAuthedUser } from "@/lib/auth";

export const runtime = "nodejs";

const resultPackSchema = z.object({
  mode: z.union([z.literal(24), z.literal(36), z.literal(48)]),
  pctAll: z.record(z.string(), z.number()),
  pctINT: z.record(z.string(), z.number()),
  pctTEAM: z.record(z.string(), z.number()),
  pctSOC: z.record(z.string(), z.number()),
  topAll: z.any(),
  topINT: z.any(),
  topTEAM: z.any(),
  topSOC: z.any(),
  typeKey: z.string(),
  typeName: z.string(),
  createdAtISO: z.string(),
});

const bodySchema = z.object({
  clientId: z.string().min(1),
  result: resultPackSchema,
  answers: z.record(z.string(), z.union([z.literal("A"), z.literal("B"), z.literal("C"), z.literal("D")])),
  questionIds: z.array(z.string()),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const clientId = url.searchParams.get("clientId");
  const latest = url.searchParams.get("latest") === "1";
  const take = Math.min(Number(url.searchParams.get("take") || 50), 200);
  const user = await getAuthedUser();

  // fetch by id (requires clientId to prevent cross-user access)
  if (id) {
    if (!clientId && !user) {
      return NextResponse.json(
        { ok: false, error: "MISSING_CLIENT_ID" },
        { status: 400 }
      );
    }
    const row = await prisma.testResult.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        clientId: true,
        userId: true,
        mode: true,
        typeKey: true,
        typeName: true,
        createdAtISO: true,
        resultJson: true,
        answersJson: true,
        questionIds: true,
      },
    });
    const allowedByUser = !!(user && row?.userId === user.id);
    const allowedByClient = !!(clientId && row?.clientId === clientId);
    if (!row || (!allowedByUser && !allowedByClient)) {
      return NextResponse.json({ ok: true, data: null });
    }
    // strip clientId from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { clientId: _cid, userId: _uid, ...rest } = row;
    return NextResponse.json({ ok: true, data: rest });
  }

  const where = user ? { userId: user.id } : clientId ? { clientId } : null;
  if (!where) {
    return NextResponse.json({ ok: false, error: "MISSING_CLIENT_ID" }, { status: 400 });
  }

  const rows = await prisma.testResult.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: latest ? 1 : take,
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      mode: true,
      typeKey: true,
      typeName: true,
      createdAtISO: true,
      resultJson: true,
      answersJson: true,
      questionIds: true,
    },
  });

  if (latest) {
    return NextResponse.json({ ok: true, data: rows[0] ?? null });
  }
  return NextResponse.json({ ok: true, data: rows });
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.parse(json);
    const user = await getAuthedUser();

    const ua = req.headers.get("user-agent");
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      null;

    // history mode: create a new record per test completion
    const saved = await prisma.testResult.create({
      data: {
        clientId: parsed.clientId,
        userId: user?.id ?? null,
        mode: parsed.result.mode,
        typeKey: parsed.result.typeKey,
        typeName: parsed.result.typeName,
        createdAtISO: parsed.result.createdAtISO,
        resultJson: parsed.result,
        answersJson: parsed.answers,
        questionIds: parsed.questionIds,
        userAgent: ua,
        ip,
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, ...saved });
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

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const clientId = url.searchParams.get("clientId");
  const user = await getAuthedUser();

  const where = user ? { userId: user.id } : clientId ? { clientId } : null;
  if (!where) {
    return NextResponse.json({ ok: false, error: "MISSING_CLIENT_ID" }, { status: 400 });
  }

  const deleted = await prisma.testResult.deleteMany({ where });
  return NextResponse.json({ ok: true, deleted: deleted.count });
}

