"use client";

import * as Dialog from "@radix-ui/react-dialog";

type ModalWidth = "xl" | "3xl";

const widthClass: Record<ModalWidth, string> = {
  xl: "max-w-xl",
  "3xl": "max-w-3xl",
};

export default function Modal({
  open,
  onClose,
  title,
  width = "3xl",
  badge,
  footer,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  width?: ModalWidth;
  badge?: React.ReactNode;
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
        <Dialog.Overlay
          className="overlay-backdrop fixed inset-0 z-40 bg-[#14110F]/85 backdrop-blur-sm print-hide"
        />
        <Dialog.Content
          aria-describedby={undefined}
          className={
            "modal-content fixed left-1/2 top-1/2 z-50 w-[calc(100vw-32px)] " +
            widthClass[width] +
            " bg-[#1C1916] border border-[#2B2722] rounded-sm shadow-2xl shadow-black/60 outline-none print-hide flex flex-col"
          }
          style={{
            transform: "translate(-50%, -50%)",
            maxHeight: "85vh",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between gap-4 px-6 border-b border-[#2B2722]"
            style={{ height: 56, flex: "0 0 auto" }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <Dialog.Title
                className="text-[15px] font-medium text-[#E8E4DE] truncate"
                style={{ letterSpacing: "0.01em" }}
              >
                {title}
              </Dialog.Title>
              {badge}
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="text-[#8F8A82] hover:text-[#E8E4DE] transition-colors duration-150 -m-2 p-2 cursor-pointer"
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
          <div className="overlay-scroll overflow-y-auto px-6 py-6 flex-1 min-h-0">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div
              className="px-6 border-t border-[#2B2722] text-[10px] uppercase text-[#5C5751] tnum flex items-center"
              style={{
                height: 48,
                letterSpacing: "0.14em",
                flex: "0 0 auto",
              }}
            >
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
