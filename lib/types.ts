// 此文件由用户手动提供
// This file will be provided by the user

export type Agent = "BU" | "CM" | "TR" | "BR" | "SI" | "HU" | "BI";
export type Scene = "INT" | "TEAM" | "SOC";
export type Kind = "ACTION" | "ALLOC" | "FRICTION" | "THREAT";
export type OptionKey = "A" | "B" | "C" | "D";

export interface OptionScore {
  agent: Agent;
  weight: number;
}

export interface QuestionOption {
  key: OptionKey;
  text: string;
  score: [OptionScore, OptionScore];
}

export interface Question {
  id: string;
  scene: Scene;
  kind: Kind;
  text: string;
  options: QuestionOption[];
}

export type ScoreTable = Record<Agent, number>;
export type PercentTable = Record<Agent, number>;

export interface TopPair {
  top1: Agent;
  top2: Agent;
  top1Pct: number;
  top2Pct: number;
  delta: number;
  isHybrid: boolean;
  isDominant: boolean;
}

export interface ResultPack {
  mode: 24 | 36 | 48;

  pctAll: PercentTable;
  pctINT: PercentTable;
  pctTEAM: PercentTable;
  pctSOC: PercentTable;

  topAll: TopPair;
  topINT: TopPair;
  topTEAM: TopPair;
  topSOC: TopPair;

  typeKey: string;
  typeName: string;

  createdAtISO: string;
}

export type TestMode = 24 | 36 | 48;
