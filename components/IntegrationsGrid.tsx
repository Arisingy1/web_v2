"use client";

import { useState } from "react";

type Integration = { name: string; cat: string; mark: string };

const ITEMS: Integration[] = [
  { name: "Zoom", cat: "Видео-конференции", mark: "Zm" },
  { name: "MS Teams", cat: "Видео-конференции", mark: "T" },
  { name: "Контур.Толк", cat: "Видео-конференции", mark: "КТ" },
  { name: "Яндекс Телемост", cat: "Видео-конференции", mark: "ЯТ" },
  { name: "Huntflow", cat: "ATS", mark: "Hf" },
  { name: "E-Staff", cat: "ATS", mark: "ES" },
  { name: "FriendWork", cat: "ATS", mark: "FW" },
  { name: "Поток", cat: "ATS", mark: "По" },
  { name: "1С:ЗУП", cat: "HRM", mark: "1С" },
  { name: "Telegram", cat: "Уведомления", mark: "Tg" },
  { name: "Slack", cat: "Уведомления", mark: "Sl" },
  { name: "REST API", cat: "Разработчикам", mark: "{ }" },
];

const FILTERS = ["Все", "Видео-конференции", "ATS", "HRM", "Уведомления", "Разработчикам"];

export default function IntegrationsGrid() {
  const [filter, setFilter] = useState("Все");
  const visible = ITEMS.filter((i) => filter === "Все" || i.cat === filter);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              filter === f
                ? "border-lime bg-lime text-white"
                : "border-line bg-white text-ink-500 hover:border-line-green hover:text-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((it) => (
          <div
            key={it.name}
            className="group flex items-center gap-4 rounded-3xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-lime/50 hover:shadow-lift"
          >
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-cream font-display text-sm font-semibold text-ink transition-colors group-hover:bg-lime group-hover:text-white">
              {it.mark}
            </span>
            <div>
              <p className="font-semibold text-ink">{it.name}</p>
              <p className="text-xs font-medium text-ink-400">{it.cat}</p>
            </div>
            <span className="ml-auto text-xs font-semibold text-ink-400 opacity-0 transition-opacity group-hover:opacity-100">
              Подключить
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
