"use client";

import { motion } from "framer-motion";
import type { ResultPack, Agent, Scene } from "@/lib/types";
import { AGENT, buildComboProfile } from "@/lib/agentProfiles";
import { ResultChart } from "./ResultChart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, AlertCircle, Zap, Lightbulb, Users, TrendingUp, TrendingDown, BookOpen, Radar as RadarIcon, Layers, MapPin, ChevronRight } from "lucide-react";
import { ClickableCard } from "@/components/ui/clickable-card";
import { InsightModal } from "./InsightModal";
import type { InsightCardId } from "@/lib/agentProfiles";
import { useState } from "react";

interface ResultCardProps {
  result: ResultPack;
}

const sceneLabels: Record<Scene, string> = {
  INT: "独处时",
  TEAM: "团队中",
  SOC: "社交中",
};

export function ResultCard({ result }: ResultCardProps) {
  const { topAll, topINT, topTEAM, topSOC } = result;
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<InsightCardId>("type");

  const openInsight = (cardId: InsightCardId) => {
    setActiveCard(cardId);
    setModalOpen(true);
  };

  const primaryAgent = AGENT[topAll.top1];
  const secondaryAgent = AGENT[topAll.top2];
  const comboProfile = buildComboProfile(topAll.top1, topAll.top2);

  const sceneData: { scene: Scene; top: typeof topAll; label: string }[] = [
    { scene: "INT", top: topINT, label: "独处时" },
    { scene: "TEAM", top: topTEAM, label: "团队中" },
    { scene: "SOC", top: topSOC, label: "社交中" },
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      {/* Main Type Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-3xl shadow-md p-8 border border-border/50 text-center"
      >
        <p className="text-muted-foreground text-sm mb-2">你的类型是</p>
        <h1 className="text-3xl font-bold text-primary mb-2">
          {result.typeName}
        </h1>
        <p className="text-muted-foreground text-sm mb-4">{result.typeKey}</p>

        <div className="flex justify-center gap-3 mb-6">
          <Badge
            variant="secondary"
            className="rounded-full px-4 py-1.5 text-sm bg-primary/10 text-primary border-0"
          >
            {primaryAgent.nameCN} {topAll.top1Pct}%
          </Badge>
          <Badge
            variant="secondary"
            className="rounded-full px-4 py-1.5 text-sm bg-secondary text-secondary-foreground border-0"
          >
            {secondaryAgent.nameCN} {topAll.top2Pct}%
          </Badge>
        </div>

        {topAll.isHybrid && (
          <p className="text-xs text-muted-foreground bg-accent/50 rounded-full px-3 py-1 inline-block">
            融合型：两种特质均衡发展
          </p>
        )}
        {topAll.isDominant && (
          <p className="text-xs text-muted-foreground bg-accent/50 rounded-full px-3 py-1 inline-block">
            主导型：主要特质非常突出
          </p>
        )}
      </motion.div>

      {/* Essence Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="bg-card rounded-3xl shadow-md p-6 border border-border/50"
      >
        <p className="text-base text-card-foreground leading-relaxed text-center">
          {primaryAgent.essence}
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {primaryAgent.keywords.map((keyword) => (
            <Badge
              key={keyword}
              variant="outline"
              className="rounded-full text-xs border-primary/30 text-primary bg-primary/5"
            >
              {keyword}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Combo Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card rounded-3xl shadow-md p-6 border border-border/50"
      >
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-primary" />
          <h2 className="text-base font-medium text-card-foreground">
            组合特质
          </h2>
        </div>
        <p className="text-sm text-card-foreground leading-relaxed mb-4 p-3 bg-primary/5 rounded-2xl">
          {comboProfile.oneLiner}
        </p>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm font-medium text-card-foreground">组合优势</span>
            </div>
            <div className="space-y-1.5">
              {comboProfile.advantages.map((adv, i) => (
                <p key={i} className="text-xs text-muted-foreground leading-relaxed pl-3 border-l-2 border-primary/30">
                  {adv}
                </p>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-sm font-medium text-card-foreground">潜在风险</span>
            </div>
            <div className="space-y-1.5">
              {comboProfile.risks.map((risk, i) => (
                <p key={i} className="text-xs text-muted-foreground leading-relaxed pl-3 border-l-2 border-amber-300">
                  {risk}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-secondary/50 rounded-xl">
              <p className="text-xs font-medium text-card-foreground mb-1.5">主核更强时</p>
              {comboProfile.howItShowsWhenAHigh.map((item, i) => (
                <p key={i} className="text-xs text-muted-foreground leading-relaxed">{item}</p>
              ))}
            </div>
            <div className="p-3 bg-secondary/50 rounded-xl">
              <p className="text-xs font-medium text-card-foreground mb-1.5">副核更强时</p>
              {comboProfile.howItShowsWhenBHigh.map((item, i) => (
                <p key={i} className="text-xs text-muted-foreground leading-relaxed">{item}</p>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs font-medium text-card-foreground mb-2">协同建议</p>
            <div className="space-y-1.5">
              {comboProfile.tips.map((tip, i) => (
                <p key={i} className="text-xs text-muted-foreground leading-relaxed pl-3 border-l-2 border-primary/20">
                  {tip}
                </p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Radar Chart Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <ClickableCard
          title="综合维度分析"
          subtitle="点击查看雷达图解读"
          onOpen={() => openInsight("radar")}
        >
          <ResultChart pctTable={result.pctAll} />
        </ClickableCard>
      </motion.div>

      {/* Strengths Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-3xl shadow-md p-6 border border-border/50"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <h2 className="text-base font-medium text-card-foreground">
            你的优势
          </h2>
        </div>
        <div className="space-y-2">
          {primaryAgent.strengths.map((strength, i) => (
            <div
              key={i}
              className="p-3 bg-primary/5 rounded-2xl text-sm text-card-foreground leading-relaxed"
            >
              {strength}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Blindspots Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-card rounded-3xl shadow-md p-6 border border-border/50"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <h2 className="text-base font-medium text-card-foreground">
            盲区提醒
          </h2>
        </div>
        <div className="space-y-2">
          {primaryAgent.blindspots.map((blindspot, i) => (
            <div
              key={i}
              className="p-3 bg-amber-50 rounded-2xl text-sm text-card-foreground leading-relaxed"
            >
              {blindspot}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Triggers Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card rounded-3xl shadow-md p-6 border border-border/50"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-red-400" />
          <h2 className="text-base font-medium text-card-foreground">
            触发点
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {primaryAgent.triggers.map((trigger, i) => (
            <Badge
              key={i}
              variant="outline"
              className="rounded-full text-sm border-red-200 text-red-600 bg-red-50"
            >
              {trigger}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Fixes Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="bg-card rounded-3xl shadow-md p-6 border border-border/50"
      >
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-4 h-4 text-primary" />
          <h2 className="text-base font-medium text-card-foreground">
            行动建议
          </h2>
        </div>
        <div className="space-y-2">
          {primaryAgent.fixes.map((fix, i) => (
            <div
              key={i}
              className="p-3 bg-secondary/50 rounded-2xl text-sm text-card-foreground leading-relaxed flex items-start gap-2"
            >
              <span className="text-primary font-medium shrink-0">{i + 1}.</span>
              <span>{fix}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scene Analysis Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ClickableCard
          title="场景表现"
          subtitle="点击查看详细场景分析"
          onOpen={() => openInsight("scenes")}
        >
          <div className="space-y-4">
            {sceneData.map(({ scene, top, label }) => {
              const sceneAgent = AGENT[top.top1];
              return (
                <div key={scene} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-card-foreground">
                      {label}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="rounded-full text-xs border-primary/30 text-primary"
                      >
                        {AGENT[top.top1].nameCN}
                      </Badge>
                      <span className="text-xs text-muted-foreground">+</span>
                      <Badge
                        variant="outline"
                        className="rounded-full text-xs border-border"
                      >
                        {AGENT[top.top2].nameCN}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {sceneAgent.scenes[scene].slice(0, 1).map((desc, i) => (
                      <p
                        key={i}
                        className="text-xs text-muted-foreground leading-relaxed pl-3 border-l-2 border-primary/20"
                      >
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </ClickableCard>
      </motion.div>

      {/* Secondary Agent Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="bg-card rounded-3xl shadow-md p-6 border border-border/50"
      >
        <h2 className="text-base font-medium text-card-foreground mb-3">
          辅助特质：{secondaryAgent.nameCN}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {secondaryAgent.essence}
        </p>
        <div className="flex flex-wrap gap-2">
          {secondaryAgent.keywords.map((keyword) => (
            <Badge
              key={keyword}
              variant="outline"
              className="rounded-full text-xs border-border text-muted-foreground"
            >
              {keyword}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Deep Insight Triggers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-card rounded-3xl shadow-md p-5 border border-border/50"
      >
        <h2 className="text-base font-medium text-card-foreground mb-4">
          深度解读
        </h2>
        <div className="space-y-2">
          {[
            { id: "type" as const, icon: BookOpen, title: "类型详解", subtitle: "了解你的组合特质如何运作" },
            { id: "traits" as const, icon: Layers, title: "核心特质深解", subtitle: "主核与副核的完整档案" },
            { id: "radar" as const, icon: RadarIcon, title: "雷达图怎么读", subtitle: "理解你的能力分布与补分策略" },
            { id: "scenes" as const, icon: MapPin, title: "场景表现详解", subtitle: "不同情境下你会如何换挡" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openInsight(item.id)}
              className="w-full flex items-center gap-3 p-3 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <item.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      </motion.div>

      <InsightModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        cardId={activeCard}
        result={result}
      />

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="flex gap-3 pt-2 pb-8"
      >
        <Button
          asChild
          variant="outline"
          className="flex-1 rounded-2xl h-12 bg-transparent"
        >
          <Link href="/">返回首页</Link>
        </Button>
        <Button asChild className="flex-1 rounded-2xl h-12">
          <Link href="/test?mode=24">再测一次</Link>
        </Button>
      </motion.div>
    </div>
  );
}
