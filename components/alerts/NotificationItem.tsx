import { AlertItem } from "@/types";
import { formatDateWIB, formatRelativeTime } from "@/lib/format";
import { getAlertIcon, getAlertConfig } from "@/lib/alert-level";
import { Info, Activity } from "lucide-react";

interface NotificationItemProps {
  item: AlertItem;
}

export function NotificationItem({ item }: NotificationItemProps) {
  let Icon = Info;
  let bgClass = "bg-brand-50";
  let textClass = "text-brand-600";

  if (item.kind === "peringatan") {
    Icon = getAlertIcon(item.level);
    const config = getAlertConfig(item.level);
    bgClass = config.bg;
    textClass = config.color;
  } else if (item.kind === "operasi") {
    Icon = Activity;
    bgClass = "bg-blue-50";
    textClass = "text-blue-600";
  }

  return (
    <div className={`p-4 rounded-xl border flex gap-4 items-start transition-colors ${item.read ? 'bg-white border-line' : 'bg-brand-50/30 border-brand-200'}`}>
      <div className={`p-2 rounded-full flex-shrink-0 ${bgClass} ${textClass}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className={`text-sm font-semibold truncate ${item.read ? 'text-ink-900' : 'text-brand-900'}`}>
            {item.title}
          </h4>
          <span className="text-[10px] text-ink-500 whitespace-nowrap ml-2 flex-shrink-0 mt-0.5">
            {formatRelativeTime(item.createdAt)}
          </span>
        </div>
        <p className={`text-sm leading-relaxed ${item.read ? 'text-ink-500' : 'text-ink-700'}`}>
          {item.message}
        </p>
        <span className="text-[10px] text-ink-500 mt-2 block font-medium">
           {formatDateWIB(item.createdAt)}
        </span>
      </div>
      {!item.read && (
         <div className="w-2 h-2 rounded-full bg-brand-600 flex-shrink-0 mt-2" />
      )}
    </div>
  );
}
