// src/core/ui/Badge.tsx
import React from "react";
import { cn } from "../lib/utils";

interface BadgeProps {
  variant?: "lowRisk" | "midRisk" | "highRisk" | "info" | "accent";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "info",
  children,
  className,
}) => {
  const styles = {
    lowRisk: "bg-[#2F855A]/15 text-[#2F855A] border border-[#2F855A]/30",
    midRisk: "bg-[#B7791F]/15 text-[#B7791F] border border-[#B7791F]/30",
    highRisk: "bg-[#C53030]/15 text-[#C53030] border border-[#C53030]/30",
    info: "bg-[#DCEEFA] text-[#0B3D66] border border-[#0B3D66]/20",
    accent:
      "bg-[#E8A94C]/20 text-[#16232E] border border-[#E8A94C]/50 font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-[var(--radius-badge)]",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};
