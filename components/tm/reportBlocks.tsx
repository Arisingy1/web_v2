"use client";

import { useEffect, useState } from "react";
import {
  X, Sparkles, Check, Flame, AudioLines, MessageSquareQuote,
  Briefcase, Building2, Wallet, Home, GitBranch, ChevronDown,
} from "lucide-react";

/* ============================================================
   Переиспользуемые код-блоки отчёта по кандидату.
   Свёрстаны в стиле сайта (раньше были картинками /1.png…/6.png).
   Используются на /otchet (мобильная версия) и /otchet/primer.
   ============================================================ */

const GREEN = "#7AB800";
const TEAL = "#11AFCC";
const INK = "#183833";
const AMBER = "#E8A317";
const RED = "#FF5252";

/* флаг «смонтировано» — для анимации полос/слайдеров после маунта */
function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => { setM(true); }, []);
  return m;
}

/* ── данные ── */
const ARGS_FOR = [
  "Успешные кейсы запусков в крупных компаниях",
  "Развитые коммуникативные навыки, умение убеждать",
  "Опыт работы в продуктовой среде (e-commerce)",
  "Высокий уровень самоанализа и системное мышление",
];
const ARGS_AGAINST = ["Высокие зарплатные ожидания", "Мало опыта в заказной разработке"];

export type Skill = { name: string; val: number; req: number; desc: string };
export const SKILLS: Skill[] = [
  { name: "Управление", val: 78, req: 86, desc: "Сильные навыки в проектной работе — самостоятельно собрал и координировал команду из 12 человек. Опыт в фонде доказывает умение контролировать исполнение" },
  { name: "Лидерство", val: 72, req: 86, desc: "Проявляет лидерство через ответственность и инициативу. Стиль управления скорее функциональный, чем визионерский" },
  { name: "Коммуникация", val: 80, req: 80, desc: "Высокоразвитый навык. Ясно и структурно излагает мысли, внимательно слушает. Эффективно общается с тех. командой и клиентами" },
  { name: "Планирование", val: 85, req: 80, desc: "Одно из сильнейших качеств. Доказанный опыт построения систем с нуля в условиях неопределённости. Умеет декомпозировать задачи" },
  { name: "Адаптивность", val: 75, req: 72, desc: "Опыт работы в разных средах (фонд, EdTech, стартап) и с разными методологиями говорит о хорошей адаптивности к новым условиям" },
  { name: "Стрессоустойчивость", val: 68, req: 84, desc: "Демонстрирует спокойное и контролируемое поведение. Маркеры речи указывают на самоконтроль, но нет реальных кейсов работы в стрессе" },
];

const RADAR: { l: string; v: number; req: number }[] = [
  { l: "Управление", v: 35, req: 86 }, { l: "Лидерство", v: 90, req: 86 }, { l: "Коммуникация", v: 40, req: 80 },
  { l: "Планирование", v: 30, req: 80 }, { l: "Адаптивность", v: 72, req: 72 }, { l: "Стрессоустойчивость", v: 50, req: 84 },
  { l: "Командная работа", v: 18, req: 80 }, { l: "Эмпатия", v: 25, req: 85 }, { l: "Решение проблем", v: 62, req: 86 },
  { l: "Критическое мышление", v: 62, req: 80 },
];

/* ============================================================
   1 · Информация о кандидате + Решение  (бывш. /1.png)
   ============================================================ */
export function CandidateDecision() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card>
        <h3 className="text-base font-bold">Информация о кандидате</h3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Info icon={<Briefcase className="h-4 w-4" />} t="Опыт" v="9 лет" />
          <Info icon={<Building2 className="h-4 w-4" />} t="Компании" v="Ozon, Яндекс, финтех" />
          <Info icon={<Wallet className="h-4 w-4" />} t="Ожидания" v="$2 800 (на руки)" />
          <Info icon={<Home className="h-4 w-4" />} t="Формат" v="гибрид / удалённо" />
        </div>
        <p className="mt-4 border-t border-[#eef0ee] pt-4 text-sm leading-relaxed text-[#183833]/70">
          Опытный руководитель ИТ-проектов в e-commerce и финтехе. Управлял распределёнными командами до 15 человек,
          запускал продукты с нуля и развивал существующие
        </p>
      </Card>

      <div className="rounded-3xl border border-[#d8ecc4] bg-gradient-to-br from-[#f3faea] to-[#eef7e0] p-5 shadow-[0_16px_44px_rgba(24,56,51,0.07)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 text-base font-bold"><Check className="h-5 w-5" style={{ color: GREEN }} /> Решение о переходе на следующий этап</h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm" style={{ color: GREEN }}><Check className="h-3.5 w-3.5" /> Рекомендован</span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold" style={{ color: GREEN }}>Аргументы «За»</p>
            <ul className="mt-2 space-y-1.5">{ARGS_FOR.map((a) => <li key={a} className="flex items-start gap-1.5 text-xs text-[#183833]/75"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: GREEN }} /> {a}</li>)}</ul>
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: RED }}>Аргументы «Против»</p>
            <ul className="mt-2 space-y-1.5">{ARGS_AGAINST.map((a) => <li key={a} className="flex items-start gap-1.5 text-xs text-[#183833]/75"><X className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: RED }} /> {a}</li>)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   3 · Риски / Сильные стороны / Психолингвистика  (бывш. /2.png)
   ============================================================ */
export function RisksStrengthsPsycho() {
  const mounted = useMounted();
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <Card>
        <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: RED }}><Flame className="h-4 w-4" /> Риски</h3>
        <Block t="Риск ухода" badge="Критично" bc={RED} text="Кандидат прямо говорит, что текущая компания — способ получить аккредитацию и отсрочку" />
        <Block t="Мало опыта в классической роли" badge="Важно" bc={AMBER} text="Основной релевантный опыт — один проект, похожий на фриланс. Может не хватать навыков в крупной ИТ-компании" />
        <Block t="Фокус на процессах" badge="Заметка" bc={AMBER} text="В кейсах упор на организацию и запуски, но почти нет работы с данными и метриками (LTV, конверсия)" />
      </Card>
      <Card>
        <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: GREEN }}><Sparkles className="h-4 w-4" /> Сильные стороны</h3>
        <Block t="Системное мышление" text="Умеет выстраивать процессы с нуля, декомпозировать задачи и доводить продукт до запуска" />
        <Block t="Полный цикл проекта" text="Уверенно ведёт проект на всех этапах — от идеи и сборки команды до запуска и развития" />
        <Block t="Рефлексивность" text="Анализирует ценность работы и решает, исходя из реального эффекта, а не «героизма»" />
      </Card>
      <Card>
        <h3 className="flex items-center gap-2 text-sm font-bold" style={{ color: TEAL }}><AudioLines className="h-4 w-4" /> Психолингвистика</h3>
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs font-semibold"><span style={{ color: INK }}>Мы</span><span style={{ color: INK }}>Я</span></div>
          <div className="relative mt-1.5 h-1.5 rounded-full bg-[#eef2ec]">
            <div className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-1000" style={{ width: mounted ? "62%" : "0%", background: `linear-gradient(90deg,${TEAL},${GREEN})` }} />
            <div className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow transition-[left] duration-1000" style={{ left: mounted ? "62%" : "0%", background: GREEN }} />
          </div>
        </div>
        <Block t="Баланс «Я» / «Мы»" text="Балансирует «Я» при личной ответственности и «Мы» при командных процессах — зрелое распределение фокуса" />
        <Block t="Тон" text="Спокойный, размеренный, контролируемый. Говорит неспешно, тембр низкий, ровный" />
        <Block t="Локус контроля" text="Берёт ответственность на себя, анализирует и делает выводы, не перекладывая на внешние обстоятельства" />
      </Card>
    </div>
  );
}

/* ============================================================
   4 · Диаграмма соответствия (роза) + риски  (бывш. /3.png)
   ============================================================ */
export function ComplianceDiagram() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.3fr_1fr]">
      <Card><RoseChart /></Card>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between rounded-2xl border border-[#e6ece4] bg-white px-5 py-4 shadow-[0_10px_30px_rgba(24,56,51,0.05)]"><span className="text-base font-bold">Среднее отклонение</span><span className="flex items-center gap-1 text-base font-bold" style={{ color: AMBER }}>9% <ChevronDown className="h-4 w-4" /></span></div>
        <Card className="flex flex-1 flex-col">
          <p className="flex items-center gap-2 text-base font-bold" style={{ color: RED }}><Flame className="h-4 w-4" /> Главные риски</p>
          <div className="mt-3 space-y-3">
            {([
              ["Стрессоустойчивость", "16%", "Оценка базируется на спокойном поведении кандидата, без реальных примеров работы в стрессовых ситуациях"],
              ["Эмпатия", "15%", "Есть косвенные признаки, но нет прямых примеров того, как эмпатия влияет на продуктовые решения"],
              ["Лидерство", "14%", "Проявлено в основном через управление проектами; не хватает примеров визионерства и мотивации команды в сложных условиях"],
            ] as [string, string, string][]).map(([k, v, dsc], i) => (
              <div key={k} className={i ? "border-t border-[#eef0ee] pt-3" : ""}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{k}</span>
                  <span className="flex items-center gap-1 text-sm font-bold" style={{ color: RED }}>{v} <ChevronDown className="h-3.5 w-3.5" /></span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#183833]/65">{dsc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-[#eef0ee] pt-4">
            <p className="flex items-center gap-2 text-base font-bold" style={{ color: GREEN }}><Sparkles className="h-4 w-4" /> Наибольшее соответствие</p>
            <p className="mt-2 text-xs leading-relaxed text-[#183833]/75">Профиль кандидата максимально близок к требованиям по навыкам «Планирование» и «Решение проблем»</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================
   5 · Карта soft skills  (бывш. /4.png)
   ============================================================ */
export function SoftSkillsMap() {
  const mounted = useMounted();
  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2">
      {SKILLS.map((s) => {
        const c = s.val >= 70 ? GREEN : s.val >= 50 ? AMBER : RED;
        return (
          <Card key={s.name} className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-2"><p className="text-sm font-semibold">{s.name}</p><span className="text-sm font-bold" style={{ color: c }}>{s.val}%</span></div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#eef2ec]"><div className="h-full rounded-full transition-[width] duration-[1100ms] ease-out" style={{ width: mounted ? `${s.val}%` : "0%", background: c }} /></div>
            <p className="mt-2 text-[11px] leading-snug text-[#183833]/65">{s.desc}</p>
          </Card>
        );
      })}
    </div>
  );
}

/* ============================================================
   6 · Кейсы по модели STAR  (бывш. /5.png)
   ============================================================ */
export function StarCases() {
  return (
    <div className="space-y-4">
      <StarCase title="Кейс 1: Разработка игровой платформы для агентства недвижимости"
        s="Агентство в ОАЭ столкнулось с трудностями в привлечении инвесторов из-за высокого порога входа и непонимания рынка"
        t="Создать маркетинговый продукт, который знакомит инвесторов с рынком в игровой форме и повышает вовлечённость"
        a="Выступил в роли PM/PO. Собрал команду из 12 человек (разработчики, ML, маркетинг). Управлял всем: от геймдизайна до релиза"
        r="Проект успешно сдан клиенту. Конкретные бизнес-метрики (ROI, число инвесторов) не раскрыты"
        note="Сильный кейс полного цикла управления. Проявил инициативу и организаторские навыки. Слабое место — отсутствие бизнес-результатов в цифрах" />
      <StarCase title="Кейс 2: Построение системы управления в венчурном фонде"
        s="На старте у фонда не было процессов оценки стартапов (due diligence) и трекинга, что создавало хаос"
        t="Внедрить внутреннюю систему управления для структурирования работы со стартапами (CRM и трекинг)"
        a="Внедрил инструмент. Выстроил процессы контроля и обратной связи от портфельных проектов"
        r="Создана система для адекватного проведения due diligence. Снижены операционные риски"
        note="Отлично иллюстрирует навыки планирования и построения процессов в неопределённости. Однако роль здесь скорее процессная, чем продуктовая" />
    </div>
  );
}

/* ============================================================
   7 · Рекомендации для следующих этапов  (бывш. /6.png)
   ============================================================ */
export function Recommendations() {
  return (
    <div className="space-y-3">
      <Reco title="Опыт работы с продуктовой аналитикой" text="В кейсах нет работы с метриками (A/B-тесты, Retention, LTV, воронки). Это критично для data-driven продакта"
        qs={["Приведите пример, когда вы использовали данные для принятия важного решения. Какие метрики смотрели?", "Как определяли ключевые метрики успеха в игровом проекте? Как их трекали?", "Сталкивались ли вы с ситуацией, когда данные противоречили гипотезе? Что делали?"]} />
      <Reco title="Управление стейкхолдерами в корпоративной среде" text="Весь опыт — либо с одним клиентом, либо мониторинг фонда. Неясно, как справится в среде с конфликтующими интересами"
        qs={["Опишите самую сложную ситуацию в управлении ожиданиями. В чём был конфликт и как вы его решили?", "Как вы выстраивали процесс согласования роадмапа с разными отделами?", "Что будете делать, если продажи требуют фичу «вчера», а разработка оценивает её в 3 месяца?"]} />
      <Reco title="Опыт проведения user research (CustDev)" text="Кандидат говорит о важности аудитории, но не приводит реальных примеров глубинных интервью, опросов или анализа поведения"
        qs={["Как исследования пользователей влияли на бэклог или роадмап вашего продукта?", "Какие методы исследований (research) вы применяли на практике?", "Как вы отделяете то, что пользователи говорят, от того, что им действительно нужно?"]} />
    </div>
  );
}

/* ============================================================
   Мелкие переиспользуемые компоненты
   ============================================================ */
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-[#e6ece4] bg-white p-5 shadow-[0_16px_44px_rgba(24,56,51,0.06)] ${className}`}>{children}</div>;
}
function Info({ icon, t, v }: { icon: React.ReactNode; t: string; v: string }) {
  return <div className="flex items-start gap-2"><span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#f4f7f2] text-[#7AB800]">{icon}</span><div><p className="text-[10px] font-semibold uppercase tracking-wide text-[#183833]/45">{t}</p><p className="text-xs font-medium">{v}</p></div></div>;
}
function Block({ t, text, badge, bc }: { t: string; text: string; badge?: string; bc?: string }) {
  return <div className="mt-3 border-t border-[#eef0ee] pt-3"><div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold">{t}</p>{badge && <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase" style={{ background: `${bc}1a`, color: bc }}>{badge}</span>}</div><p className="mt-1 text-[11px] leading-snug text-[#183833]/65">{text}</p></div>;
}
function StarCase({ title, s, t, a, r, note }: { title: string; s: string; t: string; a: string; r: string; note: string }) {
  const rows: [string, string, string][] = [["Ситуация", s, TEAL], ["Задача", t, GREEN], ["Действие", a, AMBER], ["Результат", r, GREEN]];
  return (
    <Card>
      <p className="text-sm font-bold">{title}</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(([k, v, c]) => <div key={k} className="rounded-2xl bg-[#f6faef] p-3"><p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: c }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} /> {k}</p><p className="mt-1 text-[11px] leading-snug text-[#183833]/70">{v}</p></div>)}
      </div>
      <div className="mt-3 flex items-start gap-2.5 rounded-2xl border border-[#d8ecc4] bg-[#f3faea] p-3.5"><MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} /><div><p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: GREEN }}>Оценка</p><p className="mt-0.5 text-[11px] leading-snug text-[#183833]/70">{note}</p></div></div>
    </Card>
  );
}
function Reco({ title, text, qs }: { title: string; text: string; qs: string[] }) {
  return (
    <Card>
      <p className="flex items-center gap-2 text-base font-bold"><span className="grid h-8 w-8 place-items-center rounded-xl" style={{ background: `${TEAL}1a`, color: TEAL }}><GitBranch className="h-4 w-4" /></span> {title}</p>
      <p className="mt-2 text-sm leading-snug text-[#183833]/65">{text}</p>
      <ul className="mt-3 space-y-2">{qs.map((q) => <li key={q} className="flex items-start gap-2 rounded-xl bg-[#f6faef] px-3 py-2 text-xs text-[#183833]/75"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GREEN }} /> {q}</li>)}</ul>
    </Card>
  );
}
/* роза-диаграмма (полярные сектора) */
function RoseChart() {
  const N = RADAR.length, cx = 280, cy = 220, R = 140, seg = 360 / N, pad = 1.6, labelR = R + 18;
  const lvl = (v: number) => (v >= 60 ? GREEN : v >= 40 ? "#bcdd93" : "#f2a0a0");
  const rad = (d: number) => (d * Math.PI) / 180;
  const sector = (r: number, i: number) => {
    const a0 = rad(i * seg - 90 + pad), a1 = rad((i + 1) * seg - 90 - pad);
    return `M ${cx} ${cy} L ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)} Z`;
  };
  const arc = (r: number, i: number) => {
    const a0 = rad(i * seg - 90 + pad), a1 = rad((i + 1) * seg - 90 - pad);
    return `M ${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`;
  };
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 560 480" className="w-full max-w-[520px]">
        {RADAR.map((_, i) => <path key={`bg${i}`} d={sector(R, i)} fill="#eef1f3" stroke="#ffffff" strokeWidth="2.5" />)}
        {[0.25, 0.5, 0.75, 1].map((f) => RADAR.map((_, i) => <path key={`g${f}-${i}`} d={arc(R * f, i)} fill="none" stroke="#d2dce2" strokeWidth="1" opacity="0.7" />))}
        {RADAR.map((d, i) => <path key={`req${i}`} d={sector((R * d.req) / 100, i)} fill="#bcd9ec" stroke="#ffffff" strokeWidth="1.5" />)}
        {RADAR.map((d, i) => <path key={`v${i}`} d={sector((R * d.v) / 100, i)} fill={lvl(d.v)} style={{ transformOrigin: `${cx}px ${cy}px`, animation: `roseG .7s ease-out ${0.04 * i + 0.1}s both` }} />)}
        {RADAR.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), rr = R * 0.66;
          return <text key={`p${i}`} x={(cx + rr * Math.cos(a)).toFixed(1)} y={(cy + rr * Math.sin(a)).toFixed(1)} fontSize="13" fontWeight="700" fill="#2b4a44" textAnchor="middle" dominantBaseline="middle">{d.v}%</text>;
        })}
        {RADAR.map((d, i) => {
          const a = rad((i + 0.5) * seg - 90), ca = Math.cos(a);
          const anchor = ca > 0.15 ? "start" : ca < -0.15 ? "end" : "middle";
          return <text key={`l${i}`} x={(cx + labelR * ca).toFixed(1)} y={(cy + labelR * Math.sin(a)).toFixed(1)} fontSize="12.5" fill="#3a4f4a" textAnchor={anchor} dominantBaseline="middle">{d.l}</text>;
        })}
        <style>{`@keyframes roseG{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] text-[#183833]/70 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-4">
        <Lg c="#bcd9ec" t="Требования профиля" /><Lg c="#f2a0a0" t="Низкий уровень навыка" /><Lg c="#bcdd93" t="Средний уровень навыка" /><Lg c={GREEN} t="Высокий уровень навыка" />
      </div>
    </div>
  );
}
function Lg({ c, t }: { c: string; t: string }) { return <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm border border-black/5" style={{ background: c }} /> {t}</span>; }
