// src/core/ui/Button.tsx
import React from "react";
import { cn } from "../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3D66] disabled:opacity-50 disabled:pointer-events-none rounded-[var(--radius-control)]";

  const variants = {
    primary: "bg-[#0B3D66] text-white hover:bg-[#1E6FA3] active:bg-[#082D4B]",
    secondary:
      "bg-[#DCEEFA] text-[#0B3D66] hover:bg-[#C2E2F7] active:bg-[#A9D5F4]",
    outline:
      "border border-[#16232E]/20 bg-transparent text-[#16232E] hover:bg-[#FAF7F2]",
    ghost: "bg-transparent text-[#16232E] hover:bg-[#DCEEFA]/50",
    danger: "bg-[#C53030] text-white hover:bg-[#9B2C2C]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  return (
    <button
      className={cn(baseStyle, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
