"use client";

import { Check } from "lucide-react";
import { Arrow, GREEN, INK } from "./ui";

const TIERS = [
  {
    name: "Free",
    price: "0 ₽",
    per: "5 интервью",
    desc: "Для тестирования платформы. Без привязки банковской карты",
    incl: "В тариф включено:",
    feats: ["Загрузка профиля корпоративной культуры", "Базовый скоринг soft skills и AI-отчёт", "Базовые аналитические дашборды"],
    hot: false,
  },
  {
    name: "Starter",
    price: "14 900 ₽",
    per: "в месяц · до 30 интервью",
    desc: "Идеально для небольших команд и быстрого старта ИИ в найме",
    incl: "Всё из Free, плюс:",
    feats: ["Интеграция с ВКС-системами", "Хранение данных в защищённом облаке РФ", "Email-поддержка"],
    hot: false,
  },
  {
    name: "Growth",
    price: "44 900 ₽",
    per: "в месяц · до 100 интервью",
    desc: "Для активно растущих компаний и системных HR-отделов",
    incl: "Всё из Starter, плюс:",
    feats: ["Интеграция с ATS-системами", "Брендирование отчётов (логотип вашей компании)", "Приоритетная поддержка в мессенджерах"],
    hot: true,
  },
  {
    name: "Scale",
    price: "169 900 ₽",
    per: "в месяц · до 400 интервью",
    desc: "Для крупного бизнеса с потребностью в кастомизации и автоматизации",
    incl: "Всё из Growth, плюс:",
    feats: ["Открытый API и вебхуки", "1 кастомная AI-модель компетенций", "Контроль предвзятости (bias)", "Выделенный аккаунт-менеджер"],
    hot: false,
  },
];

export default function PricingBento() {
  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {TIERS.map((t) => (
        <div
          key={t.name}
          className={`ease-smooth flex h-full flex-col rounded-3xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 ${
            t.hot
              ? "border-2 shadow-[0_40px_80px_rgba(122,184,0,0.18)]"
              : "border border-gray-100 shadow-[0_24px_60px_rgba(24,56,51,0.07)]"
          }`}
          style={t.hot ? { borderColor: GREEN } : undefined}
        >
          {/* header */}
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold uppercase tracking-wide" style={{ color: t.hot ? GREEN : INK }}>{t.name}</p>
            {t.hot && (
              <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: GREEN }}>
                Популярный
              </span>
            )}
          </div>

          {/* price */}
          <div className="mt-5 flex items-end gap-2">
            <span className="text-[2.6rem] font-bold leading-none tracking-tight" style={{ color: INK }}>{t.price}</span>
          </div>
          <p className="mt-2 text-sm font-medium text-[#183833]/55">{t.per}</p>

          {/* description */}
          <p className="mt-4 text-sm leading-snug text-[#183833]/70">{t.desc}</p>

          {/* features */}
          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-[#183833]/45">{t.incl}</p>
          <ul className="mt-3 flex-grow space-y-3">
            {t.feats.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[14px] leading-snug text-[#183833]/85">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: `${GREEN}1f` }}>
                  <Check className="h-3 w-3" style={{ color: GREEN }} />
                </span>
                {f}
              </li>
            ))}
          </ul>

          {/* CTA pinned to the bottom */}
          <a
            href="https://app.talentmind.ru"
            className={`group mt-8 flex w-full items-center justify-center gap-1.5 rounded-2xl py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02] ${
              t.hot ? "text-white" : "text-[#183833]"
            }`}
            style={t.hot ? { background: GREEN } : { background: "#F4F7F6", border: `1px solid ${INK}1a` }}
          >
            {t.name === "Free" ? "Начать бесплатно" : `Выбрать ${t.name}`}
            <Arrow className={t.hot ? "text-white" : ""} />
          </a>
        </div>
      ))}
    </div>
  );
}
