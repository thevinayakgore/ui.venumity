"use client";
import Link from "next/link";
import {
  Bug,
  CheckCheck,
  PencilLine,
  Share2,
  WandSparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  getGitHubIssueUrl,
  getComponentDisplayName,
  getCategorySubcategoryFromPath,
  isSubcategoryPath,
} from "@/registry/component-utils";
import { gitRepo } from "@/lib/brand";
import { toast } from "sonner";

export default function CommonActions() {
  const pathname = usePathname();
  const [componentPath, setComponentPath] = useState("");
  const [componentName, setComponentName] = useState("");
  const [isComponentPage, setIsComponentPage] = useState(false);
  const [, setIsSubcategoryPage] = useState(false);
  const [isDocsPage, setIsDocsPage] = useState(false);
  const [isResourcesPage, setIsResourcesPage] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!pathname) return;

    const timer = setTimeout(() => {
      // ─── Components pages ──────────────────────────────
      if (pathname.startsWith("/components/")) {
        const pathWithoutPrefix = pathname.replace("/components/", "");

        if (isSubcategoryPath(pathWithoutPrefix)) {
          setIsComponentPage(false);
          setIsSubcategoryPage(true);
          setIsDocsPage(false);
          setIsResourcesPage(false);
          setComponentPath("");

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
          setIsDocsPage(false);
          setIsResourcesPage(false);
          setComponentPath(pathWithoutPrefix);

          const displayName = getComponentDisplayName(pathWithoutPrefix);
          setComponentName(displayName);
        }
      }
      // ─── Docs pages ────────────────────────────────────
      else if (pathname.startsWith("/docs/")) {
        setIsComponentPage(false);
        setIsSubcategoryPage(false);
        setIsDocsPage(true);
        setIsResourcesPage(false);

        const slug = pathname.replace("/docs/", "");
        setComponentName(slug);
        setComponentPath(slug);
      }
      // ─── Resources pages ───────────────────────────────
      else if (pathname.startsWith("/resources/")) {
        setIsComponentPage(false);
        setIsSubcategoryPage(false);
        setIsDocsPage(false);
        setIsResourcesPage(true);

        const parts = pathname
          .replace("/resources/", "")
          .split("/")
          .filter(Boolean);

        if (parts.length >= 2) {
          setComponentName(`${parts[0]}/${parts[1]}`);
          setComponentPath(`${parts[0]}/${parts[1]}`);
        } else if (parts.length === 1) {
          setComponentName(parts[0]);
          setComponentPath(parts[0]);
        }
      }
      // ─── Other pages ───────────────────────────────────
      else {
        setIsComponentPage(false);
        setIsSubcategoryPage(false);
        setIsDocsPage(false);
        setIsResourcesPage(false);
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

    const baseUrl = `${gitRepo}/issues/new`;
    const params = new URLSearchParams({
      template: type === "feature" ? "feature-request.yml" : "bug-report.yml",
    });

    if (componentName) {
      params.set(
        "title",
        `[${type.toUpperCase()}] ${componentName} - ${type} request`,
      );
    } else {
      params.set("title", `[${type.toUpperCase()}] New ${type} request`);
    }

    return `${baseUrl}?${params.toString()}`;
  };

  // Generate edit URL
  const getEditUrl = () => {
    // ─── Docs: registry/docs/{slug}.md ───────────────────
    if (isDocsPage && componentPath) {
      return `${gitRepo}/tree/main/registry/docs/${componentPath}.md`;
    }

    // ─── Resources: registry/reso/{category}/{slug}.md ────
    if (isResourcesPage && componentPath) {
      const parts = componentPath.split("/");
      if (parts.length >= 2) {
        return `${gitRepo}/tree/main/registry/reso/${parts[0].replaceAll("-", "")}/${parts[1].replaceAll("-", "")}.md`;
      }
      return `${gitRepo}/tree/main/registry/reso`;
    }

    // ─── Components: components/venumity/{cat}/{sub} ──────
    if (pathname?.startsWith("/components/")) {
      const parts = pathname
        .replace("/components/", "")
        .split("/")
        .filter(Boolean);

      if (parts.length >= 2) {
        return `${gitRepo}/tree/main/components/venumity/${parts[0]}/${parts[1]}`;
      }

      return `${gitRepo}/tree/main/components/venumity`;
    }

    // Fallback
    return gitRepo;
  };

  const handleSharePage = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        toast.success("Successfully Copied to clipboard !");

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(() => {
        // Ignore clipboard errors
      });
  };

  return (
    <div className="flex flex-col font-semibold! tracking-wide! mt-2 pt-2 text-[0.8rem] border-t w-full">
      <Link
        href={getIssueUrl("bug")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 py-1.5 leading-none group opacity-40 hover:opacity-100 transition-all duration-500 w-fit!"
      >
        <Bug className="size-3.5! group-hover:animate-[wiggle_0.6s_ease-in-out]" />
        <span>Report an issue</span>
      </Link>
      <Link
        href={getIssueUrl("feature")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 py-1.5 leading-none group opacity-40 hover:opacity-100 transition-all duration-500 w-fit!"
      >
        <WandSparkles className="size-3.5! group-hover:animate-[wiggle_0.6s_ease-in-out]" />
        <span>Request a feature</span>
      </Link>
      <Link
        href={getEditUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 py-1.5 leading-none group opacity-40 hover:opacity-100 transition-all duration-500 w-fit!"
      >
        <PencilLine className="size-3.5! group-hover:animate-[wiggle_0.6s_ease-in-out]" />
        <span>Edit this page</span>
      </Link>
      <button
        className="font-semibold! tracking-wide!"
        onClick={handleSharePage}
      >
        <div className="flex items-center gap-2 py-1.5 text-[0.8rem] leading-none opacity-40 hover:opacity-100 group cursor-pointer transition-all duration-500 w-fit!">
          {copied ? (
            <CheckCheck className="size-3.5! text-green-500" />
          ) : (
            <Share2 className="size-3.5! group-hover:animate-[wiggle_0.6s_ease-in-out]" />
          )}
          <span>Share this page</span>
        </div>
      </button>
    </div>
  );
}
