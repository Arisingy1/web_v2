import type { Metadata } from "next";
import Link from "next/link";
import IntegrationsGrid from "@/components/IntegrationsGrid";
import Pipeline from "@/components/Pipeline";
import { Section, SectionHeading } from "@/components/ui";
import {
  IconArrowRight,
  IconBolt,
  IconCheck,
  IconLayers,
  IconPlug,
  IconUpload,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Продукт и интеграции",
  description:
    "Как интервью попадают из Zoom и MS Teams в ядро TalentMind и возвращаются готовым профилем в ваш ATS. Гибкие интеграции с ВКС, ATS и 1С.",
};

const STEPS = [
  {
    icon: <IconUpload className="h-5 w-5" />,
    title: "Автоматический сбор",
    text: "Записи подтягиваются из ВКС сразу после встречи — без ручной выгрузки и переименования файлов.",
  },
  {
    icon: <IconBolt className="h-5 w-5" />,
    title: "Разбор за минуты",
    text: "Транскрибация, диаризация спикеров и психолингвистический анализ запускаются автоматически.",
  },
  {
    icon: <IconPlug className="h-5 w-5" />,
    title: "Доставка в ATS",
    text: "Профиль кандидата и Match % возвращаются в карточку Huntflow, E-Staff или 1С через API.",
  },
];

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="container-x relative py-20 md:py-28">
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Продукт"
              title="От записи звонка до решения о найме — один автоматизированный поток"
              text="TalentMind встраивается между вашими инструментами видеосвязи и системой рекрутинга. Никаких разрозненных заметок и ручной рутины — только структурированные данные о кандидате."
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/#upload" className="btn-primary">
                <IconUpload className="h-4 w-4" />
                Загрузить интервью
              </Link>
              <Link href="/reports" className="btn-ghost">
                Посмотреть отчёт
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.title} className="card flex flex-col gap-3 p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-lime-50">
                    {s.icon}
                  </span>
                  <span className="font-display text-sm font-semibold text-ink-400">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                <p className="text-sm leading-relaxed text-ink-500">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <Section tone="cream">
        <SectionHeading
          align="center"
          eyebrow="Pipeline"
          title="Как данные текут через платформу"
          text="Наведите на любой этап, чтобы увидеть, что происходит с записью интервью."
        />
        <div className="mt-12">
          <Pipeline />
        </div>
      </Section>

      {/* Integrations */}
      <Section>
        <SectionHeading
          eyebrow="Интеграции"
          title="Работает с инструментами, которые у вас уже есть"
          text="Подключите источники видео и целевые ATS-системы за несколько кликов. Для нестандартных систем — открытый REST API и вебхуки."
        />
        <div className="mt-10">
          <IntegrationsGrid />
        </div>
      </Section>

      {/* Closing capability band */}
      <Section tone="cream">
        <div className="card grid items-center gap-10 p-8 md:grid-cols-[1fr_1fr] md:p-12">
          <div>
            <SectionHeading
              eyebrow="Гибкость"
              title="Кастомные сценарии под ваш процесс найма"
            />
            <Link href="/pricing" className="btn-primary mt-6">
              Обсудить интеграцию
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-4">
            {[
              "Маппинг полей профиля на структуру вашей карточки кандидата",
              "Вебхуки на каждое событие: загрузка, разбор, готовый отчёт",
              "Ролевой доступ для рекрутеров и нанимающих менеджеров",
              "Брендирование отчётов и экспорт в PDF",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-lime-50 text-lime-700">
                  <IconCheck className="h-4 w-4" />
                </span>
                <span className="text-base text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
