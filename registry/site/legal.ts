// registry/site/legal.ts
export interface LegalPage {
  title: string;
  contentPath: string;
  lastUpdated?: string;
}

export const LEGAL_PAGES: Record<string, LegalPage> = {
  license: {
    title: "MIT License",
    contentPath: "registry/site/legal/license.md",
  },
  terms: {
    title: "Terms and Conditions",
    contentPath: "registry/site/legal/terms.md",
  },
  privacy: {
    title: "Privacy Policy",
    contentPath: "registry/site/legal/privacy.md",
  },
};