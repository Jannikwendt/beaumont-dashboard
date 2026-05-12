// Beaumont Family Office — single source of truth for every number on the page.
// All figures are mock data for the IE Business School MFO pitch demo.

export const REPORTING = {
  period: "Q1 2026",
  lastSync: "11 May 2026, 08:42 CET",
  banksConnected: "4/4",
} as const;

export const HERO = {
  totalWealthEUR: 502.4, // millions
  totalWealthLabel: "€ 502.4M",
  qoqDeltaEUR: 11.2, // millions
  qoqDeltaPct: 2.3,
  netReturn12mPct: 6.8,
  netReturnCaption: "Net of fees · vs. +5.4% 60/40 benchmark",
  allInFeePct: 0.32,
  feeCaption: "vs. 1.40% prior multi-bank setup",
  custodiansReconciled: "4 / 4",
  custodiansCaption: "All four banks live-synced today",
} as const;

export type Custodian = {
  bank: string;
  cityCountry: string;
  currency: string;
  aumEUR: number; // millions
  pctOfTotal: number;
  syncTime: string;
  status: "reconciled" | "manual";
  statusLabel: string;
};

export const CUSTODIANS: Custodian[] = [
  {
    bank: "Pictet",
    cityCountry: "GENEVA · SWITZERLAND",
    currency: "CHF",
    aumEUR: 175.8,
    pctOfTotal: 35.0,
    syncTime: "08:42 CET",
    status: "reconciled",
    statusLabel: "Reconciled",
  },
  {
    bank: "Rothschild",
    cityCountry: "PARIS · FRANCE",
    currency: "EUR",
    aumEUR: 140.7,
    pctOfTotal: 28.0,
    syncTime: "08:39 CET",
    status: "reconciled",
    statusLabel: "Reconciled",
  },
  {
    bank: "Quintet",
    cityCountry: "LUXEMBOURG · LUXEMBOURG",
    currency: "EUR",
    aumEUR: 110.5,
    pctOfTotal: 22.0,
    syncTime: "08:41 CET",
    status: "reconciled",
    statusLabel: "Reconciled",
  },
  {
    bank: "CMB Monaco",
    cityCountry: "MONACO · MONACO",
    currency: "EUR / USD",
    aumEUR: 75.4,
    pctOfTotal: 15.0,
    syncTime: "06 May 2026",
    status: "manual",
    statusLabel: "Manual reconcile",
  },
];

export type AllocationStatus = "ok" | "amber" | "red";

export type AllocationRow = {
  assetClass: string;
  currentPct: number;
  targetPct: number;
  deviationPct: number; // current - target
  status: AllocationStatus;
};

export const ALLOCATION: AllocationRow[] = [
  {
    assetClass: "Global Public Equities",
    currentPct: 34.2,
    targetPct: 35.0,
    deviationPct: -0.8,
    status: "ok",
  },
  {
    assetClass: "Private Equity & Credit",
    currentPct: 16.5,
    targetPct: 20.0,
    deviationPct: -3.5,
    status: "amber",
  },
  {
    assetClass: "Real Assets (RE, Infra)",
    currentPct: 22.8,
    targetPct: 15.0,
    deviationPct: 7.8,
    status: "red",
  },
  {
    assetClass: "Fixed Income & Cash",
    currentPct: 18.4,
    targetPct: 15.0,
    deviationPct: 3.4,
    status: "amber",
  },
  {
    assetClass: "Hedge / Macro / Alts",
    currentPct: 4.1,
    targetPct: 10.0,
    deviationPct: -5.9,
    status: "red",
  },
  {
    assetClass: "Gold & Tail Hedges",
    currentPct: 4.0,
    targetPct: 5.0,
    deviationPct: -1.0,
    status: "ok",
  },
];

export type GeoSlice = {
  region: string;
  pct: number;
  color: string;
};

export const GEOGRAPHIC: GeoSlice[] = [
  { region: "Europe", pct: 58, color: "#E89B43" },
  { region: "North America", pct: 22, color: "#B97A30" },
  { region: "Asia ex-EM", pct: 14, color: "#7A4F1C" },
  { region: "Emerging Mkts", pct: 6, color: "#4F9E6A" },
];

export const GEO_FLAG =
  "Europe exposure 58% vs. 40% target. Home-bias overlay flagged.";

export type RiskMetric = {
  label: string;
  value: string;
  caption: string;
  tone: "ok" | "amber" | "red";
};

export const RISK_METRICS: RiskMetric[] = [
  {
    label: "PORTFOLIO VOLATILITY (1Y)",
    value: "8.4%",
    caption: "vs. 9.0% IPS cap",
    tone: "ok",
  },
  {
    label: "MAX DRAWDOWN (3Y)",
    value: "−11.2%",
    caption: "vs. −15.0% IPS cap",
    tone: "ok",
  },
  {
    label: "TOP-5 CONCENTRATION",
    value: "28.4%",
    caption: "vs. 25.0% IPS soft cap",
    tone: "amber",
  },
  {
    label: "LIQUIDITY (≤30 DAYS)",
    value: "42%",
    caption: "vs. 30% floor",
    tone: "ok",
  },
];

export type ConcentrationRow = {
  rank: string;
  position: string;
  assetClass: string;
  pctNav: number;
};

export const CONCENTRATIONS: ConcentrationRow[] = [
  { rank: "01", position: "Lyon Industrial Real Estate SCPI", assetClass: "Real Estate", pctNav: 9.2 },
  { rank: "02", position: "Pictet European Equities Fund", assetClass: "Equities", pctNav: 6.4 },
  { rank: "03", position: "LVMH (direct holding)", assetClass: "Equities", pctNav: 4.8 },
  { rank: "04", position: "Apollo PE Fund IX", assetClass: "Private Equity", pctNav: 4.1 },
  { rank: "05", position: "Bouygues Infrastructure Note", assetClass: "Real Assets", pctNav: 3.9 },
  { rank: "06", position: "French OAT 2034", assetClass: "Fixed Income", pctNav: 3.6 },
  { rank: "07", position: "Gold (physical, Zurich vault)", assetClass: "Hedges", pctNav: 3.1 },
  { rank: "08", position: "Quintet Diversified FoF", assetClass: "Multi-asset", pctNav: 2.9 },
  { rank: "09", position: "Hermès (direct holding)", assetClass: "Equities", pctNav: 2.7 },
  { rank: "10", position: "Carmignac Patrimoine", assetClass: "Multi-asset", pctNav: 2.4 },
];

export type CurrencyRow = {
  ticker: string;
  pct: number;
};

export const CURRENCIES: CurrencyRow[] = [
  { ticker: "EUR", pct: 62 },
  { ticker: "CHF", pct: 18 },
  { ticker: "USD", pct: 14 },
  { ticker: "GBP", pct: 4 },
  { ticker: "OTH", pct: 2 },
];

export type PerfPoint = {
  month: string;
  portfolio: number;
  benchmark: number;
};

// 13 monthly points, May 2025 → May 2026.
// Both start at 0, end at +6.8 / +5.4; portfolio pulls above in the last third.
export const PERFORMANCE: PerfPoint[] = [
  { month: "May 25", portfolio: 0.0, benchmark: 0.0 },
  { month: "Jun 25", portfolio: 0.7, benchmark: 0.6 },
  { month: "Jul 25", portfolio: 1.5, benchmark: 1.2 },
  { month: "Aug 25", portfolio: 1.2, benchmark: 1.0 },
  { month: "Sep 25", portfolio: 1.8, benchmark: 1.5 },
  { month: "Oct 25", portfolio: 2.6, benchmark: 2.2 },
  { month: "Nov 25", portfolio: 3.1, benchmark: 2.6 },
  { month: "Dec 25", portfolio: 3.8, benchmark: 3.2 },
  { month: "Jan 26", portfolio: 4.0, benchmark: 3.6 },
  { month: "Feb 26", portfolio: 4.7, benchmark: 4.1 },
  { month: "Mar 26", portfolio: 5.5, benchmark: 4.6 },
  { month: "Apr 26", portfolio: 6.2, benchmark: 5.0 },
  { month: "May 26", portfolio: 6.8, benchmark: 5.4 },
];

export type DecisionStatus = "passed" | "rejected";

export type Decision = {
  date: string;
  meeting: string;
  title: string;
  body: string;
  tags: string[];
  status: DecisionStatus;
  vote: string;
};

export const DECISIONS: Decision[] = [
  {
    date: "12 MAR 2026",
    meeting: "IC MEETING #14",
    title:
      "Reduce real estate overweight by €30M, redeploy into hedge / macro sleeve",
    body:
      "Real estate sits at 22.8% (target 15%). Liquidity ladder allows partial redemption of Lyon SCPI by Q3 2026. Pre-mortem flagged interest-rate sensitivity. Devil's advocate: I. Beaumont-Laurent argued for delay until rate visibility improves; IC noted the asymmetric risk and approved.",
    tags: ["PRE-MORTEM", "BIAS: ANCHORING", "DECISION GPS"],
    status: "passed",
    vote: "PASSED 4-1",
  },
  {
    date: "12 MAR 2026",
    meeting: "IC MEETING #14",
    title: "Initiate 1% allocation to BTC via regulated ETP as tail hedge",
    body:
      "Position sized to be portfolio-neutral if drawn down 100%. NextGen representative (L. Beaumont) led research memo. Bias check: novelty bias flagged and addressed via fixed sleeve cap. Decision journaled with explicit exit rule at +3% NAV weight.",
    tags: ["NEXTGEN-LED", "BIAS: NOVELTY", "HEDGE SLEEVE"],
    status: "passed",
    vote: "PASSED 5-0",
  },
  {
    date: "04 FEB 2026",
    meeting: "IC MEETING #13",
    title: "Proposal: increase French equity allocation by €25M",
    body:
      "Initiated by H. Beaumont following meeting with Rothschild Paris RM. Home-bias check failed: 58% EU exposure already 18pp above IPS target. Devil's advocate: external IC chair argued the rotation would deepen, not diversify, existing concentration. Rejected unanimously by independent IC members; H. Beaumont concurred after review.",
    tags: ["BIAS: HOME BIAS", "IPS GUARDRAIL HELD", "DECISION GPS"],
    status: "rejected",
    vote: "REJECTED 1-4",
  },
];

export type LiquidityBucket = {
  label: string;
  pctNav: number;
  eur: number; // millions
  tone: "default" | "orange" | "amber";
};

export const LIQUIDITY_BUCKETS: LiquidityBucket[] = [
  {
    label: "≤ 7 days (cash, MMF)",
    pctNav: 8,
    eur: 40.2,
    tone: "default",
  },
  {
    label: "8 – 30 days (listed equities, liquid bonds)",
    pctNav: 34,
    eur: 170.8,
    tone: "orange",
  },
  {
    label: "31 – 90 days (UCITS funds, SCPI partial)",
    pctNav: 21,
    eur: 105.5,
    tone: "default",
  },
  {
    label: "91 – 365 days (PE secondaries, some RE)",
    pctNav: 19,
    eur: 95.5,
    tone: "default",
  },
  {
    label: "> 365 days (locked PE, direct RE)",
    pctNav: 18,
    eur: 90.4,
    tone: "amber",
  },
];

export const LIQUIDITY_SUMMARY = {
  cumulative30dPct: 42,
  ipsFloorPct: 30,
  headroomPp: 12,
} as const;

export type CadenceRow = {
  label: string;
  statusLine: string;
  nextLine: string;
  secondary?: string;
};

export const REPORTING_CADENCE: CadenceRow[] = [
  {
    label: "DAILY NAV",
    statusLine: "Synced 11 May 2026, 08:42 CET",
    nextLine: "Next refresh: 12 May 2026, 08:30 CET",
  },
  {
    label: "MONTHLY ATTRIBUTION",
    statusLine: "Apr 2026 report published 03 May 2026",
    nextLine: "Next: May 2026 report — due 03 Jun 2026",
    secondary: "Brinson 3-factor: allocation / selection / interaction",
  },
  {
    label: "QUARTERLY IC REVIEW",
    statusLine: "Q1 2026 review · IC #14 · 12 Mar 2026",
    nextLine: "Next: Q2 2026 review — IC #15 · 11 Jun 2026",
  },
];
