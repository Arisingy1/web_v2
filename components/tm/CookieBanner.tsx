"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { GREEN, INK } from "./ui";

/* ============================================================
   Плашка согласия на использование cookie (152-ФЗ).
   Появляется при первом заходе, выбор сохраняется в localStorage.
   ============================================================ */

const KEY = "tm-cookie-consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      /* приватный режим / недоступный storage — покажем плашку */
    }
    if (!stored) {
      const t = setTimeout(() => setShow(true), 700);
      return () => clearTimeout(t);
    }
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center px-3 pb-3 sm:px-5 sm:pb-5">
      <style>{`@keyframes ckUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div
        role="dialog"
        aria-label="Использование файлов cookie"
        className="pointer-events-auto w-full max-w-[700px] rounded-3xl border border-[#e6ece4] bg-white/95 p-4 shadow-[0_30px_70px_rgba(24,56,51,0.2)] backdrop-blur-xl sm:p-5"
        style={{ animation: "ckUp .55s cubic-bezier(.22,1,.36,1) both" }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl" style={{ background: `${GREEN}1a` }}>
              <Cookie className="h-5 w-5" style={{ color: GREEN }} />
            </span>
            <p className="text-[13px] leading-snug text-[#183833]/75">
              Мы используем файлы cookie для работы сайта и аналитики. Продолжая пользоваться сайтом, вы соглашаетесь с обработкой cookie и персональных данных в соответствии с{" "}
              <a href="/privacy" className="font-semibold underline underline-offset-2 transition-colors hover:opacity-80" style={{ color: GREEN }}>
                Политикой конфиденциальности
              </a>{" "}
              и 152-ФЗ.
            </p>
          </div>
          <div className="flex shrink-0 gap-2.5 sm:flex-col md:flex-row">
            <button
              onClick={() => decide("declined")}
              className="ease-smooth flex-1 whitespace-nowrap rounded-full border border-[#183833]/15 bg-white px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[#F4F7F6] sm:flex-none"
              style={{ color: INK }}
            >
              Отклонить
            </button>
            <button
              onClick={() => decide("accepted")}
              className="ease-smooth flex-1 whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(122,184,0,0.3)] transition-all hover:-translate-y-0.5 sm:flex-none"
              style={{ background: GREEN }}
            >
              Принять
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
