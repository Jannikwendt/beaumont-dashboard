"use client";

import { HERO } from "@/lib/data";
import Tooltip from "@/components/overlays/Tooltip";
import { KPI_CITATIONS } from "@/lib/details";

type Column = {
  label: string;
  citationKey: keyof typeof KPI_CITATIONS;
  value: React.ReactNode;
  valueSize: string;
  caption: React.ReactNode;
};

export default function Hero() {
  const columns: Column[] = [
    {
      label: "TOTAL FAMILY WEALTH",
      citationKey: "totalWealth",
      value: HERO.totalWealthLabel,
      valueSize: "text-[48px]",
      caption: (
        <span className="inline-flex items-center gap-1.5 text-[#4F9E6A]">
          <span aria-hidden className="inline-block">
            ▲
          </span>
          <span className="tnum">
            €{HERO.qoqDeltaEUR.toFixed(1)}M QoQ (+
            {HERO.qoqDeltaPct.toFixed(1)}%)
          </span>
        </span>
      ),
    },
    {
      label: "12-MO NET RETURN",
      citationKey: "netReturn",
      value: `+${HERO.netReturn12mPct.toFixed(1)}%`,
      valueSize: "text-[36px]",
      caption: HERO.netReturnCaption,
    },
    {
      label: "ALL-IN FEE (TER)",
      citationKey: "allInFee",
      value: `${HERO.allInFeePct.toFixed(2)}%`,
      valueSize: "text-[36px]",
      caption: HERO.feeCaption,
    },
    {
      label: "CUSTODIANS RECONCILED",
      citationKey: "custodians",
      value: HERO.custodiansReconciled,
      valueSize: "text-[36px]",
      caption: HERO.custodiansCaption,
    },
  ];

  return (
    <section
      className="print-card relative bg-[#1C1916] border border-[#2B2722] rounded-sm mb-10"
      style={{ borderLeft: "2px solid #E89B43" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#2B2722]">
        {columns.map((col) => {
          const cite = KPI_CITATIONS[col.citationKey];
          return (
            <div key={col.label} className="px-8 py-7">
              <div
                className="text-[10px] uppercase text-[#8F8A82] mb-3"
                style={{ letterSpacing: "0.18em" }}
              >
                {col.label}
              </div>
              <Tooltip source={cite.source} methodology={cite.methodology}>
                <button
                  type="button"
                  aria-label={`${col.label} — source citation`}
                  className={`${col.valueSize} font-light text-[#E8E4DE] tnum leading-none cursor-help bg-transparent border-0 p-0 m-0 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E89B43] rounded-sm`}
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {col.value}
                </button>
              </Tooltip>
              <div className="mt-4 text-[11px] text-[#8F8A82] tnum">
                {col.caption}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
