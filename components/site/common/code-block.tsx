"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CheckLine, Clipboard } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface CodeBlockProps {
  code: string;
  language?: string;
  aspectVideo?: boolean;
  selectedLang?: "typescript" | "javascript";
  setSelectedLang?: (value: "typescript" | "javascript") => void;
}

type Lang = "js" | "ts";

function getLangMeta(lang: Lang) {
  return lang === "ts"
    ? {
        src: "/icons/typescript.png",
        label: "TypeScript",
      }
    : {
        src: "/icons/javascript.png",
        label: "JavaScript",
      };
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  aspectVideo,
  language = "typescript",
  selectedLang = "typescript",
  setSelectedLang,
}) => {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isComponentsPage = pathname.startsWith("/components");

  // Local state for language selection
  const [currentSelectedLang, setCurrentSelectedLang] = useState<Lang>(
    selectedLang === "typescript" ? "ts" : "js",
  );

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const syntaxTheme = resolvedTheme === "dark" ? vscDarkPlus : oneLight;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code ?? "");
      setCopied(true);
      toast.success("Copied to clipboard Successfully !");
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      toast.error("Failed to copy text : " + err);
    }
  };

  const handleLangChange = (lang: Lang) => {
    setCurrentSelectedLang(lang);
    // Update parent if callback provided
    if (setSelectedLang) {
      setSelectedLang(lang === "ts" ? "typescript" : "javascript");
    }
  };

  const { src, label } = getLangMeta(currentSelectedLang);

  const selectedClass = (isSelected: boolean) =>
    isSelected ? "bg-muted text-green-500! [&_svg]:text-green-500!" : "";

  return (
    <div className="relative w-full">
      <div
        className={`${aspectVideo && "aspect-video"} group/main overflow-auto w-full h-full`}
      >
        <nav
          className={`absolute top-2.5 right-2.5 z-10! ${isComponentsPage && "flex items-center rounded"}`}
        >
          {isComponentsPage && (
            <Select
              value={currentSelectedLang}
              onValueChange={(value) => handleLangChange(value as Lang)}
            >
              <SelectTrigger
                className={`flex items-center justify-center m-auto py-0! px-1.5! cursor-pointer bg-background/70! backdrop-blur-sm! ${isComponentsPage ? "rounded! rounded-r-none!" : "rounded-none!"} border-none! [&_svg]:hidden min-w-fit! h-8!`}
              >
                <SelectValue>
                  <Image
                    src={src}
                    alt={label}
                    width={100}
                    height={100}
                    className="size-4.5 object-contain rounded-[2px]"
                  />
                </SelectValue>
              </SelectTrigger>

              <SelectContent className="rounded max-w-40!">
                <SelectItem
                  value="js"
                  className={`text-xs p-1! mb-1 cursor-pointer rounded-[3px] ${selectedClass(
                    currentSelectedLang === "js",
                  )}`}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/javascript.png"
                      alt="JavaScript"
                      width={100}
                      height={100}
                      className="size-4! rounded-[2px]"
                    />
                    <span>JavaScript</span>
                  </div>
                </SelectItem>

                <SelectItem
                  value="ts"
                  className={`text-xs p-1! cursor-pointer rounded-[3px] ${selectedClass(
                    currentSelectedLang === "ts",
                  )}`}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/typescript.png"
                      alt="TypeScript"
                      width={100}
                      height={100}
                      className="size-4! rounded-[2px]"
                    />
                    <span>TypeScript</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          )}
          <button
            onClick={handleCopy}
            className={`group/btn cursor-pointer! bg-background/70 backdrop-blur-sm text-muted-foreground/70 hover:text-foreground ${isComponentsPage ? "size-8 p-1.5 rounded! rounded-l-none!" : "size-7 p-1.5 bg-background! border border-foreground/15 rounded!"} transition-all duration-500`}
          >
            {copied ? (
              <CheckLine className="w-full h-full text-green-500" />
            ) : (
              <Clipboard className="w-full h-full group-hover/btn:text-foreground transition-all duration-500" />
            )}
          </button>
        </nav>

        <div
          className={`${!isComponentsPage && "border rounded-md overflow-hidden"}`}
        >
          {mounted && (
            <SyntaxHighlighter
              language={language}
              style={syntaxTheme}
              customStyle={{
                margin: 0,
                padding: "1rem",
                borderRadius: 0,
                background:
                  resolvedTheme === "dark"
                    ? isComponentsPage
                      ? "#09090b"
                      : "#151518"
                    : "#fafafa",
                letterSpacing: "0em",
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
