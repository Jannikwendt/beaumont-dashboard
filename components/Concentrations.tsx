"use client";

import { CONCENTRATIONS } from "@/lib/data";
import { POSITION_BY_NAME } from "@/lib/details";
import { useOverlays } from "@/components/overlays/OverlayProvider";

export default function Concentrations() {
  const { openPanel } = useOverlays();

  return (
    <div className="print-card bg-[#1C1916] border border-[#2B2722] rounded-sm p-6 h-full">
      <div
        className="text-[11px] font-medium uppercase text-[#E8E4DE] mb-4"
        style={{ letterSpacing: "0.16em" }}
      >
        TOP 10 SINGLE-LINE CONCENTRATIONS
      </div>
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr
            className="text-[10px] uppercase text-[#8F8A82]"
            style={{ letterSpacing: "0.15em" }}
          >
            <th className="text-left font-normal pb-3 w-[6%]">#</th>
            <th className="text-left font-normal pb-3">Position</th>
            <th className="text-left font-normal pb-3 w-[26%]">Asset Class</th>
            <th className="text-right font-normal pb-3 w-[12%]">% NAV</th>
          </tr>
        </thead>
        <tbody>
          {CONCENTRATIONS.map((row, idx) => {
            const positionId = POSITION_BY_NAME[row.position];
            return (
              <tr
                key={row.rank}
                tabIndex={0}
                role="button"
                aria-label={`Open detail for ${row.position}`}
                onClick={() =>
                  positionId && openPanel("position", positionId)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (positionId) openPanel("position", positionId);
                  }
                }}
                className="text-[13px] text-[#E8E4DE] hover:bg-[#221E1A] cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:bg-[#221E1A]"
              >
                <td
                  className={
                    "py-2.5 text-[#E89B43] tnum font-medium " +
                    (idx > 0 ? "border-t border-[#2B2722]" : "")
                  }
                >
                  {row.rank}
                </td>
                <td
                  className={
                    "py-2.5 " + (idx > 0 ? "border-t border-[#2B2722]" : "")
                  }
                >
                  {row.position}
                </td>
                <td
                  className={
                    "py-2.5 text-[#8F8A82] " +
                    (idx > 0 ? "border-t border-[#2B2722]" : "")
                  }
                >
                  {row.assetClass}
                </td>
                <td
                  className={
                    "py-2.5 text-right tnum font-medium " +
                    (idx > 0 ? "border-t border-[#2B2722]" : "")
                  }
                >
                  {row.pctNav.toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
