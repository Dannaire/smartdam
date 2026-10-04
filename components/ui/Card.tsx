// components/ui/Card.tsx — Kartu dasar (PRD §5.3)
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({ className, padding = "md", children, ...props }: CardProps) {
  const paddingMap = {
    none: "p-0",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-line shadow-sm",
        paddingMap[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
