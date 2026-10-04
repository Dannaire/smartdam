// components/ui/Tabs.tsx — Tab pill style (PRD §5.3 & §11)
"use client";

import { cn } from "@/lib/utils";

interface TabItem {
  value: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tabs({ items, value, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-brand-50 rounded-xl p-1 overflow-x-auto scrollbar-hide",
        className
      )}
      role="tablist"
      aria-label="Tab navigasi"
    >
      {items.map((item) => (
        <button
          key={item.value}
          role="tab"
          aria-selected={value === item.value}
          id={`tab-${item.value}`}
          aria-controls={`tabpanel-${item.value}`}
          onClick={() => onChange(item.value)}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
            value === item.value
              ? "bg-brand-800 text-white shadow-sm"
              : "text-ink-500 hover:text-ink-900 hover:bg-white"
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
