"use client";
import { authorName, brandName } from "@/lib/brand";
import { Star } from "lucide-react";
import Image from "next/image";

export default function standardTestimonial() {
  return (
    <main className="flex items-center justify-center m-auto p-6 md:p-10 max-w-2xl w-full h-full">
      <section className="p-6 bg-linear-to-t from-accent/60 border-4 border-accent shadow-2xl/20 rounded-2xl hover:scale-110 transform-flat duration-500">
        <div className="flex items-center mb-4">
          <Image
            src="/vinu.jpg"
            alt={authorName}
            width={100}
            height={100}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{authorName}</h3>
            <p className="opacity-50">Author of {brandName}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`size-4 text-yellow-400 fill-yellow-400 ${i < 5 ? "opacity-100" : "opacity-30"}`}
              />
            ))}
          </div>
        </div>
        <p className="opacity-70">
          Venumity UI components are thoughtfully designed, easy to integrate,
          and helped our team ship features faster with confidence. The
          consistency across components reduced our design overhead
          significantly. It is a toolkit we now rely on for every new build.
        </p>
      </section>
    </main>
  );
}
