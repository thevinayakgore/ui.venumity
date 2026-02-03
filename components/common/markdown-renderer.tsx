"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { CalendarClock, SquareArrowOutUpRight } from "lucide-react";
import CodeBlock from "./code-block";
import { formatDate } from "@/utils/format-date";
import Image from "next/image";
import { brandName } from "@/lib/brand";
import { usePathname } from "next/navigation";

interface MarkdownRendererProps {
  content: string;
  title?: string;
  tags?: string[];
  lastUpdated?: string | Date;
  officialUrl?: string;
  showHeader?: boolean;
}

export function MarkdownRenderer({
  content,
  title,
  tags: rawTags,
  lastUpdated,
  officialUrl,
  showHeader = true,
}: MarkdownRendererProps) {
  const [html, setHtml] = useState<string>("");
  const articleRef = useRef<HTMLDivElement>(null);
  const tags = Array.isArray(rawTags) ? rawTags : [];

  const pathname = usePathname();
  const isResourcesPage = pathname?.startsWith("/resources/");

  useEffect(() => {
    const convertMarkdown = (md: string) => {
      // First, remove YAML frontmatter
      let html = md.replace(/^---\n[\s\S]*?\n---\n/, "");

      // Normalize line endings and remove trailing spaces
      html = html.replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n");

      // Headers
      html = html
        .replace(/^# (.+)$/gm, (match, text) => {
          const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-");
          return `<h1 id="${id}" class="text-2xl sm:text-4xl font-semibold tracking-tight">${text}</h1>`;
        })
        .replace(/^## (.+)$/gm, (match, text) => {
          const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-");
          return `<h2 id="${id}" class="text-xl sm:text-3xl font-semibold tracking-tight">${text}</h2>`;
        })
        .replace(/^### (.+)$/gm, (match, text) => {
          return `<h3 class="text-lg sm:text-2xl font-medium tracking-tight my-3">${text}</h3>`;
        })
        .replace(/^#### (.+)$/gm, (match, text) => {
          return `<h4 class="text-base sm:text-xl font-medium tracking-tight my-3">${text}</h4>`;
        })
        .replace(/^##### (.+)$/gm, (match, text) => {
          return `<h5 class="text-sm sm:text-lg tracking-tight my-3">${text}</h5>`;
        })
        .replace(/^###### (.+)$/gm, (match, text) => {
          return `<h6 class="text-xs sm:text-base">${text}</h6>`;
        });

      // Code blocks (handle this before inline processing)
      html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || "text";
        return `<div data-code-block data-language="${language}" data-code="${encodeURIComponent(code.trim())}"></div>`;
      });

      // Tables - Handle before other inline processing
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
        '<blockquote class="border-l-2 pl-4 sm:pl-6 italic text-muted-foreground leading-relaxed">$1</blockquote>',
      );

      // Lists - process in a single pass to avoid nested wrapping
      // Process unordered lists first
      html = html.replace(/^(\s*[-*+]\s+.+(\n\s*[-*+]\s+.+)*)/gm, (match) => {
        const items = match
          .split("\n")
          .map((line: string) => {
            const content = line.replace(/^\s*[-*+]\s+/, "").trim();
            return `<li class="relative pl-3 sm:pl-4 before:absolute before:left-0 before:content-['-']">${content}</li>`;
          })
          .join("");
        return `<ul class="ml-1 list-none text-sm sm:text-base font-normal text-foreground/80 my-3">${items}</ul>`;
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

          return `\n<ol class="ml-3 sm:ml-5 list-decimal text-sm sm:text-base font-normal text-foreground/80 my-3">${items}</ol>`;
        },
      );

      // Inline elements
      html = html
        .replace(
          /`([^`]+)`/g,
          '<code class="bg-foreground/10 px-1 sm:px-1.5 py-0.5 rounded text-sm sm:text-base font-mono">$1</code>',
        )
        .replace(
          /\*\*(.+?)\*\*/g,
          '<strong class="text-foreground! font-medium">$1</strong>',
        )
        .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, href) => {
          const isExternal = href.startsWith("http");
          const target = isExternal ? "_blank" : "";
          const rel = isExternal ? "noopener noreferrer" : "";
          return `<a href="${href}" ${target ? `target="${target}" rel="${rel}"` : ""} class="text-blue-500! hover:text-green-500! transition-all duration-500">${text}</a>`;
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

          return `<p class="text-sm sm:text-base font-normal text-foreground/80 leading-relaxed my-3">${trimmedLine}</p>`;
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
    <div className="font-normal w-full">
      {showHeader && title && (
        <header className="mb-5 sm:mb-10 pb-5 sm:pb-10 border-b w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight opacity-20 leading-none">
            {title}
          </h1>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 my-2 sm:my-3 leading-none">
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

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5 uppercase">
              <CalendarClock className="size-3 sm:size-3.5" />
              Last updated - {formatDate(lastUpdated)}
            </span>
            {officialUrl && (
              <>
                <span className="leading-none mx-2 text-base font-light hidden sm:inline">
                  |
                </span>
                <Link
                  href={officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-500 hover:underline underline-offset-6"
                >
                  <SquareArrowOutUpRight className="size-3" />
                  Official Docs
                </Link>
              </>
            )}
          </div>
        </header>
      )}

      <article ref={articleRef} className="prose w-full">
        {renderContent()}
      </article>

      {isResourcesPage && (
        <div className="flex flex-col items-center gap-3 mt-10 mb-6 w-full">
          <div className="flex items-center justify-between p-3 bg-primary/5 backdrop-blur-sm border-x-4 border-x-orange-500 border-y border-y-orange-500/30 w-full">
            <div className="flex items-center text-center gap-3 leading-none font-bold uppercase w-full">
              <Image
                src="/logo.png"
                alt={brandName}
                width={1000}
                height={1000}
                className="size-9 leading-none"
              />
              <span className="flex items-center font-bold text-3xl opacity-30 leading-none text-foreground">
                <span>{brandName.slice(0, 4)}</span>
                <span className="text-primary">{brandName.slice(4, 8)}</span>
                <span className="ml-1">{brandName.slice(8, 12)}</span>
              </span>
            </div>
            <div className="flex flex-col items-end m-auto w-full">
              <span className="orbitron tracking-wide text-primary font-bold uppercase">
                ✨ Happy Coding !
              </span>
              <span className="flex items-center gap-2 text-xs text-foreground/70">
                <Link
                  href="https://ui.venumity.com/"
                  target="_blank"
                  className="hover:text-primary transition-all duration-500"
                >
                  ui.venumity.com
                </Link>
                |
                <Link
                  href="https://www.venumity.com/"
                  target="_blank"
                  className="hover:text-primary transition-all duration-500"
                >
                  venumity.com
                </Link>
                |
                <Link
                  href="https://thevinayakgore.vercel.app/"
                  target="_blank"
                  className="hover:text-primary transition-all duration-500"
                >
                  thevinayakgore.vercel.app
                </Link>
              </span>
            </div>
          </div>
          <span className="text-xs text-center opacity-30">
            For educational purposes only, we do not claim it to be original,
            refer to official documentation for details.
          </span>
        </div>
      )}
    </div>
  );
}
