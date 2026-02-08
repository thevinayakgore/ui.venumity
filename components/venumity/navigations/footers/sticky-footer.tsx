"use client";
import { useState } from "react";

export default function StickyFooter() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  return (
    <>
      <footer className="sticky bottom-0 bg-white dark:bg-gray-900 border-t shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Need help?{" "}
              <a href="#" className="text-primary font-medium">
                Contact Support
              </a>
            </div>

            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary"
              >
                Status
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary"
              >
                API Docs
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary"
              >
                Pricing
              </a>
            </div>

            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              Upgrade Plan
            </button>
          </div>
        </div>
      </footer>

      {showCookieBanner && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-lg shadow-xl p-4 max-w-md z-50">
          <div className="flex items-start space-x-3">
            <div className="text-xl">🍪</div>
            <div className="flex-1">
              <p className="text-sm mb-2">
                We use cookies to enhance your experience. By continuing to
                visit this site you agree to our use of cookies.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCookieBanner(false)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                >
                  Accept
                </button>
                <button
                  onClick={() => setShowCookieBanner(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  Decline
                </button>
                <a
                  href="#"
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
