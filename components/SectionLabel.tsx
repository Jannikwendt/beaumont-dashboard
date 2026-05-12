type SectionLabelProps = {
  number: string;
  title: string;
};

export default function SectionLabel({ number, title }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="block h-px w-6 bg-[#E89B43]" aria-hidden />
      <span
        className="text-[11px] font-medium uppercase text-[#E89B43]"
        style={{ letterSpacing: "0.18em" }}
      >
        {number} · {title}
      </span>
    </div>
  );
}
