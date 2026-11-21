"use client";
import { ReactNode, useState } from "react";
import PersonalHeader from "./personal-header";
import PersonalFooter from "./personal-footer";
import PersonalSidebar from "./personal-sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <section className="overflow-hidden w-full max-h-screen">
      <div
        className={`relative grid grid-cols-1 transition-all duration-500 h-full ${
          collapsed ? "lg:grid-cols-[5rem_1fr]" : "lg:grid-cols-[16rem_1fr]"
        }`}
      >
        <div>
          <PersonalSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
        <div className="flex w-full flex-col transition-all duration-500 max-h-screen">
          <PersonalHeader />
          <main className="flex-1 p-3 md:p-6 space-y-3 md:space-y-6 overflow-auto w-full">{children}</main>
          <PersonalFooter />
        </div>
      </div>
    </section>
  );
}
