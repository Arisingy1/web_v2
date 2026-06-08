"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Arrow, Eyebrow, GREEN, INK, TEAL, useReveals } from "@/components/tm/ui";

export default function ContactsPage() {
  const root = useReveals();
  return (
    <div ref={root}>
      <section className="mx-auto max-w-[1100px] px-6 pt-40 pb-12 text-center">
        <div className="reveal flex justify-center"><Eyebrow>Контакты</Eyebrow></div>
        <h1 className="reveal mx-auto mt-6 max-w-3xl text-[2.6rem] font-semibold leading-[1] tracking-tight sm:text-[4rem]">
          Поговорим о вашем <span style={{ color: GREEN }}>найме</span>
        </h1>
        <p className="reveal mx-auto mt-6 max-w-xl text-lg text-[#183833]/70">
          Оставьте заявку — покажем демо TalentMind на ваших интервью и поможем с внедрением
        </p>
      </section>

      <section className="mx-auto grid max-w-[1080px] grid-cols-1 gap-8 px-6 pb-24 lg:grid-cols-[1fr_1.1fr]">
        {/* contact info */}
        <div className="reveal space-y-4">
          {[
            { icon: <Mail className="h-5 w-5" />, t: "Почта", v: "info@talentmind.ru", href: "mailto:info@talentmind.ru", a: GREEN },
            { icon: <Phone className="h-5 w-5" />, t: "Телефон", v: "+7 (495) 540-51-79", href: "tel:+74955405179", a: TEAL },
            { icon: <MapPin className="h-5 w-5" />, t: "Офис", v: "Москва, ул. Шаболовка, д. 34, стр. 3", href: undefined, a: GREEN },
          ].map((c) => (
            <div key={c.t} className="flex items-center gap-4 rounded-2xl border border-[#ededed] bg-white p-5 shadow-[0_12px_30px_rgba(24,56,51,0.05)]">
              <span className="grid h-12 w-12 place-items-center rounded-xl text-white" style={{ background: c.a }}>{c.icon}</span>
              <div>
                <p className="text-xs text-[#183833]/55">{c.t}</p>
                {c.href ? (
                  <a href={c.href} className="text-base font-medium transition-colors hover:text-[#7AB800]" style={{ color: INK }}>{c.v}</a>
                ) : (
                  <p className="text-base font-medium" style={{ color: INK }}>{c.v}</p>
                )}
              </div>
            </div>
          ))}
          <div className="rounded-3xl p-6 text-white" style={{ background: INK }}>
            <p className="text-lg font-semibold">5 интервью бесплатно</p>
            <p className="mt-1 text-sm text-white/70">Попробуйте без банковской карты — отчёт по первому интервью за пару минут</p>
          </div>
        </div>

        {/* form */}
        <form
          className="reveal rounded-3xl border border-[#ededed] bg-white p-8 shadow-[0_24px_60px_rgba(24,56,51,0.08)]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Имя" placeholder="Анна" />
            <Field label="Компания" placeholder="ООО «Команда»" />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Email" placeholder="anna@company.ru" type="email" />
            <Field label="Телефон" placeholder="+7 ..." />
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium" style={{ color: INK }}>Сообщение</label>
            <textarea
              rows={4}
              placeholder="Расскажите о вашем процессе найма..."
              className="mt-1.5 w-full rounded-xl border border-[#ededed] bg-[#F4F7F6] px-4 py-3 text-sm outline-none focus:border-[#7AB800]"
            />
          </div>
          <button
            type="submit"
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: GREEN }}
          >
            <Send className="h-4 w-4" /> Отправить заявку <Arrow className="text-white" />
          </button>
          <p className="mt-3 text-center text-xs text-[#183833]/50">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </form>
      </section>
    </div>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="text-sm font-medium" style={{ color: INK }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-[#ededed] bg-[#F4F7F6] px-4 py-3 text-sm outline-none focus:border-[#7AB800]"
      />
    </div>
  );
}
