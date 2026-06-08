"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Arrow, CountUp, GREEN, INK, useReveals } from "@/components/tm/ui";
import FigmaImage from "@/components/tm/FigmaImage";
import PricingBento from "@/components/tm/PricingBento";
import BusinessValue from "@/components/tm/BusinessValue";
import Automation from "@/components/tm/Automation";

export default function HomePage() {
  const root = useReveals((scope) => {
    /* Hero entrance sequence (on load).
       fromTo + clearProps → элементы гарантированно остаются видимыми
       после анимации (никаких застрявших opacity:0 / visibility:hidden). */
    gsap.fromTo(".hero-rise", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, clearProps: "opacity,transform" });
    gsap.fromTo(".hero-visual", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2, clearProps: "opacity,transform" });
    gsap.fromTo(".hero-widget", { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.15, delay: 0.45, clearProps: "opacity" });
  });

  /* Лёгкий параллакс карточек по движению курсора рядом с изображением.
     Трансформ навешивается на внешнюю обёртку .hero-widget, а CSS-флоат —
     на внутренний слой, поэтому анимации не конфликтуют. */
  const visualRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;
    const widgets = Array.from(el.querySelectorAll<HTMLElement>(".hero-widget"));
    widgets.forEach((w) => {
      w.style.transition = "transform 0.55s cubic-bezier(0.22,1,0.36,1)";
      w.style.willChange = "transform";
    });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      widgets.forEach((w) => {
        const d = parseFloat(w.dataset.depth || "14");
        w.style.transform = `translate3d(${(nx * d).toFixed(1)}px, ${(ny * d).toFixed(1)}px, 0)`;
      });
    };
    const onLeave = () => widgets.forEach((w) => { w.style.transform = "translate3d(0,0,0)"; });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={root} className="w-full">
      {/* ============================== HERO ============================== */}
      <section className="relative grid min-h-screen w-full grid-cols-1 items-stretch gap-10 px-6 pt-24 pb-8 md:px-12 lg:grid-cols-[1fr_1.02fr]">

        {/* ЛЕВО — заголовок сверху, описание + кнопка снизу */}
        <div className="relative z-10 flex h-full flex-col justify-start py-1">
          <h1 className="hero-rise max-w-[26ch] text-[clamp(1.7rem,3.05vw,3.3rem)] font-semibold leading-[1.16] tracking-tight lg:mt-[6.5vh]" style={{ color: INK }}>
            ИИ-оценка soft skills и <span style={{ color: GREEN }}>корпоративной совместимости</span> кандидатов
          </h1>

          <div className="hero-rise mt-10 max-w-lg lg:mt-14">
            <p className="text-lg leading-relaxed text-[#183833]/70 sm:text-xl">
              Знакомьтесь с TalentMind — платформой, которая анализирует реальные
              интервью и оценивает кандидатов через призму вашей компании. Оцените
              точность сами: получите 5 полных разборов бесплатно
            </p>
            <a
              href="/pricing"
              className="ease-smooth group mt-8 inline-flex w-fit items-center gap-2 rounded-2xl px-7 py-4 text-lg font-medium text-white shadow-[0_18px_40px_rgba(122,184,0,0.32)] transition-all duration-300 hover:-translate-y-1"
              style={{ background: GREEN }}
            >
              Начать бесплатно <Arrow className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>

        {/* ПРАВО — большая скруглённая панель с изображением + плавающие карточки */}
        <div ref={visualRef} className="relative z-10 flex items-center justify-center">
          <div className="hero-visual relative h-[72vh] max-h-[760px] w-full">
            <FigmaImage
              src="/talentmind-laptop.png"
              alt="TalentMind — результат анализа кандидата"
              className="h-full w-full rounded-[28px] object-cover shadow-[0_50px_120px_rgba(24,56,51,0.20)]"
              fallback={
                <img src="/desktop-53.png" alt="TalentMind" className="h-full w-full rounded-[28px] border border-[#e6ece4] object-cover shadow-[0_50px_120px_rgba(24,56,51,0.20)]" />
              }
            />

            {/* верхняя широкая плашка · Совместимость */}
            <div className="hero-widget absolute left-[-8%] top-[7%] z-30 h-[64px] w-[438px] max-w-[78%]" data-depth="22">
              <div className="animate-floaty h-full w-full" style={{ animationDelay: "0.4s" }}>
                <div className="flex h-full w-full items-center justify-between rounded-2xl bg-[#F2F8E6]/95 px-6 shadow-[0_18px_44px_rgba(122,184,0,0.20)] backdrop-blur-sm">
                  <span className="text-base font-medium" style={{ color: INK }}>
                    Совместимость
                  </span>
                  <span className="flex items-center gap-1.5 text-2xl font-bold" style={{ color: GREEN }}><CountUp to={77} />% <Arrow className="h-4 w-4" /></span>
                </div>
              </div>
            </div>

            {/* левая тёмная карточка · Эффективность найма (график) */}
            <div className="hero-widget absolute left-[-16%] top-[34%] z-30 h-[372px] w-[284px]" data-depth="12">
              <div className="animate-floaty h-full w-full" style={{ animationDelay: "1.2s" }}>
                <div className="flex h-full w-full flex-col rounded-3xl border border-[#e6ece4] bg-white p-6 shadow-[0_28px_60px_rgba(24,56,51,0.16)]" style={{ color: INK }}>
                  <style>{`
                    @keyframes heroDraw { to { stroke-dashoffset: 0 } }
                    @keyframes heroFade { to { opacity: 1 } }
                    .hero-line { stroke-dasharray: 1; stroke-dashoffset: 1; animation: heroDraw 1.6s cubic-bezier(.4,0,.2,1) .5s forwards; }
                    .hero-area { opacity: 0; animation: heroFade 1s ease-out 1.4s forwards; }
                    .hero-dot { opacity: 0; transform-box: fill-box; transform-origin: center; animation: heroFade .5s ease-out 1.9s forwards, heroDotPulse 2.4s ease-in-out 2.2s infinite; }
                    @keyframes heroDotPulse { 0%,100% { r: 4 } 50% { r: 6 } }
                  `}</style>
                  <p className="text-sm font-medium text-[#183833]/70">Эффективность найма</p>
                  <svg viewBox="0 0 240 120" className="mt-4 w-full flex-1 overflow-visible">
                    <defs>
                      <linearGradient id="heroAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7AB800" stopOpacity="0.34" />
                        <stop offset="100%" stopColor="#7AB800" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[36, 72, 108].map((y) => (
                      <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#eef2ec" strokeWidth="1" />
                    ))}
                    <path d="M6,86 50,68 94,76 138,44 182,52 234,20 L234,120 L6,120 Z" fill="url(#heroAreaGrad)" className="hero-area" />
                    <polyline className="hero-line" points="6,92 50,76 94,52 138,60 182,32 234,48" pathLength={1} fill="none" stroke="#11AFCC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animationDelay: ".85s" }} />
                    <polyline className="hero-line" points="6,86 50,68 94,76 138,44 182,52 234,20" pathLength={1} fill="none" stroke="#7AB800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle className="hero-dot" cx="234" cy="20" r="4" fill="#7AB800" />
                  </svg>
                  <div className="mt-auto flex gap-6">
                    <div>
                      <p className="text-2xl font-bold">+<CountUp to={40} />%</p>
                      <p className="text-xs text-[#183833]/45">Время HR</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold" style={{ color: GREEN }}>−<CountUp to={15} />%</p>
                      <p className="text-xs text-[#183833]/45">Ошибки найма</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* правая цветная карточка · Конверсия в оффер */}
            <div className="hero-widget absolute right-[2%] top-[34%] z-30 h-[284px] w-[284px]" data-depth="18">
              <div className="animate-floaty h-full w-full" style={{ animationDelay: "0.8s" }}>
                <div className="flex h-full w-full flex-col rounded-3xl p-6 text-white shadow-[0_28px_60px_rgba(122,184,0,0.40)]" style={{ background: GREEN }}>
                  <div className="flex items-center justify-between text-sm font-medium">Конверсия в оффер <Arrow className="text-white" /></div>
                  <p className="mt-auto text-[4.5rem] font-bold leading-none">×2</p>
                  <p className="mt-2 text-sm text-white/85">из интервью в оффер</p>
                  <p className="mt-3 text-xs text-white/80">Time-to-Hire −<CountUp to={30} />%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== БЛОК 2 · ЦЕННОСТЬ И БИЗНЕС-РЕЗУЛЬТАТЫ ===================== */}
      <BusinessValue />

      {/* ===================== БЛОК 3 · АВТОМАТИЗАЦИЯ ===================== */}
      <Automation />

      {/* ===================== PRICING (Bento) ===================== */}
      <section className="w-full px-6 py-24 md:px-12">
        <div className="reveal mx-auto mb-12 max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: GREEN }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} /> Тарифы</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Тарифы, которые растут с командой</h2>
        </div>
        <div className="reveal">
          <PricingBento />
        </div>
      </section>

      {/* ========================== MARQUEE ========================== */}
      <div className="overflow-hidden border-y border-[#7AB800]/15 bg-[#F4F7F6] py-7">
        <div className="flex w-max animate-[amzmarquee_28s_linear_infinite] items-center">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="flex items-center gap-4 px-8 text-4xl font-bold tracking-tight sm:text-6xl" style={{ color: GREEN }}>
                  Оценить 5 кандидатов бесплатно
                  <Arrow className="h-9 w-9" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
