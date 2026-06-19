"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function CarouselTestimonial1() {
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonials = [
    {
      name: "Manish Singh",
      role: "Product Designer",
      content:
        "Working with this component library was a true game changer for our team. The UI feels premium, animations are smooth, and everything is production-ready for real-world applications.",
      avatar: "/assets/mem1.jpeg",
    },
    {
      name: "Aarav Mehta",
      role: "Frontend Engineer",
      content:
        "The attention to detail in these components is outstanding and very noticeable. Everything works seamlessly, performance is solid, and customization is effortless even for complex layouts.",
      avatar: "/assets/mem2.jpeg",
    },
    {
      name: "Sneha Kapoor",
      role: "Founder",
      content:
        "Beautifully designed components with excellent performance and thoughtful interactions. This library helped our startup ship faster while maintaining design quality and user experience.",
      avatar: "/assets/mem5.jpeg",
    },
    {
      name: "Neha Singh",
      role: "Engineering Manager",
      content:
        "The components feel extremely polished, consistent, and thoughtfully designed. Our engineering team adopted them quickly, improving development speed and overall product reliability.",
      avatar: "/assets/mem3.jpeg",
    },
    {
      name: "Rohit Varma",
      role: "UX Researcher",
      content:
        "Accessibility and design quality are both top-notch in this component library. It helped us improve usability, visual clarity, and overall user experience across multiple products.",
      avatar: "/assets/mem4.jpeg",
    },
    {
      name: "Karan Patel",
      role: "Startup Founder",
      content:
        "Fast, reliable, and beautifully animated components that feel production-ready from day one. Exactly what a modern startup team needs to build and iterate quickly.",
      avatar: "/assets/mem6.jpeg",
    },
  ];

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePrev = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 500);
  }, [testimonials.length]);

  const handleNext = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 500);
  }, [testimonials.length]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, handleNext]);

  return (
    <main className="relative flex flex-col items-center justify-center m-auto p-6 md:p-10 max-w-2xl w-full h-full">
      <div className="bg-foreground/5 backdrop-blur-3xl border-2 rounded-lg shadow-xl p-6 max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center mb-6">
          <div
            className={`transition-all duration-1000 ${
              isAnimating ? "opacity-50 blur-[5px]" : "opacity-100 blur-0"
            }`}
          >
            <Image
              src={testimonials[index].avatar}
              alt="Vinayak Gore avatar"
              width={500}
              height={500}
              className="size-15 rounded-full object-cover mb-4 md:mb-0 md:mr-4"
            />
          </div>
          <div
            className={`text-center md:text-left transition-all duration-1000 ${
              isAnimating ? "opacity-50 blur-[5px]" : "opacity-100 blur-0"
            }`}
          >
            <h3 className="text-xl font-bold">{testimonials[index].name}</h3>
            <p className="opacity-50">{testimonials[index].role}</p>
          </div>
        </div>

        {/* Content */}
        <p
          className={`opacity-70 mb-6 transition-all duration-1000 ${
            isAnimating ? "opacity-50 blur-[5px]" : "opacity-100 blur-0"
          }`}
        >
          {testimonials[index].content}
        </p>

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
      <div className="flex justify-center mt-6">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsPlaying((prev) => !prev)}
          className="cursor-pointer rounded-full bg-foreground/5 hover:bg-primary! hover:text-white! border-foreground/15 hover:border-primary transition-all duration-500"
        >
          {isPlaying ? <Pause /> : <Play />}
        </Button>
      </div>
    </main>
  );
}
