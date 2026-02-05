"use client";

import * as React from "react";
import type { ResultPack } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { buildInsight, type InsightCardId } from "@/lib/agentProfiles";

export function InsightModal({
  open,
  onOpenChange,
  cardId,
  result,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  cardId: InsightCardId;
  result: ResultPack;
}) {
  const content = React.useMemo(
    () => buildInsight(result, cardId),
    [result, cardId]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[720px] max-h-[85vh] rounded-3xl p-0 overflow-hidden">
        <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(85vh-2rem)]">
          <DialogHeader>
            <DialogTitle className="text-lg tracking-tight">
              {content.title}
            </DialogTitle>
            {content.subtitle ? (
              <DialogDescription className="text-xs">
                {content.subtitle}
              </DialogDescription>
            ) : null}
          </DialogHeader>

          {content.lead ? (
            <div className="rounded-2xl bg-muted/40 p-4 text-sm leading-6 shadow-sm">
              {content.lead}
            </div>
          ) : null}

          <div className="space-y-3">
            {content.sections.map((sec, idx) => (
              <section
                key={idx}
                className="rounded-2xl border bg-background p-4 shadow-sm"
              >
                <div className="font-medium mb-2">{sec.title}</div>
                <ul className="list-disc pl-5 space-y-1 text-sm leading-6 text-foreground/90">
                  {sec.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {content.cta ? (
            <div className="text-sm text-muted-foreground pt-1">
              {content.cta}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
