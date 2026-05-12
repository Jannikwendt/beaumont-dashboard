import type { DetailSection } from "@/lib/details";

export default function DetailSections({
  sections,
}: {
  sections: DetailSection[];
}) {
  return (
    <div className="flex flex-col gap-7">
      {sections.map((s) => (
        <section key={s.label}>
          <div
            className="text-[10px] font-medium uppercase text-[#E89B43] mb-3"
            style={{ letterSpacing: "0.18em" }}
          >
            {s.label}
          </div>
          <ul className="flex flex-col">
            {s.rows.map((r, i) => (
              <li
                key={i}
                className={
                  "grid items-baseline gap-4 py-2 text-[13px] " +
                  (i > 0 ? "border-t border-[#2B2722]" : "")
                }
                style={{ gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.6fr)" }}
              >
                <span className="text-[#8F8A82]">{r.label}</span>
                <span className="text-[#E8E4DE] tnum break-words">
                  {r.value}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
