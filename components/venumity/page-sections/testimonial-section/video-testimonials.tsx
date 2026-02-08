"use client";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface VideoTestimonial {
  title: string;
  author: string;
  role: string;
  duration: string;
}

const videos: VideoTestimonial[] = [
  { title: "How we increased sales by 200%", author: "Sarah Chen", role: "Marketing Director", duration: "3:45" },
  { title: "Our journey with the platform", author: "Mike Johnson", role: "Founder & CEO", duration: "5:20" },
  { title: "Why we switched and never looked back", author: "Emily Watson", role: "Product Lead", duration: "4:10" },
];

export default function VideoTestimonials() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">Video Testimonials</span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          Hear from our customers
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 w-full">
        {videos.map((video, index) => (
          <motion.div
            key={video.author}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="aspect-video rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-foreground/80 text-background text-xs">
                {video.duration}
              </div>
            </div>
            <h3 className="font-semibold text-foreground dark:text-foreground mb-2 group-hover:text-primary transition-colors">
              {video.title}
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20" />
              <div>
                <div className="text-sm font-medium text-foreground dark:text-foreground">{video.author}</div>
                <div className="text-xs text-muted-foreground">{video.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
