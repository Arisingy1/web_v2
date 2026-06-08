import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui";
import {
  IconAnon,
  IconArrowRight,
  IconCheck,
  IconCloud,
  IconLock,
  IconServer,
  IconShield,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Безопасность и комплаенс",
  description:
    "ФЗ-152, дата-центры в РФ, анонимизация данных, шифрование и On-Premise развёртывание. Инфраструктура TalentMind, одобренная службами информационной безопасности.",
};

const CARDS = [
  {
    icon: <IconShield className="h-5 w-5" />,
    title: "Соответствие ФЗ-152",
    text: "Все персональные данные хранятся и обрабатываются в дата-центрах на территории РФ. Платформа спроектирована под требования регулятора.",
    tags: ["Дата-центры в РФ", "152-ФЗ"],
  },
  {
    icon: <IconAnon className="h-5 w-5" />,
    title: "Анонимизация данных",
    text: "Чувствительные сведения обезличиваются перед анализом. Доступ к исходным записям — только у авторизованных сотрудников по ролевой модели.",
    tags: ["Обезличивание", "RBAC"],
  },
  {
    icon: <IconLock className="h-5 w-5" />,
    title: "Шифрование",
    text: "Данные шифруются при передаче (TLS 1.3) и хранении (AES-256). Ключи изолированы, журналируется каждый доступ к записи.",
    tags: ["TLS 1.3", "AES-256"],
  },
  {
    icon: <IconServer className="h-5 w-5" />,
    title: "Без обучения на ваших данных",
    text: "Мы не дообучаем публичные модели на материалах клиентов. Ваши интервью не покидают контур и не используются для тренировки.",
    tags: ["Private models", "Изоляция"],
  },
];

const COMPARE = [
  { feature: "Скорость запуска", saas: "Дни", onprem: "Недели" },
  { feature: "Обновления", saas: "Автоматически", onprem: "По регламенту ИБ" },
  { feature: "Размещение данных", saas: "Облако TalentMind в РФ", onprem: "Внутри вашего контура" },
  { feature: "Интеграция с SIEM/SSO", saas: "Опционально", onprem: "Полная" },
  { feature: "Подходит для", saas: "Большинство команд", onprem: "Банки, госсектор, КИИ" },
];

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-lime/20 blur-3xl"
          aria-hidden
        />
        <div className="container-x relative py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-lime-50">
              <IconShield className="h-4 w-4 text-lime" /> Безопасность
            </span>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.06] md:text-6xl">
              Инфраструктура, одобренная службами ИБ
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-lime-50/80">
              Платформа разработана с учётом строгих корпоративных стандартов приватности
              и российского законодательства. Готовы пройти аудит вашей службы
              информационной безопасности.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#demo" className="btn-primary">
                Запросить документацию ИБ
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Security cards */}
      <Section>
        <SectionHeading
          eyebrow="Комплаенс"
          title="Защита данных на каждом уровне"
          text="Технические и организационные меры, которые закрывают типовые требования корпоративных аудитов."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {CARDS.map((c) => (
            <div key={c.title} className="card flex flex-col gap-4 p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-lime-50">
                {c.icon}
              </span>
              <h3 className="text-lg font-semibold text-ink">{c.title}</h3>
              <p className="text-sm leading-relaxed text-ink-500">{c.text}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line-green bg-lime-50 px-3 py-1 text-xs font-semibold text-ink-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SaaS vs On-Premise */}
      <Section tone="cream">
        <SectionHeading
          align="center"
          eyebrow="Модели развёртывания"
          title="SaaS или On-Premise — на ваш выбор"
          text="Запуститесь быстро в нашем облаке или разверните TalentMind полностью внутри своего периметра."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <DeployCard
            kind="SaaS (облако)"
            icon={<IconCloud className="h-5 w-5" />}
            desc="Быстрый старт без инфраструктурных затрат. Сопровождение и обновления — на стороне TalentMind."
            featured
          />
          <DeployCard
            kind="On-Premise (частное облако)"
            icon={<IconServer className="h-5 w-5" />}
            desc="Полный контроль: установка в вашем дата-центре, интеграция с корпоративными SSO и SIEM."
          />
        </div>

        {/* comparison table */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-cream/50">
                <th className="px-6 py-4 font-semibold text-ink">Характеристика</th>
                <th className="px-6 py-4 font-semibold text-lime-700">SaaS</th>
                <th className="px-6 py-4 font-semibold text-ink">On-Premise</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row, i) => (
                <tr key={row.feature} className={i % 2 ? "bg-cream/30" : ""}>
                  <td className="px-6 py-4 font-medium text-ink">{row.feature}</td>
                  <td className="px-6 py-4 text-ink-500">{row.saas}</td>
                  <td className="px-6 py-4 text-ink-500">{row.onprem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Network diagram */}
      <Section>
        <SectionHeading
          eyebrow="Архитектура"
          title="Изоляция данных в On-Premise контуре"
          text="Записи и персональные данные не покидают защищённый периметр компании. Наружу уходит только обезличенная телеметрия по согласованию."
        />
        <div className="mt-12">
          <NetworkDiagram />
        </div>
      </Section>
    </>
  );
}

function DeployCard({
  kind,
  icon,
  desc,
  featured,
}: {
  kind: string;
  icon: React.ReactNode;
  desc: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-3xl border p-8 ${
        featured ? "border-lime/50 bg-white shadow-lift" : "border-line bg-white shadow-soft"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            featured ? "bg-lime text-white" : "bg-ink text-lime-50"
          }`}
        >
          {icon}
        </span>
        <h3 className="font-display text-xl font-semibold text-ink">{kind}</h3>
      </div>
      <p className="text-sm leading-relaxed text-ink-500">{desc}</p>
      <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-lime-700">
        <IconCheck className="h-4 w-4" /> Доступно на тарифах Scale и Enterprise
      </div>
    </div>
  );
}

/* Pure SVG isolation diagram */
function NetworkDiagram() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white p-4 shadow-soft md:p-8">
      <svg viewBox="0 0 900 420" className="h-auto w-full" role="img" aria-label="Схема изоляции данных в On-Premise контуре">
        <defs>
          <linearGradient id="perim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f2f8e6" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* corporate perimeter */}
        <rect x="20" y="20" width="600" height="380" rx="24" fill="url(#perim)" stroke="#7ab800" strokeWidth="2" strokeDasharray="2 8" />
        <text x="44" y="52" fontSize="13" fontWeight="700" fill="#183833">
          Защищённый контур компании
        </text>
        <g transform="translate(540 36)">
          <rect x="0" y="0" width="58" height="22" rx="11" fill="#183833" />
          <text x="29" y="15" fontSize="11" fontWeight="700" fill="#f2f8e6" textAnchor="middle">
            ФЗ-152
          </text>
        </g>

        {/* nodes inside */}
        <DiagramNode x={70} y={120} label="ВКС / запись" sub="Zoom · Teams" />
        <DiagramNode x={70} y={250} label="Хранилище" sub="Шифрование AES-256" />
        <DiagramNode x={300} y={185} label="Ядро TalentMind" sub="On-Premise" primary />
        <DiagramNode x={470} y={120} label="ATS / 1С" sub="Карточка кандидата" />
        <DiagramNode x={470} y={250} label="SSO / SIEM" sub="Аудит доступа" />

        {/* internal links (lime, solid) */}
        <Link2 x1={196} y1={150} x2={300} y2={205} />
        <Link2 x1={196} y1={280} x2={300} y2={235} />
        <Link2 x1={426} y1={215} x2={470} y2={150} />
        <Link2 x1={426} y1={220} x2={470} y2={280} />

        {/* gateway */}
        <g transform="translate(636 175)">
          <rect x="0" y="0" width="58" height="70" rx="14" fill="#fff" stroke="#183833" strokeWidth="1.5" />
          <path d="M29 18v34M16 35h26" stroke="#183833" strokeWidth="2" strokeLinecap="round" />
          <text x="29" y="88" fontSize="11" fontWeight="600" fill="#4a6b62" textAnchor="middle">
            Шлюз
          </text>
        </g>

        {/* outbound — dashed, telemetry only */}
        <path d="M426 200 H636" stroke="#cbd5cf" strokeWidth="2" strokeDasharray="6 7" fill="none" />
        <path d="M694 210 H820" stroke="#cbd5cf" strokeWidth="2" strokeDasharray="6 7" fill="none" />
        <path d="m812 204 8 6-8 6" fill="none" stroke="#94a3a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* external cloud */}
        <g transform="translate(770 150)">
          <rect x="0" y="0" width="110" height="120" rx="18" fill="#f8fafc" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="2 6" />
          <text x="55" y="30" fontSize="11" fontWeight="700" fill="#64748b" textAnchor="middle">
            Внешний мир
          </text>
          <text x="55" y="64" fontSize="10" fill="#94a3a0" textAnchor="middle">
            Только
          </text>
          <text x="55" y="80" fontSize="10" fill="#94a3a0" textAnchor="middle">
            обезличенная
          </text>
          <text x="55" y="96" fontSize="10" fill="#94a3a0" textAnchor="middle">
            телеметрия
          </text>
        </g>
      </svg>

      <div className="mt-4 flex flex-wrap gap-5 border-t border-line pt-4 text-xs font-medium text-ink-500">
        <span className="flex items-center gap-2">
          <span className="h-1 w-5 rounded-full bg-lime" /> Внутренний трафик данных
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1 w-5 rounded-full border-t-2 border-dashed border-[#94a3a0]" />
          Исходящая обезличенная телеметрия
        </span>
      </div>
    </div>
  );
}

function DiagramNode({
  x,
  y,
  label,
  sub,
  primary,
}: {
  x: number;
  y: number;
  label: string;
  sub: string;
  primary?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x="0"
        y="0"
        width={primary ? 126 : 126}
        height="60"
        rx="14"
        fill={primary ? "#183833" : "#ffffff"}
        stroke={primary ? "#7ab800" : "#e2ecd2"}
        strokeWidth={primary ? 2 : 1.5}
      />
      <text x="14" y="26" fontSize="13" fontWeight="700" fill={primary ? "#ffffff" : "#183833"}>
        {label}
      </text>
      <text x="14" y="44" fontSize="10.5" fill={primary ? "#cfe6b0" : "#6f8a82"}>
        {sub}
      </text>
    </g>
  );
}

function Link2({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7ab800" strokeWidth="2" strokeLinecap="round" />;
}
