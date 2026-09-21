// src/core/ui/Card.tsx
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
  subtitle,
  action,
}) => {
  return (
    <div
      className={`bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs transition-shadow ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div>
            {title && (
              <h2 className="text-base font-bold text-[#0F172A]">{title}</h2>
            )}
            {subtitle && (
              <p className="text-xs text-[#475569] mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
