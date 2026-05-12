"use client";

import { useEffect, useState } from "react";
import { scrollToSection, useOverlays } from "@/components/overlays/OverlayProvider";

type Tab = {
  id: string;
  label: string;
  anchor: string | null; // null = action tab (REPORTS)
};

const TABS: Tab[] = [
  { id: "overview", label: "OVERVIEW", anchor: "overview" },
  { id: "allocation", label: "ALLOCATION", anchor: "allocation" },
  { id: "risk", label: "RISK", anchor: "risk" },
  { id: "performance", label: "PERFORMANCE", anchor: "performance" },
  { id: "governance", label: "GOVERNANCE", anchor: "governance" },
  { id: "reports", label: "REPORTS", anchor: null },
];

export default function Tabs() {
  const { openModal } = useOverlays();
  const [activeId, setActiveId] = useState<string>("overview");

  useEffect(() => {
    const anchorIds = TABS.map((t) => t.anchor).filter(
      (x): x is string => !!x
    );

    const elements: HTMLElement[] = [];
    for (const id of anchorIds) {
      const el = document.getElementById(id);
      if (el) elements.push(el);
    }
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Section becomes "active" when it crosses the top 50% region of the viewport.
        rootMargin: "-80px 0px -50% 0px",
        threshold: [0, 0.1, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function onClick(t: Tab, e: React.MouseEvent) {
    if (!t.anchor) {
      e.preventDefault();
      openModal("reports");
      return;
    }
    e.preventDefault();
    setActiveId(t.id);
    scrollToSection(t.anchor);
  }

  return (
    <nav
      aria-label="Dashboard sections"
      className="border-b border-[#2B2722] mb-7 sticky top-0 z-30 bg-[#14110F]/95 backdrop-blur-sm print-hide"
    >
      <ul className="flex items-center gap-7">
        {TABS.map((t) => {
          const isActive = t.anchor && t.id === activeId;
          const href = t.anchor ? `#${t.anchor}` : "#";
          return (
            <li key={t.id}>
              <a
                href={href}
                onClick={(e) => onClick(t, e)}
                aria-current={isActive ? "page" : undefined}
                className={
                  "inline-block py-3 text-[11px] font-medium uppercase border-b-2 transition-colors duration-150 cursor-pointer " +
                  (isActive
                    ? "text-[#E8E4DE] border-[#E89B43] -mb-px"
                    : "text-[#8F8A82] border-transparent hover:text-[#E8E4DE]")
                }
                style={{ letterSpacing: "0.16em" }}
              >
                {t.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
