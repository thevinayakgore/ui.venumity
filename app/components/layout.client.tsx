// app/components/layout.client.tsx
"use client";
import LeftSidebar from "@/components/site/common/left-sidebar/sidebar";
import RightSidebar from "@/components/site/common/right-sidebar/right-sidebar";
import { BottomFooter } from "@/components/site/navigations/footer";
import { usePathname } from "next/navigation";

export default function ContentLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideRightSidebar = pathname === "/components";

  return (
    <main className="m-auto w-full">
      <section
        className={`grid ${
          !hideRightSidebar
            ? "grid-cols-1 md:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_260px]"
            : "md:grid-cols-[280px_1fr]"
        } m-auto max-w-400 w-full`}
      >
        <LeftSidebar />
        <div
          id="content"
          className={`flex flex-col items-center m-auto p-10 ${
            !hideRightSidebar ? "min-w-215 max-w-215" : ""
          } w-full h-full`}
        >
          {children}
        </div>
        {!hideRightSidebar && <RightSidebar />}
      </section>
      <BottomFooter />
    </main>
  );
}
