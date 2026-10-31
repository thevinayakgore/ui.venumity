/**
 * Format date to: "Nov 11, 2026"
 * @param date - Date string, Date object, or already formatted string
 * @returns Formatted date string
 */
export const formatDate = (date?: string | Date): string => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};