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
    <main className="max-w-400 mx-auto w-full">
      <section
        className={`grid grid-cols-1 ${
          !hideRightSidebar
            ? "lg:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_3fr_1fr]"
            : "lg:grid-cols-[1fr_4fr]"
        } m-auto w-full`}
      >
        <LeftSidebar />
        <div id="content" className="p-3 md:p-5 lg:p-10">
          {children}
        </div>
        {!hideRightSidebar && <RightSidebar />}
      </section>
      <BottomFooter />
    </main>
  );
}
