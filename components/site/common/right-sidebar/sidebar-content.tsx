"use client";
import { useParams } from "next/navigation";
import DocsSidebarContent from "./docs-sidebar-content";
import ComponentsSidebarContent from "./comp-sidebar-content";
import NoComponentMessage from "./no-comp-message";

interface SidebarContentProps {
  isDocsRoute: boolean;
  isComponentsRoute: boolean;
}

export default function SidebarContent({
  isDocsRoute,
  isComponentsRoute,
}: SidebarContentProps) {
  const params = useParams();
  const currentSlug = params.slug as string;

  if (isDocsRoute) {
    return <DocsSidebarContent slug={currentSlug} />;
  }

  if (isComponentsRoute) {
    return <ComponentsSidebarContent />;
  }

  return <NoComponentMessage />;
}
