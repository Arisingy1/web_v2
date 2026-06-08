"use client";

import { useMemo, useState } from "react";
import { IconDna, IconSearch, IconTarget } from "@/components/icons";

/* ---------------- 54 psycholinguistic parameters ---------------- */

type Cat = "Мотивация" | "Стиль работы" | "Лидерство" | "Коммуникация" | "Мышление";

const PARAMS: { name: string; cat: Cat }[] = [
  ...[
    "Достижение результата", "Признание и статус", "Финансовая мотивация", "Развитие и рост",
    "Стабильность", "Влияние на продукт", "Принадлежность к команде", "Автономия",
    "Социальная миссия", "Соревновательность", "Любопытство", "Безопасность",
  ].map((name) => ({ name, cat: "Мотивация" as Cat })),
  ...[
    "Скорость vs тщательность", "Многозадачность", "Планирование", "Гибкость к изменениям",
    "Внимание к деталям", "Толерантность к рутине", "Самоорганизация", "Стрессоустойчивость",
    "Инициативность", "Доведение до конца", "Работа с дедлайнами", "Процессность",
  ].map((name) => ({ name, cat: "Стиль работы" as Cat })),
  ...[
    "Ответственность за команду", "Делегирование", "Менторство", "Принятие решений",
    "Управление конфликтами", "Видение и стратегия", "Развитие людей", "Готовность брать риски",
    "Требовательность", "Поддержка и эмпатия",
  ].map((name) => ({ name, cat: "Лидерство" as Cat })),
  ...[
    "Ясность изложения", "Активное слушание", "Убеждение", "Обратная связь",
    "Публичные выступления", "Письменная коммуникация", "Кросс-функциональность",
    "Работа со стейкхолдерами", "Открытость", "Тон и эмоциональность",
  ].map((name) => ({ name, cat: "Коммуникация" as Cat })),
  ...[
    "Критическое мышление", "Системность", "Креативность", "Аналитичность",
    "Обучаемость", "Работа с неопределённостью", "Стратегичность", "Прагматизм",
    "Рефлексивность", "Структурность",
  ].map((name) => ({ name, cat: "Мышление" as Cat })),
];

const CATS: ("Все" | Cat)[] = ["Все", "Мотивация", "Стиль работы", "Лидерство", "Коммуникация", "Мышление"];

const CAT_COLOR: Record<Cat, string> = {
  Мотивация: "bg-lime-50 text-lime-700 border-line-green",
  "Стиль работы": "bg-sky-50 text-sky-700 border-sky-100",
  Лидерство: "bg-amber-50 text-amber border-amber-200",
  Коммуникация: "bg-violet-50 text-violet-700 border-violet-100",
  Мышление: "bg-rose-50 text-rose-700 border-rose-100",
};

/* ---------------- calibration sliders ---------------- */

const AXES = [
  { left: "Стабильность", right: "Инновации", def: 70 },
  { left: "Автономия", right: "Командность", def: 55 },
  { left: "Тщательность", right: "Скорость", def: 40 },
  { left: "Иерархия", right: "Плоская структура", def: 65 },
  { left: "Процесс", right: "Результат", def: 75 },
];

export default function CulturePage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATS)[number]>("Все");

  const filtered = useMemo(
    () =>
      PARAMS.filter(
        (p) =>
          (cat === "Все" || p.cat === cat) &&
          p.name.toLowerCase().includes(q.toLowerCase().trim())
      ),
    [q, cat]
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="container-x relative py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="eyebrow mb-5">
              <IconDna className="h-4 w-4" /> Культурный код
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.06] text-ink md:text-6xl">
              54 параметра, из которых складывается ДНК вашей компании
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
              Мы оцифровываем корпоративную культуру по психолингвистическим маркерам речи
              и сравниваем кандидатов с эталоном — объективно, на основе того, как человек
              на самом деле формулирует мысли и решения.
            </p>
          </div>
        </div>
      </section>

      {/* Matrix */}
      <section className="bg-cream">
        <div className="container-x py-20 md:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
                Матрица параметров
              </h2>
              <p className="mt-3 text-ink-500">
                Найдите параметр или отфильтруйте по категории — это полный набор маркеров,
                по которым строится профиль.
              </p>
            </div>
            <div className="relative w-full max-w-xs">
              <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Поиск параметра…"
                aria-label="Поиск параметра"
                className="w-full rounded-full border border-line bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none transition-colors focus:border-lime"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  cat === c
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-ink-500 hover:border-line-green hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
            <span className="ml-auto self-center text-sm font-medium text-ink-400">
              Найдено: {filtered.length} из {PARAMS.length}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {filtered.map((p) => (
              <span
                key={p.name}
                className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5 ${CAT_COLOR[p.cat]}`}
              >
                {p.name}
              </span>
            ))}
            {filtered.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-line bg-white px-6 py-8 text-sm text-ink-400">
                Ничего не найдено. Попробуйте другой запрос.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Calibration */}
      <section className="bg-paper">
        <div className="container-x py-20 md:py-28">
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="eyebrow mb-5">
                <IconTarget className="h-4 w-4" /> Калибровка эталона
              </span>
              <h2 className="font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
                Настройте культурный эталон под конкретную команду
              </h2>
              <p className="mt-4 text-ink-500">
                Передвигайте ползунки, чтобы задать, что важнее именно для вашей роли.
                TalentMind пересчитает Match % кандидатов под этот профиль.
              </p>
            </div>
            <Calibrator />
          </div>
        </div>
      </section>
    </>
  );
}

function Calibrator() {
  const [vals, setVals] = useState(AXES.map((a) => a.def));

  return (
    <div className="card p-7 md:p-9">
      <div className="space-y-8">
        {AXES.map((a, i) => (
          <div key={a.left}>
            <div className="mb-2 flex items-center justify-between text-sm font-semibold">
              <span className={vals[i] <= 50 ? "text-ink" : "text-ink-400"}>{a.left}</span>
              <span className="font-display rounded-full bg-lime-50 px-2.5 py-0.5 text-xs text-lime-700">
                {vals[i]}
              </span>
              <span className={vals[i] > 50 ? "text-ink" : "text-ink-400"}>{a.right}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={vals[i]}
              onChange={(e) => {
                const next = [...vals];
                next[i] = Number(e.target.value);
                setVals(next);
              }}
              className="tm-range"
              aria-label={`${a.left} — ${a.right}`}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-line-green bg-cream/50 p-5">
        <div>
          <p className="text-sm font-medium text-ink-500">Эталон обновлён</p>
          <p className="font-display text-lg font-semibold text-ink">Профиль «Команда продукта»</p>
        </div>
        <button type="button" className="btn-primary" onClick={() => setVals(AXES.map((a) => a.def))}>
          Сбросить
        </button>
      </div>
    </div>
  );
}
