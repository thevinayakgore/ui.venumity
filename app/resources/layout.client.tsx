// app/resources/layout.client.tsx
"use client";
import { usePathname } from "next/navigation";
import LeftResources from "@/components/site/common/left-sidebar/resources";
import { ResourceCategory } from "@/registry/resources";
import { ResourcesProvider } from "@/contexts/resources";
import RightSidebar from "@/components/site/common/right-sidebar";
import { BottomFooter } from "@/components/site/navigations/footer";

export default function ContentLayoutClient({
  children,
  initialCategories,
  initialCategory = "frameworks",
}: {
  children: React.ReactNode;
  initialCategories: ResourceCategory[];
  initialCategory?: string;
}) {
  const pathname = usePathname();
  const hideRightSidebar = pathname === "/resources";

  return (
    <ResourcesProvider>
      <main className="mx-auto w-full">
        <section
          className={`grid ${
            !hideRightSidebar
              ? "grid-cols-1 md:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_260px]"
              : "md:grid-cols-[280px_1fr]"
          } m-auto max-w-400 w-full`}
        >
          <LeftResources
            initialCategories={initialCategories}
            initialCategory={initialCategory}
          />
          <div
            id="content"
            className={`flex flex-col items-center p-5 md:p-10 m-auto ${
              !hideRightSidebar ? "max-w-215" : ""
            } w-full`}
          >
            {children}
          </div>
          {!hideRightSidebar && <RightSidebar />}
        </section>
        <BottomFooter />
      </main>
    </ResourcesProvider>
  );
}
