// components/site/common/markdown-renderer.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { CalendarClock, SquareArrowOutUpRight } from "lucide-react";
import CodeBlock from "./code-block";
import { formatDate } from "@/utils/format-date";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MarkdownRendererProps {
  content: string;
  className?: string;
  title?: string;
  tags?: string[];
  lastUpdated?: string | Date;
  officialUrl?: string;
  showHeader?: boolean;
  authors?: string[];
}

export function MarkdownRenderer({
  content,
  className,
  title,
  tags: rawTags,
  lastUpdated,
  officialUrl,
  showHeader = true,
  authors,
}: MarkdownRendererProps) {
  const [html, setHtml] = useState<string>("");
  const articleRef = useRef<HTMLDivElement>(null);
  const tags = Array.isArray(rawTags) ? rawTags : [];

  const pathname = usePathname();
  const isResourcesPage = pathname?.startsWith("/resources/");

  useEffect(() => {
    const convertMarkdown = (md: string) => {
      // 1️⃣ Remove YAML frontmatter
      let html = md.replace(/^---\n[\s\S]*?\n---\n/, "");

      // Normalize line endings and remove trailing spaces
      html = html.replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n");

      // 2️⃣ Extract code blocks FIRST – this ensures any "#" inside them
      //    is never seen by the header regex below.
      html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || "text";
        return `<div data-code-block data-language="${language}" data-code="${encodeURIComponent(code.trim())}"></div>`;
      });

      // 3️⃣ Now process all other Markdown elements (headings, tables, lists, etc.)

      // Headers
      html = html
        .replace(/^# (.+)$/gm, (match, text) => {
          const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-");
          return `<h1 id="${id}" class="text-2xl sm:text-4xl font-semibold text-foreground my-5">${text}</h1>`;
        })
        .replace(/^## (.+)$/gm, (match, text) => {
          const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-");
          return `<h2 id="${id}" class="text-xl sm:text-3xl font-semibold text-foreground my-5">${text}</h2>`;
        })
        .replace(/^### (.+)$/gm, (match, text) => {
          return `<h3 class="text-lg sm:text-2xl font-semibold text-foreground my-5">${text}</h3>`;
        })
        .replace(/^#### (.+)$/gm, (match, text) => {
          return `<h4 class="text-base sm:text-xl font-semibold text-foreground my-5">${text}</h4>`;
        })
        .replace(/^##### (.+)$/gm, (match, text) => {
          return `<h5 class="text-sm sm:text-lg font-semibold text-foreground my-5">${text}</h5>`;
        })
        .replace(/^###### (.+)$/gm, (match, text) => {
          return `<h6 class="text-xs sm:text-base font-semibold tracking-wide">${text}</h6>`;
        });

      // Tables
      html = html.replace(/\n((?:\|.*\|(?:\n|$))+)/g, (match, tableContent) => {
        // Split table into rows
        const rows = tableContent.trim().split("\n");

        // Check if it's actually a table (has at least one pipe)
        if (!rows[0].includes("|")) return match;

        // Clean rows and remove empty ones
        const cleanedRows = rows
          .map((row: string) => row.trim())
          .filter((row: string) => row.length > 0);

        if (cleanedRows.length < 2) return match; // Need at least header and separator

        let tableHtml = '<div class="overflow-x-auto my-6">\n';
        tableHtml +=
          '<table class="min-w-full divide-y divide-foreground/10 text-foreground/80 font-medium border border-foreground/10">\n';
        tableHtml += '<thead class="bg-foreground/5">\n';

        // Process header row
        const headerCells = cleanedRows[0]
          .split("|")
          .map((cell: string) => cell.trim())
          .filter((cell: string) => cell.length > 0);

        tableHtml += "<tr>\n";
        headerCells.forEach((cell: string) => {
          tableHtml += `<th class="px-4 py-3 text-left text-foreground text-sm font-semibold uppercase tracking-wider border border-foreground/10">${cell}</th>\n`;
        });
        tableHtml += "</tr>\n";
        tableHtml += "</thead>\n";

        tableHtml +=
          '<tbody class="bg-background divide-y divide-foreground/10">\n';

        // Process data rows (skip separator row which is index 1)
        for (let i = 2; i < cleanedRows.length; i++) {
          const rowCells = cleanedRows[i]
            .split("|")
            .map((cell: string) => cell.trim())
            .filter((cell: string) => cell.length > 0);

          if (rowCells.length === 0) continue;

          tableHtml +=
            '<tr class="hover:bg-foreground/5 transition-all duration-500">\n';
          rowCells.forEach((cell: string, cellIndex: number) => {
            const isFirstCell = cellIndex === 0;
            tableHtml += `<td class="px-4 py-3 text-sm border border-foreground/10 ${isFirstCell ? "font-medium" : ""}">${cell}</td>\n`;
          });
          tableHtml += "</tr>\n";
        }

        tableHtml += "</tbody>\n";
        tableHtml += "</table>\n";
        tableHtml += "</div>\n";

        return tableHtml;
      });

      // Images
      html = html.replace(/<img src="([^"]*)"[^>]*>/g, (match, src) => {
        return `<div class="image-container my-4 sm:my-6 rounded-md overflow-hidden border border-foreground/10"><img src="${src}" class="w-full h-auto" /></div>`;
      });

      // Videos
      html = html.replace(/<video[^>]*src="([^"]*)"[^>]*>/g, (match, src) => {
        return `<div class="video-container my-4 sm:my-6 rounded-md overflow-hidden border border-foreground/10"><video src="${src}" muted loop autoplay playsinline class="w-full aspect-video object-contain"></video></div>`;
      });

      // Horizontal rules
      html = html.replace(/^---$/gm, '<hr class="my-6 md:my-10" />');
      html = html.replace(/^->$/gm, '<div class="my-6 md:my-10" />');

      // Blockquotes
      html = html.replace(
        /^>\s+(.+)$/gm,
        '<blockquote class="flex items-center border-l-5 pl-4 sm:pl-6 min-h-12! italic text-muted-foreground leading-relaxed">$1</blockquote>',
      );

      // Lists - process in a single pass to avoid nested wrapping
      // Process unordered lists first
      html = html.replace(/^(\s*[-*+]\s+.+(\n\s*[-*+]\s+.+)*)/gm, (match) => {
        const items = match
          .split("\n")
          .map((line: string) => {
            const content = line.replace(/^\s*[-*+]\s+/, "").trim();
            return `<li class="relative pl-3 sm:pl-4 my-3 tracking-wide before:absolute before:left-0 before:content-['-']">${content}</li>`;
          })
          .join("");
        return `<ul class="ml-1 list-none text-sm sm:text-base text-muted-foreground my-3">${items}</ul>`;
      });

      // Process ordered lists
      html = html.replace(
        /(?:^|\n)(\s*\d+\.\s+.+(?:\n\s*\d+\.\s+.+)*)/g,
        (match, list) => {
          const items = list
            .split("\n")
            .map((line: string) => {
              const content = line.replace(/^\s*\d+\.\s+/, "").trim();
              return content ? `<li>${content}</li>` : "";
            })
            .join("");

          return `\n<ol class="ml-3 sm:ml-5 list-decimal text-sm sm:text-base text-muted-foreground my-3 space-y-3">${items}</ol>`;
        },
      );

      // Inline elements
      html = html
        .replace(
          /`([^`]+)`/g,
          '<code class="bg-foreground/8 mx-1.5 p-1 sm:px-1.5 rounded-sm text-xs sm:text-sm font-mono">$1</code>',
        )
        .replace(
          /\*\*(.+?)\*\*/g,
          '<strong class="text-foreground! font-semibold">$1</strong>',
        )
        .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, href) => {
          const isExternal = href.startsWith("http");
          const target = isExternal ? "_blank" : "";
          const rel = isExternal ? "noopener noreferrer" : "";
          return `<a href="${href}" ${target ? `target="${target}" rel="${rel}"` : ""} class="text-blue-500! hover:underline underline-offset-2 decoration-1 transition-all duration-500">${text}</a>`;
        });

      // Paragraphs - only wrap text blocks that aren't already wrapped
      // Split by double newlines, but preserve existing HTML tags
      const lines = html.split(/\n\n+/);

      html = lines
        .map((line) => {
          const trimmedLine = line.trim();
          if (!trimmedLine) return "";

          // Skip if line already starts with a HTML tag
          if (
            /^<(h[1-6]|div|ul|ol|blockquote|hr|p|table|tr|td|th)/.test(
              trimmedLine,
            )
          ) {
            return trimmedLine;
          }

          // Skip if line is just whitespace
          if (/^\s*$/.test(trimmedLine)) {
            return "";
          }

          return `<p class="text-sm sm:text-base tracking-wide leading-relaxed my-5">${trimmedLine}</p>`;
        })
        .filter(Boolean)
        .join("\n");

      // Clean up: remove empty paragraphs and excessive whitespace
      html = html.replace(/<p[^>]*>\s*<\/p>/g, "");
      html = html.replace(/\n\s*\n/g, "\n");

      return html;
    };

    const timer = setTimeout(() => {
      setHtml(convertMarkdown(content));
    }, 0);

    return () => clearTimeout(timer);
  }, [content]);

  // Effect to ensure videos autoplay properly
  useEffect(() => {
    if (!articleRef.current) return;

    const videoElements = articleRef.current.querySelectorAll("video");
    videoElements.forEach((video) => {
      if (!video.hasAttribute("autoplay")) video.setAttribute("autoplay", "");
      if (!video.hasAttribute("muted")) video.setAttribute("muted", "");
      if (!video.hasAttribute("loop")) video.setAttribute("loop", "");
      if (!video.hasAttribute("playsinline"))
        video.setAttribute("playsinline", "");

      video.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    });
  }, [html]);

  const renderContent = () => {
    if (!html) return null;

    const parts = html.split(/(<div data-code-block[^>]*><\/div>)/);

    return parts.map((part, index) => {
      const codeBlockMatch = part.match(
        /data-code-block data-language="([^"]*)" data-code="([^"]*)"/,
      );

      if (codeBlockMatch) {
        const language = codeBlockMatch[1];
        const code = decodeURIComponent(codeBlockMatch[2]);
        return (
          <div key={index} className="my-5">
            <CodeBlock code={code} language={language} />
          </div>
        );
      }

      return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  return (
    <div className={cn("text-muted-foreground w-full", className)}>
      {showHeader && title && (
        <header
          className={`flex flex-col gap-3 ${isResourcesPage ? "mb-5 sm:mb-10 pb-5 sm:pb-10" : "mb-5 sm:mb-10 pb-5"} border-b w-full`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground opacity-90 leading-none">
            {title}
          </h1>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 leading-none">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm sm:text-base lowercase text-blue-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 text-sm font-semibold tracking-wide">
            {isResourcesPage && (
              <span className="flex items-center gap-1.5 uppercase">
                <CalendarClock className="size-4" />
                Last updated - {formatDate(lastUpdated)}
              </span>
            )}
            {officialUrl && (
              <>
                <Separator
                  orientation="vertical"
                  className="mx-3 bg-foreground/30!"
                />
                <Link
                  href={officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-500 hover:underline underline-offset-2"
                >
                  <SquareArrowOutUpRight className="size-4" />
                  Official Docs
                </Link>
              </>
            )}
          </div>

          {authors && authors.length > 0 && (
            <div className="flex flex-col items-start gap-3 text-sm font-semibold text-muted-foreground">
              <span className="whitespace-nowrap">
                This document prepared by -
              </span>
              <div className="flex items-center gap-2">
                {authors.map((author, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Link
                        href={`https://github.com/${author}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="size-9 rounded-full overflow-hidden"
                      >
                        <Image
                          src={`https://github.com/${author}.png`}
                          alt={author}
                          width={500}
                          height={500}
                          priority
                          className="object-cover w-full h-full"
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="flex items-center gap-0! py-1.25! font-semibold">
                      <span className="text-sm mb-0.5">@</span>
                      <span>{author}</span>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}
        </header>
      )}

      <article ref={articleRef} className="prose w-full">
        {renderContent()}
      </article>

      {isResourcesPage && (
        <p className="text-xs tracking-wide font-semibold italic text-center my-5 md:my-10 opacity-30 w-full">
          ** For educational purposes only, we do not claim it to be original or
          accurate, refer to official docs for more details.
        </p>
      )}
    </div>
  );
}
