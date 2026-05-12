"use client";

import SidePanel from "./SidePanel";
import { scrollToSection, useOverlays } from "./OverlayProvider";
import { POSITION_DETAILS } from "@/lib/details";
import DetailSections from "./DetailSections";

export default function PositionPanel() {
  const { activePanel, closePanel, expandDecision } = useOverlays();
  const open = activePanel?.type === "position";
  const id = activePanel?.id;
  const p = id ? POSITION_DETAILS[id] : null;

  if (!p) {
    return <SidePanel open={open} onClose={closePanel} title="Position" />;
  }

  function goToDecision() {
    if (!p?.actionStatus?.linkedDecisionId) return;
    closePanel();
    requestAnimationFrame(() => {
      scrollToSection("governance");
      expandDecision(p.actionStatus!.linkedDecisionId!);
    });
  }

  return (
    <SidePanel
      open={open}
      onClose={closePanel}
      title={
        <span className="flex items-baseline gap-3 flex-wrap">
          <span
            className="text-[11px] font-medium text-[#E89B43] tnum"
            style={{ letterSpacing: "0.16em" }}
          >
            {p.rank}
          </span>
          <span>{p.name}</span>
        </span>
      }
      subtitle={p.assetClass}
      badge={
        <span
          className="text-[10px] font-medium uppercase tnum px-2 py-1 rounded-sm"
          style={{
            letterSpacing: "0.18em",
            backgroundColor: "rgba(232, 155, 67, 0.15)",
            color: "#E89B43",
            border: "1px solid rgba(232, 155, 67, 0.55)",
          }}
        >
          {p.pctBadge}
        </span>
      }
      footer={`Position ${p.rank} of 10 · Decision GPS linked: ${
        p.actionStatus?.linkedDecisionId
          ? "IC #14 (real-estate reduction)"
          : "—"
      }`}
    >
      <DetailSections sections={p.sections} />

      {p.actionStatus && (
        <section className="mt-7 p-4 border border-[#2B2722] bg-[#221E1A] rounded-sm">
          <div
            className="text-[10px] font-medium uppercase text-[#E89B43] mb-3"
            style={{ letterSpacing: "0.18em" }}
          >
            {p.actionStatus.title}
          </div>
          <ul className="flex flex-col gap-2 text-[13px] text-[#E8E4DE] leading-relaxed">
            {p.actionStatus.lines.map((l, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden
                  className="inline-block mt-2 shrink-0"
                  style={{
                    width: 4,
                    height: 4,
                    backgroundColor: "#E89B43",
                    borderRadius: 1,
                  }}
                />
                <span>{l}</span>
              </li>
            ))}
          </ul>
          {p.actionStatus.linkedDecisionId && (
            <button
              type="button"
              onClick={goToDecision}
              className="mt-4 text-left text-[12px] text-[#E89B43] hover:underline cursor-pointer tnum"
            >
              Decision journal entry: IC #14 · 12 Mar 2026 →
            </button>
          )}
        </section>
      )}
    </SidePanel>
  );
}
