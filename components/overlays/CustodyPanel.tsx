"use client";

import SidePanel from "./SidePanel";
import { useOverlays } from "./OverlayProvider";
import { CUSTODY_DETAILS } from "@/lib/details";
import DetailSections from "./DetailSections";

export default function CustodyPanel() {
  const { activePanel, closePanel } = useOverlays();
  const open = activePanel?.type === "custody";
  const id = activePanel?.id;
  const c = id ? CUSTODY_DETAILS[id] : null;

  if (!c) {
    return <SidePanel open={open} onClose={closePanel} title="Custodian" />;
  }

  const dotColor = c.status === "reconciled" ? "#4F9E6A" : "#C68A3B";

  return (
    <SidePanel
      open={open}
      onClose={closePanel}
      title={
        <span className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-block rounded-full shrink-0"
            style={{
              width: 8,
              height: 8,
              backgroundColor: dotColor,
              boxShadow: `0 0 0 2px ${dotColor}22`,
            }}
          />
          {c.bank}
        </span>
      }
      subtitle={c.cityCountry}
      rightAfterTitle={
        <div className="mt-4 flex items-baseline gap-3">
          <span
            className="text-[28px] font-light text-[#E89B43] tnum leading-none"
            style={{ letterSpacing: "-0.01em" }}
          >
            €{c.aumEUR.toFixed(1)}M
          </span>
          <span className="text-[11px] text-[#8F8A82] tnum">
            {c.pctOfTotal.toFixed(1)}% of total wealth ·{" "}
            <span style={{ color: dotColor }}>{c.statusLabel}</span>
          </span>
        </div>
      }
      footer={c.footer}
    >
      <DetailSections sections={c.sections} />
    </SidePanel>
  );
}
