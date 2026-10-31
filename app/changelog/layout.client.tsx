// app/changelog/layout.client.tsx
"use client";
import { createContext, useContext } from "react";
import { CHANGELOGS, ChangelogCategory } from "@/registry/site/changelog";
import { LogSidebar } from "@/components/site/common/leftsidebar/changelog";

const ChangelogContext = createContext<ChangelogCategory[]>([]);

export const useChangelog = () => useContext(ChangelogContext);

export default function ContentLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChangelogContext.Provider value={CHANGELOGS}>
      <section className="mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_5fr] m-auto max-w-400 w-full">
          <LogSidebar />
          <div id="content">{children}</div>
        </div>
      </section>
    </ChangelogContext.Provider>
  );
}
