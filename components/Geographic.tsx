"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { GEOGRAPHIC, GEO_FLAG } from "@/lib/data";
import useIsClient from "./useIsClient";

export default function Geographic() {
  const mounted = useIsClient();

  return (
    <div className="print-card bg-[#1C1916] border border-[#2B2722] rounded-sm p-6 h-full flex flex-col">
      <div
        className="text-[11px] font-medium uppercase text-[#E8E4DE] mb-2"
        style={{ letterSpacing: "0.16em" }}
      >
        GEOGRAPHIC EXPOSURE
      </div>

      <div className="flex items-center gap-4 flex-1">
        <div className="w-[160px] h-[160px] shrink-0">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={GEOGRAPHIC}
                  dataKey="pct"
                  nameKey="region"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  stroke="none"
                  isAnimationActive={false}
                  startAngle={90}
                  endAngle={-270}
                >
                  {GEOGRAPHIC.map((slice) => (
                    <Cell key={slice.region} fill={slice.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <ul className="flex-1 flex flex-col gap-2.5">
          {GEOGRAPHIC.map((slice) => (
            <li
              key={slice.region}
              className="flex items-center justify-between text-[12px] text-[#E8E4DE]"
            >
              <span className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="inline-block"
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: slice.color,
                  }}
                />
                <span>{slice.region}</span>
              </span>
              <span className="tnum tabular-nums text-[#8F8A82]">
                {slice.pct}%
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="mt-5 px-3 py-3 text-[12px] text-[#E8E4DE]"
        style={{
          backgroundColor: "#3a2a18",
          borderLeft: "2px solid #C68A3B",
        }}
      >
        <span className="font-medium text-[#C68A3B] mr-1">Flag:</span>
        {GEO_FLAG}
      </div>
    </div>
  );
}
