"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CarouselTestimonial() {
  const [active, setActive] = useState(true);

  const testimonials = [
    {
      name: "Manish Varma",
      role: "Product Designer",
      content:
        "Working with this component library was a game changer. The UI feels premium, animations are smooth, and everything is production-ready out of the box.",
      avatar: "/mem1.jpeg",
    },
    {
      name: "Aarav Mehta",
      role: "Frontend Engineer",
      content:
        "The attention to detail in these components is outstanding. Everything just works, and customization is effortless.",
      avatar: "/mem2.jpeg",
    },
    {
      name: "Sneha Kapoor",
      role: "Founder",
      content:
        "Beautifully designed components with excellent performance. This library helped us ship faster without compromising quality.",
      avatar: "/mem5.jpeg",
    },
  ];

  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setActive(false);
    setTimeout(() => {
      setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setActive(true);
    }, 300);
  };

  const handleNext = () => {
    setActive(false);
    setTimeout(() => {
      setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setActive(true);
    }, 300);
  };

  return (
    <div
      className={`relative md:p-8 transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-0 absolute"
      }`}
    >
      <div className="bg-foreground/5 backdrop-blur-3xl border-2 rounded-lg shadow-xl p-6 max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center mb-6">
          <Image
            src={testimonials[index].avatar}
            alt="Vinayak Gore avatar"
            width={500}
            height={500}
            className="size-15 rounded-full object-cover mb-4 md:mb-0 md:mr-4"
          />
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">{testimonials[index].name}</h3>
            <p className="opacity-50">{testimonials[index].role}</p>
          </div>
        </div>

        {/* Content */}
        <p className="opacity-70 mb-6">{testimonials[index].content}</p>

        {/* Controls */}
        <div className="flex justify-between items-center">
          <Button
            size="icon"
            variant="outline"
            onClick={handlePrev}
            className="cursor-pointer rounded-full bg-foreground/5 hover:bg-primary! hover:text-white! border-foreground/15 hover:border-primary transition-all duration-500"
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </Button>

          {/* Hardcoded dots */}
          <div className="flex space-x-2">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === index ? "bg-primary" : "bg-foreground/15"
                }`}
              />
            ))}
          </div>

          <Button
            size="icon"
            variant="outline"
            onClick={handleNext}
            className="cursor-pointer rounded-full bg-foreground/5 hover:bg-primary! hover:text-white! border-foreground/15 hover:border-primary transition-all duration-500"
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
