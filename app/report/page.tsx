import type { Metadata } from "next";
import {
  ShieldAlert,
  Check,
  AlertTriangle,
  Sparkles,
  GitBranch,
  Scale,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Отчёт корпоративной культуры — Inostudio · TalentMind",
};

/* ===== brand tokens ===== */
const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const INK = "#183833";
const RED = "#FF5252";
const AMBER = "#E8A317";

const scoreColor = (s: number) => (s >= 70 ? GREEN : s >= 50 ? AMBER : RED);

/* ===== data (из отчёта) ===== */
const DOCS = [
  "Отчётность (time reporting)",
  "Онбординг",
  "Адаптация",
  "Роли",
  "Код-ревью",
  "Вопросы к оценке 360",
  "Типовые вопросы по SS",
  "Холакратия (9 документов)",
];

const VALUES = ["Исполнительность", "Честность", "Коллаборация"];

const GAPS = [
  {
    title: "Инновационность / Гибкость",
    decl: "Холакратия / Роли (R&D)",
    real: "Отчётность (time reporting) / Холакратия (Законодательные встречи)",
    note: "Декларируется поиск инноваций, но детализированные требования к логированию времени и процедуры утверждения увеличивают цикл внедрения.",
    low: "Существуют выделенные роли для R&D",
    high: "Процедуры согласования и правила бережливого производства ограничивают скорость",
  },
  {
    title: "Ориентация на команду / Неформальность",
    decl: "Руководство по адаптации (Бадди)",
    real: "Холакратия (Тактические встречи)",
    note: "Декларируется поддержка через институт Бадди, но коммуникации на рабочих встречах регламентированы правилами, ограничивающими свободные обсуждения.",
    low: "Внедрена система адаптации и взаимопомощи",
    high: "Регламенты встреч формализуют общение и запрещают свободные ответы",
  },
];

const OCP: [string, number][] = [
  ["Инновации", 39],
  ["Стабильность", 83],
  ["Люди", 65],
  ["Результаты", 71],
  ["Качество", 77],
  ["Команда", 73],
  ["Лидерство", 60],
];

const MEASURES = [
  { name: "Гибкость (Agility)", score: 49, desc: "Гибкость структуры балансируется высокой степенью регламентации процессов и границ ролей." },
  { name: "Коллаборация", score: 73, desc: "Уровень формализованного сотрудничества поддерживается через кросс-ревью и систему бадди." },
  { name: "Клиентоцентричность", score: 77, desc: "Фокус на качестве продукта и результатах через соблюдение стандартов." },
  { name: "Разнообразие", score: 67, desc: "Уважение границ и ролей является основой взаимодействия." },
  { name: "Исполнение", score: 83, desc: "Системный контроль исполнения, детальный учёт времени и стандартов качества." },
  { name: "Инновации", score: 39, desc: "Инновации структурированы через регламенты, оценку ROI и многоуровневое тестирование." },
  { name: "Честность", score: 84, desc: "Ответственность за закреплённые Домены и следование Конституции компании." },
  { name: "Результативность", score: 71, desc: "Оценка по результатам 360 и соблюдению стандартов разработки и процессов." },
  { name: "Уважение", score: 65, desc: "Уважение транслируется через соблюдение границ ролей и систему онбординга." },
];

const INDICATORS = [
  { t: "Процессное мышление", d: "Кандидат описывает решение проблем через создание правил, регламентов или изменение процесса, а не через личные договорённости." },
  { t: "Уважение к границам ролей", d: "В кейсах на командную работу уточняет зоны ответственности и запрашивает полномочия перед вмешательством в смежные процессы." },
  { t: "Педантичность в отчётности", d: "Относится с пониманием к необходимости логировать время, писать подробные коммиты и следовать Definition of Done." },
];

const REDFLAGS = [
  { t: "Склонность к неформализованной работе", d: "Склонность игнорировать Definition of Done и границы Доменов приведёт к системным конфликтам." },
  { t: "Неготовность к регулярному тайм-трекингу", d: "Необходимость ежедневного учёта времени в TimeLogger с форматированием может вызвать дискомфорт." },
  { t: "Неформальное решение рабочих вопросов", d: "Привычка решать вопросы вне регламентов столкнётся с системой Законодательных встреч и прозрачности." },
];

/* ===== circular gauge ===== */
function Gauge({ value }: { value: number }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  const offset = (c * (100 - value)) / 100;
  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 180 180" className="h-40 w-40 -rotate-90">
        <defs>
          <linearGradient id="g-gauge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={GREEN} />
            <stop offset="1" stopColor={TEAL} />
          </linearGradient>
        </defs>
        <circle cx="90" cy="90" r={r} fill="none" stroke="#e8ece6" strokeWidth="14" />
        <circle cx="90" cy="90" r={r} fill="none" stroke="url(#g-gauge)" strokeWidth="14" strokeLinecap="round" strokeDasharray={c.toFixed(1)} strokeDashoffset={offset.toFixed(1)} />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold" style={{ color: INK }}>{value}</span>
        <span className="text-[10px] font-medium uppercase tracking-wide text-[#183833]/50">из 100</span>
      </div>
    </div>
  );
}

/* ===== OCP radar (7 axes) ===== */
function OcpRadar() {
  const cx = 150, cy = 140, rad = 105;
  const dirs = OCP.map((_, i) => {
    const a = ((-90 + (i * 360) / OCP.length) * Math.PI) / 180;
    return [Math.cos(a), Math.sin(a)] as const;
  });
  const pts = (vals: number[]) => vals.map((v, i) => `${(cx + dirs[i][0] * rad * (v / 100)).toFixed(1)},${(cy + dirs[i][1] * rad * (v / 100)).toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 300 290" className="h-72 w-full">
      {[0.25, 0.5, 0.75, 1].map((ring) => (
        <polygon key={ring} points={pts(OCP.map(() => ring * 100))} fill="none" stroke="#e3e6e2" strokeWidth="1" />
      ))}
      {dirs.map((d, i) => (
        <line key={i} x1={cx} y1={cy} x2={(cx + d[0] * rad).toFixed(1)} y2={(cy + d[1] * rad).toFixed(1)} stroke="#e3e6e2" strokeWidth="1" />
      ))}
      <polygon points={pts(OCP.map(([, v]) => v))} fill={`${GREEN}2e`} stroke={GREEN} strokeWidth="2" />
      {OCP.map(([label, v], i) => {
        const x = cx + dirs[i][0] * (rad + 20);
        const y = cy + dirs[i][1] * (rad + 14);
        return (
          <text key={label} x={x.toFixed(1)} y={y.toFixed(1)} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#183833">
            <tspan fontWeight="600">{label}</tspan>
            <tspan x={x.toFixed(1)} dy="13" fill={scoreColor(v)} fontWeight="700">{v}</tspan>
          </text>
        );
      })}
    </svg>
  );
}

function Section({ eyebrow, title, children }: { eyebrow?: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      {eyebrow && (
        <span className="font-mono text-xs uppercase tracking-widest" style={{ color: GREEN }}>● {eyebrow}</span>
      )}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: INK }}>{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function ReportPage() {
  return (
    <div className="min-h-screen w-full bg-[#F4F7F6] text-[#183833]" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
      {/* top bar */}
      <header className="sticky top-0 z-20 border-b border-[#e6ece4] bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/figma/logo.svg" alt="TalentMind" className="h-7 w-auto" />
            <span className="hidden text-sm text-[#183833]/50 sm:block">· Отчёт о культуре</span>
          </div>
          <span className="rounded-full bg-[#7AB800]/12 px-3 py-1 text-xs font-semibold" style={{ color: GREEN }}>IT / Tech</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        {/* title */}
        <p className="font-mono text-xs uppercase tracking-widest" style={{ color: TEAL }}>● Анализ корпоративной культуры</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl" style={{ color: INK }}>
          Отчёт корпоративной культуры — <span style={{ color: GREEN }}>Inostudio</span>
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#183833]/60">
          <span>Индустрия: <b className="font-medium text-[#183833]">IT / Tech</b></span>
          <span className="hidden h-4 w-px bg-[#183833]/15 sm:block" />
          <span>Tone of Voice: <b className="font-medium text-[#183833]">Формальный / Регламентированный</b></span>
          <span className="hidden h-4 w-px bg-[#183833]/15 sm:block" />
          <span>Кандидаты: Сергей · Максим · Алекс</span>
        </div>

        {/* summary */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-[#ededed] bg-white p-8 shadow-[0_20px_50px_rgba(24,56,51,0.06)]">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#7AB800]/12 px-3 py-1 text-xs font-semibold" style={{ color: GREEN }}>
              <Sparkles className="h-3.5 w-3.5" /> Уникальное ценностное предложение (UVP)
            </span>
            <p className="mt-4 text-lg leading-relaxed text-[#183833]/85">
              Интеграция инженерных стандартов (CI/CD, DoD) и системы управления Холакратия. Высокая степень
              процессного управления, очерченные границы ролей (Домены) и систематический учёт времени.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#F4F7F6] p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#183833]/45">Тип культуры</p>
                <p className="mt-2 text-sm leading-snug">Процессно-ориентированная культура с элементами распределённого управления через формализованные правила.</p>
              </div>
              <div className="rounded-2xl bg-[#F4F7F6] p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#183833]/45">Доминирующие ценности</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {VALUES.map((v) => (
                    <span key={v} className="rounded-full bg-white px-3 py-1 text-sm font-medium" style={{ color: INK }}>{v}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-3xl border border-[#ededed] bg-white p-8 text-center shadow-[0_20px_50px_rgba(24,56,51,0.06)]">
            <p className="text-sm font-semibold" style={{ color: INK }}>Индекс уверенности</p>
            <div className="mt-4"><Gauge value={85} /></div>
            <p className="mt-4 text-xs text-[#183833]/55">Надёжность вывода на основе анализа документов</p>
          </div>
        </div>

        {/* contradictions */}
        <div className="mt-6 rounded-3xl border p-6" style={{ borderColor: `${AMBER}40`, background: `${AMBER}0d` }}>
          <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#8a5a08" }}>
            <AlertTriangle className="h-4 w-4" style={{ color: AMBER }} /> Культурные противоречия
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#183833]/80">
            Декларируется гибкость ролей, однако операционная деятельность требует прохождения
            многоступенчатых процедур для внедрения изменений.
          </p>
        </div>

        {/* source docs */}
        <Section eyebrow="Источники" title="На основе документов">
          <div className="flex flex-wrap gap-2.5">
            {DOCS.map((d) => (
              <span key={d} className="rounded-full border border-[#ededed] bg-white px-4 py-2 text-sm text-[#183833]/75">{d}</span>
            ))}
          </div>
        </Section>

        {/* culture gaps */}
        <Section title="Анализ культурных разрывов">
          <p className="-mt-3 mb-5 text-sm text-[#183833]/60">Сопоставление декларативных ценностей и операциональной реальности</p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {GAPS.map((g) => (
              <div key={g.title} className="flex flex-col rounded-3xl border border-[#ededed] bg-white p-7 shadow-[0_16px_40px_rgba(24,56,51,0.06)]">
                <h3 className="flex items-center gap-2 text-lg font-semibold" style={{ color: INK }}>
                  <GitBranch className="h-5 w-5" style={{ color: TEAL }} /> {g.title}
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#7AB800]/10 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: GREEN }}>Декларация</p>
                    <p className="mt-1 text-sm">{g.decl}</p>
                  </div>
                  <div className="rounded-2xl bg-[#11AFCC]/10 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: TEAL }}>Операционная реальность</p>
                    <p className="mt-1 text-sm">{g.real}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#183833]/75">{g.note}</p>
                <div className="mt-5 grid grid-cols-1 gap-3 border-t border-[#ededed] pt-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#183833]/45">Почему не ниже</p>
                    <p className="mt-1 text-sm text-[#183833]/75">{g.low}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#183833]/45">Почему не выше</p>
                    <p className="mt-1 text-sm text-[#183833]/75">{g.high}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* OCP + risk */}
        <Section title="Профиль организационной культуры (OCP)">
          <p className="-mt-3 mb-5 text-sm text-[#183833]/60">Агрегированные баллы по 7 основным OCP-измерениям</p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-3xl border border-[#ededed] bg-white p-6 shadow-[0_16px_40px_rgba(24,56,51,0.06)]">
              <OcpRadar />
            </div>
            <div className="flex flex-col rounded-3xl border p-7 shadow-[0_16px_40px_rgba(24,56,51,0.06)]" style={{ borderColor: `${RED}33`, background: `${RED}0a` }}>
              <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: INK }}>
                <ShieldAlert className="h-5 w-5" style={{ color: RED }} /> Риски и уязвимости
              </p>
              <p className="mt-1 text-xs text-[#183833]/55">Выявленные на основе анализа документов</p>
              <span className="mt-5 w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white" style={{ background: RED }}>High</span>
              <h3 className="mt-3 text-lg font-semibold" style={{ color: INK }}>Снижение скорости принятия решений (Time-to-Market)</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#183833]/75">
                Система правил (Холакратия, DoD, тайм-трекинг) может увеличить время на согласование изменений
                и внедрение новых решений.
              </p>
            </div>
          </div>
        </Section>

        {/* measurements */}
        <Section title="Анализ измерений">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {MEASURES.map((m) => {
              const c = scoreColor(m.score);
              return (
                <div key={m.name} className="flex flex-col rounded-3xl border border-[#ededed] bg-white p-6 shadow-[0_12px_30px_rgba(24,56,51,0.05)]">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-semibold" style={{ color: INK }}>{m.name}</h3>
                    <span className="text-sm font-bold" style={{ color: c }}>{m.score} / 100</span>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-[#eef1ec]">
                    <div className="h-2 rounded-full" style={{ width: `${m.score}%`, background: c }} />
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#183833]/65">{m.desc}</p>
                  <span className="mt-4 text-sm font-medium" style={{ color: TEAL }}>Подробнее и обоснование →</span>
                </div>
              );
            })}
          </div>
        </Section>

        {/* TalentMind prism */}
        <Section eyebrow="Призма оценки TalentMind" title="Целевой культурный fit">
          <div className="rounded-3xl p-8 text-white" style={{ background: INK }}>
            <div className="flex items-start gap-3">
              <Scale className="h-6 w-6 shrink-0" style={{ color: GREEN }} />
              <p className="text-lg leading-relaxed text-white/90">
                Системный профессионал, опирающийся на правила. Способен работать в структурированных
                фреймворках (Холакратия, CI/CD), адаптирован к ежедневному учёту времени и формальным процессам.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: GREEN }}>
                  <Check className="h-4 w-4" /> Ключевые поведенческие индикаторы
                </p>
                <div className="mt-4 space-y-3">
                  {INDICATORS.map((it) => (
                    <div key={it.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm font-semibold text-white">{it.t}</p>
                      <p className="mt-1 text-sm leading-snug text-white/65">{it.d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#ff8a8a" }}>
                  <AlertTriangle className="h-4 w-4" /> Красные флаги
                </p>
                <div className="mt-4 space-y-3">
                  {REDFLAGS.map((it) => (
                    <div key={it.t} className="rounded-2xl border p-4" style={{ borderColor: `${RED}40`, background: `${RED}14` }}>
                      <p className="text-sm font-semibold text-white">{it.t}</p>
                      <p className="mt-1 text-sm leading-snug text-white/65">{it.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        <p className="mt-12 text-center text-xs text-[#183833]/40">Сгенерировано TalentMind · Отчёт корпоративной культуры</p>
      </main>
    </div>
  );
}
