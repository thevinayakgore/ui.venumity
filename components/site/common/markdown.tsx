// components/site/common/markdown.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { formatDate } from "@/utils/format-date";
import { useEffect, useState, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import CodeBlock from "@/components/utility/code-block";
import { CalendarClock, SquareArrowOutUpRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MarkdownRendererProps {
  content: string;
  className?: string;
  title?: string;
  coverImage?: string;
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
  coverImage,
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
      // 1. Remove YAML frontmatter
      let html = md.replace(/^---\n[\s\S]*?\n---\n/, "");

      // Normalize line endings and remove trailing spaces
      html = html.replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n");

      // ─────────────────────────────────────────────────────────
      // 2. Extract fenced code blocks FIRST (unchanged behavior)
      // ─────────────────────────────────────────────────────────
      html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || "text";
        return `<div data-code-block data-language="${language}" data-code="${encodeURIComponent(code.trim())}"></div>`;
      });

      // ─────────────────────────────────────────────────────────
      // 3. Extract inline code BEFORE any HTML is generated.
      //    This is the fix for `<header>`, `<main>`, `|` inside cells, etc.
      //    Placeholder: NUL + "IC<index>" + NUL — impossible in real markdown.
      // ─────────────────────────────────────────────────────────
      const inlineCodeStore: string[] = [];
      html = html.replace(/`([^`\n]+)`/g, (_m, code: string) => {
        const index = inlineCodeStore.length;
        inlineCodeStore.push(code);
        return `\u0000IC${index}\u0000`;
      });

      // ─────────────────────────────────────────────────────────
      // 4. Badge links (unchanged)
      // ─────────────────────────────────────────────────────────
      html = html.replace(
        /\[!\[([^\]]*?)\]\(([^)]+?)\)\]\(([^)]+?)\)/g,
        (match, alt, imgSrc, linkUrl) => {
          imgSrc = imgSrc.trim();
          linkUrl = linkUrl.trim();

          return `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="inline-block no-underline" style="display:inline-block !important; border:none !important; text-decoration:none !important; line-height:1 !important; margin:0 2px !important;">
            <img src="${imgSrc}" alt="${alt || ""}" class="markdown-badge" style="display:inline-block !important; height:20px !important; width:auto !important; border:none !important; border-radius:0 !important; box-shadow:none !important; margin:0 !important; padding:0 !important; vertical-align:middle !important;" />
          </a>`;
        },
      );

      // 5. Standalone images
      html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
        return `<img src="${src}" alt="${alt || ""}" class="rounded-md my-4 max-w-full" />`;
      });

      // ─────────────────────────────────────────────────────────
      // 6. Headers — placeholders for `\u0000ICn\u0000` are untouched.
      // ─────────────────────────────────────────────────────────
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
          return `<h3 class="text-lg sm:text-2xl font-semibold text-foreground my-3">${text}</h3>`;
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

      // ─────────────────────────────────────────────────────────
      // 7. Tables — split cells on unescaped `|` ONLY. `|` inside
      //    placeholder tokens is safe because tokens contain no `|`.
      //    Inside each cell, apply bold/italic/links (but NOT inline code —
      //    that was already extracted to placeholders).
      // ─────────────────────────────────────────────────────────
      const renderInline = (text: string): string => {
        return text
          .replace(
            /\*\*(.+?)\*\*/g,
            '<strong class="text-foreground! font-semibold">$1</strong>',
          )
          .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, href) => {
            const isExternal = href.startsWith("http");
            const target = isExternal ? "_blank" : "";
            const rel = isExternal ? "noopener noreferrer" : "";
            return `<a href="${href}" ${target ? `target="${target}" rel="${rel}"` : ""} class="text-blue-600! hover:underline underline-offset-2 decoration-1 transition-all duration-500">${label}</a>`;
          });
      };

      html = html.replace(/\n((?:\|.*\|(?:\n|$))+)/g, (match, tableContent) => {
        const rows = tableContent.trim().split("\n");
        if (!rows[0].includes("|")) return match;

        const cleanedRows = rows
          .map((row: string) => row.trim())
          .filter((row: string) => row.length > 0);

        if (cleanedRows.length < 2) return match;

        // split a row into cells; keep empties so column count is preserved
        const splitRow = (row: string): string[] => {
          // strip leading/trailing pipe, then split on unescaped |
          let s = row;
          if (s.startsWith("|")) s = s.slice(1);
          if (s.endsWith("|")) s = s.slice(0, -1);
          return s
            .split(/(?<!\\)\|/)
            .map((c) => c.replace(/\\\|/g, "|").trim());
        };

        const headerCells = splitRow(cleanedRows[0]);

        // skip separator row (| --- | --- |)
        const isSeparator = (cells: string[]) =>
          cells.every((c) => /^:?-{1,}:?$/.test(c) || c === "");

        let tableHtml = '<div class="overflow-x-auto my-6">\n';
        tableHtml +=
          '<table class="min-w-full divide-y divide-foreground/10 text-foreground/80 font-medium border border-foreground/10">\n';
        tableHtml += '<thead class="bg-foreground/5">\n';
        tableHtml += "<tr>\n";
        headerCells.forEach((cell) => {
          tableHtml += `<th class="px-4 py-3 text-left text-foreground text-sm font-semibold uppercase tracking-wider border border-foreground/10">${renderInline(cell)}</th>\n`;
        });
        tableHtml += "</tr>\n";
        tableHtml += "</thead>\n";

        tableHtml +=
          '<tbody class="bg-background divide-y divide-foreground/10">\n';

        for (let i = 1; i < cleanedRows.length; i++) {
          const cells = splitRow(cleanedRows[i]);
          if (isSeparator(cells)) continue;
          if (cells.length === 0) continue;

          tableHtml +=
            '<tr class="hover:bg-foreground/5 transition-all duration-500">\n';
          cells.forEach((cell, cellIndex) => {
            const isFirstCell = cellIndex === 0;
            tableHtml += `<td class="px-4 py-3 text-sm border border-foreground/10 ${isFirstCell ? "font-medium" : ""}">${renderInline(cell)}</td>\n`;
          });
          tableHtml += "</tr>\n";
        }

        tableHtml += "</tbody>\n";
        tableHtml += "</table>\n";
        tableHtml += "</div>\n";

        return tableHtml;
      });

      // ─────────────────────────────────────────────────────────
      // 8. HTML images / videos / hr / blockquote / lists (unchanged)
      //    Placeholders `\u0000ICn\u0000` survive all of these because
      //    none of the regexes match a NUL character.
      // ─────────────────────────────────────────────────────────
      html = html.replace(/<img src="([^"]*)"[^>]*>/g, (match, src) => {
        return `<div class="image-container my-4 sm:my-6 rounded-md overflow-hidden"><img src="${src}" class="w-full h-auto" /></div>`;
      });

      html = html.replace(/<video[^>]*src="([^"]*)"[^>]*>/g, (match, src) => {
        return `<div class="video-container my-4 sm:my-6 rounded-md overflow-hidden border border-foreground/10"><video src="${src}" muted loop autoplay playsinline class="w-full aspect-video object-contain"></video></div>`;
      });

      html = html.replace(/^---$/gm, '<hr class="my-3 md:my-5" />');
      html = html.replace(/^->$/gm, '<div class="my-3 md:my-5" />');

      html = html.replace(
        /^>\s+(.+)$/gm,
        '<blockquote class="flex items-center border-l-5 pl-4 sm:pl-6 min-h-12! italic text-muted-foreground leading-relaxed">$1</blockquote>',
      );

      html = html.replace(/^(\s*[-*+]\s+.+(\n\s*[-*+]\s+.+)*)/gm, (match) => {
        const items = match
          .split("\n")
          .map((line: string) => {
            const content = line.replace(/^\s*[-*+]\s+/, "").trim();
            return `<li class="relative pl-3 sm:pl-4 my-1.5 tracking-wide before:absolute before:left-0 before:content-['-']">${content}</li>`;
          })
          .join("");
        return `<ul class="ml-1 list-none text-sm sm:text-base text-muted-foreground">${items}</ul>`;
      });

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

          return `\n<ol class="ml-1 list-decimal text-sm sm:text-base text-muted-foreground">${items}</ol>`;
        },
      );

      // ─────────────────────────────────────────────────────────
      // 9. Inline elements — bold, italic, links. Inline code
      //    is intentionally OMITTED here (already extracted).
      // ─────────────────────────────────────────────────────────
      html = html
        .replace(
          /\*\*(.+?)\*\*/g,
          '<strong class="text-foreground! font-semibold">$1</strong>',
        )
        .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, href) => {
          if (text.trim().startsWith("<img")) {
            return match;
          }
          const isExternal = href.startsWith("http");
          const target = isExternal ? "_blank" : "";
          const rel = isExternal ? "noopener noreferrer" : "";
          return `<a href="${href}" ${target ? `target="${target}" rel="${rel}"` : ""} class="text-blue-600! hover:underline underline-offset-2 decoration-1 transition-all duration-500">${text}</a>`;
        });

      // ─────────────────────────────────────────────────────────
      // 10. Paragraphs (unchanged, but placeholders are fine because
      //     they contain no `<` / `>`)
      // ─────────────────────────────────────────────────────────
      const lines = html.split(/\n\n+/);

      html = lines
        .map((line) => {
          const trimmedLine = line.trim();
          if (!trimmedLine) return "";

          if (
            /^<(h[1-6]|div|ul|ol|blockquote|hr|p|table|tr|td|th|img|a|span)/.test(
              trimmedLine,
            )
          ) {
            return trimmedLine;
          }

          if (/^\s*$/.test(trimmedLine)) {
            return "";
          }

          if (
            trimmedLine.includes("shields.io") ||
            trimmedLine.includes("img.shields.io")
          ) {
            return trimmedLine;
          }

          return `<p class="text-sm sm:text-base tracking-wide text-muted-foreground leading-relaxed my-3">${trimmedLine}</p>`;
        })
        .filter(Boolean)
        .join("\n");

      // Clean up
      html = html.replace(/<p[^>]*>\s*<\/p>/g, "");
      html = html.replace(/\n\s*\n/g, "\n");

      // ─────────────────────────────────────────────────────────
      // 11. Restore inline code — MUST run last, after all markdown
      //     processing, so its angle brackets never become HTML tags.
      //     HTML-escape the code first, then wrap in <code>.
      // ─────────────────────────────────────────────────────────
      html = html.replace(/\u0000IC(\d+)\u0000/g, (_m, idx: string) => {
        const code = inlineCodeStore[Number(idx)] ?? "";
        const escaped = code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        return `<code class="bg-foreground/10 dark:bg-foreground/15 mx-0.5 px-1.5 py-0.5 leading-none text-xs sm:text-sm font-mono text-foreground/70 rounded-sm">${escaped}</code>`;
      });

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
        <header className="flex flex-col gap-1.5 w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-foreground leading-none">
            {title}
          </h1>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 leading-none">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm sm:text-base lowercase text-blue-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {isResourcesPage && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 text-sm font-medium tracking-wide">
              <span className="flex items-center gap-1.5">
                <CalendarClock className="size-4" />
                Last updated - {formatDate(lastUpdated)}
              </span>
              {officialUrl && (
                <>
                  <Separator
                    orientation="vertical"
                    className="mx-3 bg-foreground/40!"
                  />
                  <Link
                    href={officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline underline-offset-2"
                  >
                    <SquareArrowOutUpRight className="size-4" />
                    Official Docs
                  </Link>
                </>
              )}
            </div>
          )}

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
                          unoptimized
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

          {isResourcesPage && coverImage && (
            <div className="my-5 w-full h-full">
              <Image
                src={coverImage || "/brand-logo.png"}
                alt={title}
                width={2000}
                height={2000}
                loading="eager"
                className="aspect-video object-cover group-hover:scale-110 transition-all duration-500 border rounded-xl overflow-hidden w-full h-full"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = "/brand-logo.png";
                }}
              />
            </div>
          )}
        </header>
      )}

      <article ref={articleRef} className="prose mt-5 md:pt-2 border-t w-full">
        {renderContent()}
      </article>

      {isResourcesPage && (
        <div className="my-5 md:my-10 pt-5 md:pt-10 border-t w-full">
          <p className="px-5 py-3 bg-accent/60 backdrop-blur-sm border border-x-5 italic font-serif text-xs md:text-sm font-medium tracking-wide text-foreground/70 w-full">
            This content is provided for learning purposes only. While we aim to
            keep it accurate and up to date, technologies evolve quickly. Please
            refer to the official documentation for the latest guidance.
          </p>
        </div>
      )}
    </div>
  );
}
