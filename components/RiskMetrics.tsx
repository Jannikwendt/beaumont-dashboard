"use client";

import { RISK_METRICS, type RiskMetric } from "@/lib/data";
import Tooltip from "@/components/overlays/Tooltip";
import { KPI_CITATIONS } from "@/lib/details";

const toneColor: Record<RiskMetric["tone"], string> = {
  ok: "#E8E4DE",
  amber: "#C68A3B",
  red: "#B5573E",
};

const tickColor: Record<RiskMetric["tone"], string> = {
  ok: "#4F9E6A",
  amber: "#C68A3B",
  red: "#B5573E",
};

const CITATION_KEY: Record<string, keyof typeof KPI_CITATIONS> = {
  "PORTFOLIO VOLATILITY (1Y)": "volatility",
  "MAX DRAWDOWN (3Y)": "drawdown",
  "TOP-5 CONCENTRATION": "concentration",
  "LIQUIDITY (≤30 DAYS)": "liquidity",
};

export default function RiskMetrics() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {RISK_METRICS.map((m) => {
        const key = CITATION_KEY[m.label];
        const cite = key ? KPI_CITATIONS[key] : null;
        return (
          <div
            key={m.label}
            className="print-card bg-[#1C1916] border border-[#2B2722] rounded-sm p-6"
          >
            <div
              className="text-[10px] uppercase text-[#8F8A82] mb-4"
              style={{ letterSpacing: "0.18em" }}
            >
              {m.label}
            </div>
            {cite ? (
              <Tooltip source={cite.source} methodology={cite.methodology}>
                <button
                  type="button"
                  aria-label={`${m.label} — source citation`}
                  className="text-[36px] font-light tnum leading-none cursor-help bg-transparent border-0 p-0 m-0 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E89B43] rounded-sm"
                  style={{
                    color: toneColor[m.tone],
                    letterSpacing: "-0.01em",
                  }}
                >
                  {m.value}
                </button>
              </Tooltip>
            ) : (
              <div
                className="text-[36px] font-light tnum leading-none"
                style={{ color: toneColor[m.tone], letterSpacing: "-0.01em" }}
              >
                {m.value}
              </div>
            )}
            <div className="mt-4 text-[11px] text-[#8F8A82] tnum flex items-center gap-1.5">
              <span
                aria-hidden
                className="inline-block"
                style={{ color: tickColor[m.tone] }}
              >
                {m.tone === "ok" ? "✓" : m.tone === "amber" ? "▲" : "✕"}
              </span>
              <span>{m.caption}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
