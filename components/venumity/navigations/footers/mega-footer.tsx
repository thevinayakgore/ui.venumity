"use client";

export default function MegaFooter() {
  const sections = [
    {
      title: "Product",
      links: ["Features", "Integrations", "Enterprise", "Solutions", "Pricing"],
    },
    {
      title: "Resources",
      links: ["Documentation", "API Reference", "Guides", "Blog", "Community"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Press", "Events", "Partners"],
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Us", "Status", "Security", "Legal"],
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg" />
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Brand
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Building the future of digital experiences. Join thousands of
              companies using our platform.
            </p>
            <div className="flex space-x-4">
              {["🐦", "📘", "📷", "💼", "📺"].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-lg hover:bg-primary hover:text-white hover:border-primary transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 dark:text-gray-400">
              © 2024 Brand. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary"
              >
                Sitemap
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600 dark:text-gray-400">🌐</span>
              <select className="bg-transparent text-gray-600 dark:text-gray-400 focus:outline-none">
                <option>English</option>
                <option>Español</option>
                <option>Français</option>
                <option>Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
