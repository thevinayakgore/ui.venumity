"use client";
import { useState } from "react";
import { 
  Cpu, 
  Battery, 
  Camera, 
  MemoryStick,
  Zap,
  Check,
  ChevronDown
} from "lucide-react";
import { motion } from "framer-motion";

export default function CustomProductDisplay2_4() {
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null);

  const product = {
    name: "Pro Laptop X1",
    tagline: "Engineered for performance and productivity",
    price: 1899.99,
    specs: [
      {
        id: "processor",
        icon: Cpu,
        title: "Processor",
        value: "Intel Core i9 13th Gen",
        details: "14 cores, up to 5.8 GHz Turbo"
      },
      {
        id: "memory",
        icon: MemoryStick,
        title: "Memory",
        value: "32GB DDR5",
        details: "4800 MHz, dual-channel"
      },
      {
        id: "battery",
        icon: Battery,
        title: "Battery",
        value: "18 hours",
        details: "Fast charging supported"
      },
      {
        id: "camera",
        icon: Camera,
        title: "Camera",
        value: "1080p IR",
        details: "With Windows Hello support"
      }
    ],
    features: [
      "4K OLED Touch Display",
      "1TB NVMe SSD",
      "Thunderbolt 4 Ports",
      "Wi-Fi 6E & Bluetooth 5.3",
      "Backlit Keyboard",
      "Fingerprint Reader"
    ]
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2">
          {/* Left Panel - Visual */}
          <div className="p-8 md:p-12 bg-linear-to-br from-blue-50 to-gray-50 dark:from-gray-900 dark:to-black">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col"
            >
              {/* Performance Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-8">
                <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  High Performance
                </span>
              </div>

              {/* Laptop Visualization */}
              <div className="flex-1 flex items-center justify-center relative">
                <div className="relative w-full max-w-md">
                  {/* Laptop body */}
                  <div className="aspect-16/10 bg-linear-to-b from-gray-900 to-black rounded-2xl border-12 border-gray-800 shadow-2xl">
                    {/* Screen */}
                    <div className="absolute inset-2 bg-linear-to-br from-blue-900 to-purple-900 rounded-lg overflow-hidden">
                      {/* Screen content */}
                      <div className="absolute inset-0 p-6">
                        <div className="grid grid-cols-3 gap-4">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="aspect-square bg-white/10 rounded"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Webcam */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full"></div>
                    
                    {/* Branding */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-sm">
                      Pro X1
                    </div>
                  </div>

                  {/* Shadow */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-black/20 blur-xl rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Details */}
          <div className="p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              {/* Header */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h1>
                <p className="text-xl text-blue-600 dark:text-blue-400 mb-4">
                  {product.tagline}
                </p>
                
                <div className="text-5xl font-bold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Starting price
                </div>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-4">
                {product.specs.map((spec) => (
                  <motion.div
                    key={spec.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border cursor-pointer transition ${
                      expandedSpec === spec.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
                    }`}
                    onClick={() => setExpandedSpec(expandedSpec === spec.id ? null : spec.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <spec.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {spec.title}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                        expandedSpec === spec.id ? 'rotate-180' : ''
                      }`} />
                    </div>
                    
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {spec.value}
                    </div>
                    
                    {expandedSpec === spec.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-800"
                      >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {spec.details}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Features List */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Key Features
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                  Add to Cart
                </button>
                
                <button className="w-full py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
                  Configure & Buy
                </button>
              </div>

              {/* Warranty Info */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex-1 text-center">
                    <div className="font-medium text-gray-900 dark:text-white">3-Year</div>
                    <div className="text-gray-500 dark:text-gray-400">Warranty</div>
                  </div>
                  <div className="w-px h-8 bg-gray-200 dark:bg-gray-800"></div>
                  <div className="flex-1 text-center">
                    <div className="font-medium text-gray-900 dark:text-white">Free</div>
                    <div className="text-gray-500 dark:text-gray-400">2-Day Shipping</div>
                  </div>
                  <div className="w-px h-8 bg-gray-200 dark:bg-gray-800"></div>
                  <div className="flex-1 text-center">
                    <div className="font-medium text-gray-900 dark:text-white">30-Day</div>
                    <div className="text-gray-500 dark:text-gray-400">Returns</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}