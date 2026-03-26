"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError("密码不正确");
        return;
      }
      const from = searchParams.get("from") || "/admin";
      router.replace(from);
    } catch {
      setError("登录失败，请稍后重试");
    } finally {
      setLoading(false);
    }
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
            <span className="text-2xl font-semibold text-primary">Admin</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground text-balance">
            管理员登录
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
            仅限内部使用，用于查看和分析测试数据
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card rounded-3xl shadow-md p-6 border border-border/50 space-y-4"
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-card-foreground">
              管理员密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 rounded-2xl border border-border bg-background text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              placeholder="请输入密码"
            />
          </div>
          {error && (
            <p className="text-xs text-red-500 mt-1" aria-live="polite">
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="w-full rounded-2xl h-10 text-sm"
            disabled={loading || !password}
          >
            {loading ? "登录中..." : "登录"}
          </Button>
        </motion.form>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-dvh flex items-center justify-center px-6 py-12">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}

