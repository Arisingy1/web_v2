import type { ReactNode } from "react";

/* ----------------------------------------------------------------
   Shared, on-brand layout + presentational primitives.
   Server components — no client state.
----------------------------------------------------------------- */

export function Section({
  children,
  tone = "white",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: "white" | "cream";
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${tone === "cream" ? "bg-cream" : "bg-paper"} ${className}`}
    >
      <div className="container-x py-20 md:py-28">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  decision,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  decision?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "max-w-3xl"
      }`}
    >
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        {decision ? (
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-400">
            {decision}
          </span>
        ) : null}
      </div>
      <h2 className="text-balance text-3xl font-semibold leading-[1.1] text-ink md:text-[2.7rem]">
        {title}
      </h2>
      {text ? (
        <p className="text-pretty text-base leading-relaxed text-ink-500 md:text-lg">{text}</p>
      ) : null}
    </div>
  );
}

/* A bento card with index numbering + icon, used across landing decisions. */
export function BentoCard({
  index,
  icon,
  title,
  children,
  className = "",
  featured = false,
}: {
  index?: string;
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`group relative flex flex-col gap-4 rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
        featured
          ? "border-lime/40 bg-lime-50"
          : "border-line bg-paper shadow-soft hover:border-line-green"
      } ${className}`}
    >
      <div className="flex items-center justify-between">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-lime-50 transition-colors group-hover:bg-lime group-hover:text-white"
          aria-hidden
        >
          {icon}
        </span>
        {index ? (
          <span className="font-display text-sm font-semibold text-ink-400">{index}</span>
        ) : null}
      </div>
      <h3 className="text-lg font-semibold leading-snug text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-ink-500">{children}</p>
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line-green bg-lime-50 px-3 py-1 text-xs font-semibold text-ink-700">
      {children}
    </span>
  );
}
