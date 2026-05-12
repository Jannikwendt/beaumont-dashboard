"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";
import { PERFORMANCE } from "@/lib/data";
import useIsClient from "./useIsClient";

export default function PerformanceChart() {
  const mounted = useIsClient();

  return (
    <div className="print-card bg-[#1C1916] border border-[#2B2722] rounded-sm p-6">
      <div
        className="text-[11px] font-medium uppercase text-[#E8E4DE] mb-1"
        style={{ letterSpacing: "0.16em" }}
      >
        PERFORMANCE VS. BENCHMARK — 12 MONTHS
      </div>
      <div className="text-[10px] text-[#5C5751] tnum mb-3">
        {PERFORMANCE[0].month} → {PERFORMANCE[PERFORMANCE.length - 1].month}
      </div>

      <div style={{ width: "100%", height: 140 }}>
        {mounted && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={PERFORMANCE}
              margin={{ top: 6, right: 8, bottom: 6, left: 8 }}
            >
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#5C5751"
                strokeWidth={1}
                strokeDasharray="4 3"
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke="#E89B43"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-3 flex items-center gap-6 text-[11px] tnum">
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className="block"
            style={{ width: 14, height: 2, backgroundColor: "#E89B43" }}
          />
          <span className="text-[#E8E4DE]">
            Beaumont Portfolio: <span className="font-medium">+6.8%</span>
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className="block"
            style={{
              width: 14,
              height: 0,
              borderTop: "1px dashed #5C5751",
            }}
          />
          <span className="text-[#8F8A82]">
            60/40 Benchmark: <span className="font-medium">+5.4%</span>
          </span>
        </span>
      </div>
    </div>
  );
}
