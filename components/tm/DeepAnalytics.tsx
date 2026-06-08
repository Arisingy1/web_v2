"use client";

import { useEffect, useRef } from "react";
import { Brain, LayoutGrid, HeartHandshake, ShieldAlert, Flame, Crown, GraduationCap } from "lucide-react";
import { GREEN, INK, TEAL } from "./ui";

/* ============================================================
   «Глубокая аналитика» — scroll-linked sticky-секция.
   Внешний контейнер h-[300vh]; внутри sticky top-0 h-screen.
   По прогрессу скролла (0→1):
     • слова «Глубокая» / «аналитика» разъезжаются влево/вправо
     • в центр снизу всплывают карточки (fade + translateY)
     • далее карточки горизонтально пролистываются
   Трансформации пишутся напрямую в style рефов (rAF) — плавно,
   без ре-рендеров.
   ============================================================ */

const CARDS = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Психолингвистический скоринг",
    text: "ИИ анализирует не только ЧТО говорит кандидат, но и КАК. Система выявляет скрытые паттерны лидерства, стрессоустойчивости или склонности к выгоранию прямо из транскрипции интервью",
    a: GREEN,
  },
  {
    icon: <LayoutGrid className="h-6 w-6" />,
    title: "Тепловая карта компетенций",
    text: "Мгновенное сопоставление навыков соискателя с идеальным профилем должности. Вы сразу видите пробелы в hard и soft skills без дополнительных тестирований",
    a: TEAL,
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: "Совместимость с культурным кодом (Fit Score)",
    text: "Оценка того, насколько кандидат разделяет ценности вашей команды. ИИ прогнозирует скорость адаптации и риск конфликтов в коллективе",
    a: GREEN,
  },
  {
    icon: <ShieldAlert className="h-6 w-6" />,
    title: "Детектор токсичности и рисков",
    text: "Автоматическое подсвечивание «красных флагов» в ответах: уход от ответственности, негатив к бывшим работодателям или искажение фактов",
    a: TEAL,
  },
  {
    icon: <Flame className="h-6 w-6" />,
    title: "Прогноз выгорания (Burnout Index)",
    text: "Анализ темпа речи, пауз и маркеров усталости позволяет ИИ выявить кандидатов, находящихся на грани выгорания, ещё до найма",
    a: GREEN,
  },
  {
    icon: <Crown className="h-6 w-6" />,
    title: "Матрица лидерства",
    text: "Оценка потенциала соискателя к управлению командой. ИИ фиксирует слова-маркеры инициативности, ответственности и умения решать конфликты",
    a: TEAL,
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Индекс обучаемости (Learning Agility)",
    text: "Насколько быстро кандидат способен усваивать новую информацию? Алгоритм анализирует гибкость мышления и реакцию на нестандартные вопросы",
    a: GREEN,
  },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);

export default function DeepAnalytics() {
  const outerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = outer.getBoundingClientRect();
      const total = outer.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total) : 0;

      // фазы
      const split = clamp(p / 0.3); // 0..0.30 — разъезд слов
      const rise = clamp((p - 0.12) / 0.26); // всплытие карточек
      const horiz = clamp((p - 0.42) / 0.55); // горизонтальный пролистывание

      const vw = window.innerWidth;
      const shift = vw * 0.58;
      if (leftRef.current) leftRef.current.style.transform = `translateX(${(-split * shift).toFixed(1)}px)`;
      if (rightRef.current) rightRef.current.style.transform = `translateX(${(split * shift).toFixed(1)}px)`;
      if (leftRef.current) leftRef.current.style.opacity = String((1 - split * 0.35).toFixed(2));
      if (rightRef.current) rightRef.current.style.opacity = String((1 - split * 0.35).toFixed(2));

      if (wrapRef.current) {
        wrapRef.current.style.opacity = rise.toFixed(2);
        wrapRef.current.style.transform = `translateY(${((1 - rise) * 70).toFixed(1)}px)`;
      }
      if (trackRef.current && containerRef.current) {
        const scrollable = Math.max(trackRef.current.scrollWidth - containerRef.current.clientWidth, 0);
        trackRef.current.style.transform = `translateX(${(-horiz * scrollable).toFixed(1)}px)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={outerRef} className="relative w-full" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-white">
        {/* мягкое свечение фона */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-[#7AB800]/10 blur-[150px]" />
          <div className="absolute right-0 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[#11AFCC]/10 blur-[160px]" />
        </div>

        {/* разъезжающийся заголовок */}
        <h2 className="pointer-events-none relative z-0 flex select-none items-center justify-center gap-3 whitespace-nowrap text-4xl font-bold leading-none tracking-tight sm:gap-5 sm:text-6xl lg:text-7xl">
          <span ref={leftRef} className="will-change-transform" style={{ color: INK }}>Глубокая</span>
          <span ref={rightRef} className="will-change-transform" style={{ color: GREEN }}>аналитика</span>
        </h2>

        {/* всплывающие карточки + горизонтальный скролл */}
        <div ref={wrapRef} className="absolute inset-0 z-10 flex items-center opacity-0">
          <div ref={containerRef} className="w-full overflow-hidden px-4 py-10 md:px-10">
            <div ref={trackRef} className="flex gap-8 px-2 will-change-transform">
              {CARDS.map((c) => (
                <article
                  key={c.title}
                  className="ease-smooth flex w-[320px] shrink-0 flex-col rounded-3xl border border-[#ededed] bg-white p-9 shadow-[0_24px_60px_rgba(24,56,51,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_36px_80px_rgba(24,56,51,0.16)] sm:w-[380px]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: c.a }}>
                    {c.icon}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight" style={{ color: INK }}>
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#183833]/70">{c.text}</p>
                </article>
              ))}
              {/* хвостовой отступ, чтобы последняя карточка доезжала красиво */}
              <div className="w-6 shrink-0 md:w-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
