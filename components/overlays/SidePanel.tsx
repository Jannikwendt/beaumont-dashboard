"use client";

import * as Dialog from "@radix-ui/react-dialog";

export default function SidePanel({
  open,
  onClose,
  title,
  subtitle,
  badge,
  rightAfterTitle,
  footer,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  rightAfterTitle?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="overlay-backdrop fixed inset-0 z-40 bg-[#14110F]/85 backdrop-blur-sm print-hide" />
        <Dialog.Content
          aria-describedby={undefined}
          className="panel-content fixed right-0 top-0 z-50 h-screen w-full sm:w-[480px] bg-[#1C1916] border-l border-[#2B2722] shadow-2xl shadow-black/60 outline-none flex flex-col print-hide"
        >
          {/* Header */}
          <div
            className="px-6 pt-6 pb-5 border-b border-[#2B2722] flex items-start justify-between gap-4"
            style={{ flex: "0 0 auto" }}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <Dialog.Title
                  className="text-[18px] font-medium text-[#E8E4DE] truncate"
                  style={{ letterSpacing: "0.005em" }}
                >
                  {title}
                </Dialog.Title>
                {badge}
              </div>
              {subtitle && (
                <div
                  className="text-[10px] uppercase text-[#8F8A82] mt-1.5"
                  style={{ letterSpacing: "0.16em" }}
                >
                  {subtitle}
                </div>
              )}
              {rightAfterTitle}
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="text-[#8F8A82] hover:text-[#E8E4DE] transition-colors duration-150 -m-2 p-2 cursor-pointer shrink-0"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3 3 L13 13 M13 3 L3 13"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                </svg>
              </button>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="overlay-scroll overflow-y-auto px-6 py-5 flex-1 min-h-0">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div
              className="px-6 py-4 border-t border-[#2B2722] text-[10px] uppercase text-[#5C5751] tnum leading-relaxed"
              style={{ letterSpacing: "0.14em", flex: "0 0 auto" }}
            >
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
