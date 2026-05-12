// Detail content for overlays. Mock data, but plausible and self-consistent.

export type DetailRow = { label: string; value: string };
export type DetailSection = { label: string; rows: DetailRow[] };

// ─────────────────────────────────────────────────────────────────────────────
// Per-KPI source citations (tooltips)
// ─────────────────────────────────────────────────────────────────────────────

export const KPI_CITATIONS: Record<
  string,
  { source: string; methodology: string }
> = {
  totalWealth: {
    source: "4-bank consolidated NAV · Reconciled 11 May 2026 08:42 CET",
    methodology:
      "Custodian statement aggregation, EUR-translated at WMR 16:00 fix",
  },
  netReturn: {
    source: "Beaumont composite, 12m trailing",
    methodology: "Time-weighted, net of all fees & FX, daily-priced",
  },
  allInFee: {
    source: "Beaumont aggregate TER",
    methodology:
      "MFO fee 35bps − netting · institutional share classes · zero retrocessions",
  },
  custodians: {
    source: "Custodian connectivity log · 11 May 2026 08:42 CET",
    methodology: "3× open banking API + 1× SFTP file feed (CMB Monaco)",
  },
  volatility: {
    source: "Daily return series, 252-day",
    methodology: "Annualised ex-post σ, gross of fees",
  },
  drawdown: {
    source: "Peak-to-trough, rolling 3y window",
    methodology: "Total-return basis, monthly resolution",
  },
  concentration: {
    source: "Sum of top-5 positions / NAV",
    methodology: "Look-through to underlying issuers",
  },
  liquidity: {
    source: "Monetisable ≤30 days at <50bps haircut",
    methodology: "Asset-level liquidity score (1–5), L1+L2 only",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Custody — full detail per bank
// ─────────────────────────────────────────────────────────────────────────────

export type CustodyDetail = {
  id: string;
  bank: string;
  cityCountry: string;
  aumEUR: number;
  pctOfTotal: number;
  status: "reconciled" | "manual";
  statusLabel: string;
  sections: DetailSection[];
  footer: string;
};

export const CUSTODY_DETAILS: Record<string, CustodyDetail> = {
  pictet: {
    id: "pictet",
    bank: "Pictet",
    cityCountry: "GENEVA · SWITZERLAND",
    aumEUR: 175.8,
    pctOfTotal: 35.0,
    status: "reconciled",
    statusLabel: "Reconciled",
    sections: [
      {
        label: "CONNECTIVITY",
        rows: [
          { label: "Method", value: "Open Banking API (PSD2-compliant, OAuth2)" },
          { label: "Cadence", value: "Real-time positions · EOD valuations" },
          { label: "Last sync", value: "11 May 2026 · 08:42 CET" },
          { label: "Status", value: "Reconciled · 0 breaks" },
        ],
      },
      {
        label: "RELATIONSHIP",
        rows: [
          { label: "RM", value: "Marc-Antoine Boucherie · Senior Banker, UHNW Private Wealth" },
          { label: "Email", value: "ma.boucherie@pictet.com" },
          { label: "Phone", value: "+41 22 397 22 14" },
          { label: "Relationship since", value: "1987 (Henri's father, G0)" },
        ],
      },
      {
        label: "MANDATE",
        rows: [
          { label: "Type", value: "Discretionary segregated mandate" },
          { label: "Currency hedge", value: "EUR-hedged share class" },
          { label: "Benchmark", value: "MSCI ACWI 60% / Bloomberg Global Agg 40%" },
          { label: "Inception", value: "2003 (mandate restructured Q4 2023)" },
        ],
      },
      {
        label: "TOP 5 POSITIONS HELD HERE",
        rows: [
          { label: "01 · Pictet European Equities Fund", value: "Equities · €32.4M · 18.4%" },
          { label: "02 · Gold (physical, Zurich vault)", value: "Hedges · €15.6M · 8.9%" },
          { label: "03 · Pictet Total Return — Mandarin", value: "Hedge Funds · €14.2M · 8.1%" },
          { label: "04 · Apple Inc (direct)", value: "Equities · €11.7M · 6.7%" },
          { label: "05 · Microsoft Corp (direct)", value: "Equities · €10.8M · 6.1%" },
        ],
      },
      {
        label: "FEE BREAKDOWN",
        rows: [
          { label: "Management fee", value: "65 bps" },
          { label: "Custody", value: "15 bps" },
          { label: "Embedded TER (look-through)", value: "18 bps" },
          { label: "Total all-in", value: "98 bps" },
        ],
      },
    ],
    footer:
      "Custodian agreement reviewed Q1 2026 · Next review Q1 2027 · Re-negotiation flag: Pictet — fee compression opportunity (target 75 bps all-in by Q4 2026)",
  },

  rothschild: {
    id: "rothschild",
    bank: "Rothschild",
    cityCountry: "PARIS · FRANCE",
    aumEUR: 140.7,
    pctOfTotal: 28.0,
    status: "reconciled",
    statusLabel: "Reconciled",
    sections: [
      {
        label: "CONNECTIVITY",
        rows: [
          { label: "Method", value: "Open Banking API (Berlin Group NextGenPSD2)" },
          { label: "Cadence", value: "Real-time positions · EOD valuations" },
          { label: "Last sync", value: "11 May 2026 · 08:39 CET" },
          { label: "Status", value: "Reconciled · 0 breaks" },
        ],
      },
      {
        label: "RELATIONSHIP",
        rows: [
          { label: "RM", value: "Élodie Marchand · Director, Family Office Solutions" },
          { label: "Email", value: "e.marchand@rothschildandco.com" },
          { label: "Phone", value: "+33 1 40 74 40 27" },
          { label: "Relationship since", value: "1998 (Henri-led)" },
        ],
      },
      {
        label: "MANDATE",
        rows: [
          { label: "Type", value: "Advisory + execution" },
          { label: "Tilt", value: "Equity-tilted French/EU mandate" },
          { label: "Benchmark", value: "MSCI Europe NR (informal)" },
          { label: "Inception", value: "1998 (re-papered 2017 post-MiFID II)" },
        ],
      },
      {
        label: "TOP 5 POSITIONS HELD HERE",
        rows: [
          { label: "01 · Lyon Industrial Real Estate SCPI", value: "Real Estate · €46.2M · 32.8%" },
          { label: "02 · Bouygues Infrastructure Note", value: "Real Assets · €19.6M · 13.9%" },
          { label: "03 · French OAT 2034", value: "Fixed Income · €18.1M · 12.9%" },
          { label: "04 · LVMH (direct)", value: "Equities · €24.1M · 17.1%" },
          { label: "05 · Hermès (direct)", value: "Equities · €13.6M · 9.7%" },
        ],
      },
      {
        label: "FEE BREAKDOWN",
        rows: [
          { label: "Management fee", value: "40 bps (advisory)" },
          { label: "Custody", value: "12 bps" },
          { label: "Embedded TER (look-through)", value: "28 bps" },
          { label: "Total all-in", value: "80 bps" },
        ],
      },
    ],
    footer:
      "Custodian agreement reviewed Q1 2026 · Next review Q1 2027 · Re-negotiation flag: Rothschild — fund-of-funds wrapper unwind in progress (target completion Q3 2026)",
  },

  quintet: {
    id: "quintet",
    bank: "Quintet",
    cityCountry: "LUXEMBOURG · LUXEMBOURG",
    aumEUR: 110.5,
    pctOfTotal: 22.0,
    status: "reconciled",
    statusLabel: "Reconciled",
    sections: [
      {
        label: "CONNECTIVITY",
        rows: [
          { label: "Method", value: "Open Banking API (Luxembourg ABBL standard)" },
          { label: "Cadence", value: "Daily EOD positions · weekly look-through" },
          { label: "Last sync", value: "11 May 2026 · 08:41 CET" },
          { label: "Status", value: "Reconciled · 0 breaks" },
        ],
      },
      {
        label: "RELATIONSHIP",
        rows: [
          { label: "RM", value: "Philippe Reichel · Head of Family Wealth, Luxembourg" },
          { label: "Email", value: "p.reichel@quintet.com" },
          { label: "Phone", value: "+352 47 47 38 12" },
          { label: "Relationship since", value: "2012 (Isabelle-led)" },
        ],
      },
      {
        label: "MANDATE",
        rows: [
          { label: "Type", value: "Discretionary · multi-asset FoF wrapper" },
          { label: "Migration status", value: "Under migration to segregated mandate (target Q4 2026)" },
          { label: "Benchmark", value: "60/40 EUR composite" },
          { label: "Inception", value: "2012 (KBL → Quintet rebrand 2020)" },
        ],
      },
      {
        label: "TOP 5 POSITIONS HELD HERE",
        rows: [
          { label: "01 · Apollo PE Fund IX", value: "Private Equity · €20.6M · 18.6%" },
          { label: "02 · Quintet Diversified FoF", value: "Multi-asset · €14.6M · 13.2%" },
          { label: "03 · Carmignac Patrimoine", value: "Multi-asset · €12.1M · 11.0%" },
          { label: "04 · KKR European Direct Lending III", value: "Private Credit · €11.2M · 10.1%" },
          { label: "05 · Quintet European Income", value: "Fixed Income · €8.4M · 7.6%" },
        ],
      },
      {
        label: "FEE BREAKDOWN",
        rows: [
          { label: "Management fee", value: "55 bps" },
          { label: "Custody", value: "18 bps" },
          { label: "Embedded TER (look-through)", value: "62 bps" },
          { label: "Total all-in", value: "135 bps (highest of 4 banks)" },
        ],
      },
    ],
    footer:
      "Custodian agreement reviewed Q1 2026 · Next review Q4 2026 · Re-negotiation flag: Quintet — segregation pending (drops embedded TER from 62 → 18 bps post-unwind)",
  },

  cmb: {
    id: "cmb",
    bank: "CMB Monaco",
    cityCountry: "MONACO · MONACO",
    aumEUR: 75.4,
    pctOfTotal: 15.0,
    status: "manual",
    statusLabel: "Manual reconcile",
    sections: [
      {
        label: "CONNECTIVITY",
        rows: [
          { label: "Method", value: "SFTP file feed (PGP-encrypted, daily 06:00 CET)" },
          { label: "Cadence", value: "EOD positions · monthly valuations" },
          { label: "Last sync", value: "06 May 2026 · 06:07 CET (5d ago)" },
          { label: "Status", value: "Manual reconcile · 2 minor breaks (FX rounding)" },
        ],
      },
      {
        label: "RELATIONSHIP",
        rows: [
          { label: "RM", value: "Stefano Riva · Private Banker" },
          { label: "Email", value: "s.riva@cmb.mc" },
          { label: "Phone", value: "+377 93 15 79 38" },
          { label: "Relationship since", value: "2004 (Monaco residency setup)" },
        ],
      },
      {
        label: "MANDATE",
        rows: [
          { label: "Type", value: "Custody-only · self-directed by family" },
          { label: "Currency", value: "EUR / USD dual-denomination" },
          { label: "Benchmark", value: "None (custody mandate)" },
          { label: "Inception", value: "2004" },
        ],
      },
      {
        label: "TOP 5 POSITIONS HELD HERE",
        rows: [
          { label: "01 · Petit Bateau Family Trust (legacy)", value: "Holding · €18.4M · 24.4%" },
          { label: "02 · Monaco real estate (Larvotto apt.)", value: "Real Estate · €14.2M · 18.8%" },
          { label: "03 · USD T-Bills 6m ladder", value: "Cash Equivalents · €11.6M · 15.4%" },
          { label: "04 · Carmignac Patrimoine (secondary)", value: "Multi-asset · €8.2M · 10.9%" },
          { label: "05 · Vontobel Multi-Strat Note", value: "Hedge Funds · €6.8M · 9.0%" },
        ],
      },
      {
        label: "FEE BREAKDOWN",
        rows: [
          { label: "Management fee", value: "0 bps (custody-only)" },
          { label: "Custody", value: "22 bps" },
          { label: "Embedded TER (look-through)", value: "n/a (self-directed)" },
          { label: "Total all-in", value: "22 bps (lowest of 4 banks)" },
        ],
      },
    ],
    footer:
      "Custodian agreement reviewed Q1 2026 · Next review Q1 2027 · Re-negotiation flag: CMB — upgrade SFTP → API connectivity (target H2 2026; PSD2 exemption complicates)",
  },
};

export const CUSTODY_BY_BANK_NAME: Record<string, string> = {
  Pictet: "pictet",
  Rothschild: "rothschild",
  Quintet: "quintet",
  "CMB Monaco": "cmb",
};

// ─────────────────────────────────────────────────────────────────────────────
// Position — full detail per top-10 line
// ─────────────────────────────────────────────────────────────────────────────

export type PositionDetail = {
  id: string;
  rank: string;
  name: string;
  assetClass: string;
  pctNav: number;
  pctBadge: string;
  sections: DetailSection[];
  actionStatus?: {
    title: string;
    lines: string[];
    linkedDecisionId?: string;
  };
};

export const POSITION_DETAILS: Record<string, PositionDetail> = {
  p1: {
    id: "p1",
    rank: "01",
    name: "Lyon Industrial Real Estate SCPI",
    assetClass: "Real Estate",
    pctNav: 9.2,
    pctBadge: "9.2% NAV",
    sections: [
      {
        label: "INSTRUMENT",
        rows: [
          { label: "Type", value: "SCPI (Société Civile de Placement Immobilier)" },
          { label: "ISIN", value: "FR0011234567" },
          { label: "Inception", value: "2008" },
          { label: "Manager", value: "Foncia Pierre Gestion" },
          { label: "Asset focus", value: "French regional industrial real estate (Lyon, Saint-Étienne, Grenoble metro)" },
        ],
      },
      {
        label: "CURRENT VALUATION",
        rows: [
          { label: "Held in", value: "Rothschild Paris" },
          { label: "Current value", value: "€46.2M" },
          { label: "Cost basis", value: "€31.8M" },
          { label: "Unrealised gain", value: "+€14.4M  (+45.3%)" },
          { label: "Last NAV", value: "31 Mar 2026" },
        ],
      },
      {
        label: "PORTFOLIO ROLE",
        rows: [
          { label: "% NAV", value: "9.2%" },
          { label: "% Real Assets sleeve", value: "40.4% (sleeve target 100% · concentration flagged)" },
          { label: "IPS single-line limit", value: "10.0% (0.8pp buffer remaining)" },
        ],
      },
      {
        label: "LIQUIDITY",
        rows: [
          { label: "Redemption frequency", value: "Quarterly" },
          { label: "Notice period", value: "90 days" },
          { label: "12m avg redemption haircut", value: "220 bps" },
          { label: "Estimated full exit", value: "9–18 months" },
        ],
      },
    ],
    actionStatus: {
      title: "ACTION STATUS",
      lines: [
        "IC decision #14 (12 Mar 2026): Partial reduction of €30M approved, target completion Q3 2026",
        "Next milestone: Submit Q2 2026 redemption notice by 30 Jun 2026",
        "Owner: I. Beaumont-Laurent (Operations)",
      ],
      linkedDecisionId: "d1",
    },
  },

  p2: {
    id: "p2",
    rank: "02",
    name: "Pictet European Equities Fund",
    assetClass: "Equities",
    pctNav: 6.4,
    pctBadge: "6.4% NAV",
    sections: [
      {
        label: "INSTRUMENT",
        rows: [
          { label: "Type", value: "UCITS V — long-only European equities" },
          { label: "ISIN", value: "LU0130729974 (I-EUR)" },
          { label: "Inception", value: "1990" },
          { label: "Manager", value: "Pictet Asset Management — Frank Stoner (lead PM)" },
          { label: "Benchmark", value: "MSCI Europe Net Return EUR" },
        ],
      },
      {
        label: "CURRENT VALUATION",
        rows: [
          { label: "Held in", value: "Pictet Geneva (custody) · I-share class" },
          { label: "Current value", value: "€32.4M" },
          { label: "Cost basis", value: "€22.1M" },
          { label: "Unrealised gain", value: "+€10.3M  (+46.6%)" },
          { label: "Last NAV", value: "10 May 2026" },
        ],
      },
      {
        label: "PORTFOLIO ROLE",
        rows: [
          { label: "% NAV", value: "6.4%" },
          { label: "% Equities sleeve", value: "18.7%" },
          { label: "Style exposure", value: "Quality-growth · low turnover (18% p.a.)" },
        ],
      },
      {
        label: "LIQUIDITY",
        rows: [
          { label: "Redemption frequency", value: "Daily" },
          { label: "Notice period", value: "T+1" },
          { label: "Bid-offer spread", value: "≤ 8 bps (Q1 2026 avg)" },
          { label: "Estimated full exit", value: "≤ 3 trading days" },
        ],
      },
      {
        label: "PERFORMANCE",
        rows: [
          { label: "1Y", value: "+8.2% (vs. benchmark +6.4%)" },
          { label: "3Y annualised", value: "+9.1% (vs. benchmark +7.3%)" },
          { label: "5Y annualised", value: "+8.6% (vs. benchmark +7.0%)" },
          { label: "Ongoing charges (OCF)", value: "62 bps" },
        ],
      },
    ],
  },

  p3: {
    id: "p3",
    rank: "03",
    name: "LVMH Moët Hennessy Louis Vuitton SE",
    assetClass: "Equities",
    pctNav: 4.8,
    pctBadge: "4.8% NAV",
    sections: [
      {
        label: "INSTRUMENT",
        rows: [
          { label: "Type", value: "Direct equity holding · ordinary shares" },
          { label: "ISIN", value: "FR0000121014" },
          { label: "Listing", value: "Euronext Paris · ticker MC.PA" },
          { label: "Acquired", value: "2014 (Henri-led)" },
          { label: "Holding rationale", value: "Long-term French luxury anchor; family conviction" },
        ],
      },
      {
        label: "CURRENT VALUATION",
        rows: [
          { label: "Held in", value: "Rothschild Paris (custody)" },
          { label: "Shares held", value: "38,400" },
          { label: "Current value", value: "€24.1M" },
          { label: "Cost basis", value: "€8.4M (12 yr hold)" },
          { label: "Unrealised gain", value: "+€15.7M  (+186.9%)" },
        ],
      },
      {
        label: "PORTFOLIO ROLE",
        rows: [
          { label: "% NAV", value: "4.8%" },
          { label: "% Equities sleeve", value: "14.0%" },
          { label: "IPS single-line limit", value: "10.0% (5.2pp buffer remaining)" },
        ],
      },
      {
        label: "LIQUIDITY",
        rows: [
          { label: "Average daily volume (90d)", value: "~ 510,000 shares (€320M)" },
          { label: "Holding as % of ADV", value: "7.5% (single-day exit feasible at minimal impact)" },
          { label: "Notice period", value: "T+2 settlement" },
        ],
      },
      {
        label: "TAX & GOVERNANCE",
        rows: [
          { label: "Domicile", value: "France · CGT regime applies on disposal" },
          { label: "Embedded gain (PFU 30%)", value: "Latent tax: ~€4.7M (not provisioned)" },
          { label: "Voting", value: "Family does not exercise (registered intermediary)" },
        ],
      },
    ],
  },

  p4: {
    id: "p4",
    rank: "04",
    name: "Apollo Global Management — PE Fund IX",
    assetClass: "Private Equity",
    pctNav: 4.1,
    pctBadge: "4.1% NAV",
    sections: [
      {
        label: "INSTRUMENT",
        rows: [
          { label: "Type", value: "Limited Partnership · 10-year closed-end PE fund" },
          { label: "Vintage", value: "2022" },
          { label: "GP", value: "Apollo Global Management" },
          { label: "Strategy", value: "Large-cap value buyout · global, NA-tilted" },
          { label: "Domicile", value: "Cayman Islands · feeder via Luxembourg SCSp" },
        ],
      },
      {
        label: "COMMITMENT STATUS",
        rows: [
          { label: "Total commitment", value: "€25.0M" },
          { label: "Called to date", value: "€18.7M (75%)" },
          { label: "Unfunded commitment", value: "€6.3M (25%)" },
          { label: "Distributed", value: "€3.0M (12%)" },
          { label: "Current NAV (residual)", value: "€20.6M" },
        ],
      },
      {
        label: "PERFORMANCE",
        rows: [
          { label: "DPI", value: "0.16x" },
          { label: "TVPI", value: "1.18x" },
          { label: "Net IRR (Q1 2026)", value: "+11.4%" },
          { label: "Benchmark (Cambridge buyout median, '22 vintage)", value: "+9.8%" },
        ],
      },
      {
        label: "LIQUIDITY",
        rows: [
          { label: "Lock-up", value: "10y + 2x1y extensions (fund terminates 2032)" },
          { label: "Secondary market", value: "Indicative bid 92% of NAV (Setter Capital, Q1 2026)" },
          { label: "Next capital call (est.)", value: "€2.1M · 30 Sep 2026" },
        ],
      },
      {
        label: "PORTFOLIO ROLE",
        rows: [
          { label: "% NAV", value: "4.1%" },
          { label: "% PE sleeve", value: "24.8%" },
          { label: "IPS single-vintage cap", value: "3.0% (currently 0.8pp over · grand-fathered)" },
        ],
      },
    ],
  },

  p5: {
    id: "p5",
    rank: "05",
    name: "Bouygues Infrastructure Note 2031",
    assetClass: "Real Assets",
    pctNav: 3.9,
    pctBadge: "3.9% NAV",
    sections: [
      {
        label: "INSTRUMENT",
        rows: [
          { label: "Type", value: "Senior unsecured note · private placement" },
          { label: "Issuer", value: "Bouygues Construction SA" },
          { label: "Coupon", value: "4.20% fixed · annual (Jun)" },
          { label: "Maturity", value: "15 Jun 2031" },
          { label: "Rating", value: "BBB+ (Fitch · stable outlook)" },
        ],
      },
      {
        label: "CURRENT VALUATION",
        rows: [
          { label: "Held in", value: "Rothschild Paris" },
          { label: "Face value", value: "€20.0M" },
          { label: "Current value (clean)", value: "€19.6M" },
          { label: "Yield to maturity", value: "4.61%" },
          { label: "Modified duration", value: "4.4 yrs" },
        ],
      },
      {
        label: "PORTFOLIO ROLE",
        rows: [
          { label: "% NAV", value: "3.9%" },
          { label: "Acquired", value: "Q3 2025 (RM-initiated · pre-IPS V1.2 sleeve)" },
          { label: "Classification dispute", value: "Currently in Real Assets · IPS V1.2 review may reclass to Fixed Income" },
        ],
      },
      {
        label: "LIQUIDITY",
        rows: [
          { label: "Secondary market", value: "Limited · 2–3 dealers quote, 25-50 bps spread" },
          { label: "Estimated full exit", value: "1–4 weeks at indicative bid" },
        ],
      },
    ],
  },

  p6: {
    id: "p6",
    rank: "06",
    name: "French OAT — 2.75% 25 May 2034",
    assetClass: "Fixed Income",
    pctNav: 3.6,
    pctBadge: "3.6% NAV",
    sections: [
      {
        label: "INSTRUMENT",
        rows: [
          { label: "Type", value: "Sovereign bond · Obligation Assimilable du Trésor" },
          { label: "ISIN", value: "FR001400FCH9" },
          { label: "Issuer", value: "République Française (AFT)" },
          { label: "Coupon", value: "2.75% fixed · annual (May)" },
          { label: "Maturity", value: "25 May 2034" },
          { label: "Rating", value: "AA- (S&P) / Aa3 (Moody's)" },
        ],
      },
      {
        label: "CURRENT VALUATION",
        rows: [
          { label: "Held in", value: "Rothschild Paris" },
          { label: "Face value", value: "€18.5M" },
          { label: "Current value (clean)", value: "€18.1M" },
          { label: "Yield to maturity", value: "3.06%" },
          { label: "Modified duration", value: "7.1 yrs" },
        ],
      },
      {
        label: "PORTFOLIO ROLE",
        rows: [
          { label: "% NAV", value: "3.6%" },
          { label: "% Fixed Income sleeve", value: "19.6%" },
          { label: "Role", value: "Duration anchor · EUR base-rate exposure" },
        ],
      },
      {
        label: "LIQUIDITY",
        rows: [
          { label: "Market depth", value: "OAT 10y is among most liquid sovereigns globally" },
          { label: "Bid-offer", value: "~1 bp" },
          { label: "Estimated full exit", value: "Same-day at <2 bps haircut" },
        ],
      },
    ],
  },

  p7: {
    id: "p7",
    rank: "07",
    name: "Gold — Physical Allocated (Zurich vault)",
    assetClass: "Hedges",
    pctNav: 3.1,
    pctBadge: "3.1% NAV",
    sections: [
      {
        label: "INSTRUMENT",
        rows: [
          { label: "Type", value: "Allocated bullion · LBMA Good Delivery bars" },
          { label: "Form factor", value: "12 × 400 oz bars (4,800 oz total)" },
          { label: "Vault", value: "Brink's Zurich · vault Z-12" },
          { label: "Custodian", value: "Pictet Geneva (sub-custody arrangement)" },
          { label: "Insurance", value: "Full replacement value · Lloyd's syndicate" },
        ],
      },
      {
        label: "CURRENT VALUATION",
        rows: [
          { label: "Spot reference (LBMA AM fix)", value: "USD 3,247.50 / oz · 09 May 2026" },
          { label: "Current value", value: "€15.6M (4,800 oz @ EUR/USD 1.078)" },
          { label: "Cost basis", value: "€8.9M (acquired 2016)" },
          { label: "Unrealised gain", value: "+€6.7M  (+75.3%)" },
        ],
      },
      {
        label: "PORTFOLIO ROLE",
        rows: [
          { label: "% NAV", value: "3.1%" },
          { label: "% Gold sleeve", value: "77.5%" },
          { label: "Role", value: "Tail hedge · uncorrelated to risk assets in stress" },
        ],
      },
      {
        label: "LIQUIDITY",
        rows: [
          { label: "Realisation method", value: "Bullion bank wire (UBS, JPMorgan)" },
          { label: "Spread to spot", value: "≤ 25 bps for LBMA-good bars" },
          { label: "Estimated full exit", value: "T+2 (physical shipment 5–10 days if required)" },
        ],
      },
    ],
  },

  p8: {
    id: "p8",
    rank: "08",
    name: "Quintet Diversified Fund of Funds",
    assetClass: "Multi-asset",
    pctNav: 2.9,
    pctBadge: "2.9% NAV",
    sections: [
      {
        label: "INSTRUMENT",
        rows: [
          { label: "Type", value: "UCITS V multi-asset FoF" },
          { label: "ISIN", value: "LU2104332218 (I-EUR)" },
          { label: "Inception", value: "2014" },
          { label: "Manager", value: "Quintet Asset Management" },
          { label: "Underlying funds", value: "~ 38 (look-through across 6 sleeves)" },
        ],
      },
      {
        label: "CURRENT VALUATION",
        rows: [
          { label: "Held in", value: "Quintet Luxembourg" },
          { label: "Current value", value: "€14.6M" },
          { label: "Cost basis", value: "€12.0M" },
          { label: "Unrealised gain", value: "+€2.6M  (+21.7%)" },
        ],
      },
      {
        label: "PORTFOLIO ROLE",
        rows: [
          { label: "% NAV", value: "2.9%" },
          { label: "Status", value: "Earmarked for unwind · sleeve to be migrated to segregated mandate Q4 2026" },
        ],
      },
      {
        label: "LIQUIDITY",
        rows: [
          { label: "Redemption frequency", value: "Daily" },
          { label: "Notice period", value: "T+2" },
          { label: "Ongoing charges (OCF)", value: "84 bps (high — driving unwind decision)" },
        ],
      },
    ],
  },

  p9: {
    id: "p9",
    rank: "09",
    name: "Hermès International SCA",
    assetClass: "Equities",
    pctNav: 2.7,
    pctBadge: "2.7% NAV",
    sections: [
      {
        label: "INSTRUMENT",
        rows: [
          { label: "Type", value: "Direct equity holding · ordinary shares" },
          { label: "ISIN", value: "FR0000052292" },
          { label: "Listing", value: "Euronext Paris · ticker RMS.PA" },
          { label: "Acquired", value: "2018 (Isabelle-led)" },
          { label: "Holding rationale", value: "Family-controlled compounder; multi-generational hold" },
        ],
      },
      {
        label: "CURRENT VALUATION",
        rows: [
          { label: "Held in", value: "Rothschild Paris (custody)" },
          { label: "Shares held", value: "5,720" },
          { label: "Current value", value: "€13.6M" },
          { label: "Cost basis", value: "€4.1M" },
          { label: "Unrealised gain", value: "+€9.5M  (+231.7%)" },
        ],
      },
      {
        label: "PORTFOLIO ROLE",
        rows: [
          { label: "% NAV", value: "2.7%" },
          { label: "% Equities sleeve", value: "7.9%" },
          { label: "Role", value: "Conviction hold · permanent allocation (no exit thesis)" },
        ],
      },
      {
        label: "LIQUIDITY",
        rows: [
          { label: "Average daily volume (90d)", value: "~ 32,000 shares (€80M)" },
          { label: "Holding as % of ADV", value: "17.9% (single-day partial exit feasible)" },
        ],
      },
    ],
  },

  p10: {
    id: "p10",
    rank: "10",
    name: "Carmignac Patrimoine",
    assetClass: "Multi-asset",
    pctNav: 2.4,
    pctBadge: "2.4% NAV",
    sections: [
      {
        label: "INSTRUMENT",
        rows: [
          { label: "Type", value: "UCITS V multi-asset (max 50% equity)" },
          { label: "ISIN", value: "FR0010135103 (F-EUR)" },
          { label: "Inception", value: "1989" },
          { label: "Manager", value: "Carmignac Gestion — Rose Ouahba, David Older" },
          { label: "Benchmark", value: "50% MSCI ACWI / 50% Bloomberg Global Agg" },
        ],
      },
      {
        label: "CURRENT VALUATION",
        rows: [
          { label: "Held in", value: "Quintet Luxembourg (primary) · CMB Monaco (secondary)" },
          { label: "Current value (combined)", value: "€12.1M" },
          { label: "Cost basis", value: "€11.2M" },
          { label: "Unrealised gain", value: "+€0.9M  (+8.0%)" },
        ],
      },
      {
        label: "PORTFOLIO ROLE",
        rows: [
          { label: "% NAV", value: "2.4%" },
          { label: "Role", value: "Defensive multi-asset core · low drawdown discipline" },
        ],
      },
      {
        label: "LIQUIDITY",
        rows: [
          { label: "Redemption frequency", value: "Daily" },
          { label: "Notice period", value: "T+1" },
          { label: "Ongoing charges (OCF)", value: "168 bps (under review · share class downgrade pending)" },
        ],
      },
    ],
  },
};

export const POSITION_ORDER = [
  "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10",
] as const;

export const POSITION_BY_NAME: Record<string, string> = {
  "Lyon Industrial Real Estate SCPI": "p1",
  "Pictet European Equities Fund": "p2",
  "LVMH (direct holding)": "p3",
  "Apollo PE Fund IX": "p4",
  "Bouygues Infrastructure Note": "p5",
  "French OAT 2034": "p6",
  "Gold (physical, Zurich vault)": "p7",
  "Quintet Diversified FoF": "p8",
  "Hermès (direct holding)": "p9",
  "Carmignac Patrimoine": "p10",
};

// ─────────────────────────────────────────────────────────────────────────────
// IPS deviation — full detail per allocation row
// ─────────────────────────────────────────────────────────────────────────────

export type DeviationDetail = {
  id: string;
  sleeve: string;
  deviationPp: number;
  status: "in-band" | "out-of-band";
  statusLabel: string;
  current: { pct: number; eur: number };
  target: { pct: number; eur: number };
  min: number;
  max: number;
  breachSummary: string;
  rootCause: string[];
  plan: { title: string; steps: string[] };
  projection: { label: string; value: string }[];
  linkedDecisionId?: string;
};

export const DEVIATION_DETAILS: Record<string, DeviationDetail> = {
  "real-assets": {
    id: "real-assets",
    sleeve: "REAL ASSETS",
    deviationPp: 7.8,
    status: "out-of-band",
    statusLabel: "OUT OF BAND",
    current: { pct: 22.8, eur: 114.5 },
    target: { pct: 15.0, eur: 75.4 },
    min: 10.0,
    max: 20.0,
    breachSummary:
      "+2.8pp above IPS max · +7.8pp above target",
    rootCause: [
      "Lyon Industrial SCPI appreciation (+45% since acquisition) without rebalancing",
      "Bouygues Infrastructure Note acquired Q3 2025 at full sleeve discretion (RM-initiated, pre-IPS)",
      "Drift exacerbated by Q4 2024 equity drawdown (denominator effect)",
    ],
    plan: {
      title: "REBALANCING PLAN — APPROVED IC #14",
      steps: [
        "Reduce Lyon SCPI by €30M via Q2 2026 redemption notice (target settle Q3 2026)",
        "Redeploy €20M into Hedge / Macro sleeve (currently −5.9pp underweight) via Brevan Howard Multi-Strat",
        "Hold €10M as dry powder pending Q4 2026 PE call schedule",
      ],
    },
    projection: [
      { label: "Real Assets", value: "16.8% (within IPS band)" },
      { label: "Hedge / Macro", value: "8.1% (within IPS band)" },
      { label: "Cash / dry powder", value: "+€10M earmarked Q4 2026" },
    ],
    linkedDecisionId: "d1",
  },

  hedge: {
    id: "hedge",
    sleeve: "HEDGE / MACRO / ALTS",
    deviationPp: -5.9,
    status: "out-of-band",
    statusLabel: "OUT OF BAND",
    current: { pct: 4.1, eur: 20.6 },
    target: { pct: 10.0, eur: 50.2 },
    min: 5.0,
    max: 15.0,
    breachSummary: "−0.9pp below IPS min · −5.9pp below target",
    rootCause: [
      "Strategic underweight inherited from 2022 IPS V1.1 (sleeve was 8% target)",
      "Brevan Howard MultiStrat redemption settled Q4 2023, not yet redeployed",
      "Q4 2024 risk-off period: IC paused new hedge fund underwriting pending DDQ refresh",
    ],
    plan: {
      title: "REBALANCING PLAN — APPROVED IC #14",
      steps: [
        "Receive €20M from Lyon SCPI redemption (Q3 2026 settle)",
        "Allocate €15M to Brevan Howard Multi-Strat (refreshed DDQ approved Feb 2026)",
        "Allocate €5M to Marshall Wace TOPS as secondary diversifier",
      ],
    },
    projection: [
      { label: "Hedge / Macro", value: "8.1% (within IPS band)" },
      { label: "Real Assets", value: "16.8% (within IPS band)" },
      { label: "Two breaches resolved in one trade", value: "+1 IPS guardrail restored" },
    ],
    linkedDecisionId: "d1",
  },

  pe: {
    id: "pe",
    sleeve: "PRIVATE EQUITY & CREDIT",
    deviationPp: -3.5,
    status: "in-band",
    statusLabel: "WITHIN BAND · TOLERANCE",
    current: { pct: 16.5, eur: 82.9 },
    target: { pct: 20.0, eur: 100.5 },
    min: 15.0,
    max: 25.0,
    breachSummary: "Within IPS band · 1.5pp above minimum · −3.5pp from target",
    rootCause: [
      "Sleeve is in active commitment phase: 3 vintages live (Apollo IX 2022, KKR DL III 2024, TPG Rise 2025)",
      "Capital-call schedule is back-loaded: ~€18M unfunded across the three funds",
      "Distributions running below pacing model (DPI 0.21x vs. 0.30x model at this stage)",
    ],
    plan: {
      title: "PACING PLAN — IC #13 RATIFIED",
      steps: [
        "No new commitments in Q2 2026 (call-cushion preservation)",
        "Apollo IX projected call €2.1M · 30 Sep 2026",
        "TPG Rise projected call €4.5M · Q4 2026",
        "Sleeve expected to converge to 19.5% by Q2 2027 absent distributions",
      ],
    },
    projection: [
      { label: "PE & Credit (Q2 2027 est.)", value: "19.5% (within IPS band)" },
      { label: "Unfunded commitments", value: "€18.4M / 3.7% NAV" },
      { label: "Action required", value: "None — sleeve self-corrects via natural pacing" },
    ],
  },

  "fixed-income": {
    id: "fixed-income",
    sleeve: "FIXED INCOME & CASH",
    deviationPp: 3.4,
    status: "in-band",
    statusLabel: "WITHIN BAND · TOLERANCE",
    current: { pct: 18.4, eur: 92.4 },
    target: { pct: 15.0, eur: 75.4 },
    min: 10.0,
    max: 20.0,
    breachSummary: "Within IPS band · 1.6pp below maximum · +3.4pp from target",
    rootCause: [
      "Duration was shortened during 2025 rate-hike cycle (avg 4.2y → 6.1y by Q1 2026)",
      "Reinvestment of T-bill ladder maturities into 5-10y OATs increased mark-to-market value",
      "Cash buffer kept elevated ahead of PE capital calls (see PE pacing)",
    ],
    plan: {
      title: "NORMALISATION PATH — IC #14 GUIDANCE",
      steps: [
        "Allow long-end OATs to roll down naturally (no active duration cut)",
        "Deploy €6M cash into PE calls Q3/Q4 2026 per pacing model",
        "Re-evaluate sleeve at Q1 2027 IPS review · no immediate action",
      ],
    },
    projection: [
      { label: "Fixed Income & Cash (Q1 2027 est.)", value: "15.8% (within IPS band)" },
      { label: "Sleeve duration target", value: "5.5y (currently 6.1y)" },
      { label: "Action required", value: "None — sleeve self-corrects" },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Decision GPS — full expansion content per IC decision
// ─────────────────────────────────────────────────────────────────────────────

export type BiasCheckRow = {
  bias: string;
  status: "flagged" | "clear" | "na";
  note: string;
};

export type VoteRow = {
  member: string;
  role: string;
  vote: "FOR" | "AGAINST" | "ABSTAIN";
  rationale: string;
};

export type DecisionGPS = {
  id: string;
  preMortem: {
    counterfactual: string;
    failureModes: string[];
  };
  biasCheck: BiasCheckRow[];
  devilsAdvocate: {
    member: string;
    quote: string;
    counterEvidence: string[];
  };
  votes: VoteRow[];
  auditTrail: string;
};

export const DECISION_GPS: Record<string, DecisionGPS> = {
  d1: {
    id: "d1",
    preMortem: {
      counterfactual:
        "What would have to be true for keeping the real-estate overweight to be the better decision?",
      failureModes: [
        "Rates fall faster than expected and we exit Lyon SCPI at the trough of the redemption queue (cost: 200–300 bps of NAV)",
        "Hedge sleeve redeployment timing risk creates a 6-month cash drag (cost: 30–40 bps)",
        "SCPI manager fee waiver materialises mid-exit — cost basis improves but liquidity locks for an additional 2 quarters",
      ],
    },
    biasCheck: [
      { bias: "Anchoring", status: "flagged", note: "Cost basis €31.8M (acquired 2008) anchors hold-decision; mitigated by independent valuation" },
      { bias: "Status quo bias", status: "flagged", note: "18 years of ownership creates reluctance to act" },
      { bias: "Sunk-cost fallacy", status: "clear", note: "Acquisition costs irrelevant; decision frame is forward-only" },
      { bias: "Loss aversion", status: "clear", note: "Unrealised gain stable; tax planning addresses crystallisation" },
      { bias: "Recency bias", status: "clear", note: "2025 rate moves modelled, not extrapolated" },
    ],
    devilsAdvocate: {
      member: "I. Beaumont-Laurent (Family Principal)",
      quote:
        "I'm not against the trade — I'm against the timing. We are selling into a rate cycle that has not yet completed. A 6-month wait costs us a few bps of opportunity; a 6-month early exit costs us 5% of NAV if rates surprise.",
      counterEvidence: [
        "ECB swap curve still pricing 75 bps of cuts through 2026 — bonds, not real estate cash, are the timing trade",
        "SCPI redemption queue has lengthened 40% YoY — exit liquidity itself is the binding constraint",
        "Hedge sleeve underweight (−5.9pp) is the larger IPS breach — redeploy reduces two flags in one trade, not one",
      ],
    },
    votes: [
      { member: "H. Beaumont", role: "Family Principal", vote: "FOR", rationale: "IPS guardrail is non-negotiable; trust IC process" },
      { member: "I. Beaumont-Laurent", role: "Family Principal", vote: "AGAINST", rationale: "See devil's advocate — timing risk dominates" },
      { member: "L. Beaumont", role: "NextGen", vote: "FOR", rationale: "Reducing illiquid sleeve increases optionality for G3" },
      { member: "External IC Chair", role: "Chair", vote: "FOR", rationale: "Concentration math + rebalancing logic prevails" },
      { member: "Independent CIO advisor", role: "Voting member", vote: "FOR", rationale: "Mechanical trade; defer to IPS rules" },
    ],
    auditTrail:
      "Decision GPS audit-trail · pre-vote rationale logged 12 Mar 2026 09:32 CET · outcome logged 12 Mar 2026 12:08 CET · HARKing prevention: PASSED",
  },

  d2: {
    id: "d2",
    preMortem: {
      counterfactual:
        "What would have to be true for this 1% sleeve to damage the portfolio's long-term risk profile?",
      failureModes: [
        "Sleeve compounds to >3% NAV without rebalancing → exit rule embedded as a hard guardrail in the IPS Annex",
        "Regulated ETP structure collapses (custody/counterparty risk on issuer) → diversify across two ETPs (CoinShares, 21Shares)",
        "Family reputation risk from public-eye disclosure → wrapped inside Quintet sleeve · no individual member reporting line",
      ],
    },
    biasCheck: [
      { bias: "Novelty bias", status: "flagged", note: "Acknowledged and capped at 1% sleeve floor" },
      { bias: "Authority bias", status: "clear", note: "Decision pre-circulated 21 days; no external endorsement weighted" },
      { bias: "Recency bias", status: "flagged", note: "BTC +120% YTD; mitigated by fixed sleeve cap regardless of price" },
      { bias: "Endowment effect", status: "na", note: "No prior position to anchor on" },
      { bias: "Bandwagon effect", status: "clear", note: "Allocation framed as tail hedge, not return-seeking" },
    ],
    devilsAdvocate: {
      member: "External IC Chair",
      quote:
        "The proposal is sound only if we treat this as portfolio insurance, not as alpha. The moment anyone refers to BTC as an investment thesis, the trade must be reversed. The +3% exit rule exists to enforce that discipline mechanically.",
      counterEvidence: [
        "90-day BTC realised volatility 72% vs. equity 12% — sizing rule must be permanent, not negotiable",
        "ETP regulatory cover does not extend to underlying — counterparty risk asymmetric vs. UCITS",
        "Carbon footprint disclosure may surface in family ESG reporting — addressed via offset budget",
      ],
    },
    votes: [
      { member: "H. Beaumont", role: "Family Principal", vote: "FOR", rationale: "L's research memo is robust; sized correctly; bias check honest" },
      { member: "I. Beaumont-Laurent", role: "Family Principal", vote: "FOR", rationale: "Asymmetric payoff at 1%; mechanical exit rule satisfies governance" },
      { member: "L. Beaumont", role: "NextGen", vote: "FOR", rationale: "Owner-led mandate; accountable for execution within sleeve cap" },
      { member: "External IC Chair", role: "Chair", vote: "FOR", rationale: "Approve subject to written exit rule in IPS Annex" },
      { member: "Independent CIO advisor", role: "Voting member", vote: "FOR", rationale: "1% sleeve · no IPS amendment · no objection" },
    ],
    auditTrail:
      "Decision GPS audit-trail · research memo circulated 18 Feb 2026 · pre-vote rationale logged 12 Mar 2026 10:15 CET · outcome logged 12 Mar 2026 13:22 CET · HARKing prevention: PASSED",
  },

  d3: {
    id: "d3",
    preMortem: {
      counterfactual:
        "What would have to be true for this trade to LOSE money over a 3-year horizon?",
      failureModes: [
        "French equity correlated drawdown with existing 58% EU exposure → 14% portfolio loss in stress scenario",
        "Concentration breach → forced unwind at distressed prices in 2027–28 if IPS limit ratchets",
        "Reduces optionality for G3 internationalisation (Louis-led concern · pre-circulated 28 Jan 2026)",
      ],
    },
    biasCheck: [
      { bias: "Home bias", status: "flagged", note: "EU already 18pp above target" },
      { bias: "Recency bias", status: "clear", note: "CAC 40 +14% YTD acknowledged but not driving" },
      { bias: "Anchoring", status: "clear", note: "Independent valuation cross-check applied" },
      { bias: "Familiarity", status: "flagged", note: "H. Beaumont's 40-year RM relationship at Rothschild Paris noted" },
      { bias: "Overconfidence", status: "clear", note: "Member confidence scores within 1-σ range" },
    ],
    devilsAdvocate: {
      member: "External IC Chair",
      quote:
        "This proposal does the opposite of what diversification requires. We are not rotating into Europe — we are doubling our home bet at the worst possible relative valuation. If the family agrees this is about long-term resilience, this trade cannot pass.",
      counterEvidence: [
        "MSCI ACWI vs. MSCI Europe relative valuation gap at 25th-percentile decade-wide — Europe is not the cheap trade it once was",
        "FR-domiciled tax inefficiency for G3 if Louis relocates outside France (pre-CGT 30% on direct holdings)",
        "Sector concentration in CAC 40 already covered by LVMH/Hermès direct holdings — proposal stacks the same risk",
      ],
    },
    votes: [
      { member: "H. Beaumont", role: "Family Principal", vote: "FOR", rationale: "Trust in 40-year Rothschild relationship; intuition on French recovery" },
      { member: "I. Beaumont-Laurent", role: "Family Principal", vote: "AGAINST", rationale: "Concentration math fails; bias check flagged twice" },
      { member: "L. Beaumont", role: "NextGen", vote: "AGAINST", rationale: "Future-state portfolio cannot have 60%+ EU" },
      { member: "External IC Chair", role: "Chair", vote: "AGAINST", rationale: "See devil's advocate position" },
      { member: "Independent CIO advisor", role: "Voting member", vote: "AGAINST", rationale: "IPS guardrail must hold or it is not an IPS" },
    ],
    auditTrail:
      "Decision GPS audit-trail · pre-vote rationale logged 04 Feb 2026 09:14 CET · outcome logged 04 Feb 2026 11:47 CET · HARKing prevention: PASSED",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// IPS V1.2 content
// ─────────────────────────────────────────────────────────────────────────────

export type IpsTableRow = string[];

export type IpsSection = {
  number: string;
  title: string;
  intro?: string;
  bullets?: string[];
  table?: { columns: string[]; rows: IpsTableRow[] };
};

export const IPS_CONTENT: IpsSection[] = [
  {
    number: "01",
    title: "OBJECTIVES",
    bullets: [
      "Preserve real purchasing power of EUR 500M base, post-tax, post-inflation, on a 30-year horizon",
      "Generate cash flow sufficient to cover family lifestyle and philanthropy (target: ≥ 1.5% NAV/year withdrawable)",
      "Build institutional memory and decision discipline across G1 → G3",
    ],
  },
  {
    number: "02",
    title: "RISK LIMITS",
    table: {
      columns: ["Metric", "Limit", "Current"],
      rows: [
        ["Portfolio volatility (1Y)", "≤ 9.0%", "8.4% ✓"],
        ["Max drawdown (3Y)", "≥ −15.0%", "−11.2% ✓"],
        ["Top-5 concentration", "≤ 25.0% (soft)", "28.4% ⚠"],
        ["Single-line", "≤ 10.0%", "9.2% ✓"],
        ["Illiquid sleeve (> 1y)", "≤ 35.0%", "39.3% ⚠"],
      ],
    },
  },
  {
    number: "03",
    title: "ASSET ALLOCATION RANGES",
    table: {
      columns: ["Sleeve", "Min", "Target", "Max", "Current"],
      rows: [
        ["Global Public Equities", "25%", "35%", "45%", "34.2%"],
        ["Private Equity & Credit", "15%", "20%", "25%", "16.5%"],
        ["Real Assets", "10%", "15%", "20%", "22.8% ⚠"],
        ["Fixed Income & Cash", "10%", "15%", "20%", "18.4%"],
        ["Hedge / Macro / Alts", "5%", "10%", "15%", "4.1% ⚠"],
        ["Gold & Tail Hedges", "2%", "5%", "8%", "4.0%"],
      ],
    },
  },
  {
    number: "04",
    title: "LIQUIDITY RULES",
    bullets: [
      "≥ 30% of NAV monetisable in ≤ 30 days at < 50 bps haircut",
      "≥ 60% of NAV monetisable in ≤ 12 months",
      "Single-vintage PE commitments capped at 3% of NAV",
    ],
  },
  {
    number: "05",
    title: "EXCLUSIONS",
    bullets: [
      "No direct holdings in former family-business sector competitors (textile, retail apparel)",
      "No tobacco, controversial weapons, thermal coal extraction",
      "No structured products with embedded principal risk",
      "No single hedge fund > 2% of NAV",
    ],
  },
  {
    number: "06",
    title: "GOVERNANCE",
    bullets: [
      "IC quorum: 3 of 5 voting members, must include ≥ 1 family principal and the external chair",
      "All decisions journaled with Decision GPS overlay (pre-mortem, bias check, devil's advocate)",
      "Annual IPS review every January; emergency review on any limit breach > 2pp",
      "Family Constitution amendments require ≥ 4 of 5 family-eligible votes",
    ],
  },
];

export const IPS_HEADER = {
  title: "INVESTMENT POLICY STATEMENT — V1.2",
  subtitle:
    "Effective 15 January 2026 · Signed by all 3 family principals · Next review Q1 2027",
};

export const IPS_FOOTER =
  "Signed by Henri Beaumont · Isabelle Beaumont-Laurent · Louis Beaumont — 15 Jan 2026 · Witness: External IC Chair";

// ─────────────────────────────────────────────────────────────────────────────
// Reports
// ─────────────────────────────────────────────────────────────────────────────

export type ReportEntry = {
  id: string;
  name: string;
  date: string;
  type: "PDF" | "XLSX";
};

export const REPORTS: ReportEntry[] = [
  { id: "r1", name: "Q1 2026 IC Pack", date: "11 Apr 2026", type: "PDF" },
  { id: "r2", name: "Q1 2026 Performance & Attribution", date: "11 Apr 2026", type: "PDF" },
  { id: "r3", name: "Q1 2026 Risk Report", date: "11 Apr 2026", type: "PDF" },
  { id: "r4", name: "Annual Family Statement 2025", date: "31 Jan 2026", type: "PDF" },
  { id: "r5", name: "Q4 2025 IC Pack", date: "12 Jan 2026", type: "PDF" },
  { id: "r6", name: "IPS V1.2 (current)", date: "15 Jan 2026", type: "PDF" },
  { id: "r7", name: "Family Constitution V1.0", date: "15 Jan 2026", type: "PDF" },
  { id: "r8", name: "2025 Tax Lot Summary (FR/CH/LU)", date: "28 Feb 2026", type: "XLSX" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Settings — placeholders surfaced by command palette
// ─────────────────────────────────────────────────────────────────────────────

export type SettingEntry = {
  id: string;
  label: string;
  description: string;
};

export const SETTINGS: SettingEntry[] = [
  {
    id: "ips",
    label: "IPS V1.2",
    description: "Investment Policy Statement · current version",
  },
  {
    id: "custodian",
    label: "Custodian connectivity",
    description: "API & SFTP feeds · reconciliation cadence",
  },
  {
    id: "notifications",
    label: "Notification preferences",
    description: "Limit-breach alerts · IC reminders · daily NAV digest",
  },
  {
    id: "access",
    label: "Family member access",
    description: "RBAC · G1/G2/G3 roles · external auditor",
  },
];
