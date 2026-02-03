export interface LegalPage {
  title: string;
  contentPath: string; // Add this - path to .md file
  lastUpdated?: string; // Will be filled dynamically
}

export const LEGAL_PAGES: Record<string, LegalPage> = {
  license: {
    title: "License",
    contentPath: "/registry/site/legal/license.md",
  },
  terms: {
    title: "Terms",
    contentPath: "/registry/site/legal/terms.md",
  },
  privacy: {
    title: "Privacy",
    contentPath: "/registry/site/legal/privacy.md",
  },
};