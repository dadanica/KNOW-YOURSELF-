"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

export function ClickableCard({
  title,
  subtitle,
  onOpen,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  onOpen: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "w-full text-left rounded-3xl border bg-background shadow-sm hover:shadow-md transition-shadow",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
    >
      <div className="p-5 flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold tracking-tight">{title}</div>
          {subtitle ? <div className="text-xs text-muted-foreground mt-1">{subtitle}</div> : null}
        </div>
        <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-1 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5" />
          详情
        </span>
      </div>
      <div className="px-5 pb-5">{children}</div>
    </button>
  );
}
