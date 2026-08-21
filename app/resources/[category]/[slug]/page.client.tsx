// app/resources/[category]/[slug]/page.client.tsx
"use client";
import { ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/components/site/common/markdown-renderer";

// Define proper types
interface ResourcePage {
  title: string;
  description?: string;
  tags?: string[];
  officialUrl?: string;
  authorNames?: string[];
  coverImage?: string;
  contentPath?: string;
}

interface PrevNextPage {
  title: string;
  // Add other properties if needed
}

interface PageClientProps {
  markdownContent: string | null;
  page: ResourcePage;
  category: string;
  prevPage: PrevNextPage | null;
  nextPage: PrevNextPage | null;
  nextCategorySlug: string;
  nextPageSlug: string | null;
  formattedLastUpdated: string;
}

function toKebabCase(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export default function PageClient({
  markdownContent,
  page,
  category,
  prevPage,
  nextPage,
  nextCategorySlug,
  nextPageSlug,
  formattedLastUpdated,
}: PageClientProps) {
  return (
    <section className="relative z-10 bg-background flex flex-col items-start justify-start m-auto overflow-auto w-full h-full">
      {markdownContent ? (
        <div className="w-full h-full">
          <MarkdownRenderer
            content={markdownContent}
            title={page.title}
            tags={page.tags}
            officialUrl={page.officialUrl}
            lastUpdated={formattedLastUpdated}
            authors={page.authorNames}
          />
          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-medium py-10 border-t border-foreground/10 w-full">
            <form
              action={
                prevPage
                  ? `/resources/${category}/${toKebabCase(prevPage.title)}`
                  : ""
              }
              method="get"
              className={
                prevPage
                  ? "p-1 bg-foreground/5 rounded-[0.8rem] border w-full"
                  : "w-full"
              }
            >
              <Button
                type="submit"
                variant="outline"
                size="lg"
                disabled={!prevPage}
                className={`relative cursor-pointer inline-flex flex-col items-end group rounded-lg border-foreground/10! hover:border-foreground/30 hover:shadow-none! bg-background! px-4 sm:px-5 w-full md:w-2/3 hover:w-full h-20 sm:h-22! transition-all duration-500
              ${
                prevPage
                  ? "border-border hover:bg-muted"
                  : "border-border text-muted-foreground"
              }`}
              >
                <span className="text-muted-foreground group-hover:text-foreground transition-all duration-500 text-sm sm:text-base">
                  Previous
                </span>
                <span className="flex items-center text-sm sm:text-lg group-hover:text-primary leading-none transition-all duration-500">
                  <ChevronLeft className="absolute bottom-4 sm:bottom-5 left-3 sm:left-4 size-5 sm:size-7! text-muted-foreground/40 group-hover:text-foreground transition-all duration-500" />
                  <span className="truncate max-w-30 sm:max-w-none">
                    {prevPage ? prevPage.title : "None"}
                  </span>
                </span>
              </Button>
            </form>
            <form
              action={
                nextPage ? `/resources/${nextCategorySlug}/${nextPageSlug}` : ""
              }
              method="get"
              className="text-end ml-0 sm:ml-4 p-1 bg-foreground/5 rounded-[0.8rem] border w-full"
            >
              <Button
                type="submit"
                variant="outline"
                size="lg"
                disabled={!nextPage}
                className={`relative cursor-pointer inline-flex flex-col items-start group rounded-lg border-foreground/10! hover:border-foreground/30 hover:shadow-none! bg-background! px-4 sm:px-5 w-full md:w-2/3 hover:w-full h-20 sm:h-22! transition-all duration-500
              ${
                nextPage
                  ? "border-border hover:bg-muted"
                  : "border-border text-muted-foreground"
              }`}
              >
                <span className="text-muted-foreground group-hover:text-foreground transition-all duration-500 text-sm sm:text-base">
                  Next
                </span>
                <span className="flex items-center text-sm sm:text-lg group-hover:text-primary leading-none transition-all duration-500">
                  <span className="truncate max-w-30 sm:max-w-none">
                    {nextPage ? nextPage.title : "None"}
                  </span>
                  <ChevronRight className="absolute bottom-4 sm:bottom-5 right-3 sm:right-4 size-5 sm:size-7! text-muted-foreground/40 group-hover:text-foreground transition-all duration-500" />
                </span>
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <h1 className="orbitron -mt-1.5 text-3xl sm:text-4xl md:text-[2.8rem] font-extrabold uppercase text-transparent bg-clip-text bg-linear-to-b from-foreground leading-none! opacity-50">
            {page.title}
          </h1>
          <div className="mt-4 sm:mt-6 prose prose-gray dark:prose-invert max-w-none w-full">
            <div className="mb-4">
              <p className="text-base sm:text-lg text-muted-foreground">
                {page.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {(page.tags || []).map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs lowercase font-light text-blue-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
            {/* No content available */}
            <div className="mt-6 sm:mt-8 w-full">
              <div className="p-4 border border-foreground/20 bg-foreground/5 rounded-lg w-full">
                <div className="flex flex-col items-center justify-center text-center py-8 w-full">
                  <div className="mb-4 w-full">
                    <div className="size-14 sm:size-16 mx-auto flex items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/20">
                      <Wrench className="text-yellow-400 w-1/2 h-1/2" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">
                    No Content Available Yet !
                  </h3>
                  <p className="text-muted-foreground mb-4 max-w-md text-sm sm:text-base">
                    We are working on creating amazing content for this
                    resource. Check back soon for comprehensive guides,
                    tutorials, and examples.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
