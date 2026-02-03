// components/common/RightSidebar/utils/scrollUtils.ts
import { ScrollSection } from "./types";

/**
 * Extract all scrollable sections from the DOM for components
 */
export function extractComponentSections(): ScrollSection[] {
  const possibleIds = Array.from(document.querySelectorAll("[id]"))
    .map((el) => el.id)
    .filter(
      (id) =>
        id.endsWith("-overview") ||
        id.endsWith("-installation-guide") ||
        id.endsWith("-video-usage") ||
        id.endsWith("-folder-structure") ||
        id.endsWith("-features")
    );

  return possibleIds
    .map((id) => {
      const element = document.getElementById(id);
      return {
        id,
        element,
        top: element ? element.offsetTop : 0,
        bottom: element ? element.offsetTop + (element.offsetHeight || 0) : 0,
      };
    })
    .sort((a, b) => a.top - b.top);
}

/**
 * Extract all headings from the DOM for docs
 */
export function extractDocHeadings(): Array<{
  id: string;
  text: string;
  level: "h1" | "h2" | "h3";
}> {
  const elements = Array.from(
    document.querySelectorAll("h1[id], h2[id], h3[id], div[id^='table-']")
  ).filter((el) => !el.closest("header"));

  return elements
    .map((el) => {
      // Table handling
      if (el.id.startsWith("table-")) {
        const tableNumber = el.id.replace("table-", "");
        return {
          id: el.id,
          text: `Table - ${tableNumber}`,
          level: "h3" as const,
        };
      }

      // Heading handling
      const tag = el.tagName.toLowerCase();
      if (tag === "h1" || tag === "h2" || tag === "h3") {
        return {
          id: el.id,
          text: el.textContent || "",
          level: tag as "h1" | "h2" | "h3",
        };
      }

      return null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

/**
 * Find active section based on scroll position
 */
export function findActiveSection(
  sections: ScrollSection[],
  scrollPosition: number
): number {
  if (sections.length === 0) return -1;

  let activeIndex = -1;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (
      scrollPosition >= section.top &&
      (i === sections.length - 1 || scrollPosition < sections[i + 1].top)
    ) {
      activeIndex = i;
      break;
    }
  }

  // If no section found and we're above the first section
  if (activeIndex === -1 && scrollPosition < sections[0].top) {
    activeIndex = 0;
  }

  return activeIndex;
}

/**
 * Smooth scroll to element with offset
 */
export function smoothScrollToElement(
  elementId: string,
  offset: number = -120
): boolean {
  const element = document.getElementById(elementId);
  if (!element) return false;

  const y = element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: y, behavior: "smooth" });
  return true;
}

/**
 * Scroll active button into view within container
 */
export function scrollButtonIntoView(
  container: HTMLElement,
  activeButton: HTMLElement,
  offset: number = 80
): void {
  const containerTop = container.getBoundingClientRect().top;
  const buttonTop = activeButton.getBoundingClientRect().top;
  container.scrollTop += buttonTop - containerTop - offset;
}

/**
 * Setup scroll spy observer
 */
export function setupScrollSpy(
  selector: string,
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, options || {
    rootMargin: "-30% 0px -60% 0px",
    threshold: 0,
  });

  document.querySelectorAll(selector).forEach((el) => observer.observe(el));
  return observer;
}

/**
 * Throttle function for scroll events
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Debounce function for resize/scroll events
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}