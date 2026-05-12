import { REPORTING } from "@/lib/data";

export default function Header() {
  return (
    <header className="flex items-start justify-between gap-6 pt-8 pb-5">
      <div className="flex items-center gap-4">
        <span
          aria-hidden
          className="block bg-[#E89B43]"
          style={{ width: 3, height: 40 }}
        />
        <div className="leading-tight">
          <div className="text-[16px] font-medium tracking-wide text-[#E8E4DE]">
            BEAUMONT FAMILY OFFICE
          </div>
          <div
            className="text-[11px] uppercase text-[#8F8A82] mt-1"
            style={{ letterSpacing: "0.14em" }}
          >
            ONE TRUTH — CONSOLIDATED WEALTH VIEW
          </div>
        </div>
      </div>

      <div className="text-right text-[11px] text-[#8F8A82] leading-relaxed tnum">
        <div>
          Reporting period:{" "}
          <span className="text-[#E89B43] font-medium">{REPORTING.period}</span>
        </div>
        <div>
          Last sync:{" "}
          <span className="text-[#E89B43] font-medium">
            {REPORTING.lastSync}
          </span>
          {" · "}
          <span className="text-[#E89B43] font-medium">
            {REPORTING.banksConnected}
          </span>{" "}
          banks connected
        </div>
      </div>
    </header>
  );
}
