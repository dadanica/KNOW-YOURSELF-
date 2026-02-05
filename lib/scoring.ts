import { Agent, PercentTable, Question, ScoreTable, Scene, TopPair } from "./types";

export const AGENTS: Agent[] = ["BU", "CM", "TR", "BR", "SI", "HU", "BI"];
export const SCENES: Scene[] = ["INT", "TEAM", "SOC"];

export function emptyScore(): ScoreTable {
  return { BU: 0, CM: 0, TR: 0, BR: 0, SI: 0, HU: 0, BI: 0 };
}

export function cloneScore(s: ScoreTable): ScoreTable {
  return { ...s };
}

export function addScore(target: ScoreTable, agent: Agent, weight: number) {
  target[agent] = (target[agent] ?? 0) + weight;
}

export function scoreAnswer(
  q: Question,
  optionKey: "A" | "B" | "C" | "D",
  scoreAll: ScoreTable,
  scoreByScene: Record<Scene, ScoreTable>
) {
  const opt = q.options.find((o) => o.key === optionKey);
  if (!opt) throw new Error(`Option not found: ${q.id} ${optionKey}`);

  for (const s of opt.score) {
    addScore(scoreAll, s.agent, s.weight);
    addScore(scoreByScene[q.scene], s.agent, s.weight);
  }
}

export function toPercentTable(score: ScoreTable): PercentTable {
  const total = AGENTS.reduce((acc, a) => acc + (score[a] ?? 0), 0);

  // Edge safety
  if (total <= 0) {
    return { BU: 0, CM: 0, TR: 0, BR: 0, SI: 0, HU: 0, BI: 0 };
  }

  // Round to integers, ensure sum=100 via last-item correction.
  const pct: Partial<PercentTable> = {};
  let running = 0;

  for (let i = 0; i < AGENTS.length; i++) {
    const a = AGENTS[i];
    if (i === AGENTS.length - 1) {
      pct[a] = Math.max(0, 100 - running);
    } else {
      const raw = ((score[a] ?? 0) / total) * 100;
      const rounded = Math.max(0, Math.round(raw));
      pct[a] = rounded;
      running += rounded;
    }
  }

  // Fix any drift (rare)
  const sum = AGENTS.reduce((acc, a) => acc + (pct[a] ?? 0), 0);
  if (sum !== 100) {
    const last = AGENTS[AGENTS.length - 1];
    pct[last] = Math.max(0, (pct[last] ?? 0) + (100 - sum));
  }

  return pct as PercentTable;
}

export function topPairFromPercent(pct: PercentTable): TopPair {
  const sorted = [...AGENTS]
    .map((a) => ({ a, p: pct[a] ?? 0 }))
    .sort((x, y) => y.p - x.p);

  const top1 = sorted[0].a;
  const top2 = sorted[1].a;
  const top1Pct = sorted[0].p;
  const top2Pct = sorted[1].p;
  const delta = top1Pct - top2Pct;

  const isHybrid = delta <= 3;
  const isDominant = top1Pct >= 25 && delta >= 8;

  return { top1, top2, top1Pct, top2Pct, delta, isHybrid, isDominant };
}

export function typeKey(top1: Agent, top2: Agent): string {
  return `${top1}-${top2}`;
}
