"use client";

import SectionLabel from "./SectionLabel";
import { CUSTODIANS } from "@/lib/data";
import { CUSTODY_BY_BANK_NAME } from "@/lib/details";
import { useOverlays } from "@/components/overlays/OverlayProvider";

export default function CustodyView() {
  const { openPanel } = useOverlays();

  return (
    <section className="mb-10">
      <SectionLabel number="01" title="CONSOLIDATED CUSTODY VIEW" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CUSTODIANS.map((c) => {
          const dotColor = c.status === "reconciled" ? "#4F9E6A" : "#C68A3B";
          const detailId = CUSTODY_BY_BANK_NAME[c.bank];
          return (
            <button
              key={c.bank}
              type="button"
              onClick={() => detailId && openPanel("custody", detailId)}
              aria-label={`Open ${c.bank} custodian detail`}
              className="print-card bg-[#1C1916] border border-[#2B2722] rounded-sm p-6 flex flex-col text-left cursor-pointer transition-colors duration-150 hover:bg-[#1C1916] hover:border-[#3a342d] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E89B43]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  aria-hidden
                  className="inline-block rounded-full"
                  style={{
                    width: 7,
                    height: 7,
                    backgroundColor: dotColor,
                    boxShadow: `0 0 0 2px ${dotColor}22`,
                  }}
                />
                <span className="text-[15px] font-medium text-[#E8E4DE]">
                  {c.bank}
                </span>
              </div>
              <div
                className="text-[10px] uppercase text-[#8F8A82] mb-6"
                style={{ letterSpacing: "0.14em" }}
              >
                {c.cityCountry} · {c.currency}
              </div>

              <div
                className="text-[32px] font-light text-[#E89B43] tnum leading-none"
                style={{ letterSpacing: "-0.01em" }}
              >
                €{c.aumEUR.toFixed(1)}M
              </div>
              <div className="mt-2 text-[11px] text-[#8F8A82] tnum">
                {c.pctOfTotal.toFixed(1)}% of total wealth
              </div>

              <div className="mt-5">
                <div className="h-1 w-full rounded-sm bg-[#6B4A24]/40 overflow-hidden">
                  <div
                    className="h-full bg-[#E89B43]"
                    style={{ width: `${c.pctOfTotal}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px]">
                <span className="text-[#8F8A82] tnum">{c.syncTime}</span>
                <span
                  className="uppercase"
                  style={{
                    color: dotColor,
                    letterSpacing: "0.14em",
                  }}
                >
                  {c.statusLabel}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
