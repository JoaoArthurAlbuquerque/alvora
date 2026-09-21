import React from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { RiskLevel } from "../../types";

interface BadgeProps {
  level?: RiskLevel | "NEUTRO" | "SUCESSO";
  text: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  level = "NEUTRO",
  text,
  className = "",
}) => {
  const config = {
    BAIXO: {
      bg: "bg-[#DCFCE7]",
      text: "text-[#166534]",
      border: "border-[#166534]/30",
      Icon: CheckCircle2,
    },
    SUCESSO: {
      bg: "bg-[#DCFCE7]",
      text: "text-[#166534]",
      border: "border-[#166534]/30",
      Icon: CheckCircle2,
    },
    MEDIO: {
      bg: "bg-[#FEF9C3]",
      text: "text-[#854D0E]",
      border: "border-[#854D0E]/30",
      Icon: AlertTriangle,
    },
    ALTO: {
      bg: "bg-[#FEE2E2]",
      text: "text-[#991B1B]",
      border: "border-[#991B1B]/30",
      Icon: AlertCircle,
    },
    NEUTRO: {
      bg: "bg-slate-100",
      text: "text-slate-700",
      border: "border-slate-300",
      Icon: Info,
    },
  };

  const selected = config[level] || config.NEUTRO;
  const { Icon } = selected;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${selected.bg} ${selected.text} ${selected.border} ${className}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{text}</span>
    </span>
  );
};
