// app/docs/layout.tsx
import RightSidebar from "@/components/site/common/rightsidebar";
import LeftSidebar from "@/components/site/common/leftsidebar/sidebar";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_4fr] xl:grid-cols-[1fr_4fr_1fr] mx-auto max-w-400 w-full">
      <LeftSidebar />
      <div className="overflow-auto w-full">{children}</div>
      <RightSidebar />
    </section>
  );
}
