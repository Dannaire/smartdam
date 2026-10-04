// components/layout/PageContainer.tsx — Wrapper konten halaman dengan padding & max-width
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function PageContainer({
  children,
  className,
  noPadding = false,
}: PageContainerProps) {
  return (
    <main
      style={{ paddingBottom: '160px' }}
      className={cn(
        "min-h-screen bg-brand-50",
        "lg:pb-8",
        !noPadding && "px-4 lg:px-6 py-4 lg:py-6",
        className
      )}
    >
      <div className="max-w-content mx-auto">{children}</div>
    </main>
  );
}
