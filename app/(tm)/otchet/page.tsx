"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const TOTAL = 6;
const STEPS: { n: string; title: string; text: string; img: string }[] = [
  {
    n: "01",
    title: "Кандидат и соответствие",
    text: "Базовый профиль, опыт и итоговый процент соответствия требованиям вакансии — одним взглядом. ИИ сразу выдаёт чёткую рекомендацию с объективными аргументами «За» и «Против»",
    img: "/1.png",
  },
  {
    n: "02",
    title: "Глубокая аналитика и скрытые риски",
    text: "Система заглядывает дальше резюме. Выявляйте истинные сильные стороны, красные флаги (например, риск ухода) и анализируйте психолингвистику: как кандидат делит ответственность (баланс «Я» и «Мы») и какой у него локус контроля",
    img: "/2.png",
  },
  {
    n: "03",
    title: "Визуализация зон роста",
    text: "Наглядная радар-диаграмма сравнивает реальные навыки кандидата с эталонным профилем вашей должности. Мгновенно оценивайте среднее отклонение и выявляйте самые критичные разрывы в компетенциях",
    img: "/3.png",
  },
  {
    n: "04",
    title: "Детальная карта soft skills",
    text: "Оцифровка каждого гибкого навыка. Платформа оценивает лидерство, коммуникацию, эмпатию и критическое мышление, подкрепляя каждую оценку фактурой из диалога",
    img: "/4.png",
  },
  {
    n: "05",
    title: "Оценка опыта по модели STAR",
    text: "ИИ автоматически извлекает из интервью рабочие кейсы и структурирует их по методологии STAR: Ситуация, Задача, Действие и Результат, чтобы доказать реальную компетентность кандидата",
    img: "/5.png",
  },
  {
    n: "06",
    title: "Подготовка к финалу",
    text: "Платформа генерирует список точечных вопросов для нанимающего менеджера, чтобы прицельно проверить слабые зоны и риски, выявленные на первичном интервью",
    img: "/6.png",
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

        texts.forEach((el, i) => gsap.set(el, { autoAlpha: i ? 0 : 1, y: i ? 60 : 0, filter: i ? "blur(10px)" : "blur(0px)" }));
        imgs.forEach((el, i) => gsap.set(el, { autoAlpha: i ? 0 : 1, y: i ? 70 : 0, scale: i ? 0.94 : 1, filter: i ? "blur(14px)" : "blur(0px)" }));

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
          tl.to(texts[i - 1], { autoAlpha: 0, y: -60, filter: "blur(10px)", ease: "power2.in", duration: 0.45 }, at)
            .to(imgs[i - 1], { autoAlpha: 0, y: -70, scale: 0.94, filter: "blur(14px)", ease: "power2.in", duration: 0.45 }, at)
            .to(texts[i], { autoAlpha: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: 0.55 }, at + 0.4)
            .to(imgs[i], { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", ease: "power2.out", duration: 0.55 }, at + 0.4)
            .to({}, { duration: 0.5 }, at + 1);
        }

        return () => { tl.scrollTrigger?.kill(); tl.kill(); };
      });

      /* MOBILE — простая стопка */
      mm.add("(max-width: 1023px)", () => {
        const blocks = gsap.utils.toArray<HTMLElement>(".sc-mob");
        const tw = blocks.map((el) =>
          gsap.fromTo(el,
            { autoAlpha: 0, y: 44, filter: "blur(10px)" },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 86%", end: "top 56%", scrub: 1 } }));
        return () => tw.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => { mm.revert(); ctx.revert(); };
  }, []);

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden" style={{ color: INK }}>
      {/* атмосфера фона */}
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(120% 90% at 18% 4%, #ffffff 0%, #eef7e3 30%, #e8f4f3 60%, #dcedef 100%)" }} />
      <div className="pointer-events-none absolute -right-[6%] top-[4%] -z-10 h-[520px] w-[520px] rounded-full bg-[#7AB800]/12 blur-[150px]" />
      <div className="pointer-events-none absolute top-[42%] -left-[4%] -z-10 h-[460px] w-[460px] rounded-full bg-[#11AFCC]/12 blur-[160px]" />

      {/* ============================== HERO ============================== */}
      <section className="relative mx-auto max-w-[1600px] px-6 pt-32 pb-10 text-center md:px-8 lg:pt-40">
        <span className="otchet-rise inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: GREEN }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} /> Пример отчёта
        </span>
        <h1 className="otchet-rise mx-auto mt-5 max-w-[18ch] text-[clamp(2.4rem,5vw,4.8rem)] font-bold leading-[1.02] tracking-tight" style={{ color: INK }}>
          Готовый <span style={{ color: GREEN }}>отчёт</span> по кандидату
        </h1>
        <p className="otchet-rise mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#183833]/70">
          Объективный разбор soft skills и корпоративной совместимости на основе реального интервью
        </p>
        <div className="otchet-rise mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#razbor" className="ease-smooth group inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-lg font-medium text-white shadow-[0_18px_40px_rgba(122,184,0,0.32)] transition-all duration-300 hover:-translate-y-1" style={{ background: GREEN }}>
            Смотреть разбор <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
          <a href="/pricing" className="ease-smooth inline-flex items-center gap-2 rounded-2xl border border-[#183833]/15 bg-white/70 px-6 py-4 text-lg font-medium text-[#183833] backdrop-blur transition-all duration-300 hover:-translate-y-1">
            Получить свой отчёт
          </a>
        </div>

        {/* ── ноутбук с живым отчётом ── */}
        <div className="otchet-rise relative z-10 mx-auto mt-8 w-full max-w-[1534px]">
          <img src="/Group 1222.png" alt="TalentMind — отчёт по кандидату" className="pointer-events-none w-full select-none" draggable={false} />
          <div ref={screenRef} className="absolute overflow-hidden bg-[#f4f7f6]" style={{ left: "27.6%", top: "20.6%", width: "44.8%", height: "42.2%" }}>
            <div ref={contentRef} className="will-change-transform">
              <div className="px-4 pb-6 pt-4">
                <p className="text-center text-sm font-bold" style={{ color: INK }}>Результат анализа</p>
                <div className="mt-3 space-y-2">
                  {STEPS.map((s) => (
                    <img key={s.n} src={s.img} alt="" className="w-full rounded-lg border border-[#eaefe8] bg-white shadow-sm" />
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
                      <img src={s.img} alt={s.title} className="w-full rounded-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* МОБИЛЬНАЯ ВЕРСИЯ */}
        <section className="px-6 pb-16 pt-4 lg:hidden">
          {STEPS.map((s) => (
            <div key={s.n} className="sc-mob mb-14">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GREEN }}>
                <span className="grid h-7 w-7 place-items-center rounded-full text-[12px] font-bold text-white" style={{ background: GREEN }}>{s.n}</span>
                Раздел {s.n} / {TOTAL.toString().padStart(2, "0")}
              </span>
              <h2 className="mt-3 text-2xl font-bold leading-[1.1] tracking-tight" style={{ color: INK }}>{s.title}</h2>
              <p className="mt-2 text-base leading-relaxed text-[#183833]/70">{s.text}</p>
              <div className="mt-5 overflow-hidden rounded-[22px] border border-[#e6ece4] bg-white shadow-[0_24px_60px_rgba(24,56,51,0.12)]">
                <div className="flex items-center gap-2 border-b border-[#eef2ec] bg-[#fbfdfa] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: RED }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: AMBER }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: GREEN }} />
                </div>
                <div className="p-3"><img src={s.img} alt={s.title} className="w-full rounded-lg" /></div>
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
