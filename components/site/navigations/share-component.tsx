// app/components/site/navigations/share-component.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCheck, Share2 } from "lucide-react";
import { toKebabCase } from "@/utils/slug-kebab";

interface ShareComponentProps {
  itemName?: string;
}

export default function ShareComponent({ itemName }: ShareComponentProps) {
  const [copied, setCopied] = useState(false);

  const pathname = usePathname();

  const currentUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    const origin = window.location.origin;

    if (itemName) {
      return `${origin}${pathname}#${toKebabCase(itemName)}`;
    }

    return `${origin}${pathname}`;
  }, [pathname, itemName]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");

    if (!hash) return;

    const timer = setTimeout(() => {
      const element = document.getElementById(hash);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setCopied(true);
        toast.success("Successfully Copied to clipboard !");

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(() => {
        toast.error("Failed to copy URL !");
      });
  };

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleCopy}
      title="Copy component URL"
      className={`relative group px-4! size-8.5! font-semibold tracking-wide cursor-pointer flex items-center gap-2 uppercase shadow-none ${copied ? "bg-green-500! text-white!" : "bg-card! dark:bg-muted! text-foreground/70!"} overflow-hidden`}
    >
      {copied ? (
        <CheckCheck className="size-4" />
      ) : (
        <Share2 className="group-hover:animate-[wiggle_0.6s_ease-in-out] transition-all duration-500 size-4" />
      )}
    </Button>
  );
}
