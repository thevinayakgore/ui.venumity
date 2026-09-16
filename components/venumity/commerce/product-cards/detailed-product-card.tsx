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
    <main className="p-6 md:p-10 w-full">
      <Card className="py-0! shadow-xl rounded-4xl overflow-hidden mx-auto w-lg">
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
            className="aspect-5/3.5 object-cover w-full h-auto"
          />

          <Button
            size="icon"
            type="button"
            variant="ghost"
            aria-pressed={isFavorite}
            onClick={() => setIsFavorite((prev) => !prev)}
            className={`group absolute right-3 top-3 cursor-pointer rounded-full bg-transparent! shadow-none transition-all duration-300 ${isFavorite ? "bg-rose-500/20!" : "bg-rose-500/10!"}`}
          >
            <Heart
              className={`size-5 transition-all duration-500 ${
                isFavorite
                  ? "fill-rose-500 text-rose-500"
                  : "text-rose-500/70 group-hover:text-rose-500 group-hover:fill-rose-500"
              }`}
            />
          </Button>

          {discountAmount && (
            <Badge className="absolute left-3 top-3 rounded-full bg-sky-500 p-4 text-sm font-semibold text-white shadow">
              Save ${discountAmount}
            </Badge>
          )}
        </div>

        <CardContent className="space-y-4">
          {/* Product header */}
          <div className="mb-2 flex items-start justify-between gap-3 w-full">
            <div className="space-y-2 w-2/3">
              <p className="text-base md:text-lg font-semibold text-foreground/50">
                {product.brand}
              </p>
              <h2 className="text-lg font-semibold md:text-xl">
                {product.name}
              </h2>
            </div>
            <div className="flex flex-col items-end text-end gap-0.5 text-sm md:text-base text-foreground/50 w-1/3">
              <div className="flex items-center gap-1">
                <Star className="size-5 fill-yellow-500 text-yellow-500" />
                <span className="font-medium text-foreground">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <p className="text-xs">({product.reviews.toLocaleString()} reviews)</p>
            </div>
          </div>

          <p className="text-sm md:text-base text-foreground/50">{product.description}</p>

          {/* Features & colors */}
          <div className="space-y-4">
            <div>
              <h4 className="mb-3 text-sm md:text-base font-semibold">
                # Key features
              </h4>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-xs md:text-sm text-foreground/70"
                  >
                    <Check className="size-4.5 p-1 bg-green-500/80 text-background rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>

        {/* Price & stock */}
        <div className="p-6 border-t border-dashed border-foreground/15 space-y-1 font-semibold tracking-tight">
          {product.discountPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold md:text-3xl">
                ${product.discountPrice}
              </span>
              <span className="text-xs text-foreground/50 line-through italic">
                ${product.price}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold md:text-3xl">
              ${product.price}
            </span>
          )}
          <p
            className={`text-xs ${
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
