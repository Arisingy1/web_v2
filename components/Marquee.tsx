import { IconBolt } from "./icons";

const ITEMS = [
  "Анализируйте собеседования",
  "Нанимайте по ДНК компании",
  "54 психолингвистических параметра",
  "Soft skills в цифрах",
  "Методология STAR",
  "Match % за минуты",
];

/* Amzigo-style infinite scrolling band. Decorative — hidden from a11y tree. */
export default function Marquee({ tone = "ink" }: { tone?: "ink" | "lime" }) {
  const bg = tone === "ink" ? "bg-ink text-white" : "bg-lime text-white";
  const seq = [...ITEMS, ...ITEMS];
  return (
    <div className={`marquee ${bg} py-4`} aria-hidden>
      <div className="marquee-track">
        {seq.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-7 font-display text-lg font-medium tracking-tight">{item}</span>
            <IconBolt className="h-4 w-4 opacity-60" />
          </span>
        ))}
      </div>
    </div>
  );
}
