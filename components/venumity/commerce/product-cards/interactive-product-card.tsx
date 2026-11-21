"use client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  Plus,
  Minus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function InteractiveProductCard() {
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [rating, setRating] = useState(4);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("orange");
  const [selectedSize, setSelectedSize] = useState("m");

  const colors = [
    {
      name: "orange",
      value: "bg-linear-to-br from-orange-500 to-red-500",
    },
    {
      name: "blue",
      value: "bg-linear-to-br from-blue-500 to-cyan-500",
    },
    {
      name: "green",
      value: "bg-linear-to-br from-emerald-500 to-green-500",
    },
    {
      name: "purple",
      value: "bg-linear-to-br from-purple-500 to-pink-500",
    },
  ];

  const sizes = ["xs", "s", "m", "l", "xl"];

  const handleAddToCart = () => {
    setIsInCart((current) => !current);
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value));
  };

  const handleRatingChange = (value: number) => {
    setRating((current) => (current === value ? 0 : value));
  };

  return (
    <div className="p-5 md:p-10 w-full">
      <Card className="group relative p-0! gap-0! z-0 bg-foreground/5! ring-5 md:ring-10 ring-foreground/10 dark:ring-foreground/15 shadow-2xl rounded-3xl md:rounded-[2rem] transition-all duration-500 m-auto overflow-hidden w-full max-w-sm sm:max-w-md md:max-w-lg">
        {/* Header with product image */}
        <CardHeader className="flex flex-col items-center justify-between p-0! overflow-hidden">
          <div className="aspect-square sm:aspect-5/4 border-b w-full h-full">
            <Image
              src="/assets/mobile.jpg"
              alt="Product Card"
              width={2000}
              height={2000}
              priority
              unoptimized
              loading="eager"
              className="object-cover object-top w-full h-full"
            />
          </div>

          <div className="absolute top-0 left-0 flex items-center justify-between py-2 sm:py-2.5 px-2.5 sm:px-3 w-full">
            <div className="flex items-center gap-2 sm:gap-3">
              <Badge className="text-[10px] sm:text-sm font-bold bg-linear-to-br from-sky-400 via-sky-500 to-sky-600 text-white border-0 px-2 sm:px-2.5 py-1 sm:py-1.5">
                Trending
              </Badge>

              <Badge className="text-[10px] sm:text-sm font-bold bg-linear-to-br from-green-400 via-green-500 to-green-600 text-white border-0 px-2 sm:px-2.5 py-1 sm:py-1.5">
                -25%
              </Badge>
            </div>

            <Button
              size="icon"
              type="button"
              aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={isLiked}
              onClick={() => setIsLiked((current) => !current)}
              className={cn(
                "size-9 sm:size-10 rounded-full",
                isLiked
                  ? "bg-rose-500/15 text-rose-500! hover:bg-rose-500/10"
                  : "bg-white! text-rose-500!",
              )}
            >
              <Heart
                className={cn("size-5 sm:size-6", isLiked && "fill-rose-500")}
              />
            </Button>
          </div>
        </CardHeader>

        {/* Product information */}
        <CardContent className="relative p-0! z-0">
          <div className="space-y-4 sm:space-y-5 md:space-y-6 p-4 sm:p-5">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
                Quantum Phone Pro Max
              </h3>

              <p className="text-xs sm:text-sm md:text-base text-foreground/50 mt-1">
                Ultra-fast wireless charging with smart technology and best
                battery life till 8hr.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge className="pl-2! pr-2.5! py-3! md:py-3.5! [&>svg]:size-3.5! text-[10px] sm:text-sm bg-foreground! text-secondary! font-semibold rounded-md!">
                <ShieldCheck className="mr-1" />
                <span className="hidden xs:inline">2 yr Warranty</span>
                <span className="xs:hidden">Warranty</span>
              </Badge>

              <Badge className="pl-2! pr-2.5! py-3! md:py-3.5! [&>svg]:size-3.5! text-[10px] sm:text-sm bg-foreground! text-secondary! font-semibold rounded-md!">
                <Truck className="mr-1" />
                <span className="hidden xs:inline">Free Delivery</span>
                <span className="xs:hidden">Delivery</span>
              </Badge>

              {/* Rating */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-semibold tracking-tight ml-auto">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isActive = star <= rating;

                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        aria-label={`Rate ${star} out of 5`}
                        aria-pressed={isActive}
                        className="cursor-pointer rounded-sm transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
                      >
                        <Star
                          className={cn(
                            "size-4 sm:size-5 transition-colors duration-200",
                            isActive
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-foreground/50",
                          )}
                        />
                      </button>
                    );
                  })}
                </div>

                <span>{rating > 0 ? `${rating}.0` : "0.0"}</span>
              </div>
            </div>

            {/* Color selection */}
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-1.5">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    aria-label={`Select ${color.name} color`}
                    aria-pressed={selectedColor === color.name}
                    className={cn(
                      "size-5 sm:size-6 rounded-full transition-all duration-300",
                      color.value,
                      selectedColor === color.name
                        ? "ring-offset-1 ring-offset-background ring-2 ring-orange-600"
                        : "",
                    )}
                  />
                ))}
              </div>

              {/* Size selection */}
              <div className="flex gap-1.5 sm:gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    aria-label={`Select size ${size.toUpperCase()}`}
                    aria-pressed={selectedSize === size}
                    className={cn(
                      "size-7 sm:size-8 text-xs sm:text-sm rounded-sm border transition-all duration-500",
                      selectedSize === size
                        ? "bg-orange-500 text-white border-orange-500"
                        : "border-foreground/30",
                    )}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional info */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs text-muted-foreground pt-1 sm:pt-2">
              <div className="flex items-center gap-1">
                <RefreshCw className="size-3" />
                <span className="hidden sm:inline">30-day return</span>
                <span className="sm:hidden">Returns</span>
              </div>

              <div className="flex items-center gap-1">
                <ShieldCheck className="size-3" />
                <span className="hidden sm:inline">Secure payment</span>
                <span className="sm:hidden">Secure</span>
              </div>

              <div className="flex items-center gap-1">
                <Truck className="size-3" />
                <span className="hidden sm:inline">Next-day delivery</span>
                <span className="sm:hidden">Delivery</span>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col p-3! gap-4 sm:gap-5 border-t border-dashed border-foreground/15">
          <div className="flex items-center justify-between px-2 sm:px-3 w-full">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-2xl sm:text-3xl tracking-tighter font-bold">
                $89.99
              </span>

              <span className="text-[10px] sm:text-sm tracking-tight text-foreground/50 line-through">
                $119.99
              </span>
            </div>

            {/* Quantity selector */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity === 1}
                aria-label="Decrease quantity"
                className="size-6 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus className="size-4" />
              </button>

              <span className="py-1 px-2 sm:px-3 bg-foreground/10 text-sm sm:text-base text-center font-semibold rounded-md min-w-9">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => handleQuantityChange(quantity + 1)}
                aria-label="Increase quantity"
                className="size-6"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          {/* Toggle add-to-cart button */}
          <Button
            type="button"
            aria-pressed={isInCart}
            onClick={handleAddToCart}
            className={cn(
              "p-5! sm:p-6! text-white! text-sm sm:text-base font-semibold! rounded-full w-full transition-all duration-300",
              isInCart
                ? "bg-green-600! hover:bg-green-700!"
                : "bg-linear-to-br from-orange-400! via-orange-500! to-orange-600! hover:from-orange-500! hover:via-orange-600! hover:to-orange-700!",
            )}
          >
            <ShoppingCart
              className={cn(
                "size-5 sm:size-6 mr-1.5",
                isInCart && "fill-current",
              )}
            />
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
