// app/components/layout.client.tsx
"use client";
import { usePathname } from "next/navigation";
import LeftSidebar from "@/components/site/common/left-sidebar/sidebar";
import RightSidebar from "@/components/site/common/right-sidebar/right-sidebar";

export default function ContentLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideRightSidebar = pathname === "/components";

  return (
    <section className="mx-auto w-full">
      <div
        className={`grid grid-cols-1 ${
          !hideRightSidebar
            ? "lg:grid-cols-[1fr_4fr] xl:grid-cols-[1fr_4fr_1fr]"
            : "lg:grid-cols-[1fr_5fr]"
        } m-auto max-w-400 w-full`}
      >
        <LeftSidebar />
        <div id="content" className="p-3 md:p-5 overflow-hidden w-full">
          {children}
        </div>
        {!hideRightSidebar && <RightSidebar />}
      </div>
    </section>
  );
}
