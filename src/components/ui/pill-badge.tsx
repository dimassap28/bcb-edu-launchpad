import React from "react"
import { cn } from "@/lib/utils"

export interface PillBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
}

export function PillBadge({ icon, children, className, ...props }: PillBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-6",
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </div>
  )
}
