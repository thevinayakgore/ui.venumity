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
    <main className="2xl:border-2 border-dashed 2xl:border-foreground/10 m-auto max-w-360 w-full h-full">
      <section
        className={`grid ${
          !hideRightSidebar
            ? "grid-cols-1 md:grid-cols-[190px_1fr] xl:grid-cols-[190px_1fr_195px]"
            : "md:grid-cols-[190px_1fr]"
        } m-auto px-4 md:px-10 w-full`}
      >
        <LeftSidebar />
        <div
          id="content"
          className={`flex flex-col items-center pt-20 md:pt-24 m-auto ${
            !hideRightSidebar
              ? "md:px-10 pb-10 w-full md:max-w-240"
              : "md:pl-10"
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
