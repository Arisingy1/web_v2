"use client";

import { useEffect, useRef, useState } from "react";
import { GREEN, INK, TEAL } from "./ui";

/* ============================================================
   «Как это работает?» — full-width схема перетекания данных.
   Заголовок и сцена выровнены по левому краю (как предыдущая
   секция, px-12), без mx-auto/max-w в центре. Сцена 1500×600
   масштабируется на всю ширину; SVG-слой в тех же координатах.
   Все заголовки блоков — одного размера (text-base); если текст
   не влезает в 2 строки, расширяется сам блок (а не шрифт).
   ============================================================ */

const W = 1500;
const H = 600;

function useFit(ref: React.RefObject<HTMLDivElement | null>) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return scale;
}

/* Ядро → ОДНА линия → «Отчёт по soft skills», и ТОЛЬКО оттуда
   ветвление вверх к ATS и к ЛК. */
const PATHS: { d: string; dur: number }[] = [
  { d: "M75,126 V390", dur: 3.0 },                   // Клиент → вниз → контейнер ВКС
  { d: "M150,98 H210", dur: 2.2 },                   // Клиент → вправо → Разовая настройка
  { d: "M450,150 H470 V220 H490", dur: 3.2 },        // Разовая настройка → Ядро
  { d: "M460,480 H475 V460 H490", dur: 3.2 },        // Контейнер ВКС → Ядро
  { d: "M920,320 H940 V460 H960", dur: 2.6 },        // Ядро → Отчёт по soft skills (одна линия)
  { d: "M1110,350 V280 H1070 V210", dur: 2.8 },      // Отчёт → вверх → Экспорт в ATS
  { d: "M1110,350 V280 H1340 V210", dur: 3.0 },      // Отчёт → вверх → Отчёт в ЛК
];

/* единый размер заголовка для всех блоков */
const TITLE = "text-base font-semibold leading-snug";

function Card({
  style,
  className = "",
  children,
  plain = false,
}: {
  style: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
  plain?: boolean;
}) {
  return (
    <div
      style={style}
      className={`ease-smooth absolute z-10 rounded-2xl transition-all duration-300 ${
        plain
          ? "border border-[#e3e6e2] bg-[#fafbf9]"
          : "cursor-pointer border border-[#ededed] bg-white shadow-[0_12px_30px_rgba(24,56,51,0.07)] hover:z-20 hover:scale-[1.03] hover:shadow-[0_24px_55px_rgba(24,56,51,0.14)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function HowItWorks() {
  const fitRef = useRef<HTMLDivElement>(null);
  const scale = useFit(fitRef);

  return (
    <section id="how-it-works" className="w-full scroll-mt-28 bg-[#F4F7F6] px-6 py-24 md:px-12">
      {/* ---------- заголовок: по левому краю, без центрирования ---------- */}
      <div className="reveal w-full text-left">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#ededed] bg-white px-4 py-1.5 font-mono text-xs uppercase tracking-widest" style={{ color: TEAL }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: TEAL }} /> Как это работает
        </span>
        <h2 className="mt-6 max-w-4xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl" style={{ color: INK }}>
          Оценка по вашему культурному коду,
          <br className="hidden sm:block" /> а не по универсальным шаблонам
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#183833]/70">
          Импорт данных (культура и интервью) → Аналитическое ИИ-ядро → Наглядные
          оценки и отчёты по soft skills
        </p>
      </div>

      {/* ---------- сцена на всю ширину ---------- */}
      <div ref={fitRef} className="reveal mt-14 w-full" style={{ height: H * scale }}>
        <div className="relative origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
          {/* ===== SVG: серые пунктиры + бегущий зелёный сигнал ===== */}
          <svg className="pointer-events-none absolute inset-0 z-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden>
            {PATHS.map((p, i) => (
              <path key={`base-${i}`} d={p.d} stroke="#cdd6cf" strokeWidth={1.6} strokeDasharray="5 7" strokeLinecap="round" strokeLinejoin="round" />
            ))}
            {PATHS.map((p, i) => (
              <path key={`flow-${i}`} className="flow-line" d={p.d} stroke={GREEN} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
            ))}
            {PATHS.map((p, i) => (
              <g key={`dot-${i}`}>
                <circle r={9} fill={GREEN} opacity={0.18}>
                  <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" calcMode="linear" path={p.d} />
                  <animate attributeName="opacity" dur={`${p.dur}s`} repeatCount="indefinite" values="0;0.18;0.18;0.18;0" keyTimes="0;0.08;0.5;0.92;1" />
                </circle>
                <circle r={4} fill={GREEN}>
                  <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" calcMode="linear" path={p.d} />
                  <animate attributeName="opacity" dur={`${p.dur}s`} repeatCount="indefinite" values="0;1;1;1;0" keyTimes="0;0.08;0.5;0.92;1" />
                </circle>
              </g>
            ))}
          </svg>

          {/* ===================== КОЛОНКА 1 — ВВОД ===================== */}
          {/* Клиент (по левому краю, x=0) */}
          <Card style={{ left: 0, top: 70, width: 150, height: 56 }} className="grid place-items-center">
            <span className={TITLE} style={{ color: INK }}>Клиент</span>
          </Card>

          {/* Контейнер: Автоимпорт / Ручная загрузка (расширен под 2-строчные заголовки) */}
          <Card plain style={{ left: 0, top: 390, width: 460, height: 180 }} className="flex items-stretch gap-3 p-4">
            <div className="ease-smooth flex flex-1 cursor-pointer flex-col justify-between rounded-xl border border-[#ededed] bg-white p-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_16px_36px_rgba(24,56,51,0.12)]">
              <p className={TITLE} style={{ color: INK }}>Автоимпорт интервью из ВКС</p>
              <div className="flex items-center gap-2">
                <img src="/image 31358.png" alt="Контур Толк" className="h-7 w-7 object-contain" />
                <img src="/image 31359.png" alt="Контур Толк" className="h-4 w-auto object-contain" />
              </div>
            </div>
            <span className="flex shrink-0 items-center text-sm text-[#183833]/50">или</span>
            <div className="ease-smooth flex flex-1 cursor-pointer flex-col justify-between rounded-xl border border-[#ededed] bg-white p-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_16px_36px_rgba(24,56,51,0.12)]">
              <p className={TITLE} style={{ color: INK }}>Ручная загрузка интервью</p>
              <div className="flex items-center gap-2">
                <img src="/ic_library_books_48px.png" alt="" className="h-6 w-6 object-contain" />
                <img src="/figma/logo.svg" alt="TalentMind" className="h-4 w-auto" />
              </div>
            </div>
          </Card>

          {/* Разовая настройка */}
          <Card style={{ left: 210, top: 70, width: 240, height: 160 }} className="p-5">
            <p className={TITLE} style={{ color: INK }}>Разовая настройка</p>
            <div className="mt-5 flex justify-around text-center">
              <div className="flex w-[46%] flex-col items-center gap-2">
                <img src="/people.png" alt="" className="h-10 w-10 object-contain" />
                <span className="text-[11px] leading-tight text-[#183833]/70">Реальная культура</span>
              </div>
              <div className="flex w-[46%] flex-col items-center gap-2">
                <img src="/ic_library_books_48px.png" alt="" className="h-10 w-10 object-contain" />
                <span className="text-[11px] leading-tight text-[#183833]/70">Декларируемая культура</span>
              </div>
            </div>
          </Card>

          {/* ===================== КОЛОНКА 2 — ЯДРО ===================== */}
          <Card plain style={{ left: 490, top: 70, width: 430, height: 500 }} className="flex flex-col p-6">
            <div className="ease-smooth cursor-pointer rounded-xl border border-[#ededed] bg-white p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_14px_30px_rgba(24,56,51,0.1)]">
              <p className={TITLE} style={{ color: INK }}>Оценка корпоративной совместимости</p>
              <p className="mt-2 text-xs leading-snug text-[#183833]/60">Сопоставление ценностей кандидата с цифровым профилем компании по 54 параметрам</p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-3">
              <p className={TITLE} style={{ color: INK }}>Talent<span style={{ color: GREEN }}>Mind</span> core</p>
              <img src="/figma/ai-orb.png" alt="TalentMind core" className="h-24 w-24 object-contain" />
            </div>
            <div className="ease-smooth cursor-pointer rounded-xl border border-[#ededed] bg-white p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_14px_30px_rgba(24,56,51,0.1)]">
              <p className={TITLE} style={{ color: INK }}>Анализ Soft Skills</p>
              <p className="mt-2 text-xs leading-snug text-[#183833]/60">Скоринг по психолингвистическим паттернам диалога для формирования детальной карты компетенций</p>
            </div>
          </Card>

          {/* ===================== КОЛОНКА 3 — РЕЗУЛЬТАТЫ ===================== */}
          {/* Экспорт в ATS и Отчёт в ЛК — идентичные (w260 × h150) */}
          <Card style={{ left: 940, top: 60, width: 260, height: 150 }} className="flex flex-col justify-between p-5">
            <p className={`${TITLE} whitespace-nowrap`} style={{ color: INK }}>Экспорт отчёта в ATS</p>
            <div className="flex flex-row items-center gap-4">
              <img src="/image 31355.png" alt="Хантфлоу" className="h-8 w-auto object-contain" />
              <img src="/image 31356.png" alt="Talantix" className="h-8 w-auto object-contain" />
            </div>
          </Card>

          <Card style={{ left: 1210, top: 60, width: 260, height: 150 }} className="flex flex-col justify-between p-5">
            <p className={`${TITLE} whitespace-nowrap`} style={{ color: INK }}>Отчёт в ЛК</p>
            <img src="/figma/logo.svg" alt="TalentMind" className="h-7 w-auto self-start object-contain" />
          </Card>

          {/* Отчёт по soft skills и культуре */}
          <Card style={{ left: 960, top: 350, width: 300, height: 220 }} className="flex flex-col p-5">
            <p className={TITLE} style={{ color: INK }}>Отчёт по soft skills и культуре</p>
            <div className="flex flex-1 items-center justify-center">
              <img src="/Feature Image.png" alt="Отчёт по soft skills и культуре" className="max-h-[130px] w-full object-contain" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
