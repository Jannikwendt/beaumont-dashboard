"use client";

import { useOverlays } from "./OverlayProvider";
import Modal from "./Modal";
import SectionLabel from "../SectionLabel";
import { IPS_CONTENT, IPS_FOOTER, IPS_HEADER } from "@/lib/details";

export default function IpsModal() {
  const { activeModal, closeModal } = useOverlays();
  const open = activeModal?.type === "ips";

  return (
    <Modal
      open={open}
      onClose={closeModal}
      title={IPS_HEADER.title}
      width="3xl"
      footer={IPS_FOOTER}
    >
      <div
        className="text-[11px] uppercase text-[#8F8A82] mb-6 tnum"
        style={{ letterSpacing: "0.14em" }}
      >
        {IPS_HEADER.subtitle}
      </div>

      <div className="flex flex-col gap-7">
        {IPS_CONTENT.map((s) => (
          <section key={s.number}>
            <SectionLabel number={s.number} title={s.title} />

            {s.bullets && (
              <ul className="flex flex-col gap-2.5 text-[13px] text-[#E8E4DE] leading-relaxed">
                {s.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      aria-hidden
                      className="text-[#E89B43] tnum"
                      style={{ width: 22, flexShrink: 0 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {s.table && (
              <table className="w-full border-separate border-spacing-0 mt-1">
                <thead>
                  <tr
                    className="text-[10px] uppercase text-[#8F8A82]"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    {s.table.columns.map((col, i) => (
                      <th
                        key={col}
                        className={
                          "font-normal pb-3 " +
                          (i === 0 ? "text-left" : "text-right")
                        }
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.table.rows.map((row, ridx) => (
                    <tr key={ridx} className="text-[13px] text-[#E8E4DE]">
                      {row.map((cell, cidx) => {
                        const warn = cell.includes("⚠");
                        const ok = cell.includes("✓");
                        const color = warn
                          ? "#C68A3B"
                          : ok
                          ? "#4F9E6A"
                          : cidx === 0
                          ? "#E8E4DE"
                          : "#E8E4DE";
                        return (
                          <td
                            key={cidx}
                            className={
                              "py-2.5 tnum " +
                              (cidx === 0 ? "text-left" : "text-right") +
                              (ridx > 0 ? " border-t border-[#2B2722]" : "")
                            }
                            style={{ color }}
                          >
                            {cell}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        ))}
      </div>
    </Modal>
  );
}
