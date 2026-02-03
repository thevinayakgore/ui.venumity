/**
 * Format date to: "01 JAN 2024 | 02:30 PM"
 * @param date - Date string, Date object, or already formatted string
 * @returns Formatted date string
 */
export const formatDate = (date?: string | Date): string => {
  // If it's already a formatted string (contains " | "), return as-is
  if (typeof date === "string" && date.includes(" | ")) {
    return date;
  }

  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return "";
  }

  // Format month as short uppercase (e.g., JAN, FEB)
  const month = dateObj
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();

  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  // Format time
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12

  // Format day with leading zero if needed
  const formattedDay = day < 10 ? `0${day}` : day.toString();

  // Format hours with leading zero if needed
  const formattedHours = hours < 10 ? `0${hours}` : hours.toString();

  return `${formattedDay} ${month} ${year}, ${formattedHours}:${minutes} ${ampm}`;
};
