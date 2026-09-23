// app/mainlayout.tsx
"use client";
import { useRef } from "react";
import NextTopLoader from "nextjs-toploader";
import { usePathname } from "next/navigation";
import Navbar from "@/components/site/navigations/navbar";
import { ScrollContainerContext } from "@/contexts/scroll-container";
import { BottomFooter } from "@/components/site/navigations/footer";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const FULL_PREVIEW = pathname?.startsWith("/preview");

  return FULL_PREVIEW ? (
    children
  ) : (
    <ScrollContainerContext.Provider value={scrollContainerRef}>
      <NextTopLoader
        color="oklch(0.73 0.21 47)"
        height={1.5}
        showSpinner={false}
      />
      <main className="fixed inset-0 h-full w-full overflow-auto bg-foreground/5 px-2 sm:px-2.5">
        <Navbar />
        <section className="z-1000! aspect-video max-h-[calc(100%-6rem)] w-full overflow-auto rounded-xl border border-foreground/15 bg-background md:rounded-2xl">
          <div ref={scrollContainerRef} className="h-full w-full overflow-auto">
            {children}
          </div>
        </section>
        <BottomFooter />
      </main>
    </ScrollContainerContext.Provider>
  );
}
