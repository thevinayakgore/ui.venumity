"use client";
import { useEffect, useState } from "react";

export default function StickyAnchorLinks() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "services", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="sticky top-6 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border rounded-lg shadow-lg">
      <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">
        Page Sections
      </h3>
      <div className="space-y-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`block px-3 py-2 rounded-md transition-all ${
              activeSection === section.id
                ? "bg-primary text-white dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </div>
  );
}
