"use client";
import LeftSidebar from "@/components/site/common/left-sidebar/sidebar";
import RightSidebar from "@/components/site/common/right-sidebar/right-sidebar";
import { BottomFooter } from "@/components/site/navigations/footer";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="2xl:border-x-2 border-dashed 2xl:border-foreground/10 m-auto max-w-400 w-full h-full">
      <section className="grid grid-cols-[280px_1fr_260px] m-auto w-full transition-all duration-500">
        <LeftSidebar />
        <div
          id="content"
          className="flex flex-col items-center gap-12 m-auto p-5 md:p-10 md:max-w-215 w-full h-full"
        >
          {children}
        </div>
        <RightSidebar />
      </section>
      <BottomFooter />
    </main>
  );
}
