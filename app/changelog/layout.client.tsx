// app/changelog/layout.client.tsx
"use client";
import { createContext, useContext } from "react";
import { BottomFooter } from "@/components/site/navigations/footer";
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
      <main className="m-auto w-full h-full">
        <section className="grid grid-cols-1 md:grid-cols-[300px_1fr] m-auto max-w-400 w-full">
          <LogSidebar />
          <div
            id="content"
            className={`flex flex-col items-center p-10 max-w-4xl m-auto w-full h-full`}
          >
            {children}
          </div>
        </section>
        <BottomFooter />
      </main>
    </ChangelogContext.Provider>
  );
}
