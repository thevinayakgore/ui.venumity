"use client";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function ContactMapSection() {
  const locations = [
    {
      city: "New York",
      address: "123 Broadway, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "ny@company.com",
      hours: "Mon-Fri: 9am-6pm",
    },
    {
      city: "London",
      address: "45 Oxford Street, W1D 2EB",
      phone: "+44 20 7123 4567",
      email: "london@company.com",
      hours: "Mon-Fri: 9am-6pm",
    },
    {
      city: "Tokyo",
      address: "1-2-3 Shibuya, Tokyo 150-0002",
      phone: "+81 3 1234 5678",
      email: "tokyo@company.com",
      hours: "Mon-Fri: 9am-6pm",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Global Presence
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We have offices around the world to serve you better
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                  <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {location.city}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {location.address}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {location.phone}
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {location.email}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {location.hours}
                  </span>
                </div>
              </div>

              <button className="w-full mt-6 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                Get Directions
              </button>
            </div>
          ))}
        </div>

        {/* Map Container */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          <div className="h-64 bg-linear-to-r from-blue-400 to-purple-500 dark:from-blue-500 dark:to-purple-600 flex items-center justify-center">
            <div className="text-center text-white">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
              <p className="opacity-90">
                (Interactive map integration would go here)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
