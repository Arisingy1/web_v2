"use client";

import { useState } from "react";
import {
  IconAlert,
  IconChart,
  IconCheck,
  IconScale,
  IconStar,
} from "@/components/icons";

/* ---------------- data ---------------- */

const SKILLS = [
  { label: "Коммуникация", value: 9 },
  { label: "Лидерство", value: 7 },
  { label: "Крит. мышление", value: 8 },
  { label: "Командность", value: 9 },
  { label: "Адаптивность", value: 6 },
  { label: "Ответственность", value: 8 },
];

type StarTag = "Situation" | "Task" | "Action" | "Result";
const TAG_STYLE: Record<StarTag, string> = {
  Situation: "bg-sky-100 text-sky-700",
  Task: "bg-violet-100 text-violet-700",
  Action: "bg-lime-100 text-lime-700",
  Result: "bg-amber-50 text-amber",
};

const STAR: { tag: StarTag; quote: string }[] = [
  {
    tag: "Situation",
    quote:
      "«Когда я пришёл в проект, релизы задерживались на две недели, а команда выгорала от ручного тестирования.»",
  },
  {
    tag: "Task",
    quote:
      "«Моей задачей было сократить time-to-release и снять с QA рутину, не раздувая штат.»",
  },
  {
    tag: "Action",
    quote:
      "«Я внедрил CI с автотестами на критичные сценарии и договорился с продактом о feature-флагах.»",
  },
  {
    tag: "Result",
    quote:
      "«В итоге релизы стали еженедельными, а число продакшн-инцидентов упало примерно на 40%.»",
  },
];

const PROS = [
  { title: "Системный инженерный подход", quote: "«Сначала измеряю, потом оптимизирую — гипотезы без метрик не двигаю.»" },
  { title: "Сильная коммуникация со стейкхолдерами", quote: "«Договорился с продактом о поэтапном внедрении вместо большого релиза.»" },
  { title: "Менторство младших разработчиков", quote: "«Раз в неделю разбираем код джунов и растим их самостоятельность.»" },
];

const CONS = [
  { title: "Ограниченный опыт людского менеджмента", quote: "«Формально подчинённых не было, влиял скорее экспертизой.»" },
  { title: "Склонность к перфекционизму по срокам", quote: "«Иногда задерживаю фичу, пока не доведу детали до идеала.»" },
];

const TABS = [
  { key: "map", label: "Карта компетенций", icon: <IconChart className="h-4 w-4" /> },
  { key: "star", label: "Анализ STAR", icon: <IconStar className="h-4 w-4" /> },
  { key: "pros", label: "За и Против", icon: <IconScale className="h-4 w-4" /> },
];

export default function ReportsPage() {
  const [tab, setTab] = useState("map");

  return (
    <>
      <section className="relative overflow-hidden bg-paper">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="container-x relative py-16 md:py-24">
          {/* candidate header */}
          <div className="flex flex-col gap-6 rounded-[28px] border border-line bg-white p-7 shadow-soft md:flex-row md:items-center md:justify-between md:p-9">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-ink font-display text-xl font-semibold text-lime-50">
                АК
              </div>
              <div>
                <span className="eyebrow mb-2">Демо-отчёт</span>
                <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                  Алексей К.
                </h1>
                <p className="text-sm font-medium text-ink-500">
                  Senior Frontend Developer · интервью 48 мин
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Stat label="Средний балл" value="7.8" suffix="/10" />
              <div className="h-12 w-px bg-line" />
              <Stat label="DNA Match" value="92" suffix="%" accent />
            </div>
          </div>

          {/* tabs */}
          <div className="mt-8" role="tablist" aria-label="Разделы отчёта">
            <div className="flex flex-wrap gap-2">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={tab === t.key}
                  onClick={() => setTab(t.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${
                    tab === t.key
                      ? "border-ink bg-ink text-white"
                      : "border-line bg-white text-ink-500 hover:border-line-green hover:text-ink"
                  }`}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {tab === "map" ? <CompetencyMap /> : null}
              {tab === "star" ? <StarAnalysis /> : null}
              {tab === "pros" ? <ProsCons /> : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  suffix,
  accent,
}: {
  label: string;
  value: string;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <div className="text-right">
      <p className="text-xs font-medium text-ink-400">{label}</p>
      <p className={`font-display text-3xl font-semibold ${accent ? "text-lime-700" : "text-ink"}`}>
        {value}
        {suffix ? <span className="text-base text-ink-400">{suffix}</span> : null}
      </p>
    </div>
  );
}

/* ---------------- Tab 1 · Radar ---------------- */

function CompetencyMap() {
  return (
    <div className="grid items-center gap-6 rounded-3xl border border-line bg-white p-7 shadow-soft lg:grid-cols-[1fr_1fr] md:p-9">
      <Radar />
      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">
          Карта soft skills (1–10)
        </h2>
        {SKILLS.map((s) => (
          <div key={s.label}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-medium text-ink">{s.label}</span>
              <span className="font-semibold text-ink">{s.value}/10</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-lime-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-lime to-lime-600"
                style={{ width: `${s.value * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Radar() {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 120;
  const n = SKILLS.length;

  const point = (i: number, r: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
  };

  const dataPoints = SKILLS.map((s, i) => point(i, (s.value / 10) * radius));
  const dataPath = dataPoints.map((p) => p.join(",")).join(" ");

  return (
    <div className="flex items-center justify-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-auto w-full max-w-sm" role="img" aria-label="Радар-диаграмма компетенций">
        {/* rings */}
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <polygon
            key={f}
            points={SKILLS.map((_, i) => point(i, radius * f).join(",")).join(" ")}
            fill="none"
            stroke="#e2ecd2"
            strokeWidth="1"
          />
        ))}
        {/* spokes */}
        {SKILLS.map((_, i) => {
          const [x, y] = point(i, radius);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e2ecd2" strokeWidth="1" />;
        })}
        {/* data */}
        <polygon points={dataPath} fill="rgba(122,184,0,0.18)" stroke="#7ab800" strokeWidth="2.5" strokeLinejoin="round" />
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="4" fill="#fff" stroke="#6fb716" strokeWidth="2.5" />
        ))}
        {/* labels */}
        {SKILLS.map((s, i) => {
          const [x, y] = point(i, radius + 22);
          return (
            <text
              key={s.label}
              x={x}
              y={y}
              textAnchor={x > cx + 5 ? "start" : x < cx - 5 ? "end" : "middle"}
              dominantBaseline="middle"
              fontSize="11"
              fontWeight="600"
              fill="#4a6b62"
            >
              {s.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

/* ---------------- Tab 2 · STAR ---------------- */

function StarAnalysis() {
  return (
    <div className="rounded-3xl border border-line bg-white p-7 shadow-soft md:p-9">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-xl font-semibold text-ink">
          Разбор кейса по методологии STAR
        </h2>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(TAG_STYLE) as StarTag[]).map((t) => (
            <span key={t} className={`rounded-full px-3 py-1 text-xs font-semibold ${TAG_STYLE[t]}`}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="relative space-y-5 pl-6">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-line" aria-hidden />
        {STAR.map((s, i) => (
          <div key={i} className="relative">
            <span
              className="absolute -left-[22px] top-3 h-3.5 w-3.5 rounded-full border-2 border-white bg-lime shadow"
              aria-hidden
            />
            <div className="rounded-2xl rounded-tl-md border border-line-green bg-cream/50 p-5">
              <span className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${TAG_STYLE[s.tag]}`}>
                {s.tag}
              </span>
              <p className="text-[15px] leading-relaxed text-ink">{s.quote}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Tab 3 · Pros/Cons ---------------- */

function ProsCons() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-3xl border border-line-green bg-lime-50 p-7">
        <div className="mb-5 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime text-white">
            <IconCheck className="h-5 w-5" />
          </span>
          <h2 className="font-display text-xl font-semibold text-ink">Преимущества</h2>
        </div>
        <ul className="space-y-4">
          {PROS.map((p) => (
            <li key={p.title} className="rounded-2xl border border-line-green bg-white/70 p-4">
              <p className="flex items-start gap-2 font-semibold text-ink">
                <IconCheck className="mt-0.5 h-4 w-4 flex-none text-lime-700" />
                {p.title}
              </p>
              <p className="mt-2 border-l-2 border-lime pl-3 text-sm italic text-ink-500">
                {p.quote}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-5 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber text-white">
            <IconAlert className="h-5 w-5" />
          </span>
          <h2 className="font-display text-xl font-semibold text-ink">Зоны риска</h2>
        </div>
        <ul className="space-y-4">
          {CONS.map((c) => (
            <li key={c.title} className="rounded-2xl border border-amber-200 bg-white/70 p-4">
              <p className="flex items-start gap-2 font-semibold text-ink">
                <IconAlert className="mt-0.5 h-4 w-4 flex-none text-amber" />
                {c.title}
              </p>
              <p className="mt-2 border-l-2 border-amber pl-3 text-sm italic text-ink-500">
                {c.quote}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
