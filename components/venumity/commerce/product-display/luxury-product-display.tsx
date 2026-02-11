"use client";
import { useState } from "react";
import {
  Gem,
  Shield,
  Truck,
  CheckCircle,
  Heart,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CustomProductDisplay2_3() {
  const [selectedOption, setSelectedOption] = useState("gold");
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Luxury Watch Collection",
    description:
      "Handcrafted timepiece featuring precision engineering and premium materials. A timeless investment piece.",
    price: 2499.99,
    materials: [
      "Sapphire Crystal",
      "Swiss Movement",
      "18K Gold",
      "Alligator Strap",
    ],
    options: [
      {
        id: "gold",
        name: "18K Gold",
        description: "Premium gold plating with diamond markers",
        additional: "+$500",
      },
      {
        id: "platinum",
        name: "Platinum",
        description: "Solid platinum case with mother-of-pearl dial",
        additional: "+$1,200",
      },
      {
        id: "titanium",
        name: "Titanium",
        description: "Lightweight titanium with ceramic bezel",
        additional: "+$300",
      },
    ],
    features: [
      {
        icon: Gem,
        title: "Premium Materials",
        description: "Crafted with finest materials",
      },
      {
        icon: Shield,
        title: "Lifetime Warranty",
        description: "Covered for manufacturing defects",
      },
      {
        icon: Truck,
        title: "White Glove Delivery",
        description: "Free insured worldwide shipping",
      },
      {
        icon: CheckCircle,
        title: "Certificate of Authenticity",
        description: "Includes official documentation",
      },
    ],
  };

  const selectedOptionDetails = product.options.find(
    (opt) => opt.id === selectedOption
  );
  const basePrice = product.price;
  const optionPrice = selectedOptionDetails?.additional
    ? parseInt(
        selectedOptionDetails.additional.replace("+$", "").replace(",", "")
      )
    : 0;
  const totalPrice = (basePrice + optionPrice) * quantity;

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Panel - Visual */}
          <div className="p-8 md:p-12 bg-linear-to-br from-amber-50 to-white dark:from-gray-900 dark:to-black">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 rounded-full mb-8 self-start">
                <Gem className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  Luxury Edition
                </span>
              </div>

              {/* Product Visualization */}
              <div className="flex-1 flex items-center justify-center relative">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  {/* Watch face */}
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-amber-100 to-amber-50 dark:from-gray-800 dark:to-gray-900 border-12 border-amber-200 dark:border-gray-700 shadow-2xl">
                    {/* Watch details */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-4 border-amber-300 dark:border-amber-600 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xs font-light text-amber-600 dark:text-amber-400">
                            SWISS
                          </div>
                          <div className="text-sm font-bold text-amber-800 dark:text-amber-300">
                            MADE
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Watch hands */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-24 h-0.5 bg-amber-900 dark:bg-amber-400 origin-left rotate-45"></div>
                      <div className="w-20 h-0.5 bg-amber-700 dark:bg-amber-500 origin-left -rotate-12 mt-2"></div>
                    </div>
                  </div>

                  {/* Like button */}
                  <button className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg">
                    <Heart className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </button>
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
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Materials */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  PREMIUM MATERIALS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((material, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-full text-sm"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Select Edition
                </h3>
                <div className="space-y-3">
                  {product.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedOption(option.id)}
                      className={`w-full p-4 rounded-xl border-2 flex items-start gap-4 transition text-left ${
                        selectedOption === option.id
                          ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                          : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedOption === option.id
                            ? "border-amber-500 bg-amber-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedOption === option.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {option.name}
                          </span>
                          <span className="text-amber-600 dark:text-amber-400 font-medium">
                            {option.additional}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Price */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      QUANTITY
                    </h3>
                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        -
                      </button>
                      <span className="px-6 py-2 text-gray-900 dark:text-white font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${totalPrice.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Includes taxes and duties
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-lg flex items-center justify-center gap-3 transition transform hover:scale-[1.02]">
                  Reserve Now
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <feature.icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {feature.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
