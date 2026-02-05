"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Clock, Compass, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md mx-auto space-y-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="w-20 h-20 mx-auto rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground text-balance">
            探索你的内心世界
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
            通过精心设计的问题，发现你独特的行为风格，找到内心的平静与力量
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card rounded-3xl shadow-md p-6 border border-border/50 space-y-4"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-card-foreground text-sm">
                三种模式
              </h3>
              <p className="text-muted-foreground text-xs mt-1">
                24/36/48 题，根据你的时间灵活选择
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-card-foreground text-sm">
                多维分析
              </h3>
              <p className="text-muted-foreground text-xs mt-1">
                独处、团队、社交三大场景深度洞察
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-card-foreground text-sm">
                七种风格
              </h3>
              <p className="text-muted-foreground text-xs mt-1">
                发现你的主导与辅助行为模式组合
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3"
        >
          <Button
            asChild
            size="lg"
            className="w-full rounded-2xl h-14 text-base"
          >
            <Link href="/test?mode=36">开始标准测试</Link>
          </Button>
          <div className="flex gap-3">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="flex-1 rounded-2xl h-12 text-sm bg-transparent"
            >
              <Link href="/test?mode=24">快速 24 题</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="flex-1 rounded-2xl h-12 text-sm bg-transparent"
            >
              <Link href="/test?mode=48">完整 48 题</Link>
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-muted-foreground text-xs"
        >
          你的答案完全匿名，仅用于生成个人报告
        </motion.p>
      </div>
    </main>
  );
}
