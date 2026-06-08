"use client";

import { FloatPill } from "./Motion";
import { IconBolt, IconCheck } from "./icons";

/* Amzigo-style hero composition: a browser-framed candidate dashboard with
   levitating glassmorphic stat cards overlapping its edges. */

const SKILLS = [
  { label: "Коммуникация", v: 9 },
  { label: "Лидерство", v: 7 },
  { label: "Критическое мышление", v: 8 },
];

const BARS = [40, 64, 52, 78, 60, 90, 72];

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl px-2 sm:px-6 lg:px-2">
      {/* main browser/dashboard card */}
      <div className="card overflow-hidden">
        {/* browser bar */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-lime" />
          </div>
          <span className="font-mono text-[11px] text-ink-400">talentmind.ru / профиль</span>
          <span className="h-2.5 w-2.5" />
        </div>

        {/* dashboard body */}
        <div className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink font-display text-sm font-semibold text-lime-50">
                АК
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-ink">Алексей К.</p>
                <p className="font-mono text-[11px] text-ink-400">Senior Frontend</p>
              </div>
            </div>
            <span className="rounded-full bg-lime-50 px-3 py-1 font-mono text-[11px] font-semibold text-lime-700">
              Готово
            </span>
          </div>

          {/* skill bars */}
          <div className="space-y-3.5">
            {SKILLS.map((s) => (
              <div key={s.label}>
                <div className="mb-1 flex justify-between text-xs font-medium text-ink-500">
                  <span>{s.label}</span>
                  <span className="text-ink">{s.v}/10</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-lime-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-lime to-lime-600"
                    style={{ width: `${s.v * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* mini area chart */}
          <div className="mt-6 rounded-2xl border border-line-green bg-cream/40 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">
                Динамика найма
              </p>
              <p className="font-display text-sm font-semibold text-lime-700">+38%</p>
            </div>
            <div className="flex h-20 items-end gap-1.5">
              {BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-lime/40 to-lime"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* floating pill — top-left light glass */}
      <FloatPill delay={0.3} duration={4.5} className="absolute -left-4 top-16 z-20 hidden sm:block">
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-[0_24px_50px_-12px_rgba(122,184,0,0.28)] backdrop-blur-xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime text-white">
            <IconBolt className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Обработано</p>
            <p className="font-display text-base font-semibold text-ink">12 480</p>
          </div>
        </div>
      </FloatPill>

      {/* floating card — dark teal, bottom-left (Amzigo "Sales Performance" analogue) */}
      <FloatPill delay={0.7} duration={5.2} amplitude={16} className="absolute -bottom-6 -left-6 z-20 hidden md:block">
        <div className="w-44 rounded-2xl border border-white/10 bg-ink p-4 text-white shadow-lift">
          <p className="font-mono text-[10px] uppercase tracking-wider text-lime-50/60">DNA Match</p>
          <p className="mt-1 font-display text-3xl font-semibold text-lime">92%</p>
          <p className="mt-1 text-[11px] text-lime-50/70">Совместимость с командой</p>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-lime">
            <IconCheck className="h-3.5 w-3.5" /> Рекомендован
          </div>
        </div>
      </FloatPill>

      {/* floating pill — right, AI active */}
      <FloatPill delay={1} duration={4.8} className="absolute -right-3 bottom-24 z-20 hidden lg:block">
        <div className="flex items-center gap-2.5 rounded-full border border-white/60 bg-white/80 px-4 py-2.5 shadow-[0_24px_50px_-12px_rgba(24,56,51,0.18)] backdrop-blur-xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime/70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
          </span>
          <span className="text-sm font-semibold text-ink">ИИ-анализ активен</span>
        </div>
      </FloatPill>
    </div>
  );
}
