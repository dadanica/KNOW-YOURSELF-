"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  PolarRadiusAxis,
} from "recharts";
import type { PercentTable, Agent } from "@/lib/types";

interface ResultChartProps {
  pctTable: PercentTable;
}

const agentLabels: Record<Agent, string> = {
  BU: "开拓者",
  CM: "策划者",
  TR: "执行者",
  BR: "突破者",
  SI: "思考者",
  HU: "守护者",
  BI: "联结者",
};

export function ResultChart({ pctTable }: ResultChartProps) {
  const chartData = (Object.keys(agentLabels) as Agent[]).map((agent) => ({
    agent: agentLabels[agent],
    value: pctTable[agent],
    fullMark: 100,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="65%">
          <PolarGrid stroke="var(--border)" strokeOpacity={0.6} />
          <PolarAngleAxis
            dataKey="agent"
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 40]}
            tick={false}
            axisLine={false}
          />
          <Radar
            dataKey="value"
            stroke="var(--primary)"
            fill="var(--primary)"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
