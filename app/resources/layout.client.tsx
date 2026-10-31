// app/resources/layout.client.tsx
"use client";
import { usePathname } from "next/navigation";
import RightSidebar from "@/components/site/common/rightsidebar";
import LeftSidebar from "@/components/site/common/leftsidebar/sidebar";

export default function ContentLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideRightSidebar = pathname === "/resources";

  return (
    <section className="w-full">
      <div
        className={`grid grid-cols-1 ${
          !hideRightSidebar
            ? "lg:grid-cols-[1fr_4fr] xl:grid-cols-[1fr_4fr_1fr]"
            : "lg:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_5fr]"
        } m-auto max-w-400 w-full h-[calc(100vh-4rem)]"`}
      >
        <LeftSidebar />
        <div id="content" className="p-3 md:p-5 overflow-hidden w-full h-full">
          {children}
        </div>
        {!hideRightSidebar && <RightSidebar />}
      </div>
    </section>
  );
}
