export interface ComponentItem {
  itemName: string;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  tags?: string[];
  techs?: string[];
  category?: string;
  subcategory?: string;
  folderPath?: string;
  githubUsername?: string;
  video?: string;
}

export interface Subcategory {
  name: string;
  description?: string;
  icon?: string;
  thumbnail?: string;
  tags?: string[];
  techs?: string[];
  items: ComponentItem[];
}

export interface ComponentCategory {
  name: string;
  icon: string;
  tags: string[];
  techs: string[];
  subcategories: Subcategory[];
}

export interface ResourceCategory {
  name: string;
  slug: string;
  pages: ResourcePage[];
}

export interface ResourcePage {
  title: string;
  description?: string;
  published?: boolean;
}

export interface RegistryComponent {
  name: string;
  category: string;
  subcategory: string;
  item?: string;
  dependencies?: string[];
  description?: string;
}