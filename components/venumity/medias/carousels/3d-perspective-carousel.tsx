"use client";
import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Star,
  Share2,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Quantum Laptop",
    price: "$2,499",
    rating: 4.8,
    features: ["16GB RAM", "1TB SSD", "RTX 4080"],
    color: "from-blue-500 to-cyan-400",
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Neon Headphones",
    price: "$349",
    rating: 4.6,
    features: ["Noise Cancel", "40h Battery", "Hi-Fi"],
    color: "from-purple-500 to-pink-400",
    tag: "New",
  },
  {
    id: 3,
    name: "Solar Watch",
    price: "$599",
    rating: 4.9,
    features: ["Solar Power", "GPS", "Health Track"],
    color: "from-amber-500 to-orange-400",
    tag: "Premium",
  },
  {
    id: 4,
    name: "Drone Pro",
    price: "$1,299",
    rating: 4.7,
    features: ["4K Camera", "30min Flight", "Auto Follow"],
    color: "from-emerald-500 to-teal-400",
    tag: "Advanced",
  },
  {
    id: 5,
    name: "VR Headset",
    price: "$799",
    rating: 4.5,
    features: ["120Hz", "6DOF", "Wireless"],
    color: "from-violet-500 to-indigo-400",
    tag: "Immersive",
  },
  {
    id: 6,
    name: "Smart Speaker",
    price: "$199",
    rating: 4.4,
    features: ["360° Sound", "Voice AI", "Smart Home"],
    color: "from-rose-500 to-red-400",
    tag: "Popular",
  },
];

export default function Carousel_3_2() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [rotation, setRotation] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const newRotation = (360 / products.length) * activeIndex;
      setRotation(newRotation);
    }, 0);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const getItemStyle = (index: number) => {
    const angle = (360 / products.length) * index - rotation;
    const distance = 400; // Distance from center
    const z = Math.cos((angle * Math.PI) / 180) * distance;
    const x = Math.sin((angle * Math.PI) / 180) * distance;

    return {
      transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${angle}deg)`,
      opacity: Math.abs(z) > 200 ? 0.3 : 1,
      scale: Math.abs(z) > 200 ? 0.8 : 1,
      zIndex: Math.round(1000 - Math.abs(z)),
    };
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-linear-to-br from-gray-900 to-black rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white">
              3D Product Showcase
            </h2>
            <p className="text-gray-400 mt-2">
              Experience products in immersive 3D perspective
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
              <Share2 className="w-5 h-5 inline mr-2" />
              Share View
            </button>
            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <Maximize2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="relative h-[600px] overflow-hidden">
          {/* 3D Carousel Container */}
          <div
            ref={carouselRef}
            className="absolute inset-0 perspective-[2000px] transform-style-3d"
            style={{ perspective: 2000 }}
          >
            {/* Center Point */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 rounded-full bg-blue-500 animate-ping" />
              <div className="w-8 h-8 rounded-full border-2 border-blue-500/30 absolute -inset-2" />
            </div>

            {/* Carousel Items */}
            {products.map((product, index) => (
              <div
                key={product.id}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
                style={getItemStyle(index)}
              >
                <div className="relative w-80">
                  {/* Product Card */}
                  <div
                    className={`bg-linear-to-br ${product.color} rounded-2xl p-6 shadow-2xl transform-style-3d`}
                  >
                    {/* Product Tag */}
                    <div className="absolute -top-3 left-6">
                      <div className="px-4 py-1.5 bg-white text-gray-900 font-bold rounded-full text-sm shadow-lg">
                        {product.tag}
                      </div>
                    </div>

                    {/* Product Image Area */}
                    <div className="h-48 mb-6 rounded-xl bg-linear-to-b from-white/20 to-transparent flex items-center justify-center">
                      <div className="text-6xl opacity-90">✨</div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          <span className="text-white font-bold">
                            {product.rating}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {product.features.map((feature, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                            <span className="text-white/80 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/20">
                        <div className="text-3xl font-bold text-white">
                          {product.price}
                        </div>
                        <button className="px-6 py-2 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-8">
            <button
              onClick={prevSlide}
              className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 flex items-center justify-center shadow-2xl"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            <div className="flex items-center space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-white"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 flex items-center justify-center shadow-2xl"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>

        {/* Active Product Info */}
        <div className="mt-8 p-6 bg-linear-to-r from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">
                {products[activeIndex].name}
              </h3>
              <p className="text-gray-400">Currently viewing in 3D</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {products[activeIndex].price}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-gray-400">
                    {products[activeIndex].rating} rating
                  </span>
                </div>
              </div>
              <button className="px-8 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white font-bold rounded-full transition-all duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
.transform-style-3d {
  transform-style: preserve-3d;
}
`}</style>
    </div>
  );
}
