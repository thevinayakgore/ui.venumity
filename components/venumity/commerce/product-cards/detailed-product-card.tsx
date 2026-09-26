"use client";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Heart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

export default function DetailedProductCard() {
  const [isFavorite, setIsFavorite] = useState(false);

  const discountAmount = product.discountPrice
    ? (product.price - product.discountPrice).toFixed(2)
    : null;

  return (
    <main className="p-4 sm:p-6 md:p-10 w-full">
      <Card className="py-0! shadow-xl rounded-3xl sm:rounded-4xl overflow-hidden mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg">
        {/* Product Image */}
        <div className="relative border-b">
          <Image
            src="/assets/earphone.webp"
            alt="Product Card"
            width={2000}
            height={2000}
            priority
            unoptimized
            loading="eager"
            className="aspect-4/3 sm:aspect-5/3.5 object-cover w-full h-auto"
          />

          <Button
            size="icon"
            type="button"
            variant="ghost"
            aria-pressed={isFavorite}
            onClick={() => setIsFavorite((prev) => !prev)}
            className={`group absolute right-2.5 sm:right-3 top-2.5 sm:top-3 cursor-pointer rounded-full bg-transparent! shadow-none transition-all duration-300 ${
              isFavorite ? "bg-rose-500/20!" : "bg-rose-500/10!"
            }`}
          >
            <Heart
              className={`size-4.5 sm:size-5 transition-all duration-500 ${
                isFavorite
                  ? "fill-rose-500 text-rose-500"
                  : "text-rose-500/70 group-hover:text-rose-500 group-hover:fill-rose-500"
              }`}
            />
          </Button>

          {discountAmount && (
            <Badge className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 rounded-full bg-sky-500 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-white shadow">
              Save ${discountAmount}
            </Badge>
          )}
        </div>

        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-5 md:p-6">
          {/* Product header */}
          <div className="mb-2 flex items-start justify-between gap-2 sm:gap-3 w-full">
            <div className="space-y-1.5 sm:space-y-2 w-2/3">
              <p className="text-xs sm:text-sm md:text-base font-semibold text-foreground/50">
                {product.brand}
              </p>
              <h2 className="text-base sm:text-lg md:text-xl font-semibold leading-snug">
                {product.name}
              </h2>
            </div>

            <div className="flex flex-col items-end text-end gap-0.5 text-xs sm:text-sm md:text-base text-foreground/50 w-1/3">
              <div className="flex items-center gap-1">
                <Star className="size-4 sm:size-5 fill-yellow-500 text-yellow-500" />
                <span className="font-medium text-foreground">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs">
                ({product.reviews.toLocaleString()} reviews)
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm md:text-base text-foreground/50">
            {product.description}
          </p>

          {/* Features */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h4 className="mb-2.5 sm:mb-3 text-xs sm:text-sm md:text-base font-semibold">
                # Key features
              </h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-[10px] sm:text-xs md:text-sm text-foreground/70"
                  >
                    <Check className="size-4 sm:size-4.5 p-0.5 sm:p-1 bg-green-500/80 text-background rounded-full shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>

        {/* Price & stock */}
        <div className="p-4 sm:p-5 md:p-6 border-t border-dashed border-foreground/15 space-y-1 font-semibold tracking-tight">
          {product.discountPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                ${product.discountPrice}
              </span>
              <span className="text-[10px] sm:text-xs text-foreground/50 line-through italic">
                ${product.price}
              </span>
            </div>
          ) : (
            <span className="text-xl sm:text-2xl md:text-3xl font-bold">
              ${product.price}
            </span>
          )}

          <p
            className={`text-[10px] sm:text-xs ${
              product.inStock ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.inStock ? "In stock • Free shipping" : "Out of stock"}
          </p>
        </div>
      </Card>
    </main>
  );
}
