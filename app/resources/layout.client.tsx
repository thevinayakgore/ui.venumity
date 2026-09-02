// app/resources/layout.client.tsx
"use client";
import { usePathname } from "next/navigation";
import { ResourceCategory } from "@/registry/resources";
import { ResourcesProvider } from "@/contexts/resources";
import RightSidebar from "@/components/site/common/right-sidebar";
import LeftResources from "@/components/site/common/left-sidebar/resources";

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
      <section className="mx-auto w-full">
        <div
          className={`grid grid-cols-1 ${
            !hideRightSidebar
              ? "lg:grid-cols-[1fr_4fr] xl:grid-cols-[1fr_4fr_1fr]"
              : "lg:grid-cols-[1fr_5fr]"
          } m-auto max-w-400 w-full`}
        >
          <LeftResources
            initialCategories={initialCategories}
            initialCategory={initialCategory}
          />
          <div
            id="content"
            className="p-3 md:p-5 overflow-hidden w-full"
          >
            {children}
          </div>
          {!hideRightSidebar && <RightSidebar />}
        </div>
      </section>
    </ResourcesProvider>
  );
}
