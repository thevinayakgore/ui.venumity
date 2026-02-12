// utils/api-client.ts 
export async function fetchComponentCode(category: string, componentPath: string): Promise<string | null> {
  try {
    const response = await fetch(`/api/components/${category}/${componentPath}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Component not found: ${category}/${componentPath}`);
      }
      return null;
    }
    
    const data = await response.json();
    // Return the EXACT code from the API without any processing
    return data.code || null;
  } catch (error) {
    console.error('Error fetching component code:', error);
    return null;
  }
}

export async function fetchSubcategoryComponents(category: string, subcategory: string): Promise<Array<{name: string, code: string}> | null> {
  try {
    const response = await fetch(`/api/components/${category}/${subcategory}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Subcategory not found: ${category}/${subcategory}`);
      }
      return null;
    }
    
    const data = await response.json();
    // Return components with EXACT code from the API
    return data.components || [];
  } catch (error) {
    console.error('Error fetching subcategory components:', error);
    return null;
  }
}

export function extractComponentPath(
  slugPath: string,
): { category: string; componentPath: string } | null {
  const parts = slugPath.split("/").filter(Boolean);
  if (parts.length < 2) return null;

  const category = parts[0];
  const componentPath = parts.slice(1).join("/");

  return { category, componentPath };
}