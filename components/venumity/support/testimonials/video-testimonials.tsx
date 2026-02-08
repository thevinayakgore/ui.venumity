"use client";
import { motion } from "framer-motion";
import { Star, Play, Pause } from "lucide-react";
import { useState } from "react";

interface VideoTestimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  thumbnail: string;
  duration: string;
  rating: number;
  highlight: string;
}

export default function VideoTestimonials() {
  const [playingId, setPlayingId] = useState<number | null>(null);

  const testimonials: VideoTestimonial[] = [
    {
      id: 1,
      name: "Amanda Foster",
      role: "Customer Success Lead",
      company: "GrowthCo",
      avatar: "AF",
      thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      duration: "2:45",
      rating: 5,
      highlight: "Reduced support tickets by 60%",
    },
    {
      id: 2,
      name: "Kevin Park",
      role: "Head of Support",
      company: "TechStartup",
      avatar: "KP",
      thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      duration: "3:12",
      rating: 5,
      highlight: "24/7 support availability",
    },
    {
      id: 3,
      name: "Rachel Green",
      role: "Operations Manager",
      company: "ScaleFast",
      avatar: "RG",
      thumbnail: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      duration: "2:30",
      rating: 5,
      highlight: "Seamless onboarding experience",
    },
    {
      id: 4,
      name: "Thomas Wright",
      role: "IT Director",
      company: "Enterprise Corp",
      avatar: "TW",
      thumbnail: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      duration: "4:05",
      rating: 5,
      highlight: "Enterprise-grade security",
    },
  ];

  const togglePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full grid sm:grid-cols-2 gap-10">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg group"
          >
            <motion.div
              className="relative aspect-video cursor-pointer hover:scale-105 transition-all duration-500 overflow-hidden"
              onClick={() => togglePlay(testimonial.id)}
              style={{ background: testimonial.thumbnail }}
            >
              <div className="absolute inset-0 bg-foreground/20" />

              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: playingId === testimonial.id ? 0.9 : 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-full bg-primary-foreground/90 flex items-center justify-center shadow-xl"
                >
                  {playingId === testimonial.id ? (
                    <Pause className="w-6 h-6 text-foreground" />
                  ) : (
                    <Play className="w-6 h-6 text-foreground ml-1" />
                  )}
                </motion.div>
              </motion.div>

              <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/70 backdrop-blur-md rounded text-sm text-black">
                {testimonial.duration}
              </div>

              {playingId === testimonial.id && (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 10, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-1 bg-primary"
                />
              )}
            </motion.div>

            <div className="p-4">
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < testimonial.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm font-medium text-primary mb-3"
              >
                &ldquo;{testimonial.highlight}&rdquo;
              </motion.p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-xs font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
