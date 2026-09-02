// app/changelog/layout.client.tsx
"use client";
import { createContext, useContext } from "react";
import { changelogEntries, ChangelogEntry } from "@/registry/site/changelog";
import { LogSidebar } from "@/components/site/common/left-sidebar/log-sidebar";

const ChangelogContext = createContext<ChangelogEntry[]>([]);

export const useChangelog = () => useContext(ChangelogContext);

export default function ContentLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChangelogContext.Provider value={changelogEntries}>
      <section className="mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_4fr] m-auto max-w-400 w-full">
          <LogSidebar />
          <div
            id="content"
            className="p-3 md:p-5 max-w-4xl m-auto overflow-hidden w-full"
          >
            {children}
          </div>
        </div>
      </section>
    </ChangelogContext.Provider>
  );
}
