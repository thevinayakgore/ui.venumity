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

  return (
    <ScrollContainerContext.Provider value={scrollContainerRef}>
      <NextTopLoader
        color="oklch(0.73 0.21 47)"
        height={4}
        showSpinner={false}
      />
      <main
        className={`absolute top-0 overflow-auto w-full h-full ${pathname?.startsWith("/preview") ? "" : "p-1.5 bg-zinc-200 dark:bg-zinc-900"}`}
      >
        <Navbar />
        <section
          className={`w-full ${!pathname?.startsWith("/preview") && "aspect-video overflow-auto bg-background border rounded-lg h-[calc(100%-3.2rem)]"}`}
        >
          <div
            ref={scrollContainerRef}
            className={`overflow-auto w-full ${!pathname?.startsWith("/preview") && "h-full"}`}
          >
            {children}
          </div>
        </section>
      </main>
    </ScrollContainerContext.Provider>
  );
}
