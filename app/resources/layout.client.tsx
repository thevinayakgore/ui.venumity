// app/resources/layout.client.tsx
"use client";
import { usePathname } from "next/navigation";
import LeftResources from "@/components/site/common/left-sidebar/resources";
import { ResourceCategory } from "@/registry/resources";
import { ResourcesProvider } from "@/contexts/resources";
import RightSidebar from "@/components/site/common/right-sidebar";

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
      <main className="2xl:border-2 border-dashed 2xl:border-foreground/10 m-auto max-w-360 w-full h-full">
        <section
          className={`grid ${
            !hideRightSidebar
              ? "grid-cols-1 md:grid-cols-[190px_1fr] xl:grid-cols-[190px_1fr_195px]"
              : "md:grid-cols-[190px_1fr]"
          } m-auto px-4 md:px-10 w-full`}
        >
          <LeftResources
            initialCategories={initialCategories}
            initialCategory={initialCategory}
          />
          <div
            id="content"
            className={`flex flex-col items-center py-6 md:pt-16 lg:pt-24 m-auto ${
              !hideRightSidebar ? "md:px-10 w-full md:max-w-240" : "md:pl-10"
            } w-full h-full`}
          >
            {children}
          </div>
          {!hideRightSidebar && <RightSidebar />}
        </section>
      </main>
    </ResourcesProvider>
  );
}
