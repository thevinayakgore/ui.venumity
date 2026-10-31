// components/site/content/actions.tsx
"use client";
import Link from "next/link";
import { toast } from "sonner";
import { gitRepo } from "@/lib/brand";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import {
  getGitHubIssueUrl,
  isSubcategoryPath,
  getComponentDisplayName,
  getCategorySubcategoryFromPath,
} from "@/registry/registry-utils";
import {
  Bug,
  Share2,
  PencilLine,
  CheckCheck,
  ChevronDown,
  WandSparkles,
} from "lucide-react";

interface ActionsProps {
  itemName?: string;
  itemSlug?: string;
  categorySlug?: string;
  subcategorySlug?: string;
  variant?: "icons" | "links";
  registry?: "primitives" | "components";
}

export default function Actions({
  itemName,
  registry,
  categorySlug,
  subcategorySlug,
  variant,
}: ActionsProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ── Path info (used by the "links" variant) ────────────
  const [componentPath, setComponentPath] = useState("");
  const [componentName, setComponentName] = useState("");
  const [isComponentPage, setIsComponentPage] = useState(false);
  const [isDocsPage, setIsDocsPage] = useState(false);
  const [isResourcesPage, setIsResourcesPage] = useState(false);

  useEffect(() => {
    if (!pathname) return;

    const timer = setTimeout(() => {
      if (pathname.startsWith("/components/")) {
        const pathWithoutPrefix = pathname.replace("/components/", "");
        if (isSubcategoryPath(pathWithoutPrefix)) {
          setIsComponentPage(false);
          setIsDocsPage(false);
          setIsResourcesPage(false);
          setComponentPath("");
          const info = getCategorySubcategoryFromPath(pathWithoutPrefix);
          if (info) {
            setComponentName(`${info.category}/${info.subcategory}`);
          }
        } else {
          setIsComponentPage(true);
          setIsDocsPage(false);
          setIsResourcesPage(false);
          setComponentPath(pathWithoutPrefix);
          setComponentName(getComponentDisplayName(pathWithoutPrefix));
        }
      } else if (pathname.startsWith("/docs/")) {
        setIsComponentPage(false);
        setIsDocsPage(true);
        setIsResourcesPage(false);
        const slug = pathname.replace("/docs/", "");
        setComponentName(slug);
        setComponentPath(slug);
      } else if (pathname.startsWith("/resources/")) {
        setIsComponentPage(false);
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
      } else {
        setIsComponentPage(false);
        setIsDocsPage(false);
        setIsResourcesPage(false);
        setComponentPath("");
        setComponentName("");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // ── Resolve which variant to render ─────────────────────
  const resolvedVariant: "icons" | "links" =
    variant ??
    (pathname?.startsWith("/docs") || pathname?.startsWith("/resources")
      ? "links"
      : "icons");

  // ── Icons-variant URLs (built from props) ───────────────
  const buildIconIssueUrl = (type: "feature" | "bug") => {
    const params = new URLSearchParams({
      template: type === "feature" ? "feature-request.yml" : "bug-report.yml",
      title: `[${type.toUpperCase()}] ${
        itemName || subcategorySlug?.replace(/-/g, "") || "component"
      } - ${type} request`,
    });
    if (categorySlug) params.set("component-category", categorySlug);
    if (subcategorySlug) params.set("component-subcategory", subcategorySlug);
    if (itemName) params.set("component-name", itemName);
    return `${gitRepo}/issues/new?${params.toString()}`;
  };

  const iconEditUrl = `${gitRepo}/tree/main/components/venumity/${
    registry ?? "components"
  }/${categorySlug ?? ""}/${subcategorySlug ?? ""}`;

  // ── Links-variant URLs (built from pathname) ────────────
  const getLinkIssueUrl = (type: "feature" | "bug") => {
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

  const getLinkEditUrl = () => {
    if (isDocsPage && componentPath) {
      return `${gitRepo}/tree/main/registry/docs/${componentPath}.md`;
    }
    if (isResourcesPage && componentPath) {
      const parts = componentPath.split("/");
      if (parts.length >= 2) {
        return `${gitRepo}/tree/main/registry/reso/${parts[0].replaceAll(
          "-",
          "",
        )}/${parts[1].replaceAll("-", "")}.md`;
      }
      return `${gitRepo}/tree/main/registry/reso`;
    }
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
    return gitRepo;
  };

  // ── Share handler (shared) ──────────────────────────────
  const handleShare = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
        setOpen(false);
      })
      .catch(() => {});
  };

  // ── LINKS VARIANT (docs + resources) ────────────────────
  if (resolvedVariant === "links") {
    return (
      <div className="flex flex-col font-medium! tracking-wide! mt-2 pt-2 text-[0.8rem] border-t w-full">
        <Link
          href={getLinkIssueUrl("bug")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 py-1.5 leading-none group opacity-40 hover:opacity-100 transition-all duration-500 w-fit!"
        >
          <Bug className="size-3.5! group-hover:animate-[wiggle_0.6s_ease-in-out]" />
          <span>Report an issue</span>
        </Link>
        <Link
          href={getLinkIssueUrl("feature")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 py-1.5 leading-none group opacity-40 hover:opacity-100 transition-all duration-500 w-fit!"
        >
          <WandSparkles className="size-3.5! group-hover:animate-[wiggle_0.6s_ease-in-out]" />
          <span>Request a feature</span>
        </Link>
        <Link
          href={getLinkEditUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 py-1.5 leading-none group opacity-40 hover:opacity-100 transition-all duration-500 w-fit!"
        >
          <PencilLine className="size-3.5! group-hover:animate-[wiggle_0.6s_ease-in-out]" />
          <span>Edit this page</span>
        </Link>
        <button
          type="button"
          className="font-medium! tracking-wide!"
          onClick={handleShare}
        >
          <div className="flex items-center gap-1.5 py-1.5 text-[0.8rem] leading-none opacity-40 hover:opacity-100 group cursor-pointer transition-all duration-500 w-fit!">
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

  // ── ICONS VARIANT (components / primitives header) ──────
  return (
    <div ref={dropdownRef} className="relative">
      <Button
        aria-expanded={open}
        aria-label="Open actions menu"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-0.5 group text-xs p-0.75! h-9.5! tracking-wide bg-foreground/10! overflow-hidden"
      >
        <span className="flex items-center gap-1.5 py-1.5 pl-2 pr-3 bg-background text-foreground shadow-lg/10 rounded-sm w-full h-full">
          <PencilLine className="size-3.5" />
          Actions
        </span>

        <ChevronDown
          className={`p-1.5 size-7.25! text-foreground transition-all duration-500 rounded-sm ${open ? "rotate-x-180 rotate-y-180" : ""}`}
        />
      </Button>

      {open && (
        <div className="absolute right-0 top-full z-100 flex flex-col gap-0.5 p-1 mt-1.5 text-xs font-medium bg-popover border border-foreground/10 rounded-lg shadow-lg min-w-40">
          <Link
            href={buildIconIssueUrl("bug")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1.5 p-1.5 text-left hover:bg-foreground/10 text-foreground transition-all duration-500 rounded-md w-full"
          >
            <Bug className="size-3.5 shrink-0" />
            <span className="flex-1">Report an issue</span>
          </Link>

          <Link
            href={buildIconIssueUrl("feature")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1.5 p-1.5 text-left hover:bg-foreground/10 text-foreground transition-all duration-500 rounded-md w-full"
          >
            <WandSparkles className="size-3.5 shrink-0" />
            <span className="flex-1">Request a feature</span>
          </Link>

          <Link
            href={iconEditUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1.5 p-1.5 text-left hover:bg-foreground/10 text-foreground transition-all duration-500 rounded-md w-full"
          >
            <PencilLine className="size-3.5 shrink-0" />
            <span className="flex-1">Edit this page</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 p-1.5 text-left hover:bg-foreground/10 text-foreground transition-all duration-500 rounded-md w-full"
          >
            {copied ? (
              <CheckCheck className="size-4 shrink-0 text-green-500" />
            ) : (
              <Share2 className="size-3.5 shrink-0" />
            )}
            <span className="flex-1">
              {copied ? "Copied!" : "Share this page"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
