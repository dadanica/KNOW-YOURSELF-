"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { ResultPack } from "@/lib/types";

interface AdminResultItem {
  id: string;
  createdAt: string;
  mode: number;
  typeKey: string;
  typeName: string;
  createdAtISO: string;
  resultJson: ResultPack;
}

export default function AdminDashboardPage() {
  const [items, setItems] = useState<AdminResultItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    void fetch("/api/admin/results")
      .then((r) => r.json())
      .then((j) => {
        if (j.ok && Array.isArray(j.data)) {
          setItems(j.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              管理员后台
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              查看最近的测试记录（每位用户保留一条最新记录）
            </p>
          </div>
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-primary"
          >
            返回首页
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="bg-card rounded-3xl shadow-md p-6 border border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-card-foreground">
              测试记录
            </span>
            <Button
              size="sm"
              variant="outline"
              className="rounded-2xl h-8 text-xs"
              onClick={() => {
                setLoading(true);
                void fetch("/api/admin/results")
                  .then((r) => r.json())
                  .then((j) => {
                    if (j.ok && Array.isArray(j.data)) setItems(j.data);
                  })
                  .finally(() => setLoading(false));
              }}
            >
              刷新
            </Button>
          </div>

          {loading ? (
            <div className="py-8 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <p className="text-xs text-muted-foreground py-4 text-center">
              暂无记录
            </p>
          ) : (
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-border/60 bg-background/60 px-4 py-3 flex justify-between items-center text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-medium text-card-foreground">
                      {item.typeName}{" "}
                      <span className="text-[11px] text-muted-foreground">
                        ({item.typeKey})
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      模式：{item.mode} 题
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      创建时间：{new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}

