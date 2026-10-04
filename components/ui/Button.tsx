// components/ui/Button.tsx — Tombol utama (PRD §5.3)
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const variantMap = {
    primary:
      "bg-brand-800 text-white hover:bg-brand-600 active:bg-brand-900 disabled:opacity-50",
    secondary:
      "bg-brand-50 text-brand-800 border border-brand-100 hover:bg-brand-100 active:bg-brand-100",
    ghost: "text-brand-800 hover:bg-brand-50 active:bg-brand-100",
    danger: "bg-status-awas text-white hover:opacity-90 active:opacity-80",
  };

  const sizeMap = {
    sm: "h-8 px-3 text-sm",
    md: "h-11 px-4 text-sm font-medium",
    lg: "h-12 px-6 text-base font-medium",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium",
        "transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        "disabled:pointer-events-none",
        variantMap[variant],
        sizeMap[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
