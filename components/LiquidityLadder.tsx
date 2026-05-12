import { LIQUIDITY_BUCKETS, LIQUIDITY_SUMMARY } from "@/lib/data";

const TONE_FILL: Record<"default" | "orange" | "amber", string> = {
  default: "#E89B43",
  orange: "#E89B43",
  amber: "#C68A3B",
};

const TONE_TRACK: Record<"default" | "orange" | "amber", string> = {
  default: "rgba(107, 74, 36, 0.35)",
  orange: "rgba(107, 74, 36, 0.45)",
  amber: "rgba(107, 74, 36, 0.35)",
};

export default function LiquidityLadder() {
  return (
    <div className="print-card bg-[#1C1916] border border-[#2B2722] rounded-sm p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-5">
        <div
          className="text-[11px] font-medium uppercase text-[#E8E4DE]"
          style={{ letterSpacing: "0.16em" }}
        >
          LIQUIDITY LADDER
        </div>
        <span
          className="text-[9px] uppercase px-2 py-1 border border-[#E89B43] text-[#E89B43] rounded-sm"
          style={{ letterSpacing: "0.18em" }}
        >
          30D FLOOR: 30%
        </span>
      </div>

      <ul className="flex flex-col gap-4 flex-1">
        {LIQUIDITY_BUCKETS.map((b) => (
          <li
            key={b.label}
            className="grid items-center gap-4"
            style={{ gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 2.4fr) 90px" }}
          >
            <span className="text-[12px] font-medium text-[#E8E4DE] truncate">
              {b.label}
            </span>
            <span
              className="h-2 rounded-sm overflow-hidden"
              style={{ backgroundColor: TONE_TRACK[b.tone] }}
            >
              <span
                className="block h-full"
                style={{
                  width: `${b.pctNav}%`,
                  backgroundColor: TONE_FILL[b.tone],
                }}
              />
            </span>
            <span className="text-right">
              <span className="block text-[13px] font-medium text-[#E8E4DE] tnum leading-tight">
                {b.pctNav}%
              </span>
              <span className="block text-[10px] text-[#8F8A82] tnum leading-tight">
                €{b.eur.toFixed(1)}M
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 pt-4 border-t border-[#2B2722] text-[11px] text-[#8F8A82] tnum">
        30-day cumulative liquidity:{" "}
        <span className="text-[#E8E4DE] font-medium">
          {LIQUIDITY_SUMMARY.cumulative30dPct}%
        </span>{" "}
        · IPS floor: {LIQUIDITY_SUMMARY.ipsFloorPct}% · headroom:{" "}
        <span className="text-[#E8E4DE] font-medium">
          +{LIQUIDITY_SUMMARY.headroomPp}pp
        </span>
      </div>
    </div>
  );
}
