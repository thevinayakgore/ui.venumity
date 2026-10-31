// types/components.ts
export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
  example?: string;
  options?: string[];
}

export interface ComponentItem {
  itemName: string;
  slug: string;
  description?: string;
  tags?: string[];
  techs?: string[];
  video?: string;
  category: string;
  subcategory: string;
  kind: "variant" | "multi";
  filePath: string;
  folderPath: string;
  githubUsername?: string;
}

export interface ComponentSubcategory {
  name: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  tags?: string[];
  techs?: string[];
  newItem?: boolean;
  kind: "variant" | "multi";
  items: ComponentItem[];
  props?: PropDefinition[];
  moreExamples?: string[];
}

export interface ComponentCategory {
  name: string;
  slug: string;
  icon: string;
  description?: string;
  thumbnail?: string;
  tags?: string[];
  techs?: string[];
  subcategories: ComponentSubcategory[];
}