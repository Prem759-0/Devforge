'use client';

import React from 'react';
import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface BarChartProps {
  data: Array<Record<string, unknown>>;
  dataKey: string;
  color: string;
  height?: number;
  xAxisKey?: string;
}

export function BarChart({ data, dataKey, color, height = 300, xAxisKey = 'name' }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBar data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 16%)" />
        <XAxis dataKey={xAxisKey} tick={{ fontSize: 11, fill: 'hsl(220 15% 50%)' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: 'hsl(220 15% 50%)' }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ backgroundColor: 'hsl(220 15% 10%)', border: '1px solid hsl(220 15% 20%)', borderRadius: '8px' }} />
        <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
      </RechartsBar>
    </ResponsiveContainer>
  );
}
