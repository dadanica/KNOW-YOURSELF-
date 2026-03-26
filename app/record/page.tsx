"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

type ApiOk = { ok: true; data: RecordRow[] };

function RecordContent() {
  const [rows, setRows] = useState<RecordRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clientId = getClientId();
    void fetch(`/api/results?clientId=${encodeURIComponent(clientId)}`)
      .then((r) => r.json() as Promise<ApiOk>)
      .then((j) => {
        if (j.ok) {
          setRows(j.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-dvh flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (rows.length === 0) {
    return (
      <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">暂无已保存的记录</p>
          <Link
            href="/test?mode=24"
            className="text-primary text-sm hover:underline inline-block"
          >
            开始测试
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh flex flex-col px-6 py-8">
      <header className="w-full max-w-md mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回首页</span>
        </Link>
      </header>

      <div className="w-full max-w-md mx-auto mb-6 text-center">
        <h1 className="text-xl font-semibold text-foreground">我的记录</h1>
        <p className="text-muted-foreground text-xs mt-1">
          共 {rows.length} 条，按时间倒序
        </p>
      </div>

      {/* History list */}
      <div className="w-full max-w-md mx-auto mb-6 space-y-2">
        {rows.map((r) => {
          return (
            <Link
              key={r.id}
              href={`/record/${encodeURIComponent(r.id)}`}
              className={[
                "block w-full text-left rounded-2xl border px-4 py-3 transition-colors",
                "border-border/60 bg-background/60 hover:bg-accent/40",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium text-foreground truncate">
                  {r.typeName}
                </div>
                <div className="text-[11px] text-muted-foreground shrink-0">
                  {new Date(r.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                模式：{r.mode} 题 · {r.typeKey}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export default function RecordPage() {
  return (
    <Suspense fallback={null}>
      <RecordContent />
    </Suspense>
  );
}

