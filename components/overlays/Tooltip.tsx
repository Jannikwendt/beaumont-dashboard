"use client";

import * as RTooltip from "@radix-ui/react-tooltip";

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return (
    <RTooltip.Provider delayDuration={200} skipDelayDuration={100}>
      {children}
    </RTooltip.Provider>
  );
}

export default function Tooltip({
  source,
  methodology,
  children,
  side = "bottom",
  align = "start",
}: {
  source: string;
  methodology: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}) {
  return (
    <RTooltip.Root>
      <RTooltip.Trigger asChild>{children}</RTooltip.Trigger>
      <RTooltip.Portal>
        <RTooltip.Content
          side={side}
          align={align}
          sideOffset={6}
          collisionPadding={12}
          className="tooltip-content z-[60] bg-[#221E1A] border border-[#2B2722] px-3 py-2 rounded-sm shadow-xl shadow-black/40 print-hide max-w-[320px]"
        >
          <div className="text-[12px] text-[#E8E4DE] leading-snug">
            <span className="text-[#8F8A82]">Source:</span> {source}
          </div>
          <div className="text-[10px] text-[#5C5751] leading-snug mt-1 tnum">
            <span>Methodology:</span> {methodology}
          </div>
        </RTooltip.Content>
      </RTooltip.Portal>
    </RTooltip.Root>
  );
}
