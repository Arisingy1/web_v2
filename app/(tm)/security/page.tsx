"use client";

import { ShieldCheck, Lock, Server, FileCheck, Eye, KeyRound } from "lucide-react";
import { Arrow, CTA, Eyebrow, GREEN, INK, TEAL, useReveals } from "@/components/tm/ui";

const PILLARS = [
  { icon: <FileCheck className="h-6 w-6" />, t: "Соответствие 152-ФЗ", d: "TalentMind — оператор персональных данных. Обработка ведётся на законном основании, с согласия кандидата; реализованы право на доступ, исправление, удаление и экспорт данных, а также организационные и технические меры защиты по 152-ФЗ", a: GREEN },
  { icon: <Server className="h-6 w-6" />, t: "Локализация данных в РФ (242-ФЗ)", d: "Персональные данные граждан РФ собираются и хранятся на серверах в России — в дата-центрах, аттестованных для размещения ИСПДн. Регулярное резервное копирование; для Enterprise — выделенный изолированный контур", a: TEAL },
  { icon: <Lock className="h-6 w-6" />, t: "Шифрование при передаче и хранении", d: "Весь трафик защищён по TLS 1.2+/HTTPS, данные шифруются в покое (AES-256). Для клиентов с требованием ГОСТ-криптографии каналы строятся на сертифицированных СКЗИ (КриптоПро / ViPNet)", a: GREEN },
  { icon: <ShieldCheck className="h-6 w-6" />, t: "Биометрия и отдельное согласие", d: "Аудио- и видеозаписи интервью — персональные, а в ряде случаев биометрические данные. Обрабатываем их только с отдельного согласия субъекта (ст. 11 152-ФЗ); записи изолированы по тенантам и доступны строго по необходимости", a: TEAL },
  { icon: <Eye className="h-6 w-6" />, t: "Контроль доступа и аудит", d: "Ролевая модель доступа (RBAC) с принципом минимальных привилегий и двухфакторная аутентификация для администраторов. Все действия с данными журналируются — для прозрачности и расследования инцидентов", a: GREEN },
  { icon: <KeyRound className="h-6 w-6" />, t: "Защита инфраструктуры и реагирование", d: "Меры защиты соответствуют требованиям Приказа ФСТЭК России №21 на уровне инфраструктуры провайдера. Управление уязвимостями, регулярные обновления, мониторинг и план реагирования на инциденты с уведомлением по 152-ФЗ", a: TEAL },
];

export default function SecurityPage() {
  const root = useReveals();
  return (
    <div ref={root}>
      <section className="mx-auto max-w-[1100px] px-6 pt-40 pb-12 text-center">
        <h1 className="reveal mx-auto mt-6 max-w-4xl text-[2.6rem] font-semibold leading-[1] tracking-tight sm:text-[4rem]">
          Защита данных кандидатов и соответствие <span style={{ color: GREEN }}>152-ФЗ</span>
        </h1>
        <p className="reveal mx-auto mt-6 max-w-2xl text-lg text-[#183833]/70">
          Записи интервью — это персональные данные. Мы обрабатываем их по 152-ФЗ, храним в России,
          шифруем и строго контролируем доступ — чтобы данные кандидатов оставались под защитой на каждом этапе
        </p>
        <div className="reveal mt-9 flex justify-center"><CTA>Запросить демо безопасности</CTA></div>
      </section>

      {/* badges row */}
      <section className="mx-auto max-w-[1000px] px-6 pb-10">
        <div className="stagger grid grid-cols-2 gap-4 sm:grid-cols-4">
          {["152-ФЗ · оператор ПДн", "Локализация в РФ · 242-ФЗ", "Шифрование TLS / AES-256", "Контроль доступа · RBAC"].map((b) => (
            <div key={b} className="flex items-center justify-center rounded-2xl border border-[#ededed] bg-white px-4 py-6 text-center text-sm font-semibold leading-snug shadow-[0_12px_30px_rgba(24,56,51,0.05)] sm:text-base" style={{ color: INK }}>
              {b}
            </div>
          ))}
        </div>
      </section>

      {/* pillars */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="stagger grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.t} className="flex h-full flex-col rounded-3xl border border-[#ededed] bg-white p-7 shadow-[0_16px_40px_rgba(24,56,51,0.06)]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: p.a }}>{p.icon}</span>
              <h3 className="mt-5 text-xl font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#183833]/70">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-[1100px] px-6 pb-24">
        <div className="reveal flex flex-col items-center gap-4 rounded-3xl p-10 text-center text-white" style={{ background: INK }}>
          <ShieldCheck className="h-10 w-10" style={{ color: GREEN }} />
          <p className="text-2xl font-semibold">Нужен security-обзор для вашей команды?</p>
          <p className="max-w-md text-white/70">Пришлём документацию по безопасности, соглашение об обработке ПДн (DPA), форму согласия кандидата и ответим на вопросы вашего ИБ-отдела</p>
          <a href="/contacts" className="group mt-2 flex items-center gap-1 rounded-xl px-6 py-3 text-sm font-semibold text-white" style={{ background: GREEN }}>
            Связаться с нами <Arrow className="text-white" />
          </a>
        </div>
      </section>
    </div>
  );
}
