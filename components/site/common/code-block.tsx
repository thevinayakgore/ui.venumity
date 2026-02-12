// components/site/common/code-block.tsx
"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CheckLine, Clipboard } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";

interface CodeBlockProps {
  code: string;
  language?: string;
  aspectVideo?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  aspectVideo,
  language = "typescript",
}) => {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isComponentsPage = pathname.startsWith("/components");

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const syntaxTheme = resolvedTheme === "dark" ? vscDarkPlus : oneLight;

  const handleCopy = async () => {
    try {
      // Copy the EXACT code without any modifications
      await navigator.clipboard.writeText(code ?? "");
      setCopied(true);
      toast.success("Copied to clipboard Successfully !");
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      toast.error("Failed to copy text : " + err);
    }
  };

  return (
    <div className="relative w-full">
      <div
        className={`${aspectVideo && "aspect-video"} group/main overflow-auto w-full h-full`}
      >
        <button
          onClick={handleCopy}
          className={`group/btn absolute top-2.5 right-2.5 z-10! cursor-pointer! bg-background/70 backdrop-blur-sm text-muted-foreground/70 hover:text-foreground ${
            isComponentsPage
              ? "size-8 p-1.5 rounded!"
              : "size-7 p-1.5 bg-background! border border-foreground/15 rounded!"
          } transition-all duration-500`}
        >
          {copied ? (
            <CheckLine className="w-full h-full text-green-500" />
          ) : (
            <Clipboard className="w-full h-full group-hover/btn:text-foreground transition-all duration-500" />
          )}
        </button>

        <div
          className={`${!isComponentsPage && "border rounded-md overflow-hidden"}`}
        >
          {mounted && (
            <SyntaxHighlighter
              language={language}
              style={syntaxTheme}
              customStyle={{
                margin: 0,
                padding: "1rem 1.3rem",
                background:
                  resolvedTheme === "dark"
                    ? isComponentsPage
                      ? "#09090b"
                      : "#151518"
                    : "#fafafa",
                fontSize: "13px",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                overflow: "auto",
              }}
            >
              {code}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
