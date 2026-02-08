"use client";

export default function MinimalFooter() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg" />
            <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Logo
            </span>
          </div>

          <div className="flex space-x-6">
            {["Privacy", "Terms", "Cookies", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-500">
            Made with ❤️
          </div>
        </div>
      </div>
    </footer>
  );
}
