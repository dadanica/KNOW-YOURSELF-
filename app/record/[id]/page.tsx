"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResultCard } from "@/components/result/ResultCard";
import { getClientId } from "@/lib/clientId";
import type { ResultPack } from "@/lib/types";

type RecordRow = {
  id: string;
  createdAt: string;
  updatedAt: string;
  mode: number;
  typeKey: string;
  typeName: string;
  createdAtISO: string;
  resultJson: ResultPack;
};

type ApiOk = { ok: true; data: RecordRow | null };

export default function RecordDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [row, setRow] = useState<RecordRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const clientId = getClientId();
    void fetch(
      `/api/results?id=${encodeURIComponent(id)}&clientId=${encodeURIComponent(
        clientId
      )}`
    )
      .then((r) => r.json() as Promise<ApiOk>)
      .then((j) => {
        if (j.ok) setRow(j.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-dvh flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!row) {
    return (
      <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">记录不存在或无权限查看</p>
          <Link
            href="/record"
            className="text-primary text-sm hover:underline inline-block"
          >
            返回历史记录
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh flex flex-col px-6 py-8">
      <header className="w-full max-w-md mx-auto mb-6">
        <Link
          href="/record"
          className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回历史记录</span>
        </Link>
      </header>

      <div className="w-full max-w-md mx-auto mb-6 text-center">
        <h1 className="text-xl font-semibold text-foreground">记录详情</h1>
        <p className="text-muted-foreground text-xs mt-1">
          {new Date(row.createdAt).toLocaleString()} · 模式 {row.mode} 题
        </p>
      </div>

      <ResultCard result={row.resultJson} />
    </main>
  );
}

