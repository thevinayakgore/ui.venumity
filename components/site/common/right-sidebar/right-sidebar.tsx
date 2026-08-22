"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SidebarContent from "./sidebar-content";
import CommonActions from "./common-actions";
import { throttle } from "./utils/scroll-utils";
import ResourcesSidebarContent from "./reso-sidebar-content";

export default function RightSidebar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  // Determine the route
  const isDocsRoute = pathname.startsWith("/docs");
  const isComponentsRoute = pathname.startsWith("/components");
  const isResourcesRoute = pathname.startsWith("/resources");
  const showSidebar = isDocsRoute || isComponentsRoute || isResourcesRoute;

  // Handle window resize
  useEffect(() => {
    const handleResize = throttle(() => {
      setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 0);
    }, 200);

    setTimeout(() => {
      setWindowWidth(window.innerWidth);
    }, 0);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show/hide sidebar based on screen size
  const shouldShowSidebar = windowWidth > 1280; // xl breakpoint

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!showSidebar || !shouldShowSidebar || loading) {
    return null;
  }

  // Render different content based on route
  const renderContent = () => {
    if (isResourcesRoute) {
      return <ResourcesSidebarContent />;
    }

    return (
      <>
        <SidebarContent
          isDocsRoute={isDocsRoute}
          isComponentsRoute={isComponentsRoute}
        />
        <CommonActions />
      </>
    );
  };

  return (
    <aside className="sticky top-0 lg:p-10 pl-0! transition-all duration-500 max-h-screen">
      <section className={`hidden lg:block w-full h-full`}>
        <div className="relative z-10 flex flex-col items-start w-full h-full">
          {renderContent()}
        </div>
      </section>
    </aside>
  );
}
