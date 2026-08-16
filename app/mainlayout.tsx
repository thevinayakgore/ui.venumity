// app/mainlayout.tsx
"use client";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/site/navigations/navbar";
import { ScrollContainerContext } from "@/contexts/scroll-container";
import NextTopLoader from "nextjs-toploader";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isPreviewPage = pathname?.startsWith("/preview");

  return (
    <ScrollContainerContext.Provider value={scrollContainerRef}>
      <NextTopLoader
        color="oklch(0.73 0.21 47)"
        height={3}
        showSpinner={false}
      />

      <main
        className={
          isPreviewPage
            ? "fixed inset-0 w-screen overflow-hidden bg-background"
            : "fixed inset-0 w-screen overflow-hidden p-1.5 bg-zinc-200 dark:bg-zinc-900"
        }
      >
        <Navbar />

        {isPreviewPage ? (
          <section className="w-full h-full">
            <div ref={scrollContainerRef} className="h-full w-full overflow-auto">
              {children}
            </div>
          </section>
        ) : (
          <section className="h-[calc(100%-3.2rem)] w-full overflow-hidden rounded-lg border bg-background">
            <div ref={scrollContainerRef} className="h-full w-full overflow-auto">
              {children}
            </div>
          </section>
        )}
      </main>
    </ScrollContainerContext.Provider>
  );
}