import { REPORTING_CADENCE } from "@/lib/data";

export default function ReportingCadence() {
  return (
    <div className="print-card bg-[#1C1916] border border-[#2B2722] rounded-sm p-6 h-full flex flex-col">
      <div
        className="text-[11px] font-medium uppercase text-[#E8E4DE] mb-5"
        style={{ letterSpacing: "0.16em" }}
      >
        REPORTING CADENCE
      </div>

      <ul className="flex-1 flex flex-col">
        {REPORTING_CADENCE.map((row, idx) => (
          <li
            key={row.label}
            className={
              "flex items-start gap-4 py-4 " +
              (idx > 0 ? "border-t border-[#2B2722]" : "")
            }
            style={{ lineHeight: "14px" }}
          >
            <span
              aria-hidden
              className="block shrink-0 mt-1"
              style={{ width: 2, height: 24, backgroundColor: "#E89B43" }}
            />
            <div className="flex-1">
              <div
                className="text-[11px] font-medium uppercase text-[#E8E4DE] mb-2"
                style={{ letterSpacing: "0.16em" }}
              >
                {row.label}
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#E8E4DE] mb-1.5">
                <span
                  aria-hidden
                  className="inline-block rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: "#4F9E6A",
                    boxShadow: "0 0 0 2px rgba(79,158,106,0.18)",
                  }}
                />
                <span className="tnum">{row.statusLine}</span>
              </div>
              <div className="text-[11px] text-[#8F8A82] tnum">
                {row.nextLine}
              </div>
              {row.secondary && (
                <div className="text-[10px] text-[#5C5751] tnum mt-1">
                  {row.secondary}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
