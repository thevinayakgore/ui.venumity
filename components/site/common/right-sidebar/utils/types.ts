// components/common/RightSidebar/utils/types.ts
export interface HeadingItem {
  id: string;
  text: string;
  level: "h1" | "h2" | "h3";
}

export interface SidebarSection {
  id: string;
  label: string;
  show: boolean;
}

export interface ScrollSection {
  id: string;
  element: HTMLElement | null;
  top: number;
  bottom: number;
}

export interface DownloadOptions {
  filename: string;
  type: "pdf" | "zip";
  content?: unknown;
}

export interface TableData {
  rows: Array<{
    cells: string[];
  }>;
}

export interface CodeBlockData {
  code: string;
  filename?: string;
}

export interface CalloutData {
  type: "info" | "warning" | "success" | "error";
  title?: string;
  content?: unknown;
}

export interface PDFTextStyle {
  fontSize: number;
  font: "helvetica" | "courier";
  style: "normal" | "bold" | "italic";
  color: [number, number, number];
}

export interface CalloutColors {
  bg: [number, number, number];
  text: [number, number, number];
}

// Component-specific types
export interface ComponentSidebarItem {
  title: string;
  sections: SidebarSection[];
  slugifiedTitle: string;
}

export interface ComponentSection {
  itemIndex: number;
  sectionIndex: number;
  fullId: string;
  label: string;
}
