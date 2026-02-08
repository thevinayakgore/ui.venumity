"use client";

export default function BasicAnchorLinks() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Page Navigation
      </h2>
      <div className="space-y-2">
        {["introduction", "features", "pricing", "faq", "contact"].map(
          (section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          )
        )}
      </div>
    </div>
  );
}
