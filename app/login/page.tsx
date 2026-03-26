"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
 
   const onSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);
     setError(null);
     try {
       const res = await fetch("/api/auth/login", {
         method: "POST",
         headers: { "content-type": "application/json" },
         body: JSON.stringify({ email, password }),
       });
       const data = await res.json();
       if (!res.ok || !data.ok) {
         setError("邮箱或密码不正确");
         return;
       }
       const from = searchParams.get("from") || "/account";
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
           <h1 className="text-2xl font-semibold text-foreground text-balance">
             用户登录
           </h1>
           <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
             登录后可在多设备查看自己的历史记录
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
               autoComplete="current-password"
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
             disabled={loading || !email || !password}
           >
             {loading ? "登录中..." : "登录"}
           </Button>
 
           <div className="text-center text-xs text-muted-foreground">
             没有账号？{" "}
             <Link href="/register" className="text-primary hover:underline">
               去注册
             </Link>
           </div>
         </motion.form>
       </div>
     </main>
   );
 }
