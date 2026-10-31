// components/site/common/library-layout.tsx
"use client";
import { usePathname } from "next/navigation";
import LeftSidebar from "@/components/site/common/leftsidebar/sidebar";

export default function LibraryLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide right sidebar on root index pages (grid of cards)
  const isRootLibraryPage =
    pathname === "/components" || pathname === "/primitives";

  return (
    <section className="mx-auto w-full">
      <div
        className={`grid grid-cols-1 ${
          !isRootLibraryPage
            ? "lg:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_5fr]"
            : "lg:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_5fr]"
        } m-auto max-w-400 w-full`}
      >
        <LeftSidebar />
        <div id="content" className="p-3 md:p-5 lg:px-7 overflow-hidden w-full">
          {children}
        </div>
      </div>
    </section>
  );
}
