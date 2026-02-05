'use client'

import { Progress } from '@/components/ui/progress'

interface TestProgressProps {
  progress: number
  current: number
  total: number
}

export function TestProgress({ progress, current, total }: TestProgressProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
        <span>问题进度</span>
        <span>
          {current + 1} / {total}
        </span>
      </div>
      <Progress value={progress} className="h-2 bg-secondary" />
    </div>
  )
}
