// app/changelog/page.tsx
export const dynamic = "force-dynamic";
import fs from "fs";
import path from "path";
import ChangelogClient from "./page.client";
import { CHANGELOGS } from "@/registry/site/changelog";

export interface ChangelogLink {
  name: string;
  href: string;
}

export interface EntryWithContent {
  title: string;
  date: string;
  covers?: string[];
  gallery?: string[];
  links?: ChangelogLink[];
  markdownContent: string;
}

function parseYearFile(markdown: string): { title: string; content: string }[] {
  const sections: { title: string; content: string }[] = [];
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
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index + matches[i].headingLength;
    const end = i < matches.length - 1 ? matches[i + 1].index : markdown.length;
    const content = markdown.slice(start, end).trim();
    sections.push({ title: matches[i].title, content });
  }
  return sections;
}

async function getEntriesWithContent(): Promise<EntryWithContent[]> {
  const enrichedEntries: EntryWithContent[] = [];

  for (const category of CHANGELOGS) {
    const year = category.year;
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
      for (const entry of category.items) {
        enrichedEntries.push({
          title: entry.title,
          date: entry.date,
          covers: entry.covers,
          gallery: entry.gallery,
          links: entry.links,
          markdownContent: "Content not available.",
        });
      }
      continue;
    }

    const sections = parseYearFile(fileContent);

    for (const entry of category.items) {
      const section = sections.find((s) => s.title === entry.title);
      enrichedEntries.push({
        title: entry.title,
        date: entry.date,
        covers: entry.covers,
        gallery: entry.gallery,
        links: entry.links,
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