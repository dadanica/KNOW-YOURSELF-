'use client'

import { Progress } from '@/components/ui/progress'

interface TestProgressProps {
  progress: number
  current: number
  total: number
}

export function TestProgress({ progress, current, total }: TestProgressProps) {
  const displayCurrent = Math.min(current + 1, total)
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
        <span>问题进度</span>
        <span>
          {displayCurrent} / {total}
        </span>
      </div>
      <Progress value={progress} className="h-2 bg-secondary" />
    </div>
  )
}
