"use client";
import LeftSidebar from "@/components/site/common/left-sidebar/sidebar";
import RightSidebar from "@/components/site/common/right-sidebar/right-sidebar";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_4fr] xl:grid-cols-[1fr_4fr_1fr] m-auto max-w-400 w-full">
        <LeftSidebar />
        <div id="content" className="p-3 md:p-5 lg:p-10 overflow-hidden w-full">
          {children}
        </div>
        <RightSidebar />
      </div>
    </section>
  );
}
