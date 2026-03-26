"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (data?.error === "EMAIL_EXISTS") setError("该邮箱已注册");
        else setError("注册失败，请检查输入");
        return;
      }
      router.replace("/account");
    } catch {
      setError("注册失败，请稍后重试");
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
          <h1 className="text-2xl font-semibold text-foreground text-balance">
            创建账号
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
            用邮箱注册，密码将以哈希方式安全存储
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card rounded-3xl shadow-md p-6 border border-border/50 space-y-4"
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-card-foreground">
              邮箱
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-2xl border border-border bg-background text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              placeholder="name@example.com"
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-card-foreground">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 rounded-2xl border border-border bg-background text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              placeholder="至少 6 位"
              autoComplete="new-password"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500" aria-live="polite">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full rounded-2xl h-10 text-sm"
            disabled={loading || !email || password.length < 6}
          >
            {loading ? "创建中..." : "注册并登录"}
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            已有账号？{" "}
            <Link href="/login" className="text-primary hover:underline">
              去登录
            </Link>
          </div>
        </motion.form>
      </div>
    </main>
  );
}
