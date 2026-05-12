"use client";

import { DECISIONS, type Decision } from "@/lib/data";
import { DECISION_GPS, type BiasCheckRow, type VoteRow } from "@/lib/details";
import { useOverlays } from "@/components/overlays/OverlayProvider";

// Decisions map to stable IDs (d1, d2, d3) by row index.
const DECISION_IDS = ["d1", "d2", "d3"] as const;

function statusPillStyle(status: Decision["status"]) {
  if (status === "passed") {
    return {
      bg: "rgba(79, 158, 106, 0.15)",
      fg: "#4F9E6A",
      border: "rgba(79, 158, 106, 0.45)",
    };
  }
  return {
    bg: "rgba(181, 87, 62, 0.18)",
    fg: "#B5573E",
    border: "rgba(181, 87, 62, 0.55)",
  };
}

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[10px] font-medium uppercase text-[#E89B43] mb-3"
      style={{ letterSpacing: "0.18em" }}
    >
      {children}
    </div>
  );
}

function BiasRow({ r, idx }: { r: BiasCheckRow; idx: number }) {
  const color =
    r.status === "flagged"
      ? "#C68A3B"
      : r.status === "clear"
      ? "#4F9E6A"
      : "#8F8A82";
  const tag =
    r.status === "flagged"
      ? "⚠ FLAGGED"
      : r.status === "clear"
      ? "✓ Clear"
      : "— N/A";
  return (
    <tr className="text-[12px] text-[#E8E4DE]">
      <td
        className={
          "py-2 pr-3 " + (idx > 0 ? "border-t border-[#2B2722]" : "")
        }
      >
        {r.bias}
      </td>
      <td
        className={
          "py-2 pr-3 tnum " +
          (idx > 0 ? "border-t border-[#2B2722]" : "")
        }
        style={{ color, whiteSpace: "nowrap" }}
      >
        {tag}
      </td>
      <td
        className={
          "py-2 text-[#8F8A82] " +
          (idx > 0 ? "border-t border-[#2B2722]" : "")
        }
      >
        {r.note}
      </td>
    </tr>
  );
}

function VoteRowEl({ v, idx }: { v: VoteRow; idx: number }) {
  const fg =
    v.vote === "FOR"
      ? "#4F9E6A"
      : v.vote === "AGAINST"
      ? "#B5573E"
      : "#8F8A82";
  const bg =
    v.vote === "FOR"
      ? "rgba(79, 158, 106, 0.15)"
      : v.vote === "AGAINST"
      ? "rgba(181, 87, 62, 0.18)"
      : "rgba(143, 138, 130, 0.12)";
  const border =
    v.vote === "FOR"
      ? "rgba(79, 158, 106, 0.45)"
      : v.vote === "AGAINST"
      ? "rgba(181, 87, 62, 0.55)"
      : "rgba(143, 138, 130, 0.4)";
  return (
    <li
      className={
        "py-2.5 " + (idx > 0 ? "border-t border-[#2B2722]" : "")
      }
    >
      <div className="flex items-center gap-3 mb-1">
        <span className="text-[12px] text-[#E8E4DE] font-medium">
          {v.member}
        </span>
        <span className="text-[10px] uppercase text-[#8F8A82] tnum" style={{ letterSpacing: "0.14em" }}>
          {v.role}
        </span>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-sm tnum ml-auto"
          style={{
            letterSpacing: "0.14em",
            backgroundColor: bg,
            color: fg,
            border: `1px solid ${border}`,
          }}
        >
          {v.vote}
        </span>
      </div>
      <div className="text-[11px] text-[#8F8A82] leading-snug">
        “{v.rationale}”
      </div>
    </li>
  );
}

function ExpansionPanels({ decisionId }: { decisionId: string }) {
  const gps = DECISION_GPS[decisionId];
  if (!gps) return null;

  return (
    <div className="mt-5 pt-5 border-t border-[#2B2722]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* PRE-MORTEM */}
        <div className="bg-[#221E1A] border border-[#2B2722] p-4 rounded-sm">
          <PanelLabel>PRE-MORTEM</PanelLabel>
          <ul className="flex flex-col gap-2.5">
            <li className="flex gap-2 text-[12px] text-[#E8E4DE] leading-relaxed">
              <span aria-hidden className="text-[#E89B43] shrink-0 mt-px">
                ☑
              </span>
              <span>
                <span className="text-[#8F8A82]">Counterfactual:</span>{" "}
                <span className="italic">{gps.preMortem.counterfactual}</span>
              </span>
            </li>
            {gps.preMortem.failureModes.map((f, i) => (
              <li
                key={i}
                className="flex gap-2 text-[12px] text-[#E8E4DE] leading-relaxed"
              >
                <span aria-hidden className="text-[#E89B43] shrink-0 mt-px">
                  ☑
                </span>
                <span>
                  <span className="text-[#8F8A82]">
                    Failure mode #{i + 1}:
                  </span>{" "}
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* BIAS CHECK */}
        <div className="bg-[#221E1A] border border-[#2B2722] p-4 rounded-sm">
          <PanelLabel>BIAS CHECK</PanelLabel>
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr
                className="text-[9px] uppercase text-[#5C5751]"
                style={{ letterSpacing: "0.16em" }}
              >
                <th className="text-left font-normal pb-2 pr-3">Bias</th>
                <th className="text-left font-normal pb-2 pr-3">Status</th>
                <th className="text-left font-normal pb-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {gps.biasCheck.map((b, i) => (
                <BiasRow key={b.bias} r={b} idx={i} />
              ))}
            </tbody>
          </table>
        </div>

        {/* DEVIL'S ADVOCATE */}
        <div className="bg-[#221E1A] border border-[#2B2722] p-4 rounded-sm">
          <PanelLabel>DEVIL&apos;S ADVOCATE</PanelLabel>
          <div className="text-[13px] font-medium text-[#E8E4DE] mb-2">
            {gps.devilsAdvocate.member}
          </div>
          <blockquote
            className="text-[12px] text-[#8F8A82] italic leading-relaxed pl-3 mb-3"
            style={{ borderLeft: "2px solid #E89B43" }}
          >
            “{gps.devilsAdvocate.quote}”
          </blockquote>
          <div
            className="text-[10px] uppercase text-[#5C5751] mb-1.5"
            style={{ letterSpacing: "0.16em" }}
          >
            Counter-evidence
          </div>
          <ul className="flex flex-col gap-1.5">
            {gps.devilsAdvocate.counterEvidence.map((c, i) => (
              <li
                key={i}
                className="flex gap-2 text-[12px] text-[#E8E4DE] leading-relaxed"
              >
                <span
                  aria-hidden
                  className="text-[#E89B43] tnum shrink-0"
                  style={{ width: 14 }}
                >
                  {i + 1}.
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* VOTE BREAKDOWN */}
        <div className="bg-[#221E1A] border border-[#2B2722] p-4 rounded-sm">
          <PanelLabel>VOTE BREAKDOWN</PanelLabel>
          <ul>
            {gps.votes.map((v, i) => (
              <VoteRowEl key={v.member} v={v} idx={i} />
            ))}
          </ul>
        </div>
      </div>

      <div
        className="mt-4 text-[10px] uppercase text-[#5C5751] tnum"
        style={{ letterSpacing: "0.14em" }}
      >
        {gps.auditTrail}
      </div>
    </div>
  );
}

export default function DecisionJournal() {
  const { expandedDecisionId, toggleDecision } = useOverlays();

  return (
    <div className="print-card bg-[#1C1916] border border-[#2B2722] rounded-sm p-7">
      <div className="flex items-start justify-between mb-5">
        <div
          className="text-[11px] font-medium uppercase text-[#E8E4DE]"
          style={{ letterSpacing: "0.16em" }}
        >
          LAST 3 IC DECISIONS
        </div>
        <span
          className="text-[9px] uppercase px-2 py-1 border border-[#E89B43] text-[#E89B43] rounded-sm"
          style={{ letterSpacing: "0.18em" }}
        >
          Q1 2026
        </span>
      </div>

      <div className="flex flex-col">
        {DECISIONS.map((d, idx) => {
          const id = DECISION_IDS[idx];
          const s = statusPillStyle(d.status);
          const open = expandedDecisionId === id;
          return (
            <article
              key={d.title}
              id={`decision-${id}`}
              className={idx > 0 ? "border-t border-[#2B2722]" : ""}
            >
              <button
                type="button"
                onClick={() => toggleDecision(id)}
                aria-expanded={open}
                aria-controls={`decision-${id}-panel`}
                className="w-full py-5 grid gap-6 text-left cursor-pointer transition-colors duration-150 hover:bg-[#221E1A]/40 focus:outline-none focus-visible:bg-[#221E1A]/60 -mx-2 px-2 rounded-sm"
                style={{ gridTemplateColumns: "minmax(0, 1fr) auto" }}
              >
                <div>
                  <div
                    className="text-[10px] uppercase text-[#8F8A82] tnum mb-2"
                    style={{ letterSpacing: "0.16em" }}
                  >
                    {d.date} · {d.meeting}
                  </div>
                  <h3 className="text-[15px] font-medium text-[#E8E4DE] mb-2 flex items-center gap-2">
                    <span>{d.title}</span>
                    <span
                      aria-hidden
                      className="inline-block text-[#8F8A82] text-[10px] transition-transform duration-200"
                      style={{
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      ▾
                    </span>
                  </h3>
                  <p className="text-[13px] text-[#8F8A82] leading-relaxed mb-3 max-w-[68ch]">
                    {d.body}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {d.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] uppercase px-2 py-1 bg-[#221E1A] border border-[#2B2722] text-[#8F8A82] rounded-sm"
                        style={{ letterSpacing: "0.14em" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span
                    className="inline-block text-[11px] font-medium uppercase px-3 py-1.5 rounded-sm tnum"
                    style={{
                      letterSpacing: "0.16em",
                      backgroundColor: s.bg,
                      color: s.fg,
                      border: `1px solid ${s.border}`,
                    }}
                  >
                    {d.vote}
                  </span>
                </div>
              </button>

              <div
                id={`decision-${id}-panel`}
                hidden={!open}
                aria-hidden={!open}
                className="pb-6"
              >
                {open && <ExpansionPanels decisionId={id} />}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
