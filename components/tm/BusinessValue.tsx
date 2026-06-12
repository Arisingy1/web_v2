"use client";

import { GREEN, INK } from "./ui";
import { AnimatedChat } from "./AnimatedChat";
import { ComparisonPanel } from "./ComparisonPanel";
import { ComplianceDiagram } from "./ComplianceDiagram";

/* ============================================================
   Блок 2 — «Ценность и бизнес-результаты».
   Светлая плашка + выделенный заголовок + одна строка из 3 колонок
   одинаковой высоты во всю ширину:
   ИИ-ассистент (AI) · Диаграмма соответствия (Container) ·
   Результаты сравнения (Desktop - 135).
   ============================================================ */

export default function BusinessValue() {
  return (
    <section className="w-full px-4 py-12 md:px-8">
      <div
        className="relative overflow-hidden rounded-[2.5rem] border border-[#e6ece4] px-5 pb-14 pt-6 md:px-8 md:pb-16"
        style={{ background: "linear-gradient(135deg,#eef5e7 0%,#ffffff 45%,#eaf3e2 100%)" }}
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#7AB800]/15 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-[#7AB800]/10 blur-[140px]" />

        {/* текст + выделенный заголовок */}
        <div className="relative">
          <h2 className="max-w-[26ch] text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]" style={{ color: INK }}>
            Глубокая аналитика кандидатов на основе{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10" style={{ color: GREEN }}>объективных данных</span>
              <span className="absolute inset-x-[-3px] bottom-[0.1em] -z-0 h-[0.4em] -rotate-1 rounded-sm" style={{ background: `${GREEN}30` }} />
            </span>
          </h2>

          <p className="mt-5 max-w-full text-base font-light leading-relaxed sm:text-lg lg:max-w-[66%]" style={{ color: `${INK}bf` }}>
            Созданная, чтобы снять HR-рутину и дать полную картину по каждому
            кандидату, платформа <span className="font-medium" style={{ color: GREEN }}>TalentMind</span> помогает
            принимать взвешенные решения быстрее. ИИ анализирует записи интервью,
            подсвечивая скрытые паттерны soft skills, соответствие корп. культуре,
            чтобы защитить бизнес от дорогостоящих ошибок найма
          </p>
        </div>

        {/* 3 живых превью-экрана платформы (вместо статичных картинок):
            результаты сравнения · диаграмма соответствия · чат ИИ-ассистента */}
        <div className="relative mt-10 grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[1.35fr_1.15fr_1fr]">
          <div className="ease-smooth h-[560px] transition-transform duration-300 hover:-translate-y-1">
            <ComparisonPanel />
          </div>
          <div className="ease-smooth h-[560px] transition-transform duration-300 hover:-translate-y-1">
            <ComplianceDiagram />
          </div>
          <div className="ease-smooth h-[560px] transition-transform duration-300 hover:-translate-y-1">
            <AnimatedChat frozen className="h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
