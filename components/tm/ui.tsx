"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

/* ============================================================
   CountUp — animates 0 → target with easeOutCubic on mount.
   SSR-safe: renders the formatted target on the server and as
   the initial client value, then animates (no hydration drift).
   ============================================================ */
export function CountUp({
  to,
  duration = 1500,
  format = (v: number) => Math.round(v).toString(),
  className,
}: {
  to: number;
  duration?: number;
  format?: (v: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [, setTick] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    started.current = true;
    let raf = 0;
    let startTs = 0;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const t = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = format(to * eased);
      if (t < 1) raf = requestAnimationFrame(step);
      else el.textContent = format(to);
    };
    raf = requestAnimationFrame(step);
    setTick((x) => x + 1);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref} className={className}>
      {format(to)}
    </span>
  );
}

/** thousands with a thin space: 4230 -> "4 230" */
export const ru = (v: number) =>
  Math.round(v).toLocaleString("ru-RU").replace(/ /g, " ");

/* ============================================================
   TalentMind shared design system (from Figma)
   ============================================================ */
export const GREEN = "#7AB800";
export const TEAL = "#11AFCC";
export const INK = "#183833";
export const RED = "#FF5252";
export const BG = "#F4F7F6";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <ArrowUpRight
      className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${className}`}
    />
  );
}

export type TagKind = "interview" | "offer" | "hired" | "reject";

export function Tag({ kind }: { kind: TagKind }) {
  const map = {
    interview: { t: "Интервью", c: TEAL },
    offer: { t: "Оффер", c: GREEN },
    hired: { t: "Нанят", c: GREEN },
    reject: { t: "Отказ", c: RED },
  } as const;
  const { t, c } = map[kind];
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white"
      style={{ background: c }}
    >
      {t}
    </span>
  );
}

export function Badge({ value = "88%" }: { value?: string }) {
  return (
    <span
      className="rounded-full border px-2 py-0.5 text-[11px] font-medium"
      style={{ borderColor: GREEN, color: GREEN }}
    >
      {value}
    </span>
  );
}

export function Candidate({
  name,
  note,
  noteColor,
  tag,
  badge = true,
  noReport = false,
}: {
  name: string;
  note: string;
  noteColor: string;
  tag: TagKind;
  badge?: boolean;
  noReport?: boolean;
}) {
  return (
    <div className="ease-smooth rounded-2xl border border-[#ededed] bg-white p-4 shadow-[0_8px_24px_rgba(24,56,51,0.06)] transition-all duration-300">
      <p className="text-[15px] font-medium" style={{ color: INK }}>
        {name}
      </p>
      <p className="mt-0.5 text-[12px]" style={{ color: noteColor }}>
        {note}
      </p>
      <div className="mt-3 flex items-center gap-2">
        <Tag kind={tag} />
        {badge ? <Badge /> : null}
        {noReport ? <span className="text-[11px] text-gray-400">Нет отчёта</span> : null}
      </div>
    </div>
  );
}

/* Primary / secondary CTA buttons */
export function CTA({
  children,
  href = "#",
  variant = "green",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "green" | "outline";
}) {
  if (variant === "outline") {
    return (
      <a
        href={href}
        className="ease-smooth inline-flex items-center gap-2 rounded-full border border-[#183833]/15 bg-white px-7 py-4 text-base font-medium text-[#183833] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,56,51,0.1)]"
      >
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      className="ease-smooth group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium text-white shadow-[0_18px_40px_rgba(122,184,0,0.3)] transition-all duration-300 hover:-translate-y-1"
      style={{ background: GREEN }}
    >
      {children}
      <Arrow className="h-5 w-5 text-white" />
    </a>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-1.5 text-xs font-medium backdrop-blur"
      style={{ borderColor: `${GREEN}33`, color: INK }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
      {children}
    </span>
  );
}

/* ============================================================
   useReveals — common GSAP setup (reveal / stagger / parallax)
   inside a gsap.context scoped to a root ref. Pass `extra` to add
   page-specific timelines (e.g. the pinned split) in the same ctx.
   ============================================================ */
export function useReveals(extra?: (scope: HTMLElement) => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scope = ref.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".stagger").forEach((g) => {
        gsap.from(g.children, {
          opacity: 0,
          y: 80,
          duration: 0.8,
          ease: g.dataset.ease || "power3.out",
          stagger: parseFloat(g.dataset.stag || "0.15"),
          scrollTrigger: { trigger: g, start: "top 82%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "1");
        const trigger = el.closest("[data-parallax]") || el.parentElement;
        gsap.to(el, {
          yPercent: -speed * 30,
          ease: "none",
          scrollTrigger: {
            trigger: trigger as Element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      extra?.(scope);
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}
