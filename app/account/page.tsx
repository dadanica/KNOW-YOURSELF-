"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type MeResp = { ok: true; user: { id: string; email: string } | null };

export default function AccountPage() {
  const [me, setMe] = useState<MeResp["user"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    void fetch("/api/auth/me")
      .then((r) => r.json() as Promise<MeResp>)
      .then((j) => setMe(j.user))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setMe(null);
  };

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="w-20 h-20 mx-auto rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
            <span className="text-2xl font-semibold text-primary">账号</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground text-balance">
            我的账号
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
            {loading ? "加载中..." : me ? `已登录：${me.email}` : "未登录"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card rounded-3xl shadow-md p-6 border border-border/50 space-y-3"
        >
          <Button asChild className="w-full rounded-2xl h-10 text-sm">
            <Link href="/record">查看历史记录</Link>
          </Button>

          {!me ? (
            <div className="flex gap-3">
              <Button
                asChild
                variant="outline"
                className="flex-1 rounded-2xl h-10 text-sm bg-transparent"
              >
                <Link href="/login">登录</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 rounded-2xl h-10 text-sm bg-transparent"
              >
                <Link href="/register">注册</Link>
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full rounded-2xl h-10 text-sm bg-transparent"
              onClick={logout}
            >
              退出登录
            </Button>
          )}

          <Button
            asChild
            variant="ghost"
            className="w-full rounded-2xl h-9 text-xs text-muted-foreground hover:text-primary"
          >
            <Link href="/">返回首页</Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
