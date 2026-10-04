import { Card } from "@/components/ui/Card";
import { CloudRain, Wind, Thermometer, Droplets } from "lucide-react";
import { mockWeather } from "@/data/mock-instruments";
import { formatRelativeTime } from "@/lib/format";

export function WeatherPanel() {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-ink-900">Cuaca Terkini</h3>
        <span className="text-xs text-ink-500">Update {formatRelativeTime(mockWeather.updatedAt)}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Thermometer size={20} />
          </div>
          <div>
            <p className="text-xs text-ink-500">Suhu</p>
            <p className="font-semibold text-ink-900">{mockWeather.temperature} °C</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 text-green-600 rounded-lg">
            <Droplets size={20} />
          </div>
          <div>
            <p className="text-xs text-ink-500">Kelembapan</p>
            <p className="font-semibold text-ink-900">{mockWeather.humidity} %</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 text-gray-600 rounded-lg">
            <Wind size={20} />
          </div>
          <div>
            <p className="text-xs text-ink-500">Angin</p>
            <p className="font-semibold text-ink-900">{mockWeather.windSpeed} km/j</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
             <CloudRain size={20} />
           </div>
           <div>
             <p className="text-xs text-ink-500">Kondisi</p>
             <p className="font-semibold text-ink-900">Hujan Ringan</p>
           </div>
        </div>
      </div>
    </Card>
  );
}
