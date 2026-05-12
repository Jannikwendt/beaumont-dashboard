"use client";

import Modal from "./Modal";
import { useOverlays } from "./OverlayProvider";
import { REPORTS } from "@/lib/details";

export default function ReportsModal() {
  const { activeModal, closeModal } = useOverlays();
  const open = activeModal?.type === "reports";

  return (
    <Modal
      open={open}
      onClose={closeModal}
      title="REPORTS LIBRARY"
      width="3xl"
      footer="Read-only · downloads disabled in prototype · production release fetches from secure document vault"
    >
      <div
        className="text-[11px] uppercase text-[#8F8A82] mb-5"
        style={{ letterSpacing: "0.14em" }}
      >
        8 documents · most recent first
      </div>

      <ul className="flex flex-col">
        {REPORTS.map((r, idx) => (
          <li
            key={r.id}
            className={
              "flex items-center gap-4 py-4 " +
              (idx > 0 ? "border-t border-[#2B2722]" : "")
            }
          >
            <span
              aria-hidden
              className="inline-flex items-center justify-center text-[10px] font-medium shrink-0"
              style={{
                width: 28,
                height: 28,
                border: "1px solid #2B2722",
                color: "#E89B43",
                borderRadius: 2,
                letterSpacing: "0.02em",
              }}
            >
              {r.type}
            </span>

            <span className="flex-1 min-w-0">
              <span className="block text-[15px] text-[#E8E4DE] truncate">
                {r.name}
              </span>
              <span className="block text-[11px] text-[#8F8A82] tnum">
                {r.date}
              </span>
            </span>

            <button
              type="button"
              aria-label={`Download ${r.name}`}
              className="text-[#8F8A82] hover:text-[#E89B43] transition-colors duration-150 -m-2 p-2 cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M8 2 L8 11 M4 7.5 L8 11.5 L12 7.5 M3 14 L13 14"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
