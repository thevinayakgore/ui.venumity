"use client";
import LeftSidebar from "@/components/common/left-sidebar/sidebar";
import RightSidebar from "@/components/common/right-sidebar/right-sidebar";
import { BottomFooter } from "@/components/navigations/footer";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="2xl:border-x-2 border-dashed 2xl:border-foreground/10 m-auto max-w-360 w-full h-full">
      <section className="grid grid-cols-[190px_1fr_200px] m-auto px-10 w-full transition-all duration-500">
        <LeftSidebar />
        <div
          id="content"
          className="flex flex-col items-center gap-12 m-auto px-10 py-8 max-w-240 w-full h-full"
        >
          {children}
        </div>
        <RightSidebar />
      </section>
      <BottomFooter />
    </main>
  );
}
