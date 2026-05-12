"use client";

import Modal from "./Modal";
import { scrollToSection, useOverlays } from "./OverlayProvider";
import { DEVIATION_DETAILS, type DeviationDetail } from "@/lib/details";

function StatusBadge({ d }: { d: DeviationDetail }) {
  const isOOB = d.status === "out-of-band";
  return (
    <span
      className="text-[10px] font-medium uppercase px-2 py-1 rounded-sm"
      style={{
        letterSpacing: "0.18em",
        color: isOOB ? "#B5573E" : "#C68A3B",
        backgroundColor: isOOB
          ? "rgba(181, 87, 62, 0.12)"
          : "rgba(198, 138, 59, 0.12)",
        border: `1px solid ${
          isOOB ? "rgba(181, 87, 62, 0.55)" : "rgba(198, 138, 59, 0.5)"
        }`,
      }}
    >
      {d.statusLabel}
    </span>
  );
}

function MiniLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[10px] font-medium uppercase text-[#E89B43] mb-2"
      style={{ letterSpacing: "0.18em" }}
    >
      {children}
    </div>
  );
}

export default function DeviationModal() {
  const { activeModal, closeModal, expandDecision } = useOverlays();
  const open = activeModal?.type === "deviation";
  const id = activeModal?.id;
  const d = id ? DEVIATION_DETAILS[id] : null;

  if (!d) {
    return (
      <Modal
        open={open}
        onClose={closeModal}
        title="IPS DEVIATION"
        width="xl"
      />
    );
  }

  const dev = d.deviationPp;
  const devLabel = `${dev > 0 ? "+" : ""}${dev.toFixed(1)}pp`;

  function goToDecision() {
    if (!d || !d.linkedDecisionId) return;
    closeModal();
    requestAnimationFrame(() => {
      scrollToSection("governance");
      expandDecision(d.linkedDecisionId!);
    });
  }

  return (
    <Modal
      open={open}
      onClose={closeModal}
      width="xl"
      title={`${d.sleeve} — IPS DEVIATION ${devLabel}`}
      badge={<StatusBadge d={d} />}
      footer={
        d.linkedDecisionId
          ? `Linked decision: IC #${d.linkedDecisionId === "d1" || d.linkedDecisionId === "d2" ? 14 : 13}`
          : "No linked IC decision · normalisation via natural pacing"
      }
    >
      <div className="flex flex-col gap-7">
        {/* CURRENT STATE */}
        <section>
          <MiniLabel>CURRENT STATE</MiniLabel>
          <ul className="flex flex-col gap-2 text-[13px] text-[#E8E4DE] tnum">
            <li className="flex justify-between gap-4">
              <span className="text-[#8F8A82]">Current</span>
              <span>
                {d.current.pct.toFixed(1)}% of NAV{"  "}
                <span className="text-[#8F8A82]">
                  (€{d.current.eur.toFixed(1)}M)
                </span>
              </span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-[#8F8A82]">IPS target</span>
              <span>
                {d.target.pct.toFixed(1)}%{"  "}
                <span className="text-[#8F8A82]">
                  (€{d.target.eur.toFixed(1)}M)
                </span>
              </span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-[#8F8A82]">IPS range</span>
              <span>
                {d.min.toFixed(1)}% — {d.max.toFixed(1)}%
              </span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-[#8F8A82]">Magnitude</span>
              <span
                style={{
                  color:
                    d.status === "out-of-band" ? "#B5573E" : "#C68A3B",
                }}
              >
                {d.breachSummary}
              </span>
            </li>
          </ul>
        </section>

        {/* ROOT-CAUSE */}
        <section>
          <MiniLabel>ROOT-CAUSE ANALYSIS</MiniLabel>
          <ul className="flex flex-col gap-2 text-[13px] text-[#E8E4DE] leading-relaxed">
            {d.rootCause.map((rc, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-[#E89B43] tnum" style={{ width: 16 }}>
                  {i + 1}.
                </span>
                <span>{rc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* PLAN */}
        <section>
          <MiniLabel>{d.plan.title}</MiniLabel>
          <ol className="flex flex-col gap-2 text-[13px] text-[#E8E4DE] leading-relaxed">
            {d.plan.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="text-[#E89B43] tnum font-medium"
                  style={{ width: 16 }}
                >
                  {i + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* PROJECTION */}
        <section>
          <MiniLabel>PROJECTED POST-REBALANCE</MiniLabel>
          <ul className="flex flex-col gap-1.5 text-[13px] text-[#E8E4DE] tnum">
            {d.projection.map((p, i) => (
              <li key={i} className="flex justify-between gap-4">
                <span className="text-[#8F8A82]">{p.label}</span>
                <span>{p.value}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Linked decision footer */}
        {d.linkedDecisionId && (
          <button
            type="button"
            onClick={goToDecision}
            className="text-left text-[12px] text-[#E89B43] hover:underline cursor-pointer tnum"
          >
            Linked decisions: IC #
            {d.linkedDecisionId === "d3" ? 13 : 14} ·{" "}
            {d.linkedDecisionId === "d3" ? "04 Feb 2026" : "12 Mar 2026"} — view
            decision journal entry →
          </button>
        )}
      </div>
    </Modal>
  );
}
