// app/mainlayout.tsx
"use client";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/site/navigations/navbar";
import { ScrollContainerContext } from "@/contexts/scroll-container";
import NextTopLoader from "nextjs-toploader";
import { BottomFooter } from "@/components/site/navigations/footer";

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
        height={1.5}
        showSpinner={false}
      />
      <main
        className={`fixed inset-0 overflow-auto w-full h-full ${pathname?.startsWith("/preview") ? "" : "px-2.5 bg-foreground/5"}`}
      >
        <Navbar />
        <section
          className={`w-full ${!pathname?.startsWith("/preview") && "aspect-video z-1000! transform-gpu overflow-auto bg-background border rounded-2xl h-[calc(100%-6rem)]"}`}
        >
          <div
            ref={scrollContainerRef}
            className={`overflow-auto w-full ${!pathname?.startsWith("/preview") && "h-full"}`}
          >
            {children}
          </div>
        </section>
        <BottomFooter />
      </main>
    </ScrollContainerContext.Provider>
  );
}
