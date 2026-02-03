// contexts/resources.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ResourcesContextType {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(
  undefined,
);

export function ResourcesProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("frameworks");

  return (
    <ResourcesContext.Provider
      value={{ selectedCategory, setSelectedCategory }}
    >
      {children}
    </ResourcesContext.Provider>
  );
}

export function useResources() {
  const context = useContext(ResourcesContext);
  if (context === undefined) {
    throw new Error("useResources must be used within a ResourcesProvider");
  }
  return context;
}