"use client"

import { Button } from "@/components/ui/button"
import { Lock, Unlock } from "lucide-react"

interface MaintainAspectRatioProps {
  maintainAspectRatio: boolean
  toggleAspectRatio: () => void
  originalWidth: number | null
  originalHeight: number | null
  resetDimensions: () => void
  disabled?: boolean
}

export function MaintainAspectRatio({
  maintainAspectRatio,
  toggleAspectRatio,
  originalWidth,
  originalHeight,
  resetDimensions,
  disabled = false,
}: MaintainAspectRatioProps) {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleAspectRatio}
          className="mr-2"
          title={maintainAspectRatio ? "Unlock aspect ratio" : "Lock aspect ratio"}
          disabled={disabled}
        >
          {maintainAspectRatio ? <Lock className="h-4 w-4 text-primary" /> : <Unlock className="h-4 w-4" />}
        </Button>
        <span className="text-sm font-medium">{maintainAspectRatio ? "Maintain aspect ratio" : "Free resize"}</span>
      </div>
      {originalWidth && originalHeight && (
        <Button variant="outline" size="sm" onClick={resetDimensions} disabled={disabled}>
          Reset to Original
        </Button>
      )}
    </div>
  )
}
