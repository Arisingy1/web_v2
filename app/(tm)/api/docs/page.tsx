"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Link2, KeyRound, Lock, ChevronRight, Check, Copy } from "lucide-react";
import { GREEN, TEAL, INK, RED, useReveals } from "@/components/tm/ui";

/* ============================================================
   /api/docs — Документация Randvar API (1.0.0).
   Redoc-стиль в фирменной палитре TalentMind: слева навигация,
   по центру описание эндпоинтов, справа тёмные код-панели
   (TypeScript / PHP / Go) и примеры ответов (200 / 400).
   ============================================================ */

const BASE = "https://api.talentmind.ru/v1";
const AMBER = "#E8A317";

/* ---------- типы ---------- */
type SampleVal = string | number | boolean | string[];
type Method = "get" | "post" | "delete";
type Param = { name: string; type: string; def?: string; enums?: string[]; desc: string; required?: boolean };
type Endpoint = {
  id: string; fn: string; method: Method; path: string; summary: string;
  pathParams?: Param[]; pathValues?: Record<string, string>;
  params?: Param[]; body?: Param[]; sample?: Record<string, SampleVal>;
  responses: { code: string; label: string }[];
  res: Record<string, string>;
};
type Group = { id: string; name: string; endpoints: Endpoint[] };
const methodColor = (m: Method) => (m === "get" ? GREEN : m === "post" ? TEAL : AMBER);

/* ---------- данные API ---------- */
const bad = (field: string, msg: string) =>
  `{\n  "success": false,\n  "errors": [\n    ["${field}", "${msg}"]\n  ]\n}`;
const nf = (msg: string) => `{\n  "success": false,\n  "error": "${msg}"\n}`;

const GROUPS: Group[] = [
  {
    id: "interviews", name: "Interviews", endpoints: [
      {
        id: "uploadInterview", fn: "uploadInterview", method: "post", path: "/interviews", summary: "Загрузить запись интервью на анализ",
        body: [
          { name: "candidate_id", type: "string", required: true, desc: "Идентификатор кандидата" },
          { name: "vacancy_id", type: "string", required: true, desc: "Идентификатор вакансии" },
          { name: "media_url", type: "string", required: true, desc: "URL записи интервью (mp4, mp3, m4a)" },
        ],
        sample: { candidate_id: "cand_4f21", vacancy_id: "ui-engineer", media_url: "https://cdn.acme.io/int-204.mp4" },
        responses: [{ code: "200", label: "Интервью принято в обработку" }, { code: "400", label: "Некорректный запрос" }],
        res: {
          "200": `{\n  "success": true,\n  "id": "int_8d24f0",\n  "status": "processing",\n  "created_at": "2026-06-13T09:24:00Z"\n}`,
          "400": bad("media_url", "Не удалось загрузить запись"),
        },
      },
      {
        id: "getInterview", fn: "getInterview", method: "get", path: "/interviews/{id}", summary: "Получить статус и результат анализа интервью",
        pathParams: [{ name: "id", type: "string", required: true, desc: "Идентификатор интервью" }],
        pathValues: { id: "int_8d24f0" },
        responses: [{ code: "200", label: "Успешно" }, { code: "404", label: "Интервью не найдено" }],
        res: {
          "200": `{\n  "success": true,\n  "id": "int_8d24f0",\n  "status": "completed",\n  "match": 0.88,\n  "report_url": "https://app.talentmind.ru/r/int_8d24f0",\n  "scores": {\n    "leadership": 0.88,\n    "communication": 0.84,\n    "empathy": 0.75,\n    "logic": 0.76\n  }\n}`,
          "404": nf("Интервью не найдено"),
        },
      },
      {
        id: "listInterviews", fn: "listInterviews", method: "get", path: "/interviews", summary: "Список интервью",
        params: [
          { name: "status", type: "string", enums: ["processing", "completed", "failed"], desc: "Фильтр по статусу" },
          { name: "limit", type: "integer", def: "20", desc: "Количество записей. Максимум 100." },
          { name: "offset", type: "integer", def: "0", desc: "Смещение для пагинации." },
        ],
        sample: { status: "completed", limit: 20, offset: 0 },
        responses: [{ code: "200", label: "Успешно" }, { code: "400", label: "Некорректный запрос" }],
        res: {
          "200": `{\n  "success": true,\n  "total": 128,\n  "items": [\n    { "id": "int_8d24f0", "status": "completed", "match": 0.88 },\n    { "id": "int_7b15c2", "status": "processing", "match": null }\n  ]\n}`,
          "400": bad("limit", "Максимум — 100"),
        },
      },
    ],
  },
  {
    id: "candidates", name: "Candidates", endpoints: [
      {
        id: "getCandidateScore", fn: "getCandidateScore", method: "get", path: "/candidates/{id}/score", summary: "Скоринг soft skills кандидата",
        pathParams: [{ name: "id", type: "string", required: true, desc: "Идентификатор кандидата" }],
        pathValues: { id: "cand_4f21" },
        responses: [{ code: "200", label: "Успешно" }, { code: "404", label: "Кандидат не найден" }],
        res: {
          "200": `{\n  "success": true,\n  "candidate_id": "cand_4f21",\n  "match": 0.88,\n  "scores": {\n    "leadership": 0.88,\n    "communication": 0.84,\n    "empathy": 0.75,\n    "planning": 0.85,\n    "stress_tolerance": 0.68\n  }\n}`,
          "404": nf("Кандидат не найден"),
        },
      },
      {
        id: "getCandidateReport", fn: "getCandidateReport", method: "get", path: "/candidates/{id}/report", summary: "Полный отчёт по кандидату",
        pathParams: [{ name: "id", type: "string", required: true, desc: "Идентификатор кандидата" }],
        pathValues: { id: "cand_4f21" },
        responses: [{ code: "200", label: "Успешно" }, { code: "404", label: "Кандидат не найден" }],
        res: {
          "200": `{\n  "success": true,\n  "candidate": {\n    "name": "Дмитрий Соколов",\n    "position": "Старший менеджер проектов"\n  },\n  "compatibility": 0.74,\n  "recommendation": "recommended",\n  "strengths": ["Системное мышление", "Полный цикл проекта"],\n  "risks": ["Высокие зарплатные ожидания"]\n}`,
          "404": nf("Кандидат не найден"),
        },
      },
      {
        id: "compareCandidates", fn: "compareCandidates", method: "post", path: "/candidates/compare", summary: "Сравнить кандидатов по критериям",
        body: [
          { name: "candidate_ids", type: "array<string>", required: true, desc: "Идентификаторы кандидатов (от 2 до 10)" },
          { name: "criteria", type: "string", desc: "Критерий сравнения (например, leadership)" },
        ],
        sample: { candidate_ids: ["cand_4f21", "cand_9a02"], criteria: "leadership" },
        responses: [{ code: "200", label: "Успешно" }, { code: "400", label: "Некорректный запрос" }],
        res: {
          "200": `{\n  "success": true,\n  "ranking": [\n    { "candidate_id": "cand_4f21", "score": 0.88 },\n    { "candidate_id": "cand_9a02", "score": 0.81 }\n  ]\n}`,
          "400": bad("candidate_ids", "Минимум 2 кандидата"),
        },
      },
    ],
  },
  {
    id: "culture", name: "Culture", endpoints: [
      {
        id: "getCultureProfile", fn: "getCultureProfile", method: "get", path: "/culture/profile", summary: "Профиль корпоративной культуры компании",
        responses: [{ code: "200", label: "Успешно" }],
        res: {
          "200": `{\n  "success": true,\n  "parameters_count": 54,\n  "dimensions": {\n    "innovation": 0.64,\n    "stability": 0.78,\n    "people": 0.72,\n    "results": 0.81,\n    "detail": 0.75,\n    "team": 0.69,\n    "competitiveness": 0.58\n  }\n}`,
        },
      },
      {
        id: "getCultureFit", fn: "getCultureFit", method: "post", path: "/culture/fit", summary: "Оценка совместимости кандидата с ДНК компании",
        body: [{ name: "candidate_id", type: "string", required: true, desc: "Идентификатор кандидата" }],
        sample: { candidate_id: "cand_4f21" },
        responses: [{ code: "200", label: "Успешно" }, { code: "400", label: "Некорректный запрос" }],
        res: {
          "200": `{\n  "success": true,\n  "fit_score": 0.74,\n  "matches": ["Исполнительская дисциплина", "Аналитический подход"],\n  "attention": ["Командное взаимодействие"]\n}`,
          "400": bad("candidate_id", "Кандидат не найден"),
        },
      },
    ],
  },
  {
    id: "webhooks", name: "Webhooks", endpoints: [
      {
        id: "createWebhook", fn: "createWebhook", method: "post", path: "/webhooks", summary: "Подписаться на события анализа",
        body: [
          { name: "url", type: "string", required: true, desc: "URL для доставки событий" },
          { name: "events", type: "array<string>", required: true, desc: "События: interview.completed, report.ready, candidate.scored" },
        ],
        sample: { url: "https://acme.io/hooks/talentmind", events: ["interview.completed", "report.ready"] },
        responses: [{ code: "200", label: "Вебхук создан" }, { code: "400", label: "Некорректный запрос" }],
        res: {
          "200": `{\n  "success": true,\n  "id": "wh_2c91",\n  "url": "https://acme.io/hooks/talentmind",\n  "events": ["interview.completed", "report.ready"]\n}`,
          "400": bad("url", "Некорректный URL"),
        },
      },
      {
        id: "listWebhooks", fn: "listWebhooks", method: "get", path: "/webhooks", summary: "Список вебхуков",
        responses: [{ code: "200", label: "Успешно" }],
        res: {
          "200": `{\n  "success": true,\n  "items": [\n    {\n      "id": "wh_2c91",\n      "url": "https://acme.io/hooks/talentmind",\n      "events": ["interview.completed", "report.ready"]\n    }\n  ]\n}`,
        },
      },
      {
        id: "deleteWebhook", fn: "deleteWebhook", method: "delete", path: "/webhooks/{id}", summary: "Удалить вебхук",
        pathParams: [{ name: "id", type: "string", required: true, desc: "Идентификатор вебхука" }],
        pathValues: { id: "wh_2c91" },
        responses: [{ code: "200", label: "Вебхук удалён" }, { code: "404", label: "Вебхук не найден" }],
        res: {
          "200": `{\n  "success": true,\n  "deleted": true\n}`,
          "404": nf("Вебхук не найден"),
        },
      },
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.endpoints);

/* ---------- генераторы кода ---------- */
const resolvePath = (ep: Endpoint) => {
  let p = ep.path;
  if (ep.pathValues) for (const k in ep.pathValues) p = p.replace(`{${k}}`, ep.pathValues[k]);
  return p;
};
const jsVal = (v: SampleVal): string =>
  Array.isArray(v) ? `[${v.map((x) => `'${x}'`).join(", ")}]` : typeof v === "string" ? `'${v}'` : String(v);
const phpVal = (v: SampleVal): string =>
  Array.isArray(v) ? `[${v.map((x) => `'${x}'`).join(", ")}]` : typeof v === "string" ? `'${v}'` : typeof v === "boolean" ? (v ? "true" : "false") : String(v);

function buildTs(ep: Endpoint) {
  const url = BASE + resolvePath(ep);
  const keys = Object.keys(ep.sample ?? {});
  const head = `import axios from 'axios';\n\nasync function ${ep.fn}() {\n  try {`;
  const tail = `\n    console.log(response.data);\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}\n\n${ep.fn}();`;
  if (ep.method === "post") {
    const body = `{\n${keys.map((k) => `      ${k}: ${jsVal(ep.sample![k])}`).join(",\n")}\n    }`;
    return `${head}\n    const response = await axios.post('${url}', ${body}, {\n      headers: { Authorization: 'Bearer YOUR_API_KEY' }\n    });${tail}`;
  }
  const parts = ["      headers: { Authorization: 'Bearer YOUR_API_KEY' }"];
  if (keys.length) parts.push(`      params: {\n${keys.map((k) => `        ${k}: ${jsVal(ep.sample![k])}`).join(",\n")}\n      }`);
  const verb = ep.method === "delete" ? "delete" : "get";
  return `${head}\n    const response = await axios.${verb}('${url}', {\n${parts.join(",\n")}\n    });${tail}`;
}
function buildPhp(ep: Endpoint) {
  const url = BASE + resolvePath(ep);
  const keys = Object.keys(ep.sample ?? {});
  const head = `<?php\nrequire 'vendor/autoload.php';\nuse GuzzleHttp\\Client;\n\n$client = new Client();\n`;
  const authBlock = `    'headers' => [\n        'Authorization' => 'Bearer YOUR_API_KEY',\n    ],`;
  if (ep.method === "post") {
    const j = `, [\n${authBlock}\n    'json' => [\n${keys.map((k) => `        '${k}' => ${phpVal(ep.sample![k])}`).join(",\n")},\n    ],\n]`;
    return `${head}$response = $client->post('${url}'${j});\n\necho $response->getBody();`;
  }
  const opts = keys.length
    ? `, [\n${authBlock}\n    'query' => [\n${keys.map((k) => `        '${k}' => ${phpVal(ep.sample![k])}`).join(",\n")},\n    ],\n]`
    : `, [\n${authBlock}\n]`;
  const verb = ep.method === "delete" ? "delete" : "get";
  return `${head}$response = $client->${verb}('${url}'${opts});\n\necho $response->getBody();`;
}
function buildGo(ep: Endpoint) {
  const keys = Object.keys(ep.sample ?? {});
  const method = ep.method.toUpperCase();
  if (ep.method === "post") {
    const payload = JSON.stringify(ep.sample).replace(/"/g, '\\"');
    return `package main\n\nimport (\n    "bytes"\n    "fmt"\n    "io"\n    "net/http"\n)\n\nfunc main() {\n    payload := []byte("${payload}")\n    req, _ := http.NewRequest("POST", "${BASE + resolvePath(ep)}", bytes.NewBuffer(payload))\n    req.Header.Set("Authorization", "Bearer YOUR_API_KEY")\n    req.Header.Set("Content-Type", "application/json")\n\n    resp, err := http.DefaultClient.Do(req)\n    if err != nil {\n        fmt.Println("Error:", err)\n        return\n    }\n    defer resp.Body.Close()\n\n    body, _ := io.ReadAll(resp.Body)\n    fmt.Println(string(body))\n}`;
  }
  const qs = keys.length ? "?" + keys.map((k) => `${k}=${ep.sample![k]}`).join("&") : "";
  return `package main\n\nimport (\n    "fmt"\n    "io"\n    "net/http"\n)\n\nfunc main() {\n    req, _ := http.NewRequest("${method}", "${BASE + resolvePath(ep)}${qs}", nil)\n    req.Header.Set("Authorization", "Bearer YOUR_API_KEY")\n\n    resp, err := http.DefaultClient.Do(req)\n    if err != nil {\n        fmt.Println("Error:", err)\n        return\n    }\n    defer resp.Body.Close()\n\n    body, _ := io.ReadAll(resp.Body)\n    fmt.Println(string(body))\n}`;
}
const buildCode = (ep: Endpoint, lang: Lang) => (lang === "ts" ? buildTs(ep) : lang === "php" ? buildPhp(ep) : buildGo(ep));

/* ---------- подсветка синтаксиса ---------- */
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function hlCode(code: string) {
  const re = /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\/\/[^\n]*|#[^\n]*)|\b(import|from|const|let|var|async|await|function|return|package|func|require|use|new|echo|try|catch|defer|else|nil|true|false|string)\b|(-?\b\d+(?:\.\d+)?\b)/g;
  let out = "", last = 0, m: RegExpExecArray | null;
  while ((m = re.exec(code))) {
    out += esc(code.slice(last, m.index));
    const cls = m[1] ? "ds-str" : m[2] ? "ds-com" : m[3] ? "ds-kw" : "ds-num";
    out += `<span class="${cls}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(code.slice(last));
}
function hlJson(code: string) {
  const re = /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|(-?\b\d+(?:\.\d+)?\b)/g;
  let out = "", last = 0, m: RegExpExecArray | null;
  while ((m = re.exec(code))) {
    out += esc(code.slice(last, m.index));
    if (m[1]) out += `<span class="${m[2] ? "ds-key" : "ds-str"}">${esc(m[1])}</span>` + (m[2] ? esc(m[2]) : "");
    else if (m[3]) out += `<span class="ds-kw">${esc(m[3])}</span>`;
    else out += `<span class="ds-num">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(code.slice(last));
}

type Lang = "ts" | "php" | "go";
const LANGS: [Lang, string][] = [["ts", "TypeScript"], ["php", "PHP"], ["go", "Go"]];

/* ============================================================
   Страница
   ============================================================ */
export default function ApiDocsPage() {
  const root = useReveals();
  const [lang, setLang] = useState<Lang>("ts");
  const [active, setActive] = useState(ALL[0].id);

  /* scrollspy — подсветка активного пункта навигации */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    ALL.forEach((ep) => { const el = document.getElementById(ep.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <div ref={root} className="relative w-full" style={{ color: INK }}>
      <style>{`
        .ds-str{color:#ffd9a0}.ds-key{color:#7ce0d3}.ds-kw{color:#a3e635}.ds-num{color:#f5b971}.ds-com{color:#6b8a7e;font-style:italic}
        .ds-scroll::-webkit-scrollbar{height:8px;width:8px}.ds-scroll::-webkit-scrollbar-thumb{background:#1f4a44;border-radius:8px}
        @keyframes dsPanel{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* ============================== HERO ============================== */}
      <section className="mx-auto max-w-[1500px] px-5 pt-32 pb-8 sm:px-8 lg:pt-40 3xl:max-w-[1680px]">
        <div className="flex flex-wrap items-end gap-x-4 gap-y-2 animate-rise" style={{ animationDelay: "60ms" }}>
          <h1 className="text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1] tracking-tight">TalentMind API</h1>
          <span className="mb-1.5 rounded-full px-3 py-1 font-mono text-xs font-semibold" style={{ background: `${GREEN}1a`, color: GREEN }}>v1.0.0</span>
        </div>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#183833]/70 animate-rise" style={{ animationDelay: "120ms" }}>
          Документация TalentMind API — программный доступ к анализу интервью, скорингу soft skills и оценке корпоративной совместимости кандидатов. REST API и вебхуки для встраивания ИИ-оценки в ваш ATS
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3 animate-rise" style={{ animationDelay: "180ms" }}>
          <a href="mailto:support@talentmind.ru" className="ease-smooth inline-flex items-center gap-2 rounded-xl border border-[#183833]/12 bg-white px-4 py-3 text-sm font-medium transition-colors hover:bg-[#f4f7f2]">
            <Mail className="h-4 w-4" style={{ color: TEAL }} /> support@talentmind.ru
          </a>
          <a href="https://talentmind.ru/contacts" className="ease-smooth inline-flex items-center gap-2 rounded-xl border border-[#183833]/12 bg-white px-4 py-3 text-sm font-medium transition-colors hover:bg-[#f4f7f2]">
            <Link2 className="h-4 w-4" style={{ color: TEAL }} /> talentmind.ru/contacts
          </a>
        </div>
      </section>

      {/* ============================== LAYOUT ============================== */}
      <div className="mx-auto max-w-[1500px] px-5 pb-28 sm:px-8 lg:grid lg:grid-cols-[224px_1fr] lg:gap-10 3xl:max-w-[1680px]">
        {/* НАВИГАЦИЯ */}
        <aside className="hidden lg:block">
          <nav className="ds-scroll sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            {GROUPS.map((g) => (
              <div key={g.id} className="mb-6">
                <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#183833]/45">{g.name}</p>
                <ul className="space-y-0.5">
                  {g.endpoints.map((ep) => {
                    const on = active === ep.id;
                    return (
                      <li key={ep.id}>
                        <a href={`#${ep.id}`} onClick={goTo(ep.id)}
                          className={`ease-smooth flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] transition-all duration-200 ${on ? "bg-[#f0f6e8] font-semibold" : "text-[#183833]/60 hover:bg-[#f4f7f2] hover:text-[#183833]"}`}
                          style={on ? { color: GREEN } : undefined}>
                          <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all ${on ? "" : "opacity-0"}`} style={{ background: GREEN }} />
                          <span className="truncate">{ep.fn}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* КОНТЕНТ */}
        <main className="min-w-0">
          {/* Authorization */}
          <section className="reveal rounded-3xl border border-[#e6ece4] bg-white p-6 shadow-[0_16px_44px_rgba(24,56,51,0.06)] md:p-8">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: `${TEAL}1a` }}><Lock className="h-5 w-5" style={{ color: TEAL }} /></span>
              <h2 className="text-xl font-bold tracking-tight">Авторизация</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#183833]/70">
              Заголовок <code className="rounded bg-[#f4f7f2] px-1.5 py-0.5 font-mono text-[13px]" style={{ color: INK }}>Authorization</code> передаётся в формате <code className="rounded bg-[#f4f7f2] px-1.5 py-0.5 font-mono text-[13px]" style={{ color: GREEN }}>Bearer {"{token}"}</code>
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[["Схема", "BearerAuth", <KeyRound key="k" className="h-4 w-4" />], ["Тип", "API Key", <Lock key="l" className="h-4 w-4" />], ["Заголовок", "Authorization", <ChevronRight key="c" className="h-4 w-4" />]].map(([t, v, icon]) => (
                <div key={t as string} className="rounded-2xl border border-[#eef0ee] bg-[#fafcf8] p-4">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#183833]/45">{icon} {t as string}</p>
                  <p className="mt-1.5 font-mono text-sm font-semibold" style={{ color: INK }}>{v as string}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Группы эндпоинтов */}
          {GROUPS.map((g) => (
            <section key={g.id} id={g.id} className="scroll-mt-28">
              <h2 className="reveal mt-14 mb-2 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
                <span className="h-7 w-1.5 rounded-full" style={{ background: GREEN }} /> {g.name}
              </h2>
              <div className="space-y-2">
                {g.endpoints.map((ep) => <EndpointCard key={ep.id} ep={ep} lang={lang} setLang={setLang} />)}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

/* ---------- карточка эндпоинта ---------- */
function MethodBadge({ method }: { method: Method }) {
  return <span className="rounded-md px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-white" style={{ background: methodColor(method) }}>{method}</span>;
}

function EndpointCard({ ep, lang, setLang }: { ep: Endpoint; lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <article id={ep.id} className="reveal scroll-mt-28 grid gap-6 border-t border-[#e6ece4] py-10 xl:grid-cols-[1fr_minmax(0,540px)] xl:gap-10">
      {/* ДОКУМЕНТАЦИЯ */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <MethodBadge method={ep.method} />
          <h3 className="font-mono text-lg font-bold tracking-tight" style={{ color: INK }}>{ep.fn}</h3>
        </div>
        <p className="mt-2.5 text-[15px] leading-relaxed text-[#183833]/70">{ep.summary}</p>

        {ep.pathParams && (
          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#183833]/45">Path parameters</p>
            <div className="mt-2 divide-y divide-[#eef0ee] rounded-2xl border border-[#eef0ee] bg-white">
              {ep.pathParams.map((p) => <ParamRow key={p.name} p={p} />)}
            </div>
          </div>
        )}

        {ep.params && (
          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#183833]/45">Query parameters</p>
            <div className="mt-2 divide-y divide-[#eef0ee] rounded-2xl border border-[#eef0ee] bg-white">
              {ep.params.map((p) => <ParamRow key={p.name} p={p} />)}
            </div>
          </div>
        )}

        {ep.body && (
          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#183833]/45">Request body · application/json</p>
            <div className="mt-2 divide-y divide-[#eef0ee] rounded-2xl border border-[#eef0ee] bg-white">
              {ep.body.map((p) => <ParamRow key={p.name} p={p} />)}
            </div>
          </div>
        )}

        <div className="mt-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#183833]/45">Responses</p>
          <div className="mt-2 space-y-1.5">
            {ep.responses.map((r) => (
              <div key={r.code} className="flex items-center gap-2.5 text-sm">
                <span className="rounded-md px-2 py-0.5 font-mono text-xs font-bold text-white" style={{ background: r.code === "200" ? GREEN : RED }}>{r.code}</span>
                <span className="text-[#183833]/70">{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 overflow-x-auto rounded-xl border border-[#e6ece4] bg-[#f4f7f2] px-4 py-3">
          <span className="shrink-0 font-mono text-xs font-bold uppercase tracking-wide" style={{ color: methodColor(ep.method) }}>{ep.method}</span>
          <span className="whitespace-nowrap font-mono text-sm" style={{ color: INK }}>/v1{ep.path}</span>
        </div>
      </div>

      {/* КОД */}
      <div className="min-w-0 space-y-4">
        <RequestPanel ep={ep} lang={lang} setLang={setLang} />
        <ResponsePanel ep={ep} />
      </div>
    </article>
  );
}

function ParamRow({ p }: { p: Param }) {
  return (
    <div className="grid grid-cols-1 gap-1.5 p-3.5 sm:grid-cols-[150px_1fr] sm:gap-4">
      <div>
        <code className="font-mono text-[13px] font-semibold" style={{ color: INK }}>{p.name}</code>
        {p.required && <span className="ml-1.5 align-middle text-[10px] font-semibold uppercase" style={{ color: RED }}>required</span>}
        <p className="mt-0.5 font-mono text-[11px] text-[#183833]/45">{p.type}</p>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-1.5">
          {p.def != null && <span className="rounded-md bg-[#f0f6e8] px-2 py-0.5 font-mono text-[11px] font-medium" style={{ color: INK }}>Default: {p.def}</span>}
          {p.enums && <span className="rounded-md bg-[#eaf6f8] px-2 py-0.5 font-mono text-[11px] font-medium" style={{ color: TEAL }}>Enum: {p.enums.join(" · ")}</span>}
        </div>
        <p className="mt-1.5 text-[13px] leading-snug text-[#183833]/65">{p.desc}</p>
      </div>
    </div>
  );
}

/* ---------- панель запроса ---------- */
function RequestPanel({ ep, lang, setLang }: { ep: Endpoint; lang: Lang; setLang: (l: Lang) => void }) {
  const code = buildCode(ep, lang);
  return (
    <div className="overflow-hidden rounded-2xl border border-[#13322e] bg-[#0f2a27] shadow-[0_24px_60px_rgba(24,56,51,0.22)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-xs font-medium text-white/55">Request</span>
        </div>
        <CopyBtn text={code} />
      </div>
      <div className="flex gap-1 border-b border-white/10 px-3 py-2">
        {LANGS.map(([id, label]) => (
          <button key={id} onClick={() => setLang(id)}
            className={`ease-smooth rounded-lg px-3 py-1 text-xs font-medium transition-all duration-200 ${lang === id ? "bg-white/12 text-white" : "text-white/45 hover:text-white/80"}`}>
            {label}
          </button>
        ))}
      </div>
      <pre key={lang} className="ds-scroll overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-relaxed text-[#cfe8c4]" style={{ animation: "dsPanel .3s ease both" }}>
        <code dangerouslySetInnerHTML={{ __html: hlCode(code) }} />
      </pre>
    </div>
  );
}

/* ---------- панель ответа ---------- */
function ResponsePanel({ ep }: { ep: Endpoint }) {
  const codes = Object.keys(ep.res);
  const [tab, setTab] = useState(codes[0]);
  const json = ep.res[tab];
  return (
    <div className="overflow-hidden rounded-2xl border border-[#13322e] bg-[#0f2a27] shadow-[0_24px_60px_rgba(24,56,51,0.22)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="text-xs font-medium text-white/55">Response · application/json</span>
        <CopyBtn text={json} />
      </div>
      <div className="flex gap-1 border-b border-white/10 px-3 py-2">
        {codes.map((c) => (
          <button key={c} onClick={() => setTab(c)}
            className={`ease-smooth flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all duration-200 ${tab === c ? "bg-white/12 text-white" : "text-white/45 hover:text-white/80"}`}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: c === "200" ? GREEN : RED }} /> {c}
          </button>
        ))}
      </div>
      <pre key={tab} className="ds-scroll overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-relaxed text-[#cfe8c4]" style={{ animation: "dsPanel .3s ease both" }}>
        <code dangerouslySetInnerHTML={{ __html: hlJson(json) }} />
      </pre>
    </div>
  );
}

/* ---------- кнопка копирования ---------- */
function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout>>(undefined);
  return (
    <button
      onClick={() => { navigator.clipboard?.writeText(text); setDone(true); clearTimeout(t.current); t.current = setTimeout(() => setDone(false), 1500); }}
      className="ease-smooth flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium text-white/55 transition-all hover:bg-white/10 hover:text-white"
    >
      {done ? <><Check className="h-3.5 w-3.5" style={{ color: GREEN }} /> Скопировано</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
    </button>
  );
}
