"use client";
import { useState } from "react";
import {
  Zap,
  ShoppingCart,
  Heart,
  Eye,
  Star,
  TrendingUp,
  Truck,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function ProductCard1() {
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("orange");
  const [selectedSize, setSelectedSize] = useState("m");

  const colors = [
    { name: "orange", value: "bg-linear-to-br from-orange-500 to-red-500" },
    { name: "blue", value: "bg-linear-to-br from-blue-500 to-cyan-500" },
    { name: "green", value: "bg-linear-to-br from-emerald-500 to-green-500" },
    { name: "purple", value: "bg-linear-to-br from-purple-500 to-pink-500" },
  ];

  const sizes = ["xs", "s", "m", "l", "xl"];

  return (
    <main className="flex items-center justify-center m-auto p-6 md:p-10 overflow-auto w-full h-full">
      <Card className="group relative p-0! gap-0! overflow-hidden bg-background border-7 shadow-xl hover:shadow-2xl rounded-4xl transition-all duration-500 w-lg m-auto">
        {/* Header with badges */}
        <CardHeader className="flex items-center justify-between pt-3! px-6! overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="size-3 rounded-full bg-green-500 animate-pulse" />
              <div className="absolute inset-0 size-3 rounded-full bg-green-500 animate-ping" />
            </div>
            <Badge className="bg-linear-to-r from-emerald-500 to-green-500 text-white border-0 px-3 py-1">
              <TrendingUp className="size-3 mr-1" />
              Trending
            </Badge>
            <Badge
              variant="outline"
              className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20"
            >
              -25%
            </Badge>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsLiked(!isLiked)}
            className={cn(
              "size-10 cursor-pointer rounded-full transition-all duration-300",
              isLiked
                ? "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
                : "hover:bg-rose-500/10 hover:text-rose-500",
            )}
          >
            <Heart className={cn("size-6", isLiked && "fill-rose-500")} />
          </Button>
        </CardHeader>

        {/* Product image/icon section */}
        <CardContent className="relative p-0!">
          <div
            className={cn(
              "flex items-center justify-center m-auto border-8 border-white shadow-xl text-white bg-linear-to-br rounded-3xl p-5 my-15 hover:rotate-6 hover:scale-110 transition-all duration-500 w-1/3",
              colors.find((c) => c.name === selectedColor)?.value,
            )}
          >
            <Zap className="drop-shadow-lg w-full h-full" />
          </div>

          {/* Product info */}
          <div className="space-y-4 p-7 border-t-2">
            <div>
              <h3 className="text-3xl font-medium">Quantum Charge Pro</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Ultra-fast wireless charging with smart technology
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="px-4 py-2 bg-accent border border-foreground/15 rounded-full"
              >
                <ShieldCheck className="size-3 mr-1" />
                2Y Warranty
              </Badge>
              <Badge
                variant="secondary"
                className="px-4 py-2 bg-accent border border-foreground/15 rounded-full"
              >
                <Truck className="size-3 mr-1" />
                Free Delivery
              </Badge>
            </div>
            {/* Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "size-4",
                        star <= 4
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200",
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">4.2</span>
                <span className="text-sm text-muted-foreground">
                  (128 reviews)
                </span>
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                <div className="flex items-center gap-1">
                  <TrendingUp className="size-3" />
                  86% recommend
                </div>
              </div>
            </div>

            {/* Color selection */}
            <div className="flex gap-2 my-6">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    "size-8 cursor-pointer rounded-full border-2 transition-all duration-300",
                    color.value,
                    selectedColor === color.name
                      ? "border-foreground scale-110 ring-2 ring-offset-2 ring-orange-500/50"
                      : "border-transparent hover:scale-105",
                  )}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>

            {/* Size selection */}
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "cursor-pointer text-sm rounded-sm border transition-all duration-500 size-10",
                    selectedSize === size
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-secondary hover:bg-secondary/80 border-border",
                  )}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </CardContent>

        <Separator />

        {/* Footer with price and actions */}
        <CardFooter className="p-6">
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$89.99</span>
                  <span className="text-lg text-muted-foreground line-through">
                    $119.99
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  + $9.99 shipping
                </p>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="size-8 cursor-pointer"
                >
                  -
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setQuantity(quantity + 1)}
                  className="size-8 cursor-pointer"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 gap-2 p-6 cursor-pointer"
                onClick={() => setIsInCart(!isInCart)}
              >
                <Eye className="size-4" />
                Quick View
              </Button>
              <Button
                className="flex-1 gap-2 p-6 cursor-pointer bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                onClick={() => setIsInCart(true)}
              >
                <ShoppingCart
                  className={cn("size-4", isInCart && "fill-current")}
                />
                {isInCart ? "Added" : "Add to Cart"}
              </Button>
            </div>

            {/* Additional info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
              <div className="flex items-center gap-1">
                <RefreshCw className="size-3" />
                30-day return
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="size-3" />
                Secure payment
              </div>
              <div className="flex items-center gap-1">
                <Truck className="size-3" />
                Next-day delivery
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
