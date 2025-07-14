"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartPoint } from "@/types/crypto";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

interface CryptoChartProps {
  data: ChartPoint[];
}

export function CryptoChart({ data }: CryptoChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-60 sm:h-80 flex items-center justify-center text-muted-foreground text-sm sm:text-base">
        No chart data available
      </div>
    );
  }

  // Determine trend color based on first and last price
  const firstPrice = data[0]?.price || 0;
  const lastPrice = data[data.length - 1]?.price || 0;
  const isPositiveTrend = lastPrice >= firstPrice;
  const lineColor = isPositiveTrend ? "#22c55e" : "#ef4444"; // green or red

  const formatXAxisDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "MMM dd");
    } catch {
      return dateStr;
    }
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ payload: ChartPoint }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartPoint;
      return (
        <div className="bg-background border rounded-lg p-2 sm:p-3 shadow-lg">
          <p className="text-xs sm:text-sm font-medium">
            {format(new Date(label!), "MMM dd, yyyy")}
          </p>
          <p className="text-base sm:text-lg font-bold text-primary">
            {formatCurrency(data.price)}
          </p>
          <div className="mt-2 space-y-1 text-xs text-muted-foreground">
            <p>Volume: {formatCurrency(data.volume)}</p>
            <p>Market Cap: {formatCurrency(data.marketCap)}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-60 sm:h-80 p-2 sm:p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            className="opacity-30"
            stroke="hsl(var(--muted-foreground))"
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxisDate}
            className="text-xs"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 10 }}
          />
          <YAxis
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            className="text-xs"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 3,
              stroke: lineColor,
              strokeWidth: 2,
              fill: "hsl(var(--background))",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
