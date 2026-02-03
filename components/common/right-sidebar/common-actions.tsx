"use client";
import Link from "next/link";
import { Bug, PencilLine, WandSparkles } from "lucide-react";
import SharePage from "@/components/navigations/share-page";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  getGitHubIssueUrl,
  getGitHubEditUrl,
  getComponentDisplayName,
  getCategorySubcategoryFromPath,
  isSubcategoryPath,
} from "@/registry/components";
import { gitRepo } from "@/lib/brand";

export default function CommonActions() {
  const pathname = usePathname();
  const [componentPath, setComponentPath] = useState("");
  const [componentName, setComponentName] = useState("");
  const [isComponentPage, setIsComponentPage] = useState(false);
  const [isSubcategoryPage, setIsSubcategoryPage] = useState(false);

  useEffect(() => {
    if (!pathname) return;

    const timer = setTimeout(() => {
      if (pathname.startsWith("/components/")) {
        const pathWithoutPrefix = pathname.replace("/components/", "");

        if (isSubcategoryPath(pathWithoutPrefix)) {
          setIsComponentPage(false);
          setIsSubcategoryPage(true);
          setComponentPath("");
          setComponentName("");

          const categoryInfo =
            getCategorySubcategoryFromPath(pathWithoutPrefix);
          if (categoryInfo) {
            setComponentName(
              `${categoryInfo.category}/${categoryInfo.subcategory}`,
            );
          }
        } else {
          setIsComponentPage(true);
          setIsSubcategoryPage(false);
          setComponentPath(pathWithoutPrefix);

          const displayName = getComponentDisplayName(pathWithoutPrefix);
          setComponentName(displayName);
        }
      } else {
        setIsComponentPage(false);
        setIsSubcategoryPage(false);
        setComponentPath("");
        setComponentName("");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Generate GitHub URLs
  const getIssueUrl = (type: "feature" | "bug") => {
    if (isComponentPage && componentPath) {
      return getGitHubIssueUrl(componentPath, type);
    }

    // For non-component pages or subcategory pages
    const baseUrl = `${gitRepo}/issues/new`;
    const params = new URLSearchParams({
      template: type === "feature" ? "feature-request.yml" : "bug-report.yml",
      labels: type === "feature" ? "enhancement" : "bug",
    });

    if (isSubcategoryPage && componentName) {
      params.set(
        "title",
        `[${type.toUpperCase()}] ${componentName} - General request`,
      );
    } else {
      params.set("title", `[${type.toUpperCase()}] New ${type} request`);
    }

    return `${baseUrl}?${params.toString()}`;
  };

  // Generate edit URL
  const getEditUrl = () => {
    if (isComponentPage && componentPath) {
      return getGitHubEditUrl(componentPath);
    }
    return gitRepo;
  };

  return (
    <div className="flex flex-col  font-normal mt-2 pt-2 text-[0.8rem] text-muted-foreground/70 border-t w-full">
      <Link
        href={getIssueUrl("feature")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 py-1.5 leading-none group hover:text-foreground transition-all duration-500 w-fit!"
      >
        <WandSparkles className="size-3.5! group-hover:animate-[wiggle_0.6s_ease-in-out]" />
        <span>Request a feature</span>
      </Link>
      <Link
        href={getIssueUrl("bug")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 py-1.5 leading-none group hover:text-foreground transition-all duration-500 w-fit!"
      >
        <Bug className="size-3.5! group-hover:animate-[wiggle_0.6s_ease-in-out]" />
        <span>Report an issue</span>
      </Link>
      <Link
        href={getEditUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 py-1.5 leading-none group hover:text-foreground transition-all duration-500 w-fit!"
      >
        <PencilLine className="size-3.5! group-hover:animate-[wiggle_0.6s_ease-in-out]" />
        <span>Edit this page</span>
      </Link>
      <SharePage />
    </div>
  );
}
