"use client";

import { Terminal, Webhook, KeyRound, Zap } from "lucide-react";
import { Arrow, CTA, Eyebrow, GREEN, INK, TEAL, useReveals } from "@/components/tm/ui";

const ENDPOINTS = [
  { m: "POST", path: "/v1/interviews", d: "Загрузить запись интервью на анализ", c: GREEN },
  { m: "GET", path: "/v1/interviews/{id}", d: "Получить статус и отчёт по интервью", c: TEAL },
  { m: "GET", path: "/v1/candidates/{id}/score", d: "Скоринг soft skills кандидата", c: TEAL },
  { m: "POST", path: "/v1/webhooks", d: "Подписаться на события анализа", c: GREEN },
];

const CODE = `curl -X POST https://api.talentmind.ru/v1/interviews \\
  -H "Authorization: Bearer $TALENTMIND_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "candidate": "David Parker",
    "vacancy_id": "ui-engineer",
    "media_url": "https://cdn.acme.io/int-204.mp4"
  }'`;

const RESPONSE = `{
  "id": "int_8d24f0",
  "status": "processing",
  "scores": {
    "leadership": 0.88,
    "empathy": 0.75,
    "communication": 0.84,
    "logic": 0.76
  },
  "match": 0.88
}`;

export default function ApiPage() {
  const root = useReveals();
  return (
    <div ref={root}>
      <section className="mx-auto max-w-[1100px] px-6 pt-40 pb-12 text-center">
        <div className="reveal flex justify-center"><Eyebrow>API для разработчиков</Eyebrow></div>
        <h1 className="reveal mx-auto mt-6 max-w-3xl text-[2.6rem] font-semibold leading-[1] tracking-tight sm:text-[4rem]">
          Встройте <span style={{ color: GREEN }}>ИИ-оценку</span> в ваш ATS
        </h1>
        <p className="reveal mx-auto mt-6 max-w-2xl text-lg text-[#183833]/70">
          REST API и вебхуки TalentMind: загружайте интервью, получайте скоринг soft skills
          и совместимость с ДНК команды программно
        </p>
        <div className="reveal mt-9 flex justify-center gap-4">
          <CTA>Получить ключ</CTA>
          <CTA variant="outline">Документация</CTA>
        </div>
      </section>

      {/* code mockups */}
      <section className="mx-auto max-w-[1100px] px-6 py-10">
        <div className="reveal grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[
            { title: "Запрос", icon: <Terminal className="h-4 w-4" />, code: CODE, lang: "bash" },
            { title: "Ответ", icon: <Zap className="h-4 w-4" />, code: RESPONSE, lang: "json" },
          ].map((b) => (
            <div key={b.title} className="overflow-hidden rounded-2xl border border-[#1f3f3b] bg-[#0f2a27] shadow-[0_24px_60px_rgba(24,56,51,0.25)]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <span className="flex items-center gap-2 text-sm font-medium text-white">{b.icon} {b.title}</span>
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
              </div>
              <pre className="overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-relaxed text-[#cfe8c4]">
{b.code}
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* endpoints */}
      <section className="mx-auto max-w-[1000px] px-6 py-12">
        <h2 className="reveal text-2xl font-semibold tracking-tight" style={{ color: INK }}>Основные эндпоинты</h2>
        <div className="stagger mt-6 space-y-3">
          {ENDPOINTS.map((e) => (
            <div key={e.path} className="flex items-center gap-4 rounded-2xl border border-[#ededed] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(24,56,51,0.05)]">
              <span className="w-14 shrink-0 rounded-md px-2 py-1 text-center text-xs font-bold text-white" style={{ background: e.c }}>{e.m}</span>
              <code className="font-mono text-sm" style={{ color: INK }}>{e.path}</code>
              <span className="ml-auto hidden text-sm text-[#183833]/60 sm:block">{e.d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* features */}
      <section className="mx-auto max-w-[1100px] px-6 pb-24">
        <div className="stagger grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: <KeyRound className="h-6 w-6" />, t: "Ключи и OAuth", d: "Безопасная аутентификация, ротация ключей, ограничение по scope", a: GREEN },
            { icon: <Webhook className="h-6 w-6" />, t: "Вебхуки", d: "Реал-тайм события: интервью обработано, отчёт готов", a: TEAL },
            { icon: <Zap className="h-6 w-6" />, t: "Rate limits", d: "Прозрачные лимиты и SDK для Python, Node и Go", a: GREEN },
          ].map((c) => (
            <div key={c.t} className="flex h-full flex-col rounded-3xl border border-[#ededed] bg-white p-7 shadow-[0_16px_40px_rgba(24,56,51,0.06)]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: c.a }}>{c.icon}</span>
              <h3 className="mt-5 text-xl font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#183833]/70">{c.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
