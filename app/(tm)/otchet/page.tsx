"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target } from "lucide-react";
import {
  CandidateDecision, RisksStrengthsPsycho, ComplianceDiagram,
  SoftSkillsMap, StarCases, Recommendations,
} from "@/components/tm/reportBlocks";

/* ── палитра бренда TalentMind ── */
const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const INK = "#183833";
const RED = "#FF5252";
const AMBER = "#E8A317";

/* ============================================================
   /otchet — страница «Отчёт».
   • Hero — рендер ноутбука (Group 1222.png) с живым отчётом.
   • Закреплённый (pinned) разбор: секция стоит статично на экране,
     а при прокрутке внутри неё меняются текст (слева) и картинка
     (справа) — через параллакс-смену (как в видео). 50/50.
   ============================================================ */

/* кольцо индекса корпоративной совместимости */
function RingGauge({ value }: { value: number }) {
  const r = 34, c = 2 * Math.PI * r, off = c - (value / 100) * c;
  return (
    <div className="relative h-[96px] w-[96px]">
      <svg viewBox="0 0 92 92" className="h-full w-full -rotate-90">
        <defs><linearGradient id="cgGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={TEAL} /><stop offset="100%" stopColor={GREEN} /></linearGradient></defs>
        <style>{`@keyframes ringDraw{from{stroke-dashoffset:${c.toFixed(1)}}to{stroke-dashoffset:${off.toFixed(1)}}}`}</style>
        <circle cx="46" cy="46" r={r} fill="none" stroke="#e3eedb" strokeWidth="8" />
        <circle cx="46" cy="46" r={r} fill="none" stroke="url(#cgGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray={c.toFixed(1)} style={{ strokeDashoffset: off.toFixed(1), animation: "ringDraw 1.2s cubic-bezier(.22,1,.36,1) .2s both" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl font-bold" style={{ color: INK }}>{value}%</span></div>
    </div>
  );
}
/* живая карточка «Оценка корпоративной совместимости» (для разбора) */
function CompatCard() {
  const dims: [string, number, number][] = [
    ["Стабильность и процессы", 82, 78],
    ["Ориентация на результат", 80, 78],
    ["Внимание к деталям", 76, 74],
    ["Ориентация на людей", 70, 68],
    ["Командная работа", 64, 78],
  ];
  const tone = (g: number) => (g >= 0 ? { c: GREEN, l: "Соответствует" } : g >= -8 ? { c: AMBER, l: "Близко" } : { c: RED, l: "Ниже эталона" });
  return (
    <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#d8ecc4] bg-gradient-to-br from-[#f3faea] to-[#eef7e0] p-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#183833]/45">Индекс совместимости</p>
        <div className="mt-2"><RingGauge value={74} /></div>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm" style={{ color: GREEN }}>Высокая совместимость</span>
        <p className="mt-2 text-[11px] leading-snug text-[#183833]/65">Профиль кандидата близок к ДНК компании: процессы, результат и качество</p>
      </div>
      <div>
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-2 text-sm font-bold" style={{ color: INK }}><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg" style={{ background: `${GREEN}1a` }}><Target className="h-3.5 w-3.5" style={{ color: GREEN }} /></span> Совпадение по измерениям</p>
          <span className="hidden items-center gap-1.5 text-[10px] text-[#183833]/45 sm:flex"><span className="inline-block h-2.5 w-3.5 rounded-full border border-[#cfd6ce]" style={{ background: "#e0e5df" }} /> разрыв</span>
        </div>
        <div className="mt-3 space-y-2.5">
          {dims.map(([name, val, ref]) => {
            const g = val - ref, t = tone(g);
            return (
              <div key={name}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium" style={{ color: INK }}>{name}</span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide" style={{ background: `${t.c}1a`, color: t.c }}>{t.l}</span>
                    <span className="text-xs font-bold tabular-nums" style={{ color: t.c }}>{val}<span className="font-medium text-[#183833]/35"> / {ref}</span></span>
                  </span>
                </div>
                <div className="relative mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-[#eef2ec]">
                  {g < 0 && <div className="absolute inset-y-0 rounded-r-full" style={{ left: `${val}%`, width: `${-g}%`, background: "repeating-linear-gradient(-45deg,#dfe4de,#dfe4de 3px,#eceff0 3px,#eceff0 6px)" }} />}
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${val}%`, background: t.c }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const TOTAL = 7;
/* img — для десктопного pinned-разбора (как было);
   mnode — свёрстанный код-блок для мобильной версии (вместо картинки). */
const STEPS: { n: string; title: string; text: string; img?: string; node?: React.ReactNode; mnode?: React.ReactNode }[] = [
  {
    n: "01",
    title: "Кандидат и соответствие",
    text: "Базовый профиль, опыт и итоговый процент соответствия требованиям вакансии — одним взглядом. ИИ формирует прозрачный профиль кандидата с аргументами «За» и «Против», давая вам надёжную базу для принятия итогового решения",
    img: "/1.png",
    mnode: <CandidateDecision />,
  },
  {
    n: "02",
    title: "Оценка корпоративной совместимости",
    text: "Насколько ценности и поведение кандидата совпадают с ДНК и культурным кодом компании. Платформа считает индекс совместимости и раскладывает его по ключевым измерениям культуры — с подсветкой зон отставания от эталона",
    node: <CompatCard />,
  },
  {
    n: "03",
    title: "Глубокая аналитика и скрытые риски",
    text: "Система заглядывает дальше резюме. Выявляйте истинные сильные стороны, красные флаги (например, риск ухода) и анализируйте психолингвистику: как кандидат делит ответственность (баланс «Я» и «Мы») и какой у него локус контроля",
    img: "/2.png",
    mnode: <RisksStrengthsPsycho />,
  },
  {
    n: "04",
    title: "Визуализация зон роста",
    text: "Наглядная радар-диаграмма сравнивает реальные навыки кандидата с эталонным профилем вашей должности. Мгновенно оценивайте среднее отклонение и выявляйте самые критичные разрывы в компетенциях",
    img: "/3.png",
    mnode: <ComplianceDiagram />,
  },
  {
    n: "05",
    title: "Детальная карта soft skills",
    text: "Оцифровка каждого гибкого навыка. Платформа оценивает лидерство, коммуникацию, эмпатию и критическое мышление, подкрепляя каждую оценку фактурой из диалога",
    img: "/4.png",
    mnode: <SoftSkillsMap />,
  },
  {
    n: "06",
    title: "Оценка опыта по модели STAR",
    text: "ИИ автоматически извлекает из интервью рабочие кейсы и структурирует их по методологии STAR: Ситуация, Задача, Действие и Результат, чтобы доказать реальную компетентность кандидата",
    img: "/5.png",
    mnode: <StarCases />,
  },
  {
    n: "07",
    title: "Подготовка к финалу",
    text: "Платформа генерирует список точечных вопросов для нанимающего менеджера, чтобы прицельно проверить слабые зоны и риски, выявленные на первичном интервью",
    img: "/6.png",
    mnode: <Recommendations />,
  },
];

export default function OtchetPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* ── авто-прокрутка отчёта внутри ноутбука (hero) ── */
  useEffect(() => {
    const screen = screenRef.current;
    const content = contentRef.current;
    if (!screen || !content) return;

    let raf = 0, y = 0, dir = 1, pauseUntil = 0, paused = false;
    const SPEED = 1.0;
    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    screen.addEventListener("mouseenter", onEnter);
    screen.addEventListener("mouseleave", onLeave);

    const tick = (t: number) => {
      const max = content.scrollHeight - screen.clientHeight;
      if (!paused && t > pauseUntil && max > 0) {
        y += SPEED * dir;
        if (y >= max) { y = max; dir = -1; pauseUntil = t + 1600; }
        else if (y <= 0) { y = 0; dir = 1; pauseUntil = t + 1600; }
        content.style.transform = `translateY(${-y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      screen.removeEventListener("mouseenter", onEnter);
      screen.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ── входная анимация + закреплённый разбор ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      gsap.fromTo(".otchet-rise",
        { opacity: 0, y: 42 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, clearProps: "opacity,transform" });

      /* DESKTOP — секция статична (pin), текст и картинка меняются */
      mm.add("(min-width: 1024px)", () => {
        const texts = gsap.utils.toArray<HTMLElement>(".sc-text");
        const imgs = gsap.utils.toArray<HTMLElement>(".sc-img");
        const N = texts.length;
        if (!N) return;

        /* без blur в scrub-кроссфейде: остановка скролла на полпути не оставит
           размытый кадр — переход только сдвиг/прозрачность/масштаб */
        texts.forEach((el, i) => gsap.set(el, { autoAlpha: i ? 0 : 1, y: i ? 60 : 0 }));
        imgs.forEach((el, i) => gsap.set(el, { autoAlpha: i ? 0 : 1, y: i ? 70 : 0, scale: i ? 0.94 : 1 }));

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".scrolly-pin",
            start: "top top",
            end: "+=" + ((N - 1) * 95 + 20) + "%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.round(self.progress * (N - 1))),
          },
        });

        for (let i = 1; i < N; i++) {
          const at = i - 1;
          tl.to(texts[i - 1], { autoAlpha: 0, y: -60, ease: "power2.in", duration: 0.45 }, at)
            .to(imgs[i - 1], { autoAlpha: 0, y: -70, scale: 0.94, ease: "power2.in", duration: 0.45 }, at)
            .to(texts[i], { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.55 }, at + 0.4)
            .to(imgs[i], { autoAlpha: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.55 }, at + 0.4)
            .to({}, { duration: 0.5 }, at + 1);
        }

        return () => { tl.scrollTrigger?.kill(); tl.kill(); };
      });

      /* MOBILE — простая стопка */
      mm.add("(max-width: 1023px)", () => {
        const blocks = gsap.utils.toArray<HTMLElement>(".sc-mob");
        const tw = blocks.map((el) =>
          gsap.fromTo(el,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } }));
        return () => tw.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => { mm.revert(); ctx.revert(); };
  }, []);

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden" style={{ color: INK }}>

      {/* ============================== HERO ============================== */}
      <section className="relative mx-auto max-w-[1600px] px-6 pt-32 pb-10 text-center md:px-8 lg:pt-40">
        <h1 className="otchet-rise mx-auto max-w-[18ch] text-[clamp(2.4rem,5vw,4.8rem)] font-bold leading-[1.02] tracking-tight" style={{ color: INK }}>
          Готовый <span style={{ color: GREEN }}>отчёт</span> по кандидату
        </h1>
        <p className="otchet-rise mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#183833]/70">
          Детальный разбор soft skills и корпоративной совместимости на основе реального интервью
        </p>
        <div className="otchet-rise mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="/otchet/primer" className="ease-smooth group inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-lg font-medium text-white shadow-[0_18px_40px_rgba(122,184,0,0.32)] transition-all duration-300 hover:-translate-y-1" style={{ background: GREEN }}>
            Посмотреть отчёт <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
          <a href="https://app.talentmind.ru" className="ease-smooth inline-flex items-center gap-2 rounded-2xl border border-[#183833]/15 bg-white/70 px-6 py-4 text-lg font-medium text-[#183833] backdrop-blur transition-all duration-300 hover:-translate-y-1">
            Получить свой отчёт
          </a>
        </div>

        {/* ── ноутбук с живым отчётом (только десктоп; на мобильном убран) ── */}
        <div className="otchet-rise relative z-10 mx-auto mt-8 hidden w-full max-w-[1534px] lg:block">
          <img src="/Group 1222.png" alt="TalentMind — отчёт по кандидату" className="pointer-events-none w-full select-none" draggable={false} />
          <div ref={screenRef} className="absolute overflow-hidden bg-[#f4f7f6]" style={{ left: "27.6%", top: "20.6%", width: "44.8%", height: "42.2%" }}>
            <div ref={contentRef} className="will-change-transform">
              <div className="px-4 pb-6 pt-4">
                <p className="text-center text-sm font-bold" style={{ color: INK }}>Результат анализа</p>
                <div className="mt-3 space-y-2">
                  {STEPS.map((s) => (
                    s.node
                      ? <div key={s.n} className="rounded-lg border border-[#eaefe8] bg-white p-3 shadow-sm">{s.node}</div>
                      : <img key={s.n} src={s.img} alt="" className="w-full rounded-lg border border-[#eaefe8] bg-white shadow-sm" />
                  ))}
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#f4f7f6] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#f4f7f6] to-transparent" />
          </div>
        </div>
      </section>

      {/* ===================== ЗАКРЕПЛЁННЫЙ РАЗБОР ===================== */}
      <div id="razbor">
        {/* ДЕСКТОП — статичная секция, текст+картинка меняются */}
        <section className="scrolly-pin relative hidden h-screen items-center overflow-hidden lg:flex">
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-2 items-center gap-14 px-10">
            {/* ЛЕВО — сменяющийся текст */}
            <div className="flex h-[82vh] flex-col justify-center">
              <div className="relative h-[420px]">
                {STEPS.map((s) => (
                  <div key={s.n} className="sc-text absolute inset-0 flex flex-col justify-center">
                    {/* крупный номер над блоком (в потоке) — не перекрывает текст */}
                    <span className="select-none text-[4.5rem] font-black leading-none tracking-tighter" style={{ color: `${GREEN}3a` }}>
                      {s.n}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GREEN }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
                      Раздел {s.n} / {TOTAL.toString().padStart(2, "0")}
                    </span>
                    <h2 className="mt-3 text-[clamp(2rem,2.7vw,3.1rem)] font-bold leading-[1.06] tracking-tight" style={{ color: INK }}>
                      {s.title}
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-[#183833]/70">
                      {s.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* индикатор прогресса (статичный) */}
              <div className="mt-8 flex items-center gap-2">
                {STEPS.map((s, i) => (
                  <div key={s.n} className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: "#dde6dd" }}>
                    <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: i <= active ? "100%" : "0%", background: GREEN }} />
                  </div>
                ))}
              </div>
              <div className="mt-3 text-sm font-medium" style={{ color: `${INK}80` }}>
                {(active + 1).toString().padStart(2, "0")} / {TOTAL.toString().padStart(2, "0")} · {STEPS[active].title}
              </div>
            </div>

            {/* ПРАВО — сменяющаяся картинка */}
            <div className="relative h-[82vh]">
              {STEPS.map((s) => (
                <div key={s.n} className="sc-img absolute inset-0 flex items-center">
                  <div className="w-full overflow-hidden rounded-[26px] border border-[#e6ece4] bg-white shadow-[0_30px_80px_rgba(24,56,51,0.12)]">
                    <div className="flex items-center gap-2 border-b border-[#eef2ec] bg-[#fbfdfa] px-5 py-3.5">
                      <span className="h-3 w-3 rounded-full" style={{ background: RED }} />
                      <span className="h-3 w-3 rounded-full" style={{ background: AMBER }} />
                      <span className="h-3 w-3 rounded-full" style={{ background: GREEN }} />
                      <span className="ml-3 truncate text-sm font-medium" style={{ color: `${INK}80` }}>TalentMind · {s.title}</span>
                      <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-[#f1f6ec] px-3 py-1 text-xs font-semibold sm:inline-flex" style={{ color: GREEN }}>Раздел {s.n}</span>
                    </div>
                    <div className="bg-white p-4 md:p-5">
                      {s.node ?? <img src={s.img} alt={s.title} className="w-full rounded-xl" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* МОБИЛЬНАЯ ВЕРСИЯ — код-блоки вместо картинок (в стиле сайта) */}
        <section className="px-4 pb-16 pt-4 sm:px-6 lg:hidden">
          {STEPS.map((s) => (
            <div key={s.n} className="sc-mob mb-14">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GREEN }}>
                <span className="grid h-7 w-7 place-items-center rounded-full text-[12px] font-bold text-white" style={{ background: GREEN }}>{s.n}</span>
                Раздел {s.n} / {TOTAL.toString().padStart(2, "0")}
              </span>
              <h2 className="mt-3 text-2xl font-bold leading-[1.1] tracking-tight" style={{ color: INK }}>{s.title}</h2>
              <p className="mt-2 text-base leading-relaxed text-[#183833]/70">{s.text}</p>
              <div className="mt-5">
                {s.mnode ?? s.node ?? <img src={s.img} alt={s.title} className="w-full rounded-2xl border border-[#e6ece4]" />}
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* ===================== CTA ===================== */}
      <section className="relative mx-auto mb-24 max-w-[1100px] px-6 md:px-12">
        <div className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center text-white shadow-[0_40px_90px_rgba(122,184,0,0.32)] md:px-16" style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #5e9400 100%)` }}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-[90px]" />
          <h2 className="relative text-3xl font-bold tracking-tight sm:text-5xl">Получите такой отчёт по своему кандидату</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">
            Загрузите запись интервью — TalentMind вернёт объективный разбор за минуты. Первые 5 отчётов бесплатно
          </p>
          <a href="/pricing" className="ease-smooth relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1" style={{ color: GREEN }}>
            Начать бесплатно →
          </a>
        </div>
      </section>
    </div>
  );
}
