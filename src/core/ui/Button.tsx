import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors min-h-[44px] px-4 py-2 text-sm focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary:
      "bg-[#2563EB] text-white hover:bg-blue-700 active:bg-blue-800 border border-transparent shadow-xs",
    secondary:
      "bg-[#F1F5F9] text-[#0F172A] hover:bg-slate-200 active:bg-slate-300 border border-transparent",
    outline:
      "bg-transparent text-[#0F172A] border border-[#E2E8F0] hover:bg-slate-100",
    danger:
      "bg-[#FEE2E2] text-[#991B1B] border border-[#991B1B]/20 hover:bg-red-200",
    success:
      "bg-[#DCFCE7] text-[#15803D] border border-[#15803D]/20 hover:bg-emerald-200",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 min-h-[38px]",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-5 py-3",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
          <span>Carregando...</span>
        </>
      ) : (
        <>
          {icon && (
            <span
              className="mr-2 flex items-center shrink-0"
              aria-hidden="true"
            >
              {icon}
            </span>
          )}
          {children}
        </>
      )}
    </button>
  );
};
