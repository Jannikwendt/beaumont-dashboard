"use client";

import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import Hero from "@/components/Hero";
import CustodyView from "@/components/CustodyView";
import SectionLabel from "@/components/SectionLabel";
import Allocation from "@/components/Allocation";
import Geographic from "@/components/Geographic";
import RiskMetrics from "@/components/RiskMetrics";
import Concentrations from "@/components/Concentrations";
import Currency from "@/components/Currency";
import PerformanceChart from "@/components/PerformanceChart";
import LiquidityLadder from "@/components/LiquidityLadder";
import ReportingCadence from "@/components/ReportingCadence";
import DecisionJournal from "@/components/DecisionJournal";
import Footer from "@/components/Footer";
import OverlayProvider from "@/components/overlays/OverlayProvider";
import { TooltipProvider } from "@/components/overlays/Tooltip";
import OverlayRoot from "@/components/overlays/OverlayRoot";

export default function DashboardShell() {
  return (
    <OverlayProvider>
      <TooltipProvider>
        <main className="mx-auto" style={{ maxWidth: 1440, padding: "0 32px" }}>
          <Header />
          <Tabs />

          <section id="overview">
            <Hero />
            <CustodyView />
          </section>

          <section id="allocation" className="mb-10">
            <SectionLabel number="02" title="ALLOCATION VS. IPS" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <Allocation />
              </div>
              <div className="lg:col-span-1">
                <Geographic />
              </div>
            </div>
          </section>

          <section id="risk" className="mb-10">
            <SectionLabel number="03" title="RISK DASHBOARD" />
            <div className="mb-4">
              <RiskMetrics />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3">
                <Concentrations />
              </div>
              <div className="lg:col-span-2 flex flex-col gap-4">
                <Currency />
                <div id="performance">
                  <PerformanceChart />
                </div>
              </div>
            </div>
          </section>

          <section id="liquidity" className="mb-10">
            <SectionLabel number="04" title="LIQUIDITY & REPORTING CADENCE" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3">
                <LiquidityLadder />
              </div>
              <div className="lg:col-span-2">
                <ReportingCadence />
              </div>
            </div>
          </section>

          <section id="governance" className="mb-4">
            <SectionLabel
              number="05"
              title="INVESTMENT COMMITTEE DECISION JOURNAL"
            />
            <DecisionJournal />
          </section>

          <Footer />
        </main>

        <OverlayRoot />
      </TooltipProvider>
    </OverlayProvider>
  );
}
