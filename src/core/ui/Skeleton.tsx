// src/core/ui/Skeleton.tsx
import React from "react";
import { cn } from "../lib/utils";

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-[#16232E]/10 rounded-[var(--radius-control)]",
        className,
      )}
    />
  );
};
