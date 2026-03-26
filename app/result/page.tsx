"use client";

import { Suspense, useEffect } from "react";
import { useTestContext } from "@/contexts/TestContext";
import { ResultCard } from "@/components/result/ResultCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getClientId } from "@/lib/clientId";
import type { ResultPack } from "@/lib/types";

function ResultContent() {
  // Only renders result from context (set by test page via useTestEngine)
  const { storedResult: result, setStoredResult } = useTestContext();

  // If user refreshed and context is empty, try to load last saved record from DB
  useEffect(() => {
    if (result) return;
    const clientId = getClientId();
    void fetch(`/api/results?clientId=${encodeURIComponent(clientId)}&latest=1`)
      .then((r) =>
        r.json() as Promise<{ ok: true; data: { resultJson: ResultPack } | null }>
      )
      .then((j) => {
        if (j.ok && j.data) setStoredResult(j.data.resultJson);
      })
      .catch(() => {});
  }, [result, setStoredResult]);

  // Show loading or empty state if no result
  if (!result) {
    return (
      <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">暂无测试结果</p>
          <Link
            href="/test?mode=24"
            className="text-primary text-sm hover:underline inline-block"
          >
            开始测试
          </Link>
          <Link
            href="/record"
            className="text-primary text-sm hover:underline inline-block"
          >
            查看记录
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh flex flex-col px-6 py-8">
      {/* Header */}
      <header className="w-full max-w-md mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回首页</span>
        </Link>
      </header>

      {/* Title */}
      <div className="w-full max-w-md mx-auto mb-6 text-center">
        <h1 className="text-xl font-semibold text-foreground">测试结果</h1>
      </div>

      {/* Result - only renders result from useTestEngine */}
      <ResultCard result={result} />

      <div className="w-full max-w-md mx-auto mt-4 text-center">
        <Link
          href="/record"
          className="text-primary text-sm hover:underline inline-block"
        >
          查看记录
        </Link>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-md mx-auto mt-8 text-center">
        <p className="text-muted-foreground text-xs">
          结果仅供参考，愿你在自我探索的路上越走越远
        </p>
      </footer>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-dvh flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
