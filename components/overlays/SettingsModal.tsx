"use client";

import Modal from "./Modal";
import { useOverlays } from "./OverlayProvider";
import { SETTINGS } from "@/lib/details";

// Static, plausible content for each placeholder setting.
const CONTENT: Record<
  string,
  { title: string; sections: { label: string; rows: { k: string; v: string }[] }[] }
> = {
  custodian: {
    title: "CUSTODIAN CONNECTIVITY",
    sections: [
      {
        label: "ACTIVE CONNECTIONS",
        rows: [
          { k: "Pictet Geneva", v: "Open Banking API · real-time · last sync 08:42 CET" },
          { k: "Rothschild Paris", v: "Open Banking API · real-time · last sync 08:39 CET" },
          { k: "Quintet Luxembourg", v: "Open Banking API · daily EOD · last sync 08:41 CET" },
          { k: "CMB Monaco", v: "SFTP file feed · daily 06:00 CET · last sync 06 May" },
        ],
      },
      {
        label: "RECONCILIATION CADENCE",
        rows: [
          { k: "Position-level", v: "Daily · 08:00 CET sweep · 0 breaks tolerance" },
          { k: "Cash & income", v: "Daily · 08:30 CET sweep · 5 EUR rounding tolerance" },
          { k: "Look-through", v: "Weekly · Friday EOD · funds & wrappers" },
        ],
      },
      {
        label: "ALERTS",
        rows: [
          { k: "Sync failure > 1 day", v: "Email + SMS to operations · escalate to I. Beaumont-Laurent" },
          { k: "Break > 1,000 EUR", v: "Email to ops · resolve before next IC" },
        ],
      },
    ],
  },
  notifications: {
    title: "NOTIFICATION PREFERENCES",
    sections: [
      {
        label: "LIMIT-BREACH ALERTS",
        rows: [
          { k: "IPS sleeve drift > 2pp", v: "Email · same day" },
          { k: "Single-line > 9.5% NAV", v: "Email + SMS · same day" },
          { k: "Liquidity (≤30d) < 35%", v: "Email · same day · escalation to IC chair" },
        ],
      },
      {
        label: "IC REMINDERS",
        rows: [
          { k: "Quarterly review", v: "T-21 days · pre-read circulation" },
          { k: "Pre-mortem template", v: "T-7 days · auto-attached to agenda" },
        ],
      },
      {
        label: "DAILY NAV DIGEST",
        rows: [
          { k: "Recipients", v: "Henri, Isabelle, Louis · 09:00 CET" },
          { k: "Content", v: "1-line NAV · IPS-sleeve heatmap · open IC items" },
        ],
      },
    ],
  },
  access: {
    title: "FAMILY MEMBER ACCESS (RBAC)",
    sections: [
      {
        label: "ROLES",
        rows: [
          { k: "G1 · Family Principal", v: "Full read-write · vote · sign IPS" },
          { k: "G2 · NextGen voting", v: "Read-write · vote (1 seat)" },
          { k: "G2 · NextGen observer", v: "Read-only · IC observer status" },
          { k: "G3 · Beneficiary", v: "Read-only · summary view (no holdings)" },
        ],
      },
      {
        label: "EXTERNAL ACCESS",
        rows: [
          { k: "External IC Chair", v: "Read-write · vote · signs IC minutes" },
          { k: "Independent CIO advisor", v: "Read-write · vote · no document custody" },
          { k: "Statutory auditor (Mazars)", v: "Read-only · annual window · IP-restricted" },
          { k: "Tax advisor (PwC)", v: "Read-only · tax-lot view only · per request" },
        ],
      },
    ],
  },
};

export default function SettingsModal() {
  const { activeModal, closeModal, openModal } = useOverlays();
  const open = activeModal?.type === "setting";
  const id = activeModal?.id ?? "custodian";

  // IPS setting reuses the IPS modal — handled in CommandPalette.
  const settingEntry = SETTINGS.find((s) => s.id === id);
  const content = CONTENT[id];

  if (!content || !settingEntry) {
    // Fallback — unknown setting; route to IPS
    if (open) {
      requestAnimationFrame(() => openModal("ips"));
    }
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={closeModal}
      title={content.title}
      width="3xl"
      footer="Read-only in prototype · production view supports inline editing with audit trail"
    >
      <div
        className="text-[11px] uppercase text-[#8F8A82] mb-6"
        style={{ letterSpacing: "0.14em" }}
      >
        {settingEntry.description}
      </div>

      <div className="flex flex-col gap-7">
        {content.sections.map((s) => (
          <section key={s.label}>
            <div
              className="text-[10px] font-medium uppercase text-[#E89B43] mb-3"
              style={{ letterSpacing: "0.18em" }}
            >
              {s.label}
            </div>
            <ul className="flex flex-col">
              {s.rows.map((r, i) => (
                <li
                  key={i}
                  className={
                    "grid items-baseline gap-4 py-2 text-[13px] " +
                    (i > 0 ? "border-t border-[#2B2722]" : "")
                  }
                  style={{
                    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.8fr)",
                  }}
                >
                  <span className="text-[#8F8A82]">{r.k}</span>
                  <span className="text-[#E8E4DE] tnum">{r.v}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Modal>
  );
}
