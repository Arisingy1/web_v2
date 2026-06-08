"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IconArrowRight, IconCheck, IconClock, IconCoins } from "@/components/icons";

/* ---------------- pricing tiers ---------------- */

const PLANS = [
  {
    name: "Starter",
    price: "14 900 ₽",
    period: "/мес.",
    note: "Для пилота на одну команду",
    features: ["30 интервью в месяц", "Стандартные модели", "Карта soft skills", "Базовая поддержка"],
    cta: "Начать",
    featured: false,
  },
  {
    name: "Growth",
    price: "44 900 ₽",
    period: "/мес.",
    note: "Для растущего рекрутинга",
    features: ["100 интервью в месяц", "Интеграции с ATS", "Расширенное сравнение", "Приоритетная поддержка"],
    cta: "Выбрать Growth",
    featured: true,
  },
  {
    name: "Scale",
    price: "169 900 ₽",
    period: "/мес.",
    note: "Для масштабного найма",
    features: ["400 интервью в месяц", "Кастомная модель культуры", "API для разработчиков", "Персональный менеджер"],
    cta: "Выбрать Scale",
    featured: false,
  },
  {
    name: "Enterprise",
    price: "Индивидуально",
    period: "",
    note: "Для крупных корпораций",
    features: ["Безлимит интервью", "Полностью кастомные модели", "Интеграции ATS и 1С", "On-Premise развёртывание"],
    cta: "Связаться",
    featured: false,
  },
];

/* ---------------- ROI calculator ---------------- */

const HOURLY_RATE = 1500; // ₽ за час работы рекрутера

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(Math.round(n));

export default function PricingPage() {
  return (
    <>
      {/* Hero + tiers */}
      <section className="relative overflow-hidden bg-paper">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="container-x relative py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow mb-5">Тарифы</span>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.06] text-ink md:text-6xl">
              Прозрачные тарифы под масштаб вашего бизнеса
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
              Платите за объём интервью, а не за количество пользователей. Перейти на
              следующий уровень можно в любой момент.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col gap-5 rounded-3xl border p-7 transition-transform hover:-translate-y-1 ${
                  p.featured
                    ? "border-lime/50 bg-ink text-white shadow-lift"
                    : "border-line bg-white shadow-soft"
                }`}
              >
                {p.featured ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-lime px-3 py-1 text-xs font-semibold text-white">
                    Популярный
                  </span>
                ) : null}
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      p.featured ? "text-lime" : "text-ink-400"
                    }`}
                  >
                    {p.name}
                  </p>
                  <p className="mt-3 font-display text-3xl font-semibold">
                    {p.price}
                    {p.period ? (
                      <span
                        className={`text-base font-medium ${
                          p.featured ? "text-lime-50/70" : "text-ink-400"
                        }`}
                      >
                        {p.period}
                      </span>
                    ) : null}
                  </p>
                  <p className={`mt-1 text-sm ${p.featured ? "text-lime-50/80" : "text-ink-500"}`}>
                    {p.note}
                  </p>
                </div>

                <ul className="flex flex-col gap-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <IconCheck
                        className={`mt-0.5 h-4 w-4 flex-none ${
                          p.featured ? "text-lime" : "text-lime-700"
                        }`}
                      />
                      <span className={p.featured ? "text-lime-50/90" : "text-ink-500"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/#upload"
                  className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                    p.featured
                      ? "bg-lime text-white hover:brightness-105"
                      : "border border-line bg-white text-ink hover:border-ink"
                  }`}
                >
                  {p.cta}
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI calculator */}
      <section className="bg-cream">
        <div className="container-x py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow mb-5">ROI-калькулятор</span>
            <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
              Посчитайте выгоду для вашей команды
            </h2>
            <p className="mt-4 text-ink-500">
              Подвигайте ползунки под ваш объём найма — мы покажем, сколько часов и денег
              экономит автоматизация разбора интервью.
            </p>
          </div>
          <div className="mt-12">
            <RoiCalculator />
          </div>
        </div>
      </section>
    </>
  );
}

function RoiCalculator() {
  const [interviews, setInterviews] = useState(80);
  const [hoursEach, setHoursEach] = useState(2.5);

  const { hoursSaved, money } = useMemo(() => {
    // TalentMind снимает ~70% ручной работы по разбору и оформлению заметок
    const saveRatio = 0.7;
    const hoursSaved = interviews * hoursEach * saveRatio;
    return { hoursSaved, money: hoursSaved * HOURLY_RATE };
  }, [interviews, hoursEach]);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      {/* inputs */}
      <div className="card flex flex-col gap-9 p-7 md:p-9">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <label htmlFor="r-int" className="text-sm font-semibold text-ink">
              Количество интервью в месяц
            </label>
            <span className="font-display rounded-full bg-lime-50 px-3 py-1 text-sm font-semibold text-lime-700">
              {interviews}
            </span>
          </div>
          <input
            id="r-int"
            type="range"
            min={10}
            max={400}
            step={5}
            value={interviews}
            onChange={(e) => setInterviews(Number(e.target.value))}
            className="tm-range"
          />
          <div className="mt-1 flex justify-between text-xs text-ink-400">
            <span>10</span>
            <span>400</span>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <label htmlFor="r-hrs" className="text-sm font-semibold text-ink">
              Часы на одно интервью
            </label>
            <span className="font-display rounded-full bg-lime-50 px-3 py-1 text-sm font-semibold text-lime-700">
              {hoursEach.toFixed(1)} ч
            </span>
          </div>
          <input
            id="r-hrs"
            type="range"
            min={0.5}
            max={6}
            step={0.5}
            value={hoursEach}
            onChange={(e) => setHoursEach(Number(e.target.value))}
            className="tm-range"
          />
          <div className="mt-1 flex justify-between text-xs text-ink-400">
            <span>0.5 ч</span>
            <span>6 ч</span>
          </div>
        </div>

        <p className="rounded-2xl border border-line-green bg-cream/50 p-4 text-xs leading-relaxed text-ink-500">
          Расчёт исходит из того, что TalentMind снимает около 70% ручной работы по
          разбору и оформлению заметок, при ставке рекрутера {fmt(HOURLY_RATE)} ₽/час.
        </p>
      </div>

      {/* results */}
      <div className="flex flex-col gap-5">
        <div className="card flex items-center gap-5 p-7">
          <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-lime-50 text-lime-700">
            <IconClock className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-medium text-ink-500">Сэкономленные часы</p>
            <p className="font-display text-4xl font-semibold leading-none text-lime-700 md:text-5xl">
              {fmt(hoursSaved)} <span className="text-2xl">ч/мес.</span>
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-lime/40 bg-ink p-7 text-white shadow-lift">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lime/25 blur-3xl"
            aria-hidden
          />
          <div className="relative flex items-center gap-5">
            <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-lime text-white">
              <IconCoins className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-medium text-lime-50/80">Финансовая выгода</p>
              <p className="font-display text-4xl font-semibold leading-none text-lime md:text-5xl">
                {fmt(money)} <span className="text-2xl text-lime-50">₽/мес.</span>
              </p>
            </div>
          </div>
          <p className="relative mt-5 text-sm text-lime-50/80">
            ≈ {fmt(money * 12)} ₽ экономии в год при текущем объёме найма.
          </p>
        </div>

        <Link href="/#demo" className="btn-primary w-full justify-center">
          Обсудить внедрение
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
