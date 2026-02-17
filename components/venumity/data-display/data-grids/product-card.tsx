import React, { useState } from "react";

export default function ProductCard() {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = {
    name: "Wireless Noise-Canceling Headphones",
    brand: "AudioPro",
    rating: 4.5,
    reviews: 1248,
    price: 299.99,
    discountPrice: 249.99,
    description:
      "Premium wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.2",
      "Voice Assistant Support",
      "Foldable Design",
    ],
    colors: ["Black", "Silver", "Blue", "Red"],
    inStock: true,
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border max-w-md mx-auto overflow-hidden hover:shadow-xl transition-shadow">
      {/* Product Image */}
      <div className="relative">
        <div className="h-64 bg-linear-to-br from-gray-100 to-gray-300 flex items-center justify-center">
          <span className="text-6xl">🎧</span>
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <span
            className={`text-xl ${
              isFavorite ? "text-red-500" : "text-gray-400"
            }`}
          >
            {isFavorite ? "❤️" : "🤍"}
          </span>
        </button>
        {product.discountPrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Save ${(product.price - product.discountPrice).toFixed(2)}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <h2 className="text-xl font-bold">{product.name}</h2>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="font-semibold mb-2">Key Features</h4>
            <ul className="space-y-1">
              {product.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-gray-600"
                >
                  <span className="w-4 mr-2 text-green-500">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Available Colors</h4>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            {product.discountPrice ? (
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold">
                  ${product.discountPrice}
                </span>
                <span className="text-gray-500 line-through">
                  ${product.price}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold">${product.price}</span>
            )}
            <div
              className={`text-sm ${
                product.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.inStock ? "In Stock • Free Shipping" : "Out of Stock"}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-3 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button
              disabled={!product.inStock}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                product.inStock
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
