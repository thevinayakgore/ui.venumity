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
      <main className="max-w-400 mx-auto w-full">
        <section
          className={`grid grid-cols-1 ${
            !hideRightSidebar
              ? "lg:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_3fr_1fr]"
              : "lg:grid-cols-[1fr_4fr]"
          } m-auto w-full`}
        >
          <LeftResources
            initialCategories={initialCategories}
            initialCategory={initialCategory}
          />
          <div
            id="content"
            className="p-3 sm:p-6 lg:p-10 overflow-hidden w-full"
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
