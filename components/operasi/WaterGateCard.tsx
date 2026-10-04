import { Card } from "@/components/ui/Card";
import { Lock, Unlock, AlertTriangle } from "lucide-react";

interface WaterGateProps {
  id: string;
  name: string;
  type: "spillway" | "intake";
  status: "terbuka" | "tertutup" | "rusak";
  openingPercent: number;
}

export function WaterGateCard({ name, type, status, openingPercent }: WaterGateProps) {
  const isBroken = status === "rusak";
  const isOpen = status === "terbuka";

  return (
    <Card className={`p-4 border-l-4 ${isBroken ? 'border-l-status-awas' : isOpen ? 'border-l-brand-500' : 'border-l-ink-300'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-ink-900 mb-1">{name}</h4>
          <span className="text-xs text-ink-500 uppercase tracking-wider">{type}</span>
        </div>
        <div className={`p-2 rounded-full ${isBroken ? 'bg-danger-bg text-status-awas' : isOpen ? 'bg-brand-50 text-brand-600' : 'bg-ink-100 text-ink-500'}`}>
          {isBroken ? <AlertTriangle size={18} /> : isOpen ? <Unlock size={18} /> : <Lock size={18} />}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between text-xs mb-1">
           <span className="text-ink-600 font-medium">Bukaan Pintu</span>
           <span className="font-bold text-ink-900">{openingPercent}%</span>
        </div>
        <div className="w-full bg-ink-100 rounded-full h-2">
           <div 
             className={`h-2 rounded-full ${isBroken ? 'bg-status-awas' : 'bg-brand-500'}`} 
             style={{ width: `${openingPercent}%` }}
           />
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-line">
         <span className={`text-xs font-semibold ${isBroken ? 'text-status-awas' : isOpen ? 'text-brand-600' : 'text-ink-500'}`}>
            Status: {status.toUpperCase()}
         </span>
      </div>
    </Card>
  );
}
