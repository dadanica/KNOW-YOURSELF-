"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { useTestEngine } from "@/hooks/useTestEngine";
import { useTestContext } from "@/contexts/TestContext";
import { QuestionCard } from "@/components/test/QuestionCard";
import { TestProgress } from "@/components/test/TestProgress";
import type { TestMode } from "@/lib/types";
import { getClientId } from "@/lib/clientId";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function TestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modeParam = searchParams.get("mode");
  const mode: TestMode =
    modeParam === "24" ? 24 : modeParam === "48" ? 48 : 36;

  const { setStoredResult } = useTestContext();
  const didPersistRef = useRef(false);

  const {
    current: currentQuestion,
    progress,
    total: totalQuestions,
    index: currentIndex,
    isDone,
    result,
    answers,
    questionList,
    answer,
  } = useTestEngine(mode);

  // Store result and navigate to result page when complete
  useEffect(() => {
    if (isDone && result) {
      setStoredResult(result);
      if (didPersistRef.current) return;
      didPersistRef.current = true;
      // Fire-and-forget persistence (do not block navigation)
      const payload = {
        clientId: getClientId(),
        result,
        answers,
        questionIds: questionList.map((q) => q.id),
      };
      void fetch("/api/results", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        // best-effort: allow request to continue during page transition
        keepalive: true,
      }).catch(() => {});
      router.push(`/result?mode=${mode}`);
    }
  }, [isDone, result, router, mode, setStoredResult, answers, questionList]);

  const modeLabels: Record<TestMode, string> = {
    24: "快速模式",
    36: "标准模式",
    48: "完整模式",
  };

  return (
    <main className="min-h-dvh flex flex-col px-6 py-8">
      {/* Header */}
      <header className="w-full max-w-md mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回</span>
        </Link>
      </header>

      {/* Progress */}
      <TestProgress
        progress={progress}
        current={currentIndex}
        total={totalQuestions}
      />

      {/* Question */}
      <div className="flex-1 flex items-center justify-center py-8">
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <QuestionCard question={currentQuestion} onAnswer={answer} />
          )}
        </AnimatePresence>
      </div>

      {/* Mode indicator */}
      <footer className="w-full max-w-md mx-auto mt-6 text-center">
        <p className="text-muted-foreground text-xs">{modeLabels[mode]}</p>
      </footer>
    </main>
  );
}

export default function TestPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-dvh flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
      }
    >
      <TestContent />
    </Suspense>
  );
}
