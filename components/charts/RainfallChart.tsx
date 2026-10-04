"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface RainfallChartProps {
  data: { time: string; value: number }[];
}

export default function RainfallChart({ data }: RainfallChartProps) {
  return (
    <div className="w-full h-64 md:h-80 lg:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E7EC" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12, fill: "#667085" }} 
            tickLine={false} 
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "#667085" }} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(47, 128, 237, 0.1)' }}
            contentStyle={{ borderRadius: '12px', border: '1px solid #E4E7EC', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="value" fill="#2F80ED" radius={[4, 4, 0, 0]} name="Curah Hujan (mm)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
