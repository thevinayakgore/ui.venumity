import { toKebabCase } from "@/utils/slug-kebab";

// Import Lucide icons
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ComponentItem {
  itemName: string;
  description?: string;
  tags?: string[];
  techs?: string[];
  video?: string;
  category: string;
  subcategory?: string;
  folderPath?: string;
}

export interface ComponentSubcategory {
  name: string;
  description?: string;
  icon?: string; // Optional: Lucide icon name (e.g., "AlertCircle")
  tags?: string[];
  techs?: string[];
  items: ComponentItem[];
}

export interface ComponentCategory {
  name: string;
  icon: string; // Required: Lucide icon name (e.g., "MessageSquare")
  tags?: string[];
  techs?: string[];
  subcategories: ComponentSubcategory[];
}

// Helper function to get Lucide icon component
export function getLucideIcon(iconName: string) {
  // Convert kebab-case to PascalCase for Lucide icons
  const pascalIconName = iconName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  type LucideIconName = keyof typeof LucideIcons;

  const icons = LucideIcons as unknown as Record<LucideIconName, LucideIcon>;

  return (
    icons[pascalIconName as LucideIconName] ??
    icons[iconName as LucideIconName] ??
    icons.Folder
  );
}

// Helper function to create components with automated fields
function createComponents(
  data: {
    category: string;
    icon: string; // Required for category
    tags?: string[];
    techs?: string[];
    subcategories: {
      name: string;
      description?: string;
      icon?: string; // Optional for subcategory
      tags: string[];
      techs: string[];
      items: {
        itemName: string;
        description?: string;
        tags?: string[];
        techs?: string[];
        video?: string;
      }[];
    }[];
  }[],
): ComponentCategory[] {
  return data.map((categoryData) => ({
    name: categoryData.category,
    icon: categoryData.icon,
    tags: categoryData.tags || [],
    techs: categoryData.techs || [],
    subcategories: categoryData.subcategories.map((subcategoryData) => ({
      name: subcategoryData.name,
      description: subcategoryData.description,
      icon: subcategoryData.icon, // Optional subcategory icon
      tags: subcategoryData.tags, // Required for subcategory
      techs: subcategoryData.techs, // Required for subcategory
      items: subcategoryData.items.map((itemData) => {
        const categoryKebab = toKebabCase(categoryData.category);
        const subcategoryKebab = toKebabCase(subcategoryData.name);
        const itemKebab = toKebabCase(itemData.itemName);

        return {
          ...itemData,
          // Merge item tags with subcategory tags (item tags take priority)
          tags: [
            ...new Set([...(itemData.tags || []), ...subcategoryData.tags]),
          ],
          // Merge item techs with subcategory techs (item techs take priority)
          techs: [
            ...new Set([...(itemData.techs || []), ...subcategoryData.techs]),
          ],
          category: categoryKebab,
          subcategory: subcategoryKebab,
          folderPath: `${categoryKebab}/${subcategoryKebab}/${itemKebab}`,
        };
      }),
    })),
  }));
}

// Updated to include folder paths (auto-generated) with icon support
export const COMPONENTS: ComponentCategory[] = createComponents([
  {
    category: "Feedbacks",
    icon: "messages-square",
    tags: ["ui", "feedback", "notifications", "interaction", "frontend"],
    techs: ["React", "TypeScript", "Tailwind CSS"],
    subcategories: [
      {
        name: "Alerts",
        description:
          "Alert UI components designed to deliver clear, immediate, and accessible feedback for system states, user actions, warnings, errors, and important application notifications.",
        tags: ["alert", "notifications", "banner", "action", "animated"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [
          { itemName: "Standard Alert" },
          { itemName: "Banner Alert" },
          { itemName: "Action Alert" },
          { itemName: "Animated Alert" },
        ],
      },
      {
        name: "Popups",
        description:
          "Popup and modal UI components created to capture user attention for confirmations, forms, alerts, and critical interactions without navigating away from the current context.",
        tags: ["popup", "modal", "overlay", "interactive"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Popup 1" }, { itemName: "Popup 2" }],
      },
      {
        name: "Inline Messages",
        description:
          "Inline notification components that provide contextual, real-time feedback directly within content areas, forms, and user interfaces.",
        tags: ["inline", "contextual", "validation", "notification"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Basic Inline Message" }],
      },
      {
        name: "Modal Alerts",
        description:
          "Modal-based alert components intended for high-priority messages that require explicit user acknowledgment or confirmation before proceeding.",
        tags: ["modal", "critical", "confirmation", "blocking"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [
          { itemName: "Simple Modal Alert" },
          { itemName: "Standard Modal Alert" },
        ],
      },
      {
        name: "Slide-In Alerts",
        description:
          "Slide-in alert components that animate from screen edges to present noticeable yet non-intrusive notifications and system messages.",
        tags: ["slidein", "toast", "animated", "edge"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [
          { itemName: "Slide-In Alert 1" },
          { itemName: "Slide-In Alert 2" },
        ],
      },
      {
        name: "Snackbars",
        description:
          "Snackbar UI components used to display brief, temporary, and auto-dismissable feedback related to user actions or background system events.",
        tags: ["snackbar", "temporary", "action", "nonblocking"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Snackbar 1" }, { itemName: "Snackbar 2" }],
      },
      {
        name: "Status Badges",
        description:
          "Status badge components designed to visually communicate system states, progress, priorities, and user or connection statuses at a glance.",
        tags: ["status", "system", "connection", "priority"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [
          { itemName: "Basic Status Badge" },
          { itemName: "Connection Status Badge" },
          { itemName: "Priority Status Badge" },
          { itemName: "Progress Status Badge" },
          { itemName: "System Status Badge" },
          { itemName: "User Status Badge" },
        ],
      },
      {
        name: "Toasts",
        description:
          "Toast notification components optimized for lightweight, time-based feedback that informs users without interrupting their workflow.",
        tags: ["toast", "feedback", "ephemeral", "nonintrusive"],
        techs: ["nextjs", "tailwindcss", "typescript", "shadcnui", "motion"],
        items: [{ itemName: "Toast 1" }],
      },
    ],
  },
  // Example of another category:
  // {
  //   category: "Forms",
  //   icon: "form-input", // Required category icon
  //   tags: ["form", "input", "validation"],
  //   techs: ["React Hook Form", "Zod"],
  //   subcategories: [
  //     {
  //       name: "Inputs",
  //       description: "Form input components",
  //       icon: "keyboard", // Optional subcategory icon
  //       tags: ["input", "text", "control"],
  //       techs: ["React", "Tailwind CSS"],
  //       items: [
  //         {
  //           itemName: "Text Input",
  //           description: "A text input field",
  //           tags: ["text", "input"],
  //         },
  //       ],
  //     },
  //   ],
  // },
]);

// Helper to find component by path with folder path support
export function getComponentByPath(path: string): ComponentItem | null {
  const parts = path.split("/").filter(Boolean);

  // First try exact path match (3 parts: category/subcategory/component)
  for (const category of COMPONENTS) {
    for (const subcategory of category.subcategories) {
      for (const item of subcategory.items) {
        if (item.folderPath && toKebabCase(item.folderPath) === path) {
          return item;
        }
      }
    }
  }

  // Fallback to old logic for component paths
  if (parts.length >= 3) {
    const [categoryName, subcategoryName, ...componentParts] = parts;
    const componentSlug = componentParts.join("/");

    const category = COMPONENTS.find(
      (c) => toKebabCase(c.name) === toKebabCase(categoryName),
    );

    if (!category) return null;

    const subcategory = category.subcategories.find(
      (s) => toKebabCase(s.name) === toKebabCase(subcategoryName),
    );

    if (!subcategory) return null;

    return (
      subcategory.items.find(
        (item) => toKebabCase(item.itemName) === toKebabCase(componentSlug),
      ) || null
    );
  }

  return null;
}

// Get all items in a subcategory
export function getSubcategoryItems(
  categoryName: string,
  subcategoryName: string,
): ComponentItem[] | null {
  const category = COMPONENTS.find(
    (c) => toKebabCase(c.name) === toKebabCase(categoryName),
  );

  if (!category) return null;

  const subcategory = category.subcategories.find(
    (s) => toKebabCase(s.name) === toKebabCase(subcategoryName),
  );

  if (!subcategory) return null;

  return subcategory.items;
}

// Get subcategory with description
export function getSubcategory(
  categoryName: string,
  subcategoryName: string,
): ComponentSubcategory | null {
  const category = COMPONENTS.find(
    (c) => toKebabCase(c.name) === toKebabCase(categoryName),
  );

  if (!category) return null;

  const subcategory = category.subcategories.find(
    (s) => toKebabCase(s.name) === toKebabCase(subcategoryName),
  );

  return subcategory || null;
}

// Get category
export function getCategory(categoryName: string): ComponentCategory | null {
  const category = COMPONENTS.find(
    (c) => toKebabCase(c.name) === toKebabCase(categoryName),
  );

  return category || null;
}

// Get all tags for a category (including subcategory and item tags)
export function getCategoryTags(categoryName: string): string[] {
  const category = getCategory(categoryName);
  if (!category) return [];

  const allTags = new Set<string>();

  // Add category tags
  if (category.tags) {
    category.tags.forEach((tag) => allTags.add(tag));
  }

  // Add subcategory tags
  category.subcategories.forEach((subcategory) => {
    if (subcategory.tags) {
      subcategory.tags.forEach((tag) => allTags.add(tag));
    }

    // Add item tags
    subcategory.items.forEach((item) => {
      if (item.tags) {
        item.tags.forEach((tag) => allTags.add(tag));
      }
    });
  });

  return Array.from(allTags);
}

// Get all techs for a category (including subcategory and item techs)
export function getCategoryTechs(categoryName: string): string[] {
  const category = getCategory(categoryName);
  if (!category) return [];

  const allTechs = new Set<string>();

  // Add category techs
  if (category.techs) {
    category.techs.forEach((tech) => allTechs.add(tech));
  }

  // Add subcategory techs
  category.subcategories.forEach((subcategory) => {
    if (subcategory.techs) {
      subcategory.techs.forEach((tech) => allTechs.add(tech));
    }

    // Add item techs
    subcategory.items.forEach((item) => {
      if (item.techs) {
        item.techs.forEach((tech) => allTechs.add(tech));
      }
    });
  });

  return Array.from(allTechs);
}

// Get all tags for a subcategory (including item tags)
export function getSubcategoryTags(
  categoryName: string,
  subcategoryName: string,
): string[] {
  const subcategory = getSubcategory(categoryName, subcategoryName);
  if (!subcategory) return [];

  const allTags = new Set<string>();

  // Add subcategory tags
  if (subcategory.tags) {
    subcategory.tags.forEach((tag) => allTags.add(tag));
  }

  // Add item tags
  subcategory.items.forEach((item) => {
    if (item.tags) {
      item.tags.forEach((tag) => allTags.add(tag));
    }
  });

  return Array.from(allTags);
}

// Get all techs for a subcategory (including item techs)
export function getSubcategoryTechs(
  categoryName: string,
  subcategoryName: string,
): string[] {
  const subcategory = getSubcategory(categoryName, subcategoryName);
  if (!subcategory) return [];

  const allTechs = new Set<string>();

  // Add subcategory techs
  if (subcategory.techs) {
    subcategory.techs.forEach((tech) => allTechs.add(tech));
  }

  // Add item techs
  subcategory.items.forEach((item) => {
    if (item.techs) {
      item.techs.forEach((tech) => allTechs.add(tech));
    }
  });

  return Array.from(allTechs);
}

// Check if path is a subcategory (2 parts)
export function isSubcategoryPath(path: string): boolean {
  const parts = path.split("/").filter(Boolean);
  return parts.length === 2;
}

// Get category and subcategory from 2-part path
export function getCategorySubcategoryFromPath(
  path: string,
): { category: string; subcategory: string } | null {
  const parts = path.split("/").filter(Boolean);
  if (parts.length !== 2) return null;

  return {
    category: parts[0],
    subcategory: parts[1],
  };
}

// GitHub URL utilities
export function getGitHubIssueUrl(
  componentPath: string,
  issueType: "feature" | "bug",
): string {
  const baseUrl = "https://github.com/thevinayakgore/ui.venumity/issues/new";
  const component = getComponentByPath(componentPath);

  const params = new URLSearchParams({
    labels: issueType === "feature" ? "enhancement" : "bug",
  });

  if (component) {
    const title = `[${issueType.toUpperCase()}] ${component.itemName} component`;
    params.set("title", title);

    if (issueType === "feature") {
      params.set("template", "feature-request.yml");
    } else {
      params.set("template", "bug-report.yml");
    }

    params.set("component-path", componentPath);
    params.set("component-name", component.itemName);
    params.set("component-category", component.category);
    if (component.subcategory) {
      params.set("component-subcategory", component.subcategory);
    }
  } else {
    params.set(
      "title",
      `[${issueType.toUpperCase()}] New ${issueType} request`,
    );
    params.set(
      "template",
      issueType === "feature" ? "feature-request.yml" : "bug-report.yml",
    );
  }

  return `${baseUrl}?${params.toString()}`;
}

export function getGitHubEditUrl(componentPath: string): string {
  const component = getComponentByPath(componentPath);

  if (component && component.folderPath) {
    return `https://github.com/thevinayakgore/ui.venumity/components/venumity/${component.folderPath}`;
  }

  // Fallback: try to construct path from componentPath
  const parts = componentPath.split("/").filter(Boolean);
  if (parts.length >= 3) {
    return `https://github.com/thevinayakgore/ui.venumity/components/venumity/${parts.slice(0, 3).join("/")}`;
  }

  return "https://github.com/thevinayakgore/ui.venumity";
}

export function getComponentDisplayName(componentPath: string): string {
  const component = getComponentByPath(componentPath);
  return component ? component.itemName : "";
}

export function getComponentFolderPath(componentPath: string): string | null {
  const component = getComponentByPath(componentPath);
  return component?.folderPath || null;
}

// Helper function to find component by slug path
export function findComponentBySlugPath(
  slugPath: string,
): ComponentItem | null {
  // Try to find component in COMPONENTS array
  for (const category of COMPONENTS) {
    for (const subcategory of category.subcategories) {
      for (const item of subcategory.items) {
        // Check if folderPath matches
        if (item.folderPath) {
          const kebabFolderPath = toKebabCase(item.folderPath);
          const kebabSlugPath = toKebabCase(slugPath);

          // Try different matching strategies
          if (kebabFolderPath === kebabSlugPath) {
            return item;
          }

          // Check without subcategory repetition
          const folderParts = item.folderPath.split("/");
          if (folderParts.length >= 3) {
            const simplifiedFolderPath = folderParts.slice(1).join("/"); // Remove first part (category)
            if (toKebabCase(simplifiedFolderPath) === kebabSlugPath) {
              return item;
            }
          }
        }
      }
    }
  }

  return null;
}
