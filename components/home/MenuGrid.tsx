import Link from "next/link";
import { Activity, FileText, AlertTriangle, BarChart2, Settings, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

const menuItems = [
  { href: "/monitoring", label: "Monitoring Real-Time", icon: Activity, color: "text-brand-500", bg: "bg-brand-50" },
  { href: "/bendungan", label: "Informasi Bendungan", icon: FileText, color: "text-brand-500", bg: "bg-brand-50" },
  { href: "/peringatan", label: "Peringatan Dini", icon: AlertTriangle, color: "text-status-awas", bg: "bg-danger-bg" },
  { href: "/grafik", label: "Grafik & Data", icon: BarChart2, color: "text-brand-500", bg: "bg-brand-50" },
  { href: "/operasi", label: "Operasi Waduk", icon: Settings, color: "text-brand-500", bg: "bg-brand-50" },
  { href: "/galeri", label: "Galeri & Wisata", icon: ImageIcon, color: "text-brand-500", bg: "bg-brand-50" },
];

export function MenuGrid() {
  return (
    <div className="px-4 lg:px-8 -mt-20 md:-mt-28 relative z-20">
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 max-w-content mx-auto">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link key={idx} href={item.href} className="group">
              <Card
                padding="sm"
                className="flex flex-col items-center justify-center text-center h-24 md:h-32 transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-md"
              >
                <div className={cn("p-2 rounded-xl mb-2", item.bg)}>
                  <Icon size={24} className={item.color} />
                </div>
                <span className="text-[10px] md:text-xs font-medium text-ink-900 leading-tight px-1">
                  {item.label}
                </span>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
