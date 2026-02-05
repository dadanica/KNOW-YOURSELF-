"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { questions36, questionsExtra12 } from "@/lib/questions";
import { emptyScore, scoreAnswer, toPercentTable, topPairFromPercent, typeKey } from "@/lib/scoring";
import { getTypeName } from "@/lib/typeNames";
import type { Question, ResultPack, Scene } from "@/lib/types";

/** deterministic shuffle with seed (LCG) */
function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed >>> 0;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function nowSeed(): number {
  // fixed per session; enough for stable question order within one test run
  return (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
}

export function useTestEngine(mode: 24 | 36 | 48) {
  // seed should be stable within one run; change when user resets or changes mode
  const seedRef = useRef<number>(nowSeed());
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});

  // If mode changes, re-seed and reset progress to avoid weird partial states
  useEffect(() => {
    seedRef.current = nowSeed();
    setIndex(0);
    setAnswers({});
  }, [mode]);

  const questionList: Question[] = useMemo(() => {
    const base = questions36;
    const all = mode === 48 ? [...base, ...questionsExtra12] : base;
    const shuffled = shuffleWithSeed(all, seedRef.current);
    return shuffled.slice(0, mode);
  }, [mode]);

  const total = questionList.length;
  const current = questionList[index] ?? null;
  const isDone = index >= total;

  const progress = total === 0 ? 0 : Math.min(100, Math.round((index / total) * 100));

  function answer(option: "A" | "B" | "C" | "D") {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: option }));
    setIndex((i) => Math.min(i + 1, total));
  }

  function back() {
    setIndex((i) => Math.max(0, i - 1));
  }

  function reset() {
    seedRef.current = nowSeed();
    setIndex(0);
    setAnswers({});
  }

  const result: ResultPack | null = useMemo(() => {
    if (!isDone || total === 0) return null;

    const scoreAll = emptyScore();
    const scoreByScene: Record<Scene, ReturnType<typeof emptyScore>> = {
      INT: emptyScore(),
      TEAM: emptyScore(),
      SOC: emptyScore(),
    };

    for (const q of questionList) {
      const a = answers[q.id];
      if (!a) continue; // safety
      scoreAnswer(q, a, scoreAll, scoreByScene);
    }

    const pctAll = toPercentTable(scoreAll);
    const pctINT = toPercentTable(scoreByScene.INT);
    const pctTEAM = toPercentTable(scoreByScene.TEAM);
    const pctSOC = toPercentTable(scoreByScene.SOC);

    const topAll = topPairFromPercent(pctAll);
    const topINT = topPairFromPercent(pctINT);
    const topTEAM = topPairFromPercent(pctTEAM);
    const topSOC = topPairFromPercent(pctSOC);

    const key = typeKey(topAll.top1, topAll.top2);
    const fallback = `${topAll.top1}×${topAll.top2}`;
    const typeName = getTypeName(key, fallback);

    return {
      mode,
      pctAll,
      pctINT,
      pctTEAM,
      pctSOC,
      topAll,
      topINT,
      topTEAM,
      topSOC,
      typeKey: key,
      typeName,
      createdAtISO: new Date().toISOString(),
    };
  }, [answers, isDone, questionList, total, mode]);

  return {
    questionList,
    current,
    index,
    total,
    progress,
    answers,
    answer,
    back,
    reset,
    isDone,
    result,
  };
}
