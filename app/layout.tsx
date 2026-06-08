import type { Metadata } from "next";
import { Geologica, JetBrains_Mono, Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-onest",
});

const geologica = Geologica({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geologica",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono-jb",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://talentmind.ru"),
  title: {
    default: "TalentMind — ИИ-анализ собеседований и культурной совместимости",
    template: "%s · TalentMind",
  },
  description:
    "TalentMind переводит аудио- и видеозаписи собеседований в оцифрованный профиль кандидата: оценка soft skills, методология STAR и совместимость по ДНК компании.",
  keywords: [
    "ИИ-анализ интервью",
    "soft skills",
    "корпоративная культура",
    "HR Tech",
    "оценка кандидатов",
  ],
  openGraph: {
    title: "TalentMind — Нанимайте по ДНК компании",
    description:
      "Оцифрованный профиль кандидата на основе данных, а не интуиции.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${onest.variable} ${geologica.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
