import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const rows = await prisma.testResult.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      createdAt: true,
      mode: true,
      typeKey: true,
      typeName: true,
      createdAtISO: true,
      resultJson: true,
    },
  });

  return NextResponse.json({ ok: true, data: rows });
}

