"use client";

import { useRef, useState } from "react";
import { IconBolt, IconCheck, IconUpload } from "./icons";

type Stage = "idle" | "uploading" | "done";

const SAMPLE = "Интервью_Алексей_Senior_Frontend.mp4";

export default function UploadZone() {
  const [drag, setDrag] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState(SAMPLE);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function simulate(name: string) {
    setFileName(name);
    setStage("uploading");
    setProgress(0);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (timer.current) clearInterval(timer.current);
          setStage("done");
          return 100;
        }
        return Math.min(100, p + 7);
      });
    }, 90);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    simulate(f ? f.name : SAMPLE);
  }

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) simulate(f.name);
  }

  return (
    <div className="relative">
      {/* floating compatibility chip */}
      <div className="absolute -right-3 -top-5 z-10 hidden animate-floaty items-center gap-2 rounded-2xl border border-line-green bg-white px-4 py-3 shadow-lift sm:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime text-white">
          <IconBolt className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <p className="font-display text-xl font-semibold text-lime-700">92%</p>
          <p className="text-[11px] font-medium text-ink-400">Match по ДНК</p>
        </div>
      </div>

      {/* floating throughput stat card (bottom-left) */}
      <div
        className="absolute -bottom-6 -left-4 z-10 hidden animate-floaty rounded-2xl border border-ink-700 bg-ink px-4 py-3 text-white shadow-lift sm:block"
        style={{ animationDelay: "1.5s" }}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-lime-50/70">
          Обработано
        </p>
        <p className="font-display text-2xl font-semibold leading-tight">
          12 480 <span className="text-sm font-medium text-lime">интервью</span>
        </p>
      </div>

      <div className="card relative overflow-hidden p-6 md:p-7">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-lime" />
          </div>
          <span className="text-xs font-medium text-ink-400">talentmind.ru / upload</span>
        </div>

        {stage !== "done" ? (
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={onDrop}
            className={`relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
              drag ? "border-lime bg-lime-50" : "border-line-green bg-cream/40"
            }`}
          >
            <input
              type="file"
              className="sr-only"
              accept="audio/*,video/*"
              onChange={onPick}
            />
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-soft">
              <IconUpload className="h-7 w-7 text-lime-700" />
            </span>
            {stage === "idle" ? (
              <>
                <div>
                  <p className="text-base font-semibold text-ink">
                    Перетащите аудио или видео интервью
                  </p>
                  <p className="mt-1 text-sm text-ink-500">
                    или нажмите, чтобы выбрать файл · MP4, MOV, MP3, WAV
                  </p>
                </div>
                <span className="btn-primary pointer-events-none mt-1">
                  Загрузить интервью
                </span>
              </>
            ) : (
              <div className="w-full max-w-xs">
                <p className="mb-2 truncate text-sm font-semibold text-ink">{fileName}</p>
                <div className="h-2 w-full overflow-hidden rounded-full bg-lime-100">
                  <div
                    className="h-full rounded-full bg-lime transition-[width] duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs font-medium text-ink-400">
                  Анализируем диалог · {progress}%
                </p>
              </div>
            )}
          </label>
        ) : (
          <div className="rounded-2xl border border-line-green bg-cream/40 p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime text-white">
                <IconCheck className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-ink">Профиль готов</p>
                <p className="truncate text-xs text-ink-400">{fileName}</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Коммуникация", v: 9 },
                { label: "Лидерство", v: 7 },
                { label: "Критическое мышление", v: 8 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="mb-1 flex justify-between text-xs font-medium text-ink-500">
                    <span>{s.label}</span>
                    <span className="text-ink">{s.v}/10</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-lime-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-lime to-lime-600"
                      style={{ width: `${s.v * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setStage("idle");
                setProgress(0);
              }}
              className="btn-ghost mt-5 w-full"
            >
              Загрузить ещё одно интервью
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
