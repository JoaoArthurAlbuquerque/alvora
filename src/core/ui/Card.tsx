// src/core/ui/Card.tsx
import React from "react";
import { cn } from "../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "highlight" | "standard" | "flat";
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = "standard",
  className,
  children,
  ...props
}) => {
  const variants = {
    highlight:
      "bg-white border-2 border-[#E8A94C] rounded-[var(--radius-card)] p-6 shadow-xs",
    standard:
      "bg-white border border-[#16232E]/12 rounded-[var(--radius-card)] p-5 shadow-2xs",
    flat: "bg-[#FAF7F2] border-b border-[#16232E]/10 rounded-[var(--radius-flat)] p-4",
  };

  return (
    <div className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
};
