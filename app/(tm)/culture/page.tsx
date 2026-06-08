"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dna, Check, AlertTriangle, Sparkles, Target } from "lucide-react";

/* ── палитра бренда TalentMind ── */
const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const INK = "#183833";
const AMBER = "#E8A317";
const RED = "#FF5252";

/* ============================================================
   /culture — «Корпоративная культура».
   • Hero — «Формируем срез вашей корпоративной культуры».
   • Блок «ДНК компании» — появляется параллаксом: уровень
     соответствия + культурный фит.
   • Закреплённый блок «Анализируемые параметры»: заголовок
     разъезжается в стороны, появляются 3 ряда блоков (54 параметра
     OCP), которые при прокрутке плавно листаются слева направо;
     карточки в фокусе увеличиваются/проявляются, на краях —
     размываются и уменьшаются.
   ============================================================ */

/* измерения OCP (цвета) */
const DIM: Record<string, [string, string]> = {
  inno: ["Инновационность", "#7AB800"],
  stab: ["Стабильность", "#11AFCC"],
  people: ["Ориентация на людей", "#E8A317"],
  result: ["Ориентация на результат", "#FF6B57"],
  detail: ["Внимание к деталям", "#2E9E8F"],
  team: ["Командная ориентация", "#5BA528"],
  aggr: ["Конкурентность", "#E07B39"],
  cross: ["Профиль культуры", "#5B8BB0"],
};

type P = { n: number; ru: string; dim: keyof typeof DIM; find: string };
const PARAMS: P[] = [
  { n: 1, ru: "Гибкость", dim: "inno", find: "Готовность менять подходы, процессы и структуры под новые условия" },
  { n: 2, ru: "Адаптивность", dim: "inno", find: "Позитивное отношение к изменениям, способность перестраиваться" },
  { n: 3, ru: "Инновационность", dim: "inno", find: "Акцент на создании нового, нестандартных решениях, R&D" },
  { n: 4, ru: "Использование возможностей", dim: "inno", find: "Скорость реакции на рыночные сигналы, проактивность" },
  { n: 5, ru: "Готовность к экспериментам", dim: "inno", find: "Культура A/B-тестов, прототипирования, MVP" },
  { n: 6, ru: "Готовность к риску", dim: "inno", find: "Решения в неопределённости, толерантность к провалам" },
  { n: 7, ru: "Отсутствие жёстких ограничений", dim: "inno", find: "Минимум бюрократии, доверие, автономия" },
  { n: 8, ru: "Стабильность", dim: "stab", find: "Устойчивость, долгосрочное планирование, низкая текучесть" },
  { n: 9, ru: "Предсказуемость", dim: "stab", find: "Чёткие процессы, регламенты, понятные ожидания" },
  { n: 10, ru: "Осторожность", dim: "stab", find: "Взвешенный подход, управление рисками, due diligence" },
  { n: 11, ru: "Ориентация на правила", dim: "stab", find: "Соблюдение процедур, compliance, стандартизация" },
  { n: 12, ru: "Безопасность занятости", dim: "stab", find: "Низкая текучесть, забота о карьерном росте" },
  { n: 13, ru: "Низкий уровень конфликтов", dim: "stab", find: "Гармоничная атмосфера, избегание открытых столкновений" },
  { n: 14, ru: "Справедливость", dim: "people", find: "Равные возможности, прозрачные критерии, без фаворитизма" },
  { n: 15, ru: "Уважение прав личности", dim: "people", find: "Личные границы, work-life balance, индивидуальный подход" },
  { n: 16, ru: "Толерантность", dim: "people", find: "Принятие различий, открытость к разным точкам зрения" },
  { n: 17, ru: "Поддержка", dim: "people", find: "Менторство, помощь коллегам, психологическая безопасность" },
  { n: 18, ru: "Ориентация на людей", dim: "people", find: "Решения с учётом влияния на сотрудников" },
  { n: 19, ru: "Возможности для роста", dim: "people", find: "Обучение, развитие, внутренние переводы, треки" },
  { n: 20, ru: "Признание достижений", dim: "people", find: "Культура благодарности, публичное признание, бонусы" },
  { n: 21, ru: "Ориентация на действие", dim: "result", find: "Культура «делай, а не обсуждай», быстрое исполнение" },
  { n: 22, ru: "Ориентация на достижения", dim: "result", find: "Амбициозные цели, OKR, стремление к рекордам" },
  { n: 23, ru: "Требовательность", dim: "result", find: "Высокая планка качества, нетерпимость к посредственности" },
  { n: 24, ru: "Высокие ожидания", dim: "result", find: "Явные KPI, регулярные performance review, accountability" },
  { n: 25, ru: "Ориентация на результат", dim: "result", find: "Оценка по итогу, а не процессу; data-driven подход" },
  { n: 26, ru: "Оплата за результат", dim: "result", find: "Переменная часть, бонусы, equity за достижения" },
  { n: 27, ru: "Акцент на качестве", dim: "result", find: "Zero-defect культура, QA-процессы, гордость за продукт" },
  { n: 28, ru: "Аналитичность", dim: "detail", find: "Решения на основе данных, исследований и метрик" },
  { n: 29, ru: "Внимание к деталям", dim: "detail", find: "Тщательная проверка, документация, peer review" },
  { n: 30, ru: "Точность", dim: "detail", find: "Чёткие формулировки, спецификации, стандарты" },
  { n: 31, ru: "Высокая организованность", dim: "detail", find: "Структурированные процессы, проектное управление" },
  { n: 32, ru: "Командная ориентация", dim: "team", find: "Коллективные достижения ценятся выше индивидуальных" },
  { n: 33, ru: "Свободный обмен информацией", dim: "team", find: "Открытые каналы коммуникации, wiki, прозрачность" },
  { n: 34, ru: "Совместная работа", dim: "team", find: "Кросс-функциональные команды, парная работа" },
  { n: 35, ru: "Дружеские отношения", dim: "team", find: "Тимбилдинг, неформальное общение, корп. жизнь" },
  { n: 36, ru: "Вписывание в коллектив", dim: "team", find: "Культурное соответствие при найме, onboarding" },
  { n: 37, ru: "Конкурентность", dim: "aggr", find: "Фокус на победе над конкурентами, рыночная агрессия" },
  { n: 38, ru: "Агрессивность", dim: "aggr", find: "Напористость в переговорах, захват доли рынка" },
  { n: 39, ru: "Решительность", dim: "aggr", find: "Быстрые решения, отсутствие paralysis by analysis" },
  { n: 40, ru: "Инициативность", dim: "aggr", find: "Сотрудники сами находят проблемы и решения" },
  { n: 41, ru: "Личная ответственность", dim: "aggr", find: "Культура ownership, «это моя зона ответственности»" },
  { n: 42, ru: "Прямое разрешение конфликтов", dim: "aggr", find: "Открытые дискуссии, прямая обратная связь, no politics" },
  { n: 43, ru: "Интенсивность работы", dim: "aggr", find: "Культура переработок или, напротив, её отсутствие" },
  { n: 44, ru: "Рефлексивность", dim: "cross", find: "Ретроспективы, обучение на ошибках, self-awareness" },
  { n: 45, ru: "Автономия", dim: "cross", find: "Свобода в решениях, минимум микроменеджмента" },
  { n: 46, ru: "Единая культура", dim: "cross", find: "Сильная идентичность, единые ценности" },
  { n: 47, ru: "Неформальность", dim: "cross", find: "Открытые офисы, обращение по имени, casual" },
  { n: 48, ru: "Лёгкость в общении", dim: "cross", find: "Расслабленная атмосфера, юмор, мягкая иерархия" },
  { n: 49, ru: "Спокойствие", dim: "cross", find: "Отсутствие паники в кризисах, взвешенные реакции" },
  { n: 50, ru: "Энтузиазм", dim: "cross", find: "Вовлечённость, passion, гордость за компанию" },
  { n: 51, ru: "Уникальность", dim: "cross", find: "Сильный бренд работодателя, «мы не такие как все»" },
  { n: 52, ru: "Репутация", dim: "cross", find: "Забота об имидже, PR, отношения с сообществом" },
  { n: 53, ru: "Социальная ответственность", dim: "cross", find: "ESG-повестка, волонтёрство, эко-инициативы" },
  { n: 54, ru: "Чёткая философия", dim: "cross", find: "Миссия и ценности реально влияют на решения" },
];

const ROWS: P[][] = [PARAMS.slice(0, 18), PARAMS.slice(18, 36), PARAMS.slice(36, 54)];

/* ДНК компании — 7 измерений OCP (демо-профиль) */
const DNA: [string, number, string][] = [
  ["Инновационность", 64, GREEN],
  ["Стабильность", 78, TEAL],
  ["Ориентация на людей", 72, AMBER],
  ["Ориентация на результат", 81, "#FF6B57"],
  ["Внимание к деталям", 75, "#2E9E8F"],
  ["Командная ориентация", 69, "#5BA528"],
  ["Конкурентность", 58, "#E07B39"],
];

export default function CulturePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      /* hero */
      gsap.fromTo(".cult-rise",
        { opacity: 0, y: 42 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, clearProps: "opacity,transform" });

      /* блоки ДНК — появление из блюра + лёгкое увеличение */
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 54, filter: "blur(14px)", scale: 0.95 },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", scale: 1, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%", end: "top 54%", scrub: 1 } });
      });

      /* DESKTOP — закреплённый блок «Анализируемые параметры» */
      mm.add("(min-width: 1024px)", () => {
        const section = pinRef.current!;
        const rows = gsap.utils.toArray<HTMLElement>(".param-row");

        /* Оптимизация: статичный центр каждой карточки кэшируем (без чтения
           layout в кадре). В кадре только читаем x треков (дёшево) и пишем
           стиль ТОЛЬКО тем карточкам, у кого фокус реально изменился. */
        type M = { el: HTMLElement; track: HTMLElement; base: number; le: number };
        let metrics: M[] = [];
        const measure = () => {
          metrics = [];
          rows.forEach((track) => {
            const tx = Number(gsap.getProperty(track, "x")) || 0;
            track.querySelectorAll<HTMLElement>(".param-card").forEach((el) => {
              const r = el.getBoundingClientRect();
              metrics.push({ el, track, base: r.left + el.offsetWidth / 2 - tx, le: -1 });
            });
          });
        };
        const focus = () => {
          const cx = window.innerWidth / 2;
          const band = window.innerWidth * 0.46;
          const tx = new Map<HTMLElement, number>();
          rows.forEach((t) => tx.set(t, Number(gsap.getProperty(t, "x")) || 0));
          for (let i = 0; i < metrics.length; i++) {
            const m = metrics[i];
            const n = Math.min(Math.abs(m.base + tx.get(m.track)! - cx) / band, 1);
            const e = Math.round(n * n * (3 - 2 * n) * 100) / 100; // smoothstep, квант 0.01
            if (e === m.le) continue; // фокус не изменился — пропускаем
            m.le = e;
            const s = m.el.style;
            s.transform = `scale(${(1 - 0.16 * e).toFixed(3)})`;
            s.filter = e < 0.02 ? "none" : `blur(${(9 * e).toFixed(2)}px)`;
            s.opacity = (1 - 0.6 * e).toFixed(3);
          }
        };

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top top", end: "+=320%", pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: focus, onRefresh: () => { measure(); focus(); } },
        });
        /* заголовок разъезжается в стороны, ряды проявляются */
        tl.to(".params-head-left", { xPercent: -190, autoAlpha: 0, ease: "power1.in", duration: 0.16 }, 0)
          .to(".params-head-right", { xPercent: 190, autoAlpha: 0, ease: "power1.in", duration: 0.16 }, 0)
          .to(".params-meta", { autoAlpha: 0, y: -24, duration: 0.12 }, 0)
          .fromTo(".param-rows", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18, ease: "power2.out" }, 0.06);
        /* ряды листаются слева направо: спейсеры по краям дают первой и
           последней карточке дойти до центра — видны все 54 параметра */
        rows.forEach((t) => {
          tl.fromTo(t, { x: 0 }, { x: () => -(t.scrollWidth - window.innerWidth), ease: "none", duration: 0.8 }, 0.2);
        });
        measure(); focus();

        return () => { tl.scrollTrigger?.kill(); tl.kill(); metrics.forEach((m) => m.el.removeAttribute("style")); };
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => { mm.revert(); ctx.revert(); };
  }, []);

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden" style={{ color: INK }}>
      {/* фокус-стиль карточек параметров (только desktop) */}
      <style>{`
        @media (min-width:1024px){
          .param-card{ transform: scale(.84); filter: blur(9px); opacity:.4; }
          .param-row::-webkit-scrollbar{ display:none; }
        }
      `}</style>


      {/* ============================== HERO ============================== */}
      <section className="relative mx-auto max-w-[1100px] px-6 pt-32 pb-20 text-center md:px-12 lg:pt-44">
        <span className="cult-rise inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: GREEN }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} /> Профиль организационной культуры
        </span>
        <h1 className="cult-rise mx-auto mt-5 max-w-[20ch] text-[clamp(2.2rem,4.6vw,4.6rem)] font-bold leading-[1.05] tracking-tight" style={{ color: INK }}>
          Формируем <span style={{ color: GREEN }}>срез</span> вашей корпоративной культуры
        </h1>
        <p className="cult-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#183833]/70">
          Загрузите артефакты культуры — TalentMind построит профиль вашей компании по 54 параметрам корпоративной
          культуры и будет оценивать каждого кандидата через призму вашей ДНК, формируя понятный итоговый отчёт
        </p>
        <div className="cult-rise mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#dna" className="ease-smooth group inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-lg font-medium text-white shadow-[0_18px_40px_rgba(122,184,0,0.32)] transition-all duration-300 hover:-translate-y-1" style={{ background: GREEN }}>
            Как это работает <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
          <a href="#params" className="ease-smooth inline-flex items-center gap-2 rounded-2xl border border-[#183833]/15 bg-white/70 px-6 py-4 text-lg font-medium text-[#183833] backdrop-blur transition-all duration-300 hover:-translate-y-1">
            54 параметра
          </a>
        </div>
      </section>

      {/* ===================== ДНК КОМПАНИИ ===================== */}
      <section id="dna" className="relative mx-auto max-w-[1280px] px-6 pb-28 md:px-12">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: GREEN }}>
            <Dna className="h-4 w-4" /> ДНК компании
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl" style={{ color: INK }}>
            Учитываем ДНК компании при анализе <span style={{ color: GREEN }}>каждого кандидата</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#183833]/65">
            Профиль вашей культуры становится эталоном. Для кандидата мы считаем уровень соответствия
            и раскладываем корпоративную совместимость на сильные совпадения и зоны внимания
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ДНК — 7 измерений OCP */}
          <div className="reveal rounded-[28px] border border-[#e8efe6] bg-white/95 p-7 shadow-[0_24px_60px_rgba(24,56,51,0.09)]">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: `${GREEN}1a` }}><Dna className="h-5 w-5" style={{ color: GREEN }} /></span>
              <div>
                <p className="text-base font-bold" style={{ color: INK }}>Профиль культуры компании</p>
                <p className="text-xs text-[#183833]/50">7 измерений · 54 параметра</p>
              </div>
            </div>
            <div className="mt-6 space-y-3.5">
              {DNA.map(([name, val, c]) => (
                <div key={name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium" style={{ color: INK }}>{name}</span>
                    <span className="font-bold" style={{ color: c }}>{val}</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#eef2ec]">
                    <div className="h-full rounded-full" style={{ width: `${val}%`, background: c }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Уровень соответствия + культурный фит */}
          <div className="flex flex-col gap-5">
            <div className="reveal flex items-center gap-5 rounded-[28px] border border-[#e8efe6] bg-white/95 p-7 shadow-[0_24px_60px_rgba(24,56,51,0.09)]">
              <Ring value={74} />
              <div>
                <p className="flex items-center gap-1.5 text-base font-bold" style={{ color: INK }}><Target className="h-4 w-4" style={{ color: GREEN }} /> Уровень соответствия</p>
                <p className="mt-1.5 text-sm leading-snug text-[#183833]/65">
                  Насколько ценности и поведение кандидата совпадают с ДНК вашей компании
                </p>
              </div>
            </div>

            <div className="reveal rounded-[28px] border border-[#e8efe6] bg-white/95 p-7 shadow-[0_24px_60px_rgba(24,56,51,0.09)]">
              <p className="text-base font-bold" style={{ color: INK }}>Корпоративная совместимость</p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: GREEN }}><Check className="h-3.5 w-3.5" /> Совпадения</p>
                  <ul className="mt-2 space-y-1.5">
                    {["Исполнительская дисциплина", "Уважение границ ответственности", "Аналитический подход"].map((t) => (
                      <li key={t} className="flex items-start gap-1.5 text-xs leading-snug text-[#183833]/70"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GREEN }} /> {t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: AMBER }}><AlertTriangle className="h-3.5 w-3.5" /> Зоны внимания</p>
                  <ul className="mt-2 space-y-1.5">
                    {["Низкая инициативность", "Ограниченная гибкость к изменениям"].map((t) => (
                      <li key={t} className="flex items-start gap-1.5 text-xs leading-snug text-[#183833]/70"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: AMBER }} /> {t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== АНАЛИЗИРУЕМЫЕ ПАРАМЕТРЫ (pinned) ===================== */}
      <section id="params" ref={pinRef} className="relative w-full overflow-hidden lg:h-screen">
        {/* заголовок */}
        <div className="relative z-20 px-6 pt-16 text-center lg:pointer-events-none lg:absolute lg:inset-0 lg:flex lg:flex-col lg:items-center lg:justify-center lg:pt-0">
          <p className="params-meta inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: GREEN }}>
            <Sparkles className="h-4 w-4" /> 54 параметра
          </p>
          <h2 className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-4xl font-bold tracking-tight sm:text-6xl" style={{ color: INK }}>
            <span className="params-head-left">Анализируемые</span>
            <span className="params-head-right" style={{ color: GREEN }}>параметры</span>
          </h2>
          <p className="params-meta mx-auto mt-4 max-w-none text-lg leading-relaxed text-[#183833]/65 sm:whitespace-nowrap">
            Семь измерений культуры, разложенные на конкретные сигналы
          </p>
        </div>

        {/* три ряда блоков */}
        <div className="param-rows relative z-10 mt-10 space-y-4 pb-16 lg:absolute lg:inset-0 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:gap-3 lg:space-y-0 lg:pb-0">
          {ROWS.map((row, ri) => (
            <div
              key={ri}
              className="param-row flex gap-3 overflow-x-auto px-6 pb-3 [scrollbar-width:none] lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {/* спейсер: первая карточка стартует по центру + сдвиг ряда (шахматный порядок) */}
              <div aria-hidden className="hidden shrink-0 lg:block" style={{ width: `calc((100vw - 252px) / 2 + ${[0, 132, 66][ri] ?? 0}px)` }} />
              {row.map((p) => {
                const [label, c] = DIM[p.dim];
                return (
                  <div key={p.n} className="param-card w-[230px] shrink-0 rounded-2xl border border-[#e8efe6] bg-white p-4 shadow-[0_14px_40px_rgba(24,56,51,0.08)] lg:w-[252px]">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black tabular-nums" style={{ color: c }}>{p.n.toString().padStart(2, "0")}</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ background: `${c}16`, color: c }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} /> {label}
                      </span>
                    </div>
                    <p className="mt-2.5 text-base font-bold leading-tight" style={{ color: INK }}>{p.ru}</p>
                    <p className="mt-1.5 text-xs leading-snug text-[#183833]/60">{p.find}</p>
                  </div>
                );
              })}
              {/* спейсер: последняя карточка доходит до центра */}
              <div aria-hidden className="hidden shrink-0 lg:block" style={{ width: "calc((100vw - 252px) / 2)" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="relative mx-auto my-24 max-w-[1100px] px-6 md:px-12">
        <div className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center text-white shadow-[0_40px_90px_rgba(122,184,0,0.32)] md:px-16" style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #5e9400 100%)` }}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-[90px]" />
          <h2 className="relative text-3xl font-bold tracking-tight sm:text-5xl">Постройте профиль культуры своей команды</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">
            Загрузите артефакты культуры — и оценивайте кандидатов по вашей собственной ДНК. Первые 5 разборов бесплатно
          </p>
          <a href="/pricing" className="ease-smooth relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1" style={{ color: GREEN }}>
            Начать бесплатно →
          </a>
        </div>
      </section>
    </div>
  );
}

/* кольцо уровня соответствия */
function Ring({ value }: { value: number }) {
  const r = 38, c = 2 * Math.PI * r, dash = ((value / 100) * c).toFixed(1);
  return (
    <div className="relative h-[104px] w-[104px] shrink-0 text-center">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <defs><linearGradient id="cRing" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={TEAL} /><stop offset="100%" stopColor={GREEN} /></linearGradient></defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e9efe6" strokeWidth="9" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="url(#cRing)" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${dash} ${c.toFixed(1)}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color: GREEN }}>{value}%</span>
      </div>
    </div>
  );
}
