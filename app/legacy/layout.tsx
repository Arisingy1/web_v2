import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyTrialBar from "@/components/StickyTrialBar";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Перейти к содержанию
      </a>
      <Header />
      <main id="main" className="pt-24">
        {children}
      </main>
      <Footer />
      <StickyTrialBar />
    </>
  );
}
