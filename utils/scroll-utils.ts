// components/site/common/right-sidebar/utils/scroll-utils.ts

export interface ScrollSection {
  id: string;
  element: HTMLElement | null;
  top: number;
  bottom: number;
}

export function setupScrollSpy(
  selector: string,
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit,
): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(callback),
    options || {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    },
  );

  document.querySelectorAll(selector).forEach((el) => observer.observe(el));
  return observer;
}