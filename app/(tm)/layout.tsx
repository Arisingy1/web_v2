// TalentMind site layout — Lenis smooth scroll + Header/Footer
import LenisProvider from "@/components/tm/LenisProvider";
import Header from "@/components/tm/Header";
import Footer from "@/components/tm/Footer";

export default function TMLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <LenisProvider>
      <div
        className="relative w-full overflow-x-clip bg-[#F4F7F6] text-[#183833] antialiased"
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        {/* global aurora */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -left-40 top-[-10%] h-[560px] w-[560px] rounded-full bg-[#7AB800]/10 blur-[140px]" />
          <div className="absolute right-[-12%] top-[16%] h-[520px] w-[520px] rounded-full bg-[#11AFCC]/12 blur-[150px]" />
          <div className="absolute bottom-[6%] left-[25%] h-[460px] w-[460px] rounded-full bg-[#7AB800]/8 blur-[150px]" />
        </div>

        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </div>
    </LenisProvider>
  );
}
