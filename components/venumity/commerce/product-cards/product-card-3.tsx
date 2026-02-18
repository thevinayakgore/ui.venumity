"use client";
import { useState } from "react";
import { Check, Heart, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

export default function ProductCard() {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const discountAmount = product.discountPrice
    ? (product.price - product.discountPrice).toFixed(2)
    : null;

  return (
    <main className="p-6 md:p-10 lg:p-20">
      <Card className="py-0! mx-auto max-w-md overflow-hidden rounded-xl border border-border/70 bg-card shadow-lg transition-shadow hover:shadow-xl">
        {/* Product Image */}
        <div className="relative">
          <Image
            src="/assets/earphone.webp"
            alt="Product Card"
            width={2000}
            height={2000}
            priority
            className="object-cover w-full h-auto"
          />

          <Button
            size="icon"
            type="button"
            variant="ghost"
            aria-pressed={isFavorite}
            onClick={() => setIsFavorite((prev) => !prev)}
            className={`group absolute right-4 top-4 cursor-pointer rounded-full bg-transparent! shadow-none transition-all duration-300 ${isFavorite ? "bg-rose-500/20!" : "bg-rose-500/10!"}`}
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
            <Badge className="absolute left-4 top-4 rounded-full bg-sky-500 px-3 py-1 text-sm font-semibold text-white shadow">
              Save ${discountAmount}
            </Badge>
          )}
        </div>

        <CardContent className="space-y-4">
          {/* Product header */}
          <div className="mb-1 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {product.brand}
              </p>
              <h2 className="text-lg font-semibold md:text-xl">
                {product.name}
              </h2>
            </div>
            <div className="flex flex-col items-end text-end gap-0.5 text-xs text-muted-foreground whitespace-nowrap">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-foreground">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <span>({product.reviews.toLocaleString()} reviews)</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{product.description}</p>

          {/* Features & colors */}
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-semibold text-foreground">
                Key features
              </h4>
              <ul className="space-y-1">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <Check className="size-4 p-1 bg-emerald-500/15 text-emerald-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold text-foreground">
                Available colors
              </h4>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="flex size-8 items-center justify-center cursor-pointer rounded-full border-2 border-border/70 ring-offset-background transition hover:ring-2 hover:ring-primary/60"
                    title={color}
                  >
                    <span
                      className="size-6 rounded-full"
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-border/70 px-6 py-4">
          {/* Price & stock */}
          <div className="space-y-1">
            {product.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold md:text-3xl">
                  ${product.discountPrice}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  ${product.price}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-semibold md:text-3xl">
                ${product.price}
              </span>
            )}
            <p
              className={`text-xs ${
                product.inStock ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {product.inStock ? "In stock • Free shipping" : "Out of stock"}
            </p>
          </div>

          {/* Quantity + CTA */}
          <div className="flex flex-col items-end gap-3">
            <div className="inline-flex items-center rounded-lg border border-border/70 bg-background text-sm">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 cursor-pointer rounded-r-none border-r border-border/70"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </Button>
              <span className="min-w-10 text-center text-sm">{quantity}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 cursor-pointer rounded-l-none border-l border-border/70"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </Button>
            </div>

            <Button
              type="button"
              disabled={!product.inStock}
              className="cursor-pointer text-sm font-semibold"
              variant={product.inStock ? "default" : "outline"}
            >
              {product.inStock ? "Add to cart" : "Out of stock"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
