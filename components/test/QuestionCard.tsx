"use client";

import { motion } from "framer-motion";
import type { Question, OptionKey } from "@/lib/types";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  onAnswer: (optionKey: OptionKey) => void;
}

export function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-card rounded-3xl shadow-md p-8 border border-border/50">
        <h2 className="text-lg font-medium text-card-foreground text-center mb-8 leading-relaxed text-balance">
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.button
              key={option.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              onClick={() => onAnswer(option.key)}
              className={cn(
                "w-full text-left p-4 rounded-2xl",
                "bg-secondary/50 hover:bg-primary/10",
                "border border-transparent hover:border-primary/30",
                "transition-all duration-300 ease-out",
                "text-card-foreground text-sm leading-relaxed",
                "active:scale-[0.98]"
              )}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium mr-3">
                {option.key}
              </span>
              {option.text}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
