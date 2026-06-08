"use client";

import { GREEN, INK } from "./ui";

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
        className="relative overflow-hidden rounded-[2.5rem] border border-[#e6ece4] px-5 pb-14 pt-6 md:px-6 md:pb-16"
        style={{ background: "linear-gradient(135deg,#eef5e7 0%,#ffffff 45%,#eaf3e2 100%)" }}
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#7AB800]/15 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-[#7AB800]/10 blur-[140px]" />

        {/* текст + выделенный заголовок */}
        <div className="relative">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: GREEN }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} /> Измените ваш подход к найму
          </span>

          <h2 className="mt-4 max-w-[20ch] text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]" style={{ color: INK }}>
            Точная оценка кандидатов{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10" style={{ color: GREEN }}>без субъективных ошибок</span>
              <span className="absolute inset-x-[-3px] bottom-[0.1em] -z-0 h-[0.4em] -rotate-1 rounded-sm" style={{ background: `${GREEN}30` }} />
            </span>
          </h2>

          <p className="mt-5 max-w-full text-base font-light leading-relaxed sm:text-lg lg:max-w-[66%]" style={{ color: `${INK}bf` }}>
            Разработанная для того, чтобы убрать субъективность и рутину из процесса
            рекрутинга, платформа <span className="font-medium" style={{ color: GREEN }}>TalentMind</span> помогает
            быстро и точно оценивать каждого соискателя. ИИ проводит анализ на базе
            аудио- и видеозаписей интервью, чтобы вы могли объективно измерять soft
            skills и защитить бизнес от дорогостоящих ошибок найма
          </p>
        </div>

        {/* 3 колонки одинаковой высоты (колонки пропорциональны исходной
            ширине картинок 197:776:797 — высота выравнивается автоматически,
            без обрезки и полей) */}
        <div className="relative mt-10 grid w-full grid-cols-1 items-center gap-7 lg:grid-cols-[797fr_776fr_197fr]">
          {/* 1 — Результаты сравнения */}
          <div className="ease-smooth transition-transform duration-300 hover:-translate-y-1">
            <img src="/Desktop - 135.png" alt="Результаты сравнения кандидатов" className="h-auto w-full object-contain" />
          </div>

          {/* 2 — Диаграмма соответствия */}
          <div className="ease-smooth transition-transform duration-300 hover:-translate-y-1">
            <img src="/Container.png" alt="Диаграмма соответствия кандидата" className="h-auto w-full object-contain" />
          </div>

          {/* 3 — ИИ-ассистент (узкий чат) */}
          <div className="ease-smooth transition-transform duration-300 hover:-translate-y-1">
            <img src="/AI.png" alt="ИИ-ассистент TalentMind" className="h-auto w-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
