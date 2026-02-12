// app/api/components/[category]/[...component]/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { toKebabCase } from "@/utils/slug-kebab";

const readFile = (filePath: string): string | null => {
  try {
    if (fs.existsSync(filePath)) {
      // Read file synchronously and return EXACT content without any modifications
      return fs.readFileSync(filePath, "utf-8");
    }
    return null;
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
};

const findComponentFile = (
  basePath: string,
  category: string,
  componentParts: string[],
): string | null => {
  const componentPath = componentParts.join("/");

  // Try exact path first - only .tsx files
  const fullPath = path.join(basePath, category, `${componentPath}.tsx`);
  if (fs.existsSync(fullPath)) {
    return fullPath;
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
): Array<{ name: string; code: string }> => {
  const components: Array<{ name: string; code: string }> = [];
  const subcategoryPath = path.join(basePath, category, subcategory);

  if (!fs.existsSync(subcategoryPath)) {
    return components;
  }

  const items = fs.readdirSync(subcategoryPath, { withFileTypes: true });

  for (const item of items) {
    if (item.isFile() && item.name.endsWith('.tsx')) {
      const componentName = item.name.replace(/\.tsx$/, "");
      const filePath = path.join(subcategoryPath, item.name);
      // Read EXACT file content without any modifications
      const code = readFile(filePath);

      if (code) {
        components.push({
          name: componentName,
          // Return EXACT code as read from file
          code: code,
        });
      }
    }
  }

  return components;
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
        // Return EXACT component code without any processing
        components: allComponents,
        isSubcategory: true,
      });
    }

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

    // Read EXACT file content without any modifications
    const code = readFile(filePath);

    if (!code) {
      return NextResponse.json(
        { error: "Component file is empty" },
        { status: 404 },
      );
    }

    // Return the EXACT code as read from the file
    return NextResponse.json({
      code: code, // This is the raw file content
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