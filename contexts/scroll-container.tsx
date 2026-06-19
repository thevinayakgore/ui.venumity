// context/scroll-container.tsx
import { createContext, useContext, RefObject } from "react";

export const ScrollContainerContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

export const useScrollContainer = () => useContext(ScrollContainerContext);