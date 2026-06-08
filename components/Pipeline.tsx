"use client";

import { useState } from "react";
import { IconBolt, IconLayers, IconPlug, IconUpload } from "./icons";

const STAGES = [
  {
    key: "ingest",
    title: "Источники",
    sub: "Zoom · MS Teams · Контур.Толк",
    icon: <IconUpload className="h-5 w-5" />,
    detail:
      "Автоимпорт записей из ВКС или ручная загрузка файлов. Поддержка аудио и видео любого формата без ограничений по длительности.",
  },
  {
    key: "engine",
    title: "Ядро TalentMind",
    sub: "Транскрибация · NLP · ДНК-модель",
    icon: <IconBolt className="h-5 w-5" />,
    detail:
      "Диаризация речи, распознавание, психолингвистический разбор по 54 параметрам и расчёт индекса совместимости с эталоном компании.",
  },
  {
    key: "ats",
    title: "Ваш ATS",
    sub: "Huntflow · E-Staff · 1С",
    icon: <IconPlug className="h-5 w-5" />,
    detail:
      "Готовый профиль кандидата и Match % возвращаются прямо в карточку вашей системы рекрутинга через API и вебхуки.",
  },
];

export default function Pipeline() {
  const [active, setActive] = useState("engine");
  const current = STAGES.find((s) => s.key === active) ?? STAGES[1];

  return (
    <div className="card overflow-hidden p-6 md:p-10">
      <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {STAGES.map((stage, i) => (
          <div key={stage.key} className="contents">
            <button
              type="button"
              onMouseEnter={() => setActive(stage.key)}
              onFocus={() => setActive(stage.key)}
              onClick={() => setActive(stage.key)}
              className={`flex flex-col items-center gap-3 rounded-3xl border p-6 text-center transition-all duration-300 ${
                active === stage.key
                  ? "-translate-y-1 border-lime/50 bg-lime-50 shadow-lift"
                  : "border-line bg-white hover:border-line-green"
              }`}
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${
                  active === stage.key ? "bg-lime text-white" : "bg-ink text-lime-50"
                }`}
              >
                {stage.icon}
              </span>
              <span className="font-display text-base font-semibold text-ink">{stage.title}</span>
              <span className="text-xs font-medium text-ink-400">{stage.sub}</span>
            </button>

            {i < STAGES.length - 1 ? (
              <div className="flex items-center justify-center">
                {/* animated connector */}
                <svg width="56" height="24" viewBox="0 0 56 24" className="hidden md:block" aria-hidden>
                  <path
                    d="M2 12h44"
                    stroke="#e2ecd2"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2 12h44"
                    stroke="#7ab800"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-dash"
                  />
                  <path d="m44 6 8 6-8 6" fill="none" stroke="#7ab800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg width="24" height="40" viewBox="0 0 24 40" className="md:hidden" aria-hidden>
                  <path d="M12 2v30" stroke="#7ab800" strokeWidth="2" strokeLinecap="round" className="animate-dash" />
                  <path d="m6 30 6 8 6-8" fill="none" stroke="#7ab800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-start gap-4 rounded-2xl border border-line-green bg-cream/50 p-6">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white text-lime-700 shadow-soft">
          <IconLayers className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display text-base font-semibold text-ink">{current.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-500">{current.detail}</p>
        </div>
      </div>
    </div>
  );
}
