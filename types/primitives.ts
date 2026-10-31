// types/primitives.ts
import type { PropDefinition } from "./components";

export interface PrimitiveItem {
  itemName: string;
  slug: string;
  description?: string;
  tags?: string[];
  techs?: string[];
  video?: string;
  category: string;
  subcategory: string;
  filePath: string;
  folderPath: string;
  githubUsername?: string;
}

export interface PrimitiveSubcategory {
  name: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  tags?: string[];
  techs?: string[];
  newItem?: boolean;
  items: PrimitiveItem[];
  usage?: string;
  props?: PropDefinition[];
  moreExamples?: string[];
}

export interface PrimitiveCategory {
  name: string;
  slug: string;
  icon: string;
  description?: string;
  thumbnail?: string;
  tags?: string[];
  techs?: string[];
  subcategories: PrimitiveSubcategory[];
}