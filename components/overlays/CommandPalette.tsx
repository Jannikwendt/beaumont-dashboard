"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOverlays, scrollToSection } from "./OverlayProvider";
import {
  POSITION_DETAILS,
  POSITION_ORDER,
  CUSTODY_DETAILS,
  REPORTS,
  SETTINGS,
} from "@/lib/details";
import { DECISIONS } from "@/lib/data";

type CommandItem = {
  id: string;
  category: "POSITIONS" | "IC DECISIONS" | "SECTIONS" | "REPORTS" | "SETTINGS";
  label: string;
  secondary: string;
  iconLetter: string;
  onSelect: (ctx: ReturnType<typeof useOverlays>) => void;
};

const SECTION_ENTRIES = [
  { id: "overview", label: "Overview", secondary: "Hero & consolidated view" },
  { id: "allocation", label: "Allocation", secondary: "IPS vs. current sleeves" },
  { id: "risk", label: "Risk", secondary: "Volatility, drawdown, concentration" },
  { id: "performance", label: "Performance", secondary: "12-month vs. 60/40 benchmark" },
  { id: "governance", label: "Governance", secondary: "IC decision journal" },
];

function buildCommandItems(): CommandItem[] {
  // POSITIONS — from top-10 concentrations + cross-bank top-5s (deduped by name)
  const seenPositionNames = new Set<string>();
  const positions: CommandItem[] = [];
  for (const id of POSITION_ORDER) {
    const p = POSITION_DETAILS[id];
    seenPositionNames.add(p.name);
    positions.push({
      id: `pos:${p.id}`,
      category: "POSITIONS",
      label: p.name,
      secondary: `${p.assetClass} · ${p.pctNav.toFixed(1)}% NAV`,
      iconLetter: "P",
      onSelect: (ctx) => {
        ctx.closeCommandPalette();
        ctx.openPanel("position", p.id);
      },
    });
  }
  // Custody top-5 lines may include positions not already in the top-10.
  // For dedupe, match by leading text after the "NN · " prefix.
  for (const [, cust] of Object.entries(CUSTODY_DETAILS)) {
    const top5 = cust.sections.find(
      (s) => s.label === "TOP 5 POSITIONS HELD HERE"
    );
    if (!top5) continue;
    for (const row of top5.rows) {
      const name = row.label.replace(/^\d{2}\s·\s/, "").trim();
      if (seenPositionNames.has(name)) continue;
      seenPositionNames.add(name);
      positions.push({
        id: `pos:${cust.id}:${name}`,
        category: "POSITIONS",
        label: name,
        secondary: `Held at ${cust.bank} · ${row.value}`,
        iconLetter: "P",
        onSelect: (ctx) => {
          ctx.closeCommandPalette();
          ctx.openPanel("custody", cust.id);
        },
      });
    }
  }

  // IC DECISIONS
  const decisionIds = ["d1", "d2", "d3"];
  const decisions: CommandItem[] = DECISIONS.map((d, i) => ({
    id: `dec:${decisionIds[i]}`,
    category: "IC DECISIONS",
    label: d.title,
    secondary: `${d.date} · ${d.meeting} · ${d.vote}`,
    iconLetter: "D",
    onSelect: (ctx) => {
      ctx.closeCommandPalette();
      scrollToSection("governance");
      ctx.expandDecision(decisionIds[i]);
    },
  }));

  // SECTIONS
  const sections: CommandItem[] = SECTION_ENTRIES.map((s) => ({
    id: `sec:${s.id}`,
    category: "SECTIONS",
    label: s.label,
    secondary: s.secondary,
    iconLetter: "§",
    onSelect: (ctx) => {
      ctx.closeCommandPalette();
      scrollToSection(s.id);
    },
  }));

  // REPORTS
  const reports: CommandItem[] = REPORTS.map((r) => ({
    id: `rep:${r.id}`,
    category: "REPORTS",
    label: r.name,
    secondary: `${r.date} · ${r.type}`,
    iconLetter: "R",
    onSelect: (ctx) => {
      ctx.closeCommandPalette();
      ctx.openModal("reports");
    },
  }));

  // SETTINGS
  const settings: CommandItem[] = SETTINGS.map((s) => ({
    id: `set:${s.id}`,
    category: "SETTINGS",
    label: s.label,
    secondary: s.description,
    iconLetter: "S",
    onSelect: (ctx) => {
      ctx.closeCommandPalette();
      if (s.id === "ips") ctx.openModal("ips");
      else ctx.openModal("setting", s.id);
    },
  }));

  return [...positions, ...decisions, ...sections, ...reports, ...settings];
}

const CATEGORY_ORDER: CommandItem["category"][] = [
  "POSITIONS",
  "IC DECISIONS",
  "SECTIONS",
  "REPORTS",
  "SETTINGS",
];

function score(item: CommandItem, q: string): number {
  if (!q) return 0;
  const ql = q.toLowerCase();
  const label = item.label.toLowerCase();
  const sec = item.secondary.toLowerCase();
  if (label.startsWith(ql)) return 100;
  if (label.includes(ql)) return 70;
  // word-start match
  if (label.split(/\W+/).some((w) => w.startsWith(ql))) return 60;
  if (sec.includes(ql)) return 30;
  return -1;
}

export default function CommandPalette() {
  const ctx = useOverlays();
  const { commandPaletteOpen, closeCommandPalette } = ctx;
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => buildCommandItems(), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.trim();
    return items
      .map((it) => ({ it, s: score(it, q) }))
      .filter((x) => x.s >= 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.it);
  }, [items, query]);

  const grouped = useMemo(() => {
    const groups = new Map<CommandItem["category"], CommandItem[]>();
    for (const cat of CATEGORY_ORDER) groups.set(cat, []);
    for (const it of filtered) {
      groups.get(it.category)!.push(it);
    }
    // ordered flat list mirrors visual order, used for keyboard nav
    const flat: CommandItem[] = [];
    for (const cat of CATEGORY_ORDER) {
      const arr = groups.get(cat)!;
      flat.push(...arr);
    }
    return { groups, flat };
  }, [filtered]);

  // Focus the input when the palette opens. Pure side effect — no setState.
  useEffect(() => {
    if (!commandPaletteOpen) return;
    const id = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(id);
  }, [commandPaletteOpen]);

  // Keep the active item visible on keyboard navigation. Pure DOM effect.
  useEffect(() => {
    if (!listRef.current) return;
    const node = listRef.current.querySelector<HTMLElement>(
      `[data-cmd-index="${activeIndex}"]`
    );
    if (node) {
      node.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, query]);

  // Reset state on close (next open starts clean) — handled via Dialog's
  // onOpenChange below.
  const onQueryChange = (v: string) => {
    setQuery(v);
    setActiveIndex(0);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setQuery("");
      setActiveIndex(0);
      closeCommandPalette();
    }
  };

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const total = grouped.flat.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (total === 0) return;
      setActiveIndex((i) => (i + 1) % total);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (total === 0) return;
      setActiveIndex((i) => (i - 1 + total) % total);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = grouped.flat[activeIndex];
      if (item) item.onSelect(ctx);
    }
  }

  let runningIndex = -1;

  return (
    <Dialog.Root open={commandPaletteOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay-backdrop fixed inset-0 z-40 bg-[#14110F]/85 backdrop-blur-sm print-hide" />
        <Dialog.Content
          aria-describedby={undefined}
          aria-labelledby="cmd-title"
          onKeyDown={onKeyDown}
          className="palette-content fixed left-1/2 z-50 w-[calc(100vw-32px)] max-w-xl bg-[#1C1916] border border-[#2B2722] rounded-sm shadow-2xl shadow-black/60 outline-none print-hide flex flex-col"
          style={{ top: "20vh", maxHeight: "70vh", transform: "translateX(-50%)" }}
        >
          <Dialog.Title id="cmd-title" className="sr-only">
            Command palette
          </Dialog.Title>

          {/* Search input row */}
          <div
            className="flex items-center gap-3 px-5 border-b border-[#2B2722]"
            style={{ height: 56, flex: "0 0 auto" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className="text-[#8F8A82]"
            >
              <circle
                cx="6"
                cy="6"
                r="4.25"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <path
                d="M9.2 9.2 L12 12"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search positions, decisions, sections, settings…"
              className="flex-1 bg-transparent outline-none text-[14px] text-[#E8E4DE] placeholder:text-[#5C5751]"
              style={{
                caretColor: "#E89B43",
              }}
            />
          </div>

          {/* Results list */}
          <div
            ref={listRef}
            className="overlay-scroll overflow-y-auto py-2 flex-1 min-h-0"
          >
            {grouped.flat.length === 0 ? (
              <div className="px-5 py-6 text-[12px] text-[#8F8A82] tnum">
                No results for &quot;{query}&quot;.
              </div>
            ) : (
              CATEGORY_ORDER.map((cat) => {
                const list = grouped.groups.get(cat)!;
                if (list.length === 0) return null;
                return (
                  <div key={cat} className="mb-1">
                    <div
                      className="px-5 pt-3 pb-1.5 text-[10px] uppercase text-[#5C5751]"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      {cat}
                    </div>
                    <ul>
                      {list.map((it) => {
                        runningIndex += 1;
                        const idx = runningIndex;
                        const isActive = idx === activeIndex;
                        return (
                          <li key={it.id}>
                            <button
                              type="button"
                              data-cmd-index={idx}
                              onMouseEnter={() => setActiveIndex(idx)}
                              onClick={() => it.onSelect(ctx)}
                              className={
                                "w-full flex items-center gap-3 px-5 py-2 text-left cursor-pointer transition-colors duration-150 " +
                                (isActive
                                  ? "bg-[#221E1A]"
                                  : "hover:bg-[#221E1A]/60")
                              }
                            >
                              <span
                                aria-hidden
                                className="inline-flex items-center justify-center text-[10px] font-medium shrink-0"
                                style={{
                                  width: 16,
                                  height: 16,
                                  border: "1px solid #E89B43",
                                  color: "#E89B43",
                                  letterSpacing: "0",
                                  borderRadius: 2,
                                }}
                              >
                                {it.iconLetter}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-[13px] text-[#E8E4DE] truncate">
                                  {it.label}
                                </span>
                                <span className="block text-[11px] text-[#8F8A82] truncate tnum">
                                  {it.secondary}
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer hint row */}
          <div
            className="px-5 border-t border-[#2B2722] text-[10px] uppercase text-[#5C5751] tnum flex items-center gap-4"
            style={{
              height: 36,
              letterSpacing: "0.14em",
              flex: "0 0 auto",
            }}
          >
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>esc close</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
