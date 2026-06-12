"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Clock, Repeat2, ShieldCheck } from "lucide-react";
import { Arrow, CountUp, GREEN, INK, TEAL, useReveals } from "@/components/tm/ui";
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
              TalentMind — платформа, которая анализирует записи интервью и
              оценивает кандидатов через призму культуры вашей компании. Оцените
              точность сами: получите 5 полных отчётов бесплатно
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

            {/* карточка 1 · Время рекрутера на вакансию −40% */}
            <div className="hero-widget absolute left-[calc(-11%+40px)] top-[8%] z-30 w-[260px] max-w-[72%]" data-depth="20">
              <div className="animate-floaty" style={{ animationDelay: "0.4s" }}>
                <div className="rounded-3xl border border-[#e6ece4] bg-white p-5 shadow-[0_24px_55px_rgba(24,56,51,0.16)]">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ background: `${GREEN}1a` }}><Clock className="h-4 w-4" style={{ color: GREEN }} /></span>
                    <span className="text-sm font-semibold" style={{ color: INK }}>Время найма</span>
                  </div>
                  <p className="mt-3 text-[3.2rem] font-bold leading-none" style={{ color: GREEN }}>−<CountUp to={40} />%</p>
                  <p className="mt-2 text-xs leading-snug text-[#183833]/50">Время рекрутера на вакансию</p>
                </div>
              </div>
            </div>

            {/* карточка 2 · Конверсия в оффер ×2 */}
            <div className="hero-widget absolute right-[-5%] top-[33%] z-30 w-[260px] max-w-[72%]" data-depth="18">
              <div className="animate-floaty" style={{ animationDelay: "0.8s" }}>
                <div className="rounded-3xl p-5 text-white shadow-[0_28px_60px_rgba(122,184,0,0.42)]" style={{ background: GREEN }}>
                  <div className="flex items-center justify-between text-sm font-semibold">Конверсия в оффер <Arrow className="text-white" /></div>
                  <p className="mt-3 flex items-center gap-1 text-[3.6rem] font-bold leading-none"><Repeat2 className="h-7 w-7 text-white/80" /> ×2</p>
                  <p className="mt-2 text-xs text-white/85">из интервью в оффер</p>
                </div>
              </div>
            </div>

            {/* карточка 3 · Снижение неудачных наймов −30% */}
            <div className="hero-widget absolute left-[-13%] bottom-[9%] z-30 w-[260px] max-w-[72%]" data-depth="14">
              <div className="animate-floaty" style={{ animationDelay: "1.2s" }}>
                <div className="rounded-3xl border border-[#e6ece4] bg-white p-5 shadow-[0_24px_55px_rgba(24,56,51,0.16)]">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ background: `${TEAL}1a` }}><ShieldCheck className="h-4 w-4" style={{ color: TEAL }} /></span>
                    <span className="text-sm font-semibold" style={{ color: INK }}>Качество найма</span>
                  </div>
                  <p className="mt-3 text-[3.2rem] font-bold leading-none" style={{ color: GREEN }}>−<CountUp to={30} />%</p>
                  <p className="mt-2 text-xs leading-snug text-[#183833]/50">Снижение неудачных наймов</p>
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
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Тарифы, которые растут с командой</h2>
        </div>
        <div className="reveal">
          <PricingBento />
        </div>
      </section>

      {/* ========================== MARQUEE ========================== */}
      <div className="overflow-hidden border-t border-white/10 bg-[#183833] py-7">
        <div className="flex w-max animate-[amzmarquee_28s_linear_infinite] items-center">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <a key={i} href="/contacts" className="group flex items-center gap-4 px-8 text-4xl font-bold tracking-tight transition-opacity hover:opacity-80 sm:text-6xl" style={{ color: GREEN }}>
                  Оценить 5 кандидатов бесплатно
                  <Arrow className="h-9 w-9" />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
