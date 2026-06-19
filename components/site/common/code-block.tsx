// components/site/common/code-block.tsx
"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CheckCheck, Clipboard } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";

interface CodeBlockProps {
  code: string;
  language?: string;
  aspectVideo?: boolean;
  hasCopyBtn?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  aspectVideo,
  language = "typescript",
  hasCopyBtn = true,
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
    <div
      className={`relative ${!pathname?.startsWith("/components") && "p-1 bg-background border rounded-xl"} w-full h-full`}
    >
      <div
        className={`${aspectVideo && "aspect-video"} group/main overflow-auto w-full h-full`}
      >
        {hasCopyBtn && (
          <button
            onClick={handleCopy}
            className={`group/btn absolute z-10! cursor-pointer! bg-background/20 backdrop-blur-sm text-foreground/40 hover:text-foreground ${
              isComponentsPage
                ? "top-2 right-2 size-8 p-2 rounded-sm"
                : "top-1 right-1 size-9 p-2.5 pr-2 pt-2 bg-background! border border-t-0 border-r-0 rounded-tr-lg rounded-bl-lg"
            } transition-all duration-500`}
          >
            {copied ? (
              <CheckCheck className="w-full h-full text-green-500" />
            ) : (
              <Clipboard className="w-full h-full group-hover/btn:text-foreground transition-all duration-500" />
            )}
          </button>
        )}

        <div
          className={`${!isComponentsPage && "border rounded-lg overflow-hidden"}`}
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
