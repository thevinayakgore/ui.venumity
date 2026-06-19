// app/api/components/[category]/[...component]/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { toKebabCase } from "@/utils/slug-kebab";

const readFile = (filePath: string): string | null => {
  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf-8");
    }
    return null;
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
};

const readAllFilesInFolder = (folderPath: string, basePath: string): Array<{ path: string; content: string }> => {
  const files: Array<{ path: string; content: string }> = [];
  
  if (!fs.existsSync(folderPath)) return files;
  
  const items = fs.readdirSync(folderPath, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(folderPath, item.name);
    const relativePath = path.relative(basePath, fullPath);
    
    if (item.isDirectory()) {
      // Recursively read subdirectories
      const subFiles = readAllFilesInFolder(fullPath, basePath);
      files.push(...subFiles);
    } else if (item.isFile() && (item.name.endsWith('.tsx') || item.name.endsWith('.ts') || item.name.endsWith('.css'))) {
      const content = readFile(fullPath);
      if (content) {
        files.push({
          path: relativePath,
          content: content
        });
      }
    }
  }
  
  return files;
};

const findComponentFile = (
  basePath: string,
  category: string,
  componentParts: string[],
): string | null => {
  const componentPath = componentParts.join("/");
  
  // Try exact path with .tsx extension first
  const exactPath = path.join(basePath, category, `${componentPath}.tsx`);
  if (fs.existsSync(exactPath)) {
    return exactPath;
  }

  // Try exact path with index.tsx (for folder-based components)
  const indexPath = path.join(basePath, category, componentPath, "index.tsx");
  if (fs.existsSync(indexPath)) {
    return indexPath;
  }

  // Try to find recursively
  const categoryPath = path.join(basePath, category);
  if (!fs.existsSync(categoryPath)) return null;

  const searchRecursively = (
    dir: string,
    remainingParts: string[],
  ): string | null => {
    if (remainingParts.length === 0) return null;

    const currentPart = toKebabCase(remainingParts[0]);
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const itemNameKebab = toKebabCase(item.name.replace(/\.tsx$/, ""));

      if (item.isDirectory() && itemNameKebab === currentPart) {
        // If this is the last part and directory contains index.tsx
        if (remainingParts.length === 1) {
          const indexPath = path.join(dir, item.name, "index.tsx");
          if (fs.existsSync(indexPath)) {
            return indexPath;
          }
        }
        
        // Continue searching in subdirectory
        const result = searchRecursively(
          path.join(dir, item.name),
          remainingParts.slice(1),
        );
        if (result) return result;
      } else if (
        item.isFile() &&
        item.name.endsWith('.tsx') &&
        itemNameKebab === currentPart &&
        remainingParts.length === 1
      ) {
        return path.join(dir, item.name);
      }
    }

    return null;
  };

  return searchRecursively(categoryPath, componentParts);
};

const getAllComponentsInSubcategory = (
  basePath: string,
  category: string,
  subcategory: string,
): Array<{ name: string; code: string; isFolder: boolean; files?: Array<{ path: string; content: string }> }> => {
  const components: Array<{ name: string; code: string; isFolder: boolean; files?: Array<{ path: string; content: string }> }> = [];
  const subcategoryPath = path.join(basePath, category, subcategory);

  if (!fs.existsSync(subcategoryPath)) {
    return components;
  }

  const items = fs.readdirSync(subcategoryPath, { withFileTypes: true });

  for (const item of items) {
    if (item.isFile() && item.name.endsWith('.tsx')) {
      const componentName = item.name.replace(/\.tsx$/, "");
      const filePath = path.join(subcategoryPath, item.name);
      const code = readFile(filePath);

      if (code) {
        components.push({
          name: componentName,
          code: code,
          isFolder: false
        });
      }
    } else if (item.isDirectory()) {
      // Check if directory contains an index.tsx file
      const indexPath = path.join(subcategoryPath, item.name, "index.tsx");
      if (fs.existsSync(indexPath)) {
        const componentName = item.name;
        const code = readFile(indexPath);
        
        // Read all files in the folder
        const allFiles = readAllFilesInFolder(
          path.join(subcategoryPath, item.name),
          path.join(subcategoryPath, item.name)
        );
        
        if (code) {
          components.push({
            name: componentName,
            code: code,
            isFolder: true,
            files: allFiles
          });
        }
      }
    }
  }

  return components;
};

// Check if a component is folder-based
const isFolderBasedComponent = (
  basePath: string,
  category: string,
  componentParts: string[],
): boolean => {
  const componentPath = path.join(basePath, category, ...componentParts);
  return fs.existsSync(componentPath) && fs.statSync(componentPath).isDirectory();
};

// Get all files from a folder-based component
const getFolderComponentFiles = (
  basePath: string,
  category: string,
  componentParts: string[],
): Array<{ path: string; content: string }> => {
  const folderPath = path.join(basePath, category, ...componentParts);
  return readAllFilesInFolder(folderPath, folderPath);
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; component: string[] }> },
) {
  try {
    const { category, component } = await params;
    const basePath = path.join(process.cwd(), "components", "venumity");

    if (component.length === 0) {
      const categoryPath = path.join(basePath, toKebabCase(category));
      if (!fs.existsSync(categoryPath)) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({ components: [] });
    }

    if (component.length === 1) {
      const allComponents = getAllComponentsInSubcategory(
        basePath,
        toKebabCase(category),
        toKebabCase(component[0]),
      );
      return NextResponse.json({
        components: allComponents,
        isSubcategory: true,
      });
    }

    // Check if this is a folder-based component
    const isFolder = isFolderBasedComponent(
      basePath,
      toKebabCase(category),
      component.map(toKebabCase)
    );

    if (isFolder) {
      // Get all files from the folder
      const files = getFolderComponentFiles(
        basePath,
        toKebabCase(category),
        component.map(toKebabCase)
      );
      
      // Get the main index.tsx content
      const indexPath = path.join(
        basePath,
        toKebabCase(category),
        ...component.map(toKebabCase),
        "index.tsx"
      );
      const code = readFile(indexPath);
      
      return NextResponse.json({
        code: code || "",
        isFolder: true,
        files: files,
        isSubcategory: false,
      });
    }

    // Single file component
    const filePath = findComponentFile(
      basePath,
      toKebabCase(category),
      component.map(toKebabCase),
    );

    if (!filePath) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 },
      );
    }

    const code = readFile(filePath);

    if (!code) {
      return NextResponse.json(
        { error: "Component file is empty" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      code: code,
      isFolder: false,
      isSubcategory: false,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch component" },
      { status: 500 },
    );
  }
}