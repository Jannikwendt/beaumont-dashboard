"use client";

import { ALLOCATION, type AllocationStatus } from "@/lib/data";
import { useOverlays } from "@/components/overlays/OverlayProvider";

const statusStyle: Record<
  AllocationStatus,
  { label: (dev: number) => string; bg: string; fg: string; border: string }
> = {
  ok: {
    label: () => "OK",
    bg: "rgba(79, 158, 106, 0.12)",
    fg: "#4F9E6A",
    border: "rgba(79, 158, 106, 0.35)",
  },
  amber: {
    label: (dev) => `${dev > 0 ? "+" : ""}${dev.toFixed(1)}`,
    bg: "rgba(198, 138, 59, 0.14)",
    fg: "#C68A3B",
    border: "rgba(198, 138, 59, 0.4)",
  },
  red: {
    label: (dev) => `${dev > 0 ? "+" : ""}${dev.toFixed(1)}`,
    bg: "rgba(181, 87, 62, 0.18)",
    fg: "#B5573E",
    border: "rgba(181, 87, 62, 0.5)",
  },
};

const DEVIATION_ID_BY_ASSET_CLASS: Record<string, string> = {
  "Real Assets (RE, Infra)": "real-assets",
  "Hedge / Macro / Alts": "hedge",
  "Private Equity & Credit": "pe",
  "Fixed Income & Cash": "fixed-income",
};

const SCALE_PP = 8;

function DeviationBar({ dev }: { dev: number }) {
  const clamped = Math.max(-SCALE_PP, Math.min(SCALE_PP, dev));
  const halfWidthPct = (Math.abs(clamped) / SCALE_PP) * 50;
  const isLeft = clamped < 0;

  return (
    <div className="relative h-1.5 w-full">
      <div className="absolute inset-y-1/2 -translate-y-1/2 left-0 right-0 h-px bg-[#2B2722]" />
      <div
        className="absolute top-0 bottom-0 bg-[#E89B43]"
        style={{
          left: isLeft ? `${50 - halfWidthPct}%` : "50%",
          width: `${halfWidthPct}%`,
        }}
      />
      <div
        className="absolute top-[-3px] bottom-[-3px] w-px bg-[#E8E4DE]"
        style={{ left: "calc(50% - 0.5px)" }}
      />
    </div>
  );
}

export default function Allocation() {
  const { openModal } = useOverlays();

  return (
    <div className="print-card bg-[#1C1916] border border-[#2B2722] rounded-sm p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-5">
        <div
          className="text-[11px] font-medium uppercase text-[#E8E4DE]"
          style={{ letterSpacing: "0.16em" }}
        >
          ASSET CLASS ALLOCATION
        </div>
        <button
          type="button"
          onClick={() => openModal("ips")}
          className="text-[9px] uppercase px-2 py-1 border border-[#E89B43] text-[#E89B43] rounded-sm hover:bg-[#E89B43]/10 transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E89B43]"
          style={{ letterSpacing: "0.18em" }}
          aria-label="Open Investment Policy Statement V1.2"
        >
          IPS V1.2
        </button>
      </div>

      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr
            className="text-[10px] uppercase text-[#8F8A82]"
            style={{ letterSpacing: "0.15em" }}
          >
            <th className="text-left font-normal pb-3">Asset Class</th>
            <th className="text-right font-normal pb-3 w-[12%]">Current</th>
            <th className="text-right font-normal pb-3 w-[12%]">IPS Target</th>
            <th className="text-center font-normal pb-3 w-[28%]">Deviation</th>
            <th className="text-right font-normal pb-3 w-[14%]">Status</th>
          </tr>
        </thead>
        <tbody>
          {ALLOCATION.map((row, idx) => {
            const s = statusStyle[row.status];
            const devId = DEVIATION_ID_BY_ASSET_CLASS[row.assetClass];
            const interactive = !!devId;
            const pillContent = s.label(row.deviationPct);
            return (
              <tr key={row.assetClass} className="text-[13px] text-[#E8E4DE]">
                <td
                  className={
                    "py-3 " + (idx > 0 ? "border-t border-[#2B2722]" : "")
                  }
                >
                  {row.assetClass}
                </td>
                <td
                  className={
                    "py-3 text-right tnum font-medium " +
                    (idx > 0 ? "border-t border-[#2B2722]" : "")
                  }
                >
                  {row.currentPct.toFixed(1)}%
                </td>
                <td
                  className={
                    "py-3 text-right tnum text-[#8F8A82] " +
                    (idx > 0 ? "border-t border-[#2B2722]" : "")
                  }
                >
                  {row.targetPct.toFixed(1)}%
                </td>
                <td
                  className={
                    "py-3 px-4 " +
                    (idx > 0 ? "border-t border-[#2B2722]" : "")
                  }
                >
                  <DeviationBar dev={row.deviationPct} />
                </td>
                <td
                  className={
                    "py-3 text-right " +
                    (idx > 0 ? "border-t border-[#2B2722]" : "")
                  }
                >
                  {interactive ? (
                    <button
                      type="button"
                      onClick={() => openModal("deviation", devId)}
                      className="inline-block text-[10px] font-medium tnum px-2 py-1 rounded-sm transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E89B43]"
                      style={{
                        letterSpacing: "0.08em",
                        backgroundColor: s.bg,
                        color: s.fg,
                        border: `1px solid ${s.border}`,
                      }}
                      aria-label={`Open deviation detail for ${row.assetClass}`}
                    >
                      {pillContent}
                    </button>
                  ) : (
                    <span
                      className="inline-block text-[10px] font-medium tnum px-2 py-1 rounded-sm"
                      style={{
                        letterSpacing: "0.08em",
                        backgroundColor: s.bg,
                        color: s.fg,
                        border: `1px solid ${s.border}`,
                      }}
                    >
                      {pillContent}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
