# Beaumont Family Office — One Truth Dashboard

> *"You don't need another bank. You need an Institution."*

**Live demo:** [beaumont-mfo.vercel.app](https://beaumont-mfo.vercel.app)

A working prototype of a Multi-Family Office consolidation dashboard, built as the central artefact for a 6-minute pitch in the Family Office & Wealth Management course at IE Business School (Master in Finance, May 2026).

---

## Table of Contents

1. [Assignment context](#assignment-context)
2. [The client](#the-client)
3. [Situation](#situation)
4. [Complication](#complication)
5. [Solution — three pillars](#solution--three-pillars)
6. [What this dashboard does](#what-this-dashboard-does)
7. [Live demo walkthrough](#live-demo-walkthrough)
8. [Tech stack](#tech-stack)
9. [Local development](#local-development)
10. [Deployment](#deployment)
11. [Project structure](#project-structure)
12. [Iteration history](#iteration-history)
13. [Acknowledgements](#acknowledgements)
14. [Disclaimer](#disclaimer)

---

## Assignment context

- **Course:** Family Office & Wealth Management
- **Program:** Master in Finance, IE Business School
- **Professor:** Markus Schuller (Panthera Solutions)
- **Format:** 6-minute pitch + 6-minute Q&A · beauty contest vs. 4 other teams
- **Team:** Group 02 (4 independent wealth managers presenting as senior leadership of a fictional MFO)

**Verbatim brief:**

> "You are a team of independent wealth managers, working with family offices on wealth management solutions. Your team is asked to pitch a bespoke Multi-Family Office proposal to a family of old money (AuM EUR 500M), dissatisfied with its current wealth management setting."

---

## The client

The **Beaumont family** — fictional, but plausibly calibrated:

- 19th-century textile and industrial dynasty from Lyon, France
- Family business sold to a strategic buyer in 1998 for ~€300M
- Current AuM: €500M, accumulated over 27 years across four private banks
- Three principals in the room:
  - **Henri Beaumont** (74) — patriarch, legacy and capital preservation
  - **Isabelle Beaumont-Laurent** (46) — daughter, operational rigour, runs a mid-cap industrial
  - **Louis Beaumont** (24) — grandson, NextGen, just finished his master's

---

## Situation

The Beaumonts currently bank across **four jurisdictions** — Switzerland (Pictet Geneva), France (Rothschild Paris), Luxembourg (Quintet), and Monaco (CMB). Six numbers describe today:

| Number | What it tells us |
|---|---|
| **4** | private banks, no consolidated view |
| **1.4%** | all-in cost · ~€7M / year (Capgemini WWR 2024 mid-range) |
| **4.2%** | 10-year net return vs. 6.5% on a passive 60/40 (Bloomberg) |
| **0** | IPS · 0 IC · 0 Family Constitution |
| **70%** | of UHNW family wealth transitions fail by G3 (Williams & Preisser 2003) |
| **1** | health scare from succession chaos |

---

## Complication

It is not a portfolio problem. It is a **governance problem**.

- **The 2.3pp performance gap** = ~€11.5M / year of foregone return, compounded over a 30-year horizon
- **The 2023 silent migration** — a bank merger quietly wrapped the family's mandate into a fund-of-funds; nobody noticed
- **The retired RM** — Henri's 40-year Geneva relationship replaced by a junior in late 2025
- **The trigger** — Henri's early-2026 health scare exposes the absence of a succession plan

Henri has no succession plan. Isabelle has no consolidated view. Louis has no seat at the table.

That is not a portfolio. That is an institution that does not exist yet.

---

## Solution — three pillars

### 01 · Consolidate
Aggregate all four custodians into a single operating picture. One report. One number. One point of accountability. **This dashboard is the proof.**

### 02 · Govern
Build the institution the family never had:
- **Family Vision** — workshop with all three generations: why does this wealth exist?
- **Family Constitution** — written charter: values, decision rights, succession protocols
- **Investment Policy Statement** — 30-year horizon, signed by every principal
- **Investment Committee** — quarterly, sovereign, with an external chair

### 03 · Optimize
Endowment-style allocation (35 / 20 / 15 / 15 / 10 / 5) with **Decision GPS** behavioural overlay on every IC vote:
- **Pre-mortem** — failure paths surfaced before the vote
- **Bias check** — home, recency, anchoring, familiarity, overconfidence
- **Devil's advocate** — rotating member mandate to argue the opposite case
- **Decision journal** — rationale logged before outcome is known (HARKing prevention)

### The economics
- Today: **1.40% all-in** = €7M / year
- With us: **0.60% all-in** = €3M / year (35bps MFO + institutional share classes + zero retrocessions)
- **€4M annual fee saving + €11.5M performance gap closure = €15.5M annual upside**

### The ask
We do **not** ask the family to move money. We ask for one quarter:
- **90-day audit** at a fixed fee of €120k
- **Two half-day family workshops** (Vision · Values · Decision Rights)
- **Decision point on day 90** — full transparency on what they own, regardless of whether they retain us

---

## What this dashboard does

The "One Truth Dashboard" is the **artefact** that demonstrates Pillar 01 in 25 seconds of live demo. Other teams will *claim* consolidation. This one *shows* it.

Sections, top to bottom:

1. **Hero strip** — €502.4M total NAV, +6.8% 12-mo return, 0.32% all-in fee, 4/4 custodians reconciled
2. **Section 01 · Consolidated Custody View** — four bank cards, each clickable to a side panel with connectivity, mandate type, top 5 positions held, fee breakdown
3. **Section 02 · Allocation vs. IPS** — 6 asset classes with deviation bars; out-of-band sleeves flagged in red, click any pill for the rebalancing plan; geographic donut with home-bias breach alert
4. **Section 03 · Risk Dashboard** — volatility / drawdown / concentration / liquidity vs. IPS caps; top-10 single-line table (clickable to instrument-level detail); currency exposure; 12-month performance vs. 60/40
5. **Section 04 · Liquidity ladder & reporting cadence** — 5 liquidity buckets, 3 cadence rows
6. **Section 05 · IC Decision Journal** — last 3 IC decisions. Click any row to expand the full Decision GPS audit trail: pre-mortem checklist, 5-bias check, devil's-advocate quote, vote-by-member breakdown, HARKing-prevention timestamp

Interactivity:
- Every KPI number has a **source-citation tooltip** on hover (Capgemini, Bloomberg, methodology notes)
- The **IPS V1.2 pill** opens the full Investment Policy Statement (objectives, risk limits, allocation ranges, liquidity rules, exclusions, governance)
- The **REPORTS tab** opens the quarterly report archive
- **Cmd+K / Ctrl+K** opens a command palette to jump to any position, decision, section, or report
- **Print-to-PDF** produces a clean light-background export for the IC pack

---

## Live demo walkthrough

The 25-second Speaker 2 sequence:

1. **Land** on `/` — €502.4M renders in under 500ms
2. **Click `ALLOCATION` tab** → smooth-scroll to Section 02
3. **Click the red `+7.8` Real Assets pill** → modal showing the rebalancing plan (€30M Lyon SCPI reduction approved at IC #14)
4. **Close**, scroll to Section 05
5. **Click the `REJECTED 1-4` decision** → 4-panel inline expansion: pre-mortem (3 failure paths), bias check (HOME BIAS flagged), devil's-advocate quote from the external IC chair, vote breakdown by member with rationale
6. Speaker 2 points at the audit-trail footer: *"pre-vote rationale logged at 09:14 CET, outcome logged at 11:47 CET — HARKing prevention: PASSED."*

That sequence is the entire pitch's differentiator in one screen.

---

## Tech stack

- **[Next.js 14](https://nextjs.org)** (App Router) + TypeScript
- **[Tailwind CSS](https://tailwindcss.com)** v4 with custom design tokens
- **[Recharts](https://recharts.org)** for the donut and performance chart
- **[Radix UI](https://www.radix-ui.com)** primitives (Dialog, Tooltip) for accessibility (focus trap, ESC, scroll lock)
- **[Vercel](https://vercel.com)** for deployment
- **Inter** (via `next/font/google`) — only font used
- No icon library, no UI kit — every visual built with Tailwind + SVG

Design philosophy: *Bloomberg terminal meets a private bank annual report.* Flat, dense, calm, expensive-looking. No gradients (except progress bars). No drop shadows. No rounded-lg.

---

## Local development

```bash
git clone https://github.com/<your-username>/beaumont-dashboard.git
cd beaumont-dashboard
npm install
npm run dev
```

Open http://localhost:3000.

Available scripts:
- `npm run dev` — local dev server with hot reload
- `npm run build` — production build (static prerender)
- `npm run start` — serve the production build
- `npx tsc --noEmit` — type check
- `npm run lint` — ESLint

---

## Deployment

The dashboard deploys to Vercel:

```bash
npm i -g vercel
vercel --prod
```

The project is already linked (see `.vercel/`). Subsequent deploys are one command. Custom alias is wired up:

- Production: **[beaumont-mfo.vercel.app](https://beaumont-mfo.vercel.app)**
- Auto: [beaumont-dashboard.vercel.app](https://beaumont-dashboard.vercel.app)

Vercel Deployment Protection is **disabled** on this project to keep the demo URL fully public.

---

## Project structure

```
beaumont-dashboard/
├── app/
│   ├── layout.tsx              # Inter font, dark theme, metadata
│   ├── page.tsx                # Composes all sections inside <OverlayProvider>
│   └── globals.css             # Tailwind v4 tokens + tabular-nums + print rules
├── components/
│   ├── Header.tsx              # Brand + reporting period
│   ├── Tabs.tsx                # Decorative tabs (now scroll anchors)
│   ├── Hero.tsx                # Four KPIs with tooltips
│   ├── CustodyView.tsx         # Section 01 · clickable bank cards
│   ├── Allocation.tsx          # Section 02 · deviation bars + IPS modal trigger
│   ├── Geographic.tsx          # Donut + home-bias flag
│   ├── RiskMetrics.tsx         # Section 03 · 4 KPI cards
│   ├── Concentrations.tsx      # Top-10 table · row → side panel
│   ├── Currency.tsx            # FX bars
│   ├── PerformanceChart.tsx    # 12-mo line chart
│   ├── LiquidityLadder.tsx     # Section 04 left
│   ├── ReportingCadence.tsx    # Section 04 right
│   ├── DecisionJournal.tsx     # Section 05 · expandable IC decisions
│   ├── Footer.tsx
│   ├── SectionLabel.tsx        # Shared "NN · TITLE" label
│   └── overlays/
│       ├── OverlayProvider.tsx # React Context for modal/panel/expansion state
│       ├── Modal.tsx           # Radix Dialog wrapper
│       ├── SidePanel.tsx       # 480px right-anchored Radix Dialog
│       ├── Tooltip.tsx         # Radix Tooltip wrapper
│       └── CommandPalette.tsx  # Cmd+K palette
├── lib/
│   └── data.ts                 # ALL dashboard numbers as typed constants
├── public/
└── ...standard Next.js files
```

Every number on the page lives in `lib/data.ts`. To tweak a metric, edit one file.

---

## Iteration history

### v1 — Static prototype
Layout, design system, all data hard-coded, read-only. Goal: prove the visual quality bar.

### v2 — Interactive overlays (current)
- Clickable custody cards → side panel (connectivity, mandate, top positions)
- Clickable concentration rows → instrument detail panel
- Clickable allocation deviation pills → rebalancing-plan modal
- IPS V1.2 pill → full IPS modal
- REPORTS tab → quarterly report archive
- Decision Journal rows → inline expansion with full Decision GPS view (pre-mortem, bias check, devil's advocate, vote breakdown)
- Source-citation tooltips on every KPI
- Cmd+K command palette
- Smooth-scroll tab navigation with active-tab tracking

### v3 — Planned
- `+ New IC Decision` floating action: 4-step wizard that walks through Decision GPS for a hypothetical new vote (pre-mortem → bias check → devil's advocate → journal). Answers the Q&A objection: *"what happens for the next decision?"*
- Period selector (Q4 2025 / Q1 2026 / Q2 2026) with continuity-of-history demo
- QR code on print export linking back to the live dashboard

---

## Acknowledgements

- **Prof. Markus Schuller** (Panthera Solutions) — Decision GPS framework, Generation-3 portfolio thinking, the entire course
- **Williams & Preisser** (2003) — 70% G3 wealth-transition failure statistic
- **Brinson, Hood & Beebower** (1986 / 1991) — 90% of long-term performance variability from strategic asset allocation
- **Capgemini World Wealth Report 2024** — UHNW European fee benchmarks
- **Bloomberg** — 60/40 ACWI / Global Aggregate benchmark composition

---

## Disclaimer

The Beaumont family, their wealth, the four custodian banks, the positions, the IC decisions, the fee math, and every number on the dashboard are **fictional**, constructed for an academic pitch exercise at IE Business School. Nothing in this repository constitutes financial advice. The dashboard is a UI prototype with hard-coded mock data and no backend.

---

**MIT License** — do whatever you want with the code. Attribution appreciated but not required.
