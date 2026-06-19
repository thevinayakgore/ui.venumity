// app/changelog/page.tsx (Server Component – NO "use client")
export const dynamic = "force-dynamic";

import fs from "fs";
import path from "path";
import ChangelogClient from "./page.client";
import { changelogEntries } from "@/registry/site/changelog";

export interface EntryWithContent {
  title: string;
  date: string;
  images?: string[];
  markdownContent: string;
}

/**
 * Parse a year .md file into an array of { title, content }.
 * Sections are separated by ## Title headings.
 */
function parseYearFile(markdown: string): { title: string; content: string }[] {
  const sections: { title: string; content: string }[] = [];
  // Split by lines that start with "## " (level 2 headings)
  const regex = /^## (.+)$/gm;
  const matches: { index: number; title: string; headingLength: number }[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(markdown)) !== null) {
    matches.push({
      index: match.index,
      title: match[1].trim(),
      headingLength: match[0].length,
    });
  }
  // Extract content between headings
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index + matches[i].headingLength; // after the heading
    const end = i < matches.length - 1 ? matches[i + 1].index : markdown.length;
    const content = markdown.slice(start, end).trim();
    sections.push({ title: matches[i].title, content });
  }
  return sections;
}

async function getEntriesWithContent(): Promise<EntryWithContent[]> {
  // Group entries by year to avoid reading the same file multiple times
  const entriesByYear: Record<string, typeof changelogEntries> = {};
  for (const entry of changelogEntries) {
    // Extract year from contentPath: "/registry/site/changelog/2026/..."
    const parts = entry.contentPath.split("/");
    const year = parts[parts.indexOf("changelog") + 1];
    if (!entriesByYear[year]) entriesByYear[year] = [];
    entriesByYear[year].push(entry);
  }

  const enrichedEntries: EntryWithContent[] = [];

  for (const [year, entries] of Object.entries(entriesByYear)) {
    // Read the corresponding .md file
    const filePath = path.join(
      process.cwd(),
      "registry",
      "site",
      "changelog",
      `${year}.md`,
    );
    let fileContent = "";
    try {
      fileContent = fs.readFileSync(filePath, "utf-8");
    } catch (error) {
      console.error(`Failed to read changelog file for ${year}:`, error);
      // Fallback: empty content for all entries of that year
      for (const entry of entries) {
        enrichedEntries.push({
          title: entry.title,
          date: entry.date,
          images: entry.images,
          markdownContent: "Content not available.",
        });
      }
      continue;
    }

    const sections = parseYearFile(fileContent);

    for (const entry of entries) {
      // Find the section whose heading exactly matches the entry title
      const section = sections.find((s) => s.title === entry.title);
      enrichedEntries.push({
        title: entry.title,
        date: entry.date,
        images: entry.images,
        markdownContent: section ? section.content : "Content not found.",
      });
    }
  }

  return enrichedEntries;
}

export default async function ChangelogPage() {
  const entries = await getEntriesWithContent();
  return <ChangelogClient entries={entries} />;
}
