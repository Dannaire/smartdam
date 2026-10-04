"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface FlowChartProps {
  data: { time: string; inflow: number; outflow: number }[];
}

export default function FlowChart({ data }: FlowChartProps) {
  return (
    <div className="w-full h-64 md:h-80 lg:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: '1px solid #E4E7EC', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
          <Line 
            type="monotone" 
            dataKey="inflow" 
            name="Inflow (m³/s)" 
            stroke="#2F80ED" 
            strokeWidth={3} 
            dot={false}
            activeDot={{ r: 6 }} 
          />
          <Line 
            type="monotone" 
            dataKey="outflow" 
            name="Outflow (m³/s)" 
            stroke="#F08A24" 
            strokeWidth={3} 
            dot={false}
            activeDot={{ r: 6 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
