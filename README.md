# Beaumont Family Office — One Truth Dashboard

> A live, single-page wealth dashboard built as the central demo artefact for an IE Business School Multi-Family Office pitch (Q1 2026). Static prototype, hard-coded mock data, no backend — engineered to be screen-shared on stage in ~25 seconds.

**Live demo:** [beaumont-mfo.vercel.app](https://beaumont-mfo.vercel.app)

![Next.js 16](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white) ![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss&logoColor=white) ![Recharts](https://img.shields.io/badge/Recharts-3.x-ff7f50) ![Radix UI](https://img.shields.io/badge/Radix%20UI-Dialog%20%2B%20Tooltip-7c3aed) ![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-000?logo=vercel) ![License: MIT](https://img.shields.io/badge/License-MIT-9c8a82)

---

## Table of contents

- [Situation](#situation)
- [Complication](#complication)
- [Solution](#solution)
- [The 25-second demo flow](#the-25-second-demo-flow)
- [What you see when you land on the page](#what-you-see-when-you-land-on-the-page)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Design system](#design-system)
- [Interaction model](#interaction-model)
- [Accessibility](#accessibility)
- [Print & export](#print--export)
- [Local development](#local-development)
- [Deployment](#deployment)
- [What is intentionally NOT here](#what-is-intentionally-not-here)
- [Academic context](#academic-context)
- [License](#license)

---

## Situation

The IE Business School *Family Office* course (Prof. Schuller, Q1 2026) assigns a 6-minute pitch where each team proposes a Multi-Family Office offering for the fictional Beaumont family:

- **AUM**: ~€500M
- **Custodians**: 4 (Pictet Geneva, Rothschild Paris, Quintet Luxembourg, CMB Monaco)
- **Currencies**: EUR / CHF / USD
- **Generations**: G1 founders (Henri, Isabelle), G2 NextGen (Louis), G3 beneficiaries
- **Pain points**: fragmented reporting, no IPS discipline, bank-driven decision-making, no decision audit-trail

Every team on the course will SAY some version of *"we will give you ONE consolidated view"*.

Only this team **SHOWS** it.

This dashboard is the artefact behind that promise: a single visual that the audience sees during Speaker 2's ~15-second demo block. Polish, calm density, and institutional restraint matter more than feature count.

## Complication

Three structural failures of the status quo, each addressed by a specific section of the dashboard:

### 1. The "consolidated view" doesn't exist.
UHNW families with 4+ custodians receive four PDFs, four currencies, four NAV cuts, four sets of fees — never reconciled, often disagreeing by quarter-end. Private banks pitch "consolidated reporting" in glossy decks but ship Excel emailed to the principal's PA. The total wealth number on the slide is a guess.

> Addressed by **Section 01 — Consolidated Custody View** and the hero "TOTAL FAMILY WEALTH" tile, each with a source citation tooltip naming the reconciliation method.

### 2. Governance is invisible.
Even when IC meetings happen, decisions are not journaled. There is no audit trail of pre-mortems, bias checks, dissenting votes, or counterfactuals. When a trade fails 18 months later, the family has no way to ask *"did we think about this clearly at the time?"*. Private-bank RMs do not surface their own bias toward home-country trades or fee-rich wrappers.

> Addressed by **Section 05 — IC Decision Journal** with inline *Decision GPS* expansion (pre-mortem · bias check · devil's advocate · vote breakdown · audit trail timestamps).

### 3. Source-of-truth is hand-waved.
Big numbers (€502M, +6.8%, 0.32% TER) are presented without methodology footnotes. A pitch number that cannot be traced to a methodology is a marketing number, not a governance number.

> Addressed by **hover-tooltips on every KPI** — two lines for `Source:` and `Methodology:`, citable verbatim in IC minutes.

## Solution

A single-page Next.js 16 dashboard, statically prerendered, that compresses a typical 40-page IC pre-read into one screen with **five sections** and **four interactive demo moments**:

```
01 · CONSOLIDATED CUSTODY VIEW        4 banks · live sync · API + SFTP feeds
02 · ALLOCATION VS. IPS                IPS V1.2 · 6 sleeves · 2 red breaches · 2 amber
03 · RISK DASHBOARD                     vol / drawdown / concentration / liquidity
04 · LIQUIDITY & REPORTING CADENCE      ladder + daily/monthly/quarterly cadence
05 · IC DECISION JOURNAL                last 3 decisions with full Decision GPS
```

Every figure on the page is mock but **internally consistent**: the 42% 30-day liquidity in the Risk row is the same 42% summarised under the Liquidity Ladder; the +7.8pp Real Assets breach in Section 02 routes to IC #14 in Section 05; the IC #14 proposal targets Lyon SCPI (row 01 of the top-10 concentrations). Every cross-reference is wired and clickable.

## The 25-second demo flow

The pitch script for Speaker 2:

| t      | Action                                                                                              | What the audience sees                                                              |
| ------ | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 0:00   | Land on `beaumont-mfo.vercel.app`                                                                  | Hero strip: €502.4M, +6.8%, 0.32% TER, 4/4 custodians reconciled                    |
| 0:04   | Click **ALLOCATION** tab                                                                            | Smooth-scroll to Section 02, orange underline jumps to ALLOCATION tab               |
| 0:08   | Click the red **+7.8** pill (Real Assets)                                                          | Modal opens: "REAL ASSETS — IPS DEVIATION +7.8pp · OUT OF BAND" with rebalancing plan |
| 0:14   | Close modal, scroll to Section 05                                                                   | Last 3 IC decisions, including the red **REJECTED 1-4** vote                        |
| 0:18   | Click **REJECTED 1-4** decision                                                                     | Row expands inline into 4 panels: Pre-Mortem · Bias Check · Devil's Advocate · Vote |
| 0:24   | Close                                                                                                | "That's a private bank that can't pitch this."                                       |

Three clicks. Three reveals. Each reveal is something a private bank doesn't have on screen.

**Bonus moment** (for Q&A): `Cmd+K` (or `Ctrl+K`) opens a command palette. Type `btc` → press Enter → page scrolls to Section 05 and the BTC tail-hedge decision auto-expands.

## What you see when you land on the page

### Header & tabs
- Brand bar: orange 3×40 px rule + "BEAUMONT FAMILY OFFICE · ONE TRUTH"
- Reporting period (Q1 2026) and last-sync timestamp (11 May 2026, 08:42 CET) emphasized in accent orange
- Sticky tabs: **OVERVIEW · ALLOCATION · RISK · PERFORMANCE · GOVERNANCE · REPORTS** — active tab follows scroll via `IntersectionObserver`; `REPORTS` opens a modal

### Hero strip (Section 00)
Four KPI columns with a 2-pixel orange left border:

| Label | Value | Subtext |
| --- | --- | --- |
| TOTAL FAMILY WEALTH | **€ 502.4M** | ▲ €11.2M QoQ (+2.3%) |
| 12-MO NET RETURN | **+6.8%** | Net of fees · vs. +5.4% 60/40 benchmark |
| ALL-IN FEE (TER) | **0.32%** | vs. 1.40% prior multi-bank setup |
| CUSTODIANS RECONCILED | **4 / 4** | All four banks live-synced today |

Every value is wrapped in a tooltip with `Source:` and `Methodology:` lines (e.g. *"4-bank consolidated NAV · Reconciled 11 May 2026 08:42 CET" / "Custodian statement aggregation, EUR-translated at WMR 16:00 fix"*).

### Section 01 — Consolidated Custody View
Four equal cards: Pictet €175.8M (35%), Rothschild €140.7M (28%), Quintet €110.5M (22%), CMB €75.4M (15%). Three reconciled (green dot, today 08:39–08:42 CET), one manual (amber dot, CMB SFTP feed). **Click any card** → 480 px right side panel with connectivity, RM name + email + phone, mandate type, top-5 positions held there, fee breakdown, re-negotiation flag.

### Section 02 — Allocation vs. IPS
Left: 6-sleeve allocation table with deviation bars (white tick at IPS target, orange fill from midpoint outward). Two red breaches (Real Assets +7.8, Hedge/Macro −5.9), two amber (PE −3.5, Fixed Income +3.4), two OK (Equities, Gold). **Click the IPS V1.2 pill** → full IPS modal (6 sections: Objectives · Risk Limits · Allocation Ranges · Liquidity Rules · Exclusions · Governance). **Click any non-OK pill** → deviation modal with root-cause analysis and approved rebalancing plan.

Right: Recharts donut for geographic exposure (Europe 58 / NA 22 / Asia 14 / EM 6), with an amber flag bar at the bottom: *"Europe exposure 58% vs. 40% target. Home-bias overlay flagged."*

### Section 03 — Risk Dashboard
Four metric tiles: 8.4% volatility ✓, −11.2% drawdown ✓, **28.4%** top-5 concentration (amber — over soft cap), 42% 30-day liquidity ✓. Each value has a source-citation tooltip.

Below: top-10 single-line concentrations table (Lyon SCPI 9.2%, Pictet European Equities 6.4%, LVMH 4.8%, Apollo PE Fund IX 4.1%, …). **Click any row** → right side panel with full instrument detail (ISIN, manager, cost basis, unrealised gain, PE commitment status, redemption frequency, etc.).

Right column: currency exposure bars (EUR 62 / CHF 18 / USD 14 / GBP 4 / OTH 2) + 12-month performance line chart (Beaumont +6.8% solid orange vs. 60/40 benchmark +5.4% dashed muted).

### Section 04 — Liquidity & Reporting Cadence
Liquidity ladder (5 buckets: ≤7d, 8–30d highlighted orange, 31–90d, 91–365d, >365d in amber), summing to 42% in ≤30 days vs. 30% IPS floor — same number as the Risk metric above, deliberately two ways.

Reporting cadence: Daily NAV · Monthly Attribution (with Brinson 3-factor footnote) · Quarterly IC Review (Q1 2026 done, Q2 2026 due 11 Jun for IC #15).

### Section 05 — IC Decision Journal
Last three decisions:

1. **PASSED 4-1** · 12 Mar 2026 · IC #14 · "Reduce real estate overweight by €30M, redeploy into hedge / macro sleeve" (tags: PRE-MORTEM · BIAS: ANCHORING · DECISION GPS)
2. **PASSED 5-0** · 12 Mar 2026 · IC #14 · "Initiate 1% allocation to BTC via regulated ETP as tail hedge" (tags: NEXTGEN-LED · BIAS: NOVELTY · HEDGE SLEEVE)
3. **REJECTED 1-4** · 04 Feb 2026 · IC #13 · "Proposal: increase French equity allocation by €25M" (tags: BIAS: HOME BIAS · IPS GUARDRAIL HELD · DECISION GPS)

**Click any row** → inline 4-panel Decision GPS expansion:

- **Pre-mortem** — counterfactual question + 3 failure modes (each ticked)
- **Bias check** — 5-row table: Home / Recency / Anchoring / Familiarity / Overconfidence, each marked `⚠ FLAGGED`, `✓ Clear`, or `— N/A` with a one-line note
- **Devil's advocate** — rotating member name, italic quote with orange left-border, 3 counter-evidence bullets
- **Vote breakdown** — 5 voting members (H. Beaumont, I. Beaumont-Laurent, L. Beaumont, External IC Chair, Independent CIO advisor), each with `FOR` / `AGAINST` / `ABSTAIN` pill and a 1-line rationale
- **Audit trail** footer line with timestamps for *pre-vote rationale logged* and *outcome logged*

Each decision has distinct, content-appropriate GPS data (real-estate row focuses on rate-cycle timing & anchoring; BTC row focuses on novelty & sleeve-cap discipline; rejected French equity row focuses on home bias & familiarity).

## Tech stack

| Layer            | Choice                                                    | Why                                                                                       |
| ---------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Framework        | **Next.js 16** (App Router, Turbopack, static prerender)  | One static `/` route, zero server cost, deploy free on Vercel Hobby                       |
| Language         | **TypeScript 5**                                          | Typed mock data + props guard against on-stage surprises                                  |
| Styling          | **Tailwind CSS v4** (CSS-based `@theme inline` config)    | Token palette lives in `globals.css`; arbitrary `bg-[#…]` values for institutional colours |
| Font             | **Inter** via `next/font/google` (weights 300/400/500/600) | Tabular numerals, financial-press look                                                    |
| Charting         | **Recharts 3** (donut + line, no tooltip/grid/axis)        | Sparing use — the dashboard is mostly typographic                                          |
| Overlay UX       | **@radix-ui/react-dialog** + **@radix-ui/react-tooltip**  | Focus trap, ESC handling, scroll lock, focus return — accessibility for free               |
| Hosting          | **Vercel** (Hobby, static prerender)                      | One command deploy + sub-100ms TTFB from edge                                              |
| Print export     | Plain CSS `@media print`                                  | `Cmd+P` produces a clean two-page light PDF                                                |

Total runtime: ~85 KB gzipped first-load JS, ~10 KB CSS.

## Project structure

```
beaumont-dashboard/
├── app/
│   ├── globals.css            Tailwind v4 @theme tokens + animations + @media print
│   ├── layout.tsx             Root <html>, Inter font, dark bg
│   └── page.tsx               Server component → renders <DashboardShell />
│
├── components/
│   ├── DashboardShell.tsx     Client wrapper: OverlayProvider + TooltipProvider + sections + OverlayRoot
│   ├── Header.tsx             Brand bar, reporting period, last-sync line
│   ├── Tabs.tsx               Sticky tabs, IntersectionObserver active state, REPORTS → modal
│   ├── Hero.tsx               4-KPI strip with tooltips
│   ├── CustodyView.tsx        Section 01 cards (clickable → side panel)
│   ├── SectionLabel.tsx       Shared "NN · TITLE" label with 24px orange rule
│   ├── Allocation.tsx         Section 02 left card: table + clickable pills + clickable IPS pill
│   ├── Geographic.tsx         Section 02 right card: Recharts donut + amber flag bar
│   ├── RiskMetrics.tsx        Section 03 4-tile row with tooltips
│   ├── Concentrations.tsx     Section 03 top-10 table (rows clickable → side panel)
│   ├── Currency.tsx           Section 03 EUR/CHF/USD bars
│   ├── PerformanceChart.tsx   Section 03 12-month line chart
│   ├── LiquidityLadder.tsx    Section 04 left card: 5 buckets + summary
│   ├── ReportingCadence.tsx   Section 04 right card: daily / monthly / quarterly rows
│   ├── DecisionJournal.tsx    Section 05: 3 expandable IC decision rows + 4-panel GPS
│   ├── Footer.tsx             Confidentiality + provenance line
│   ├── useIsClient.ts         SSR-safe client-mount hook (useSyncExternalStore) for Recharts
│   └── overlays/
│       ├── OverlayProvider.tsx    Context: activePanel, activeModal, expandedDecisionId, commandPaletteOpen + Cmd+K listener
│       ├── Modal.tsx              Radix Dialog wrapper (max-w-xl / max-w-3xl, 56px header, 48px footer)
│       ├── SidePanel.tsx          Radix Dialog wrapper (480px right slide-in, 250ms ease-out)
│       ├── Tooltip.tsx            Radix Tooltip wrapper (200ms open, 100ms close) + TooltipProvider
│       ├── CommandPalette.tsx     Cmd/Ctrl+K palette, ↑↓ nav, Enter to select
│       ├── DetailSections.tsx     Shared label/rows renderer for custody + position panels
│       ├── IpsModal.tsx           Full IPS V1.2 modal (6 sections with tables)
│       ├── ReportsModal.tsx       Reports library (8 entries)
│       ├── DeviationModal.tsx     IPS deviation root-cause + rebalancing plan
│       ├── CustodyPanel.tsx       Per-bank right-side panel
│       ├── PositionPanel.tsx      Per-instrument right-side panel
│       ├── SettingsModal.tsx      Settings placeholders surfaced by Cmd+K
│       └── OverlayRoot.tsx        Mounts all modals + panels + palette at the page root
│
├── lib/
│   ├── data.ts                Top-level dashboard data: HERO, CUSTODIANS, ALLOCATION, GEOGRAPHIC,
│   │                          RISK_METRICS, CONCENTRATIONS, CURRENCIES, PERFORMANCE,
│   │                          DECISIONS, LIQUIDITY_BUCKETS, REPORTING_CADENCE
│   └── details.ts             Detail content for overlays:
│                              - KPI_CITATIONS  (source + methodology for each big number)
│                              - CUSTODY_DETAILS (4 banks × 5 sections each)
│                              - POSITION_DETAILS (10 positions, each with 4–5 sections)
│                              - DEVIATION_DETAILS (4 IPS deviations with rebalancing plans)
│                              - DECISION_GPS (3 decisions × pre-mortem/bias/devil/vote/audit)
│                              - IPS_CONTENT (6 IPS sections, including limit tables)
│                              - REPORTS (8 report cards)
│                              - SETTINGS (4 placeholders)
│
├── public/                    (empty — no images, all SVG inline)
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── postcss.config.mjs
```

## Design system

Defined once in `app/globals.css` via Tailwind v4's `@theme inline { … }` directive. Used everywhere via `bg-[#1C1916]`-style arbitrary values for full control on a single artefact.

| Token              | Hex       | Used for                                                  |
| ------------------ | --------- | --------------------------------------------------------- |
| Background         | `#14110F` | Page                                                      |
| Surface            | `#1C1916` | Cards                                                     |
| Surface-elevated   | `#221E1A` | Nested rows, table hover, decision-GPS panels             |
| Border             | `#2B2722` | Hairlines                                                 |
| Text-primary       | `#E8E4DE` | Body & big numbers                                        |
| Text-secondary     | `#8F8A82` | Captions, labels                                          |
| Text-muted         | `#5C5751` | Footer, audit trails                                      |
| Accent (orange)    | `#E89B43` | Brand, big numbers in custody, active tab, IPS pill       |
| Accent-dim         | `#6B4A24` | Progress track behind orange fills                        |
| Pass-green         | `#4F9E6A` | PASSED tags, OK pills, status dots                        |
| Flag-amber         | `#C68A3B` | Within-tolerance flags, manual reconcile dot              |
| Flag-red           | `#B5573E` | IPS breaches, REJECTED tags                               |

**Typography**: Body 13 px / 1.5 Inter 400. Section labels 11 px / `tracking-[0.18em]` / uppercase / 500 / accent orange with a 24 px orange rule to the left. Big numbers Inter 300, 36–48 px, tight letter-spacing. Tabular numerals (`font-variant-numeric: tabular-nums`) on every number.

**Cards**: `bg-[#1C1916] border border-[#2B2722] rounded-sm p-6`. Corners are nearly square (`rounded-sm`, not `rounded-lg`). Generous padding (24–32 px). No drop shadows. Aesthetic intent: *Bloomberg terminal meets a private bank annual report* — flat, dense, calm, expensive-looking. No emojis. No gradients except a single orange progress-bar fill.

**Animations**: All overlays animate in ≤ 250 ms, ease-out, no spring, no bounce:

| Surface         | Keyframe          | Duration |
| --------------- | ----------------- | -------- |
| Modal backdrop  | `overlayFadeIn`   | 200 ms   |
| Modal content   | `modalContentIn`  | 200 ms   |
| Side panel      | `panelSlideIn`    | 250 ms   |
| Tooltip         | `tooltipFadeIn`   | 150 ms   |
| Command palette | `paletteContentIn` | 200 ms   |

## Interaction model

State lives in `OverlayProvider.tsx`:

```ts
type OverlayState = {
  activePanel:        { type: 'custody' | 'position'; id: string } | null;
  activeModal:        { type: 'ips' | 'deviation' | 'reports' | 'setting'; id?: string } | null;
  expandedDecisionId: string | null;
  commandPaletteOpen: boolean;
};
```

Actions: `openPanel`, `closePanel`, `openModal`, `closeModal`, `toggleDecision`, `expandDecision`, `toggleCommandPalette`, `closeAll`.

Cross-linking is wired:

- **Deviation modal** → *"Linked decisions: IC #14 →"* closes the modal, scrolls to `#governance`, expands decision `d1`.
- **Position side panel** → *"Decision journal entry: IC #14 →"* in the action-status footer does the same.
- **Command palette** → Position result opens its side panel; Decision result expands its row; Section result smooth-scrolls; Report result opens reports modal.

Only one decision row is open at a time (`toggleDecision` collapses any other open row).

## Accessibility

- Every interactive element is a real `<button>`, `<a>`, or `tabIndex={0} role="button"` with `aria-label` / `aria-expanded` / `aria-controls`.
- All overlays use Radix Dialog — focus is trapped while open, `Esc` closes, focus returns to the trigger element on close, body scroll locks.
- Tooltips open on **focus** as well as hover (200 ms delay).
- Visible orange focus ring (`focus-visible:ring-1 focus-visible:ring-[#E89B43]`) on every keyboard-focusable target.
- Command palette: `↑` / `↓` to navigate, `Enter` to select, `Esc` to close, mouse hover syncs with keyboard cursor.

## Print & export

`Cmd+P` (or `Ctrl+P`) in Chrome produces a clean two-page light-background PDF. The `@media print` block in `globals.css`:

- Forces background to white and text to `#14110F`
- Hides every overlay (`.print-hide` is on backdrops, sticky tabs, modal/panel content)
- Lightens card borders to `#d9d4cd`
- Maps accent orange to a darker print-safe `#B5762A`
- Adds `page-break-inside: avoid` to every card

## Local development

Requires Node 20+.

```bash
git clone https://github.com/Jannikwendt/beaumont-mfo-dashboard.git
cd beaumont-mfo-dashboard
npm install
npm run dev
# → http://localhost:3000
```

Other scripts:

```bash
npm run build         # production build (static prerender of /)
npm run start         # serve the production build
npm run lint          # eslint (Next.js config + react-hooks rules)
npx tsc --noEmit      # full type-check
```

## Deployment

Hosted on Vercel, static prerender of `/`:

```bash
# one-time
npm i -g vercel
vercel login
vercel --prod --yes

# subsequent deploys (project is already linked via .vercel/)
vercel --prod
```

The live alias `beaumont-mfo.vercel.app` is attached to the project, so every new production deploy automatically takes over the alias. Vercel Deployment Protection (Hobby default "SSO on all but custom domains") was disabled on this project so the `.vercel.app` URL is publicly accessible without a Vercel login — a one-time `PATCH /v10/projects/{id}` with `{"ssoProtection": null}`.

## What is intentionally NOT here

- **No authentication.** This is a public read-only prototype.
- **No real custodian data.** All NAVs, returns, fees, and reconciliation timestamps are mock. Numbers are internally consistent and plausible for a €500M MFO.
- **No real people.** RM names, family member names, and IC member names are fictional. Any resemblance is coincidental.
- **No financial advice.** This is an academic prototype produced as a course deliverable. Nothing here constitutes investment advice or a recommendation.
- **No bank logos, no images.** The visual identity is pure CSS/SVG — every dot, every progress bar, every chart segment is generated.
- **No backend.** No API, no DB, no server functions. Static prerender only.
- **No analytics.** No tracking pixels, no third-party telemetry beyond Vercel's default deployment logs.

## Academic context

Built as the demo artefact for the Multi-Family Office pitch in the IE Business School *Family Office* course (Prof. Schuller, Q1 2026). The fictional Beaumont family case is used throughout; team and individual names elsewhere in the IC vote rosters are also fictional.

Three concepts borrowed from the course are explicitly surfaced in the UI:

- **Decision GPS** — the Annie Duke / Mauboussin framework around pre-mortem, bias check, devil's advocate, and decision-quality-not-outcome-quality. The expansions under each IC decision row are structured around this overlay.
- **IPS-led portfolio construction** — the Investment Policy Statement (V1.2) modal shows the limits and ranges that the live allocation table is measured against; the red `+7.8` and `−5.9` pills are the visual evidence of the only two out-of-band breaches.
- **Home bias and family business legacy** — the rejected IC decision (REJECTED 1-4, French equity proposal) is the live demonstration of an IPS guardrail holding against a family principal's familiarity bias.

## License

MIT — see [`LICENSE`](./LICENSE) (added at repo creation). All content is mock and produced for academic purposes. Beaumont, family member names, and bank-level positions are fictional.
