import { CURRENCIES } from "@/lib/data";

// Fill intensities for each currency row (descending).
const FILLS = ["#E89B43", "#C8852E", "#A66B22", "#83531A", "#5F3C14"];

export default function Currency() {
  const max = Math.max(...CURRENCIES.map((c) => c.pct));

  return (
    <div className="print-card bg-[#1C1916] border border-[#2B2722] rounded-sm p-6">
      <div
        className="text-[11px] font-medium uppercase text-[#E8E4DE] mb-5"
        style={{ letterSpacing: "0.16em" }}
      >
        CURRENCY EXPOSURE
      </div>
      <ul className="flex flex-col gap-4">
        {CURRENCIES.map((c, idx) => {
          const widthPct = (c.pct / max) * 100;
          return (
            <li key={c.ticker} className="flex items-center gap-4">
              <span className="w-10 text-[12px] font-medium text-[#E8E4DE] tnum">
                {c.ticker}
              </span>
              <span className="flex-1 h-1.5 rounded-sm bg-[#6B4A24]/30 overflow-hidden">
                <span
                  className="block h-full"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: FILLS[idx % FILLS.length],
                  }}
                />
              </span>
              <span className="w-10 text-right text-[12px] tnum text-[#E8E4DE] font-medium">
                {c.pct}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
