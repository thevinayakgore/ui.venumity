"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Star, TrendingUp, Users, ThumbsUp, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  category: string;
}

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded, value]);

  return (
    <span>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
}

export default function MasonryTestimonials() {
  const stats: Stat[] = [
    { icon: <Users className="w-5 h-5" />, value: 50000, suffix: "+", label: "Happy Customers" },
    { icon: <ThumbsUp className="w-5 h-5" />, value: 98, suffix: "%", label: "Satisfaction Rate" },
    { icon: <Clock className="w-5 h-5" />, value: 15, suffix: "min", label: "Avg Response Time" },
    { icon: <TrendingUp className="w-5 h-5" />, value: 99, suffix: "%", label: "Issues Resolved" },
  ];

  const testimonials: Testimonial[] = [
    { id: 1, name: "Sophie Turner", role: "CEO", avatar: "ST", content: "Game-changing support experience. The team's responsiveness is unmatched.", rating: 5, category: "Enterprise" },
    { id: 2, name: "Marcus Lee", role: "Developer", avatar: "ML", content: "Technical support that actually understands code. They helped debug a complex integration issue in record time. Documentation is thorough and examples are practical.", rating: 5, category: "Technical" },
    { id: 3, name: "Anna White", role: "Product Lead", avatar: "AW", content: "Incredible onboarding experience!", rating: 5, category: "Onboarding" },
    { id: 4, name: "James Carter", role: "Support Lead", avatar: "JC", content: "We switched from three different tools to this platform. The consolidation alone saved us hours weekly. But the real value is in the quality of support we can now provide to our own customers.", rating: 5, category: "Support" },
    { id: 5, name: "Emma Davis", role: "Startup Founder", avatar: "ED", content: "Perfect for growing teams. Scales with you seamlessly.", rating: 5, category: "Startup" },
    { id: 6, name: "Ryan Kim", role: "CTO", avatar: "RK", content: "Security-first approach gave us confidence to deploy enterprise-wide. SOC 2 compliance and dedicated support made the decision easy.", rating: 5, category: "Security" },
    { id: 7, name: "Lisa Brown", role: "Customer Success", avatar: "LB", content: "The analytics dashboard is a goldmine. We've identified and fixed bottlenecks we didn't even know existed.", rating: 5, category: "Analytics" },
    { id: 8, name: "David Park", role: "Operations", avatar: "DP", content: "24/7 availability is crucial for our global team.", rating: 5, category: "Global" },
  ];

  const leftColumn = testimonials.filter((_, i) => i % 3 === 0);
  const middleColumn = testimonials.filter((_, i) => i % 3 === 1);
  const rightColumn = testimonials.filter((_, i) => i % 3 === 2);

  const renderTestimonial = (testimonial: Testimonial, index: number, columnIndex: number) => (
    <motion.div
      key={testimonial.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index + 0.05 * columnIndex }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="bg-card dark:bg-card rounded-xl border border-border p-5 shadow-md mb-4"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
          {testimonial.category}
        </span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-foreground text-sm leading-relaxed mb-4">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-xs font-semibold">
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card dark:bg-card rounded-xl border border-border p-4 text-center shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
              {stat.icon}
            </div>
            <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-4">
          {leftColumn.map((t, i) => renderTestimonial(t, i, 0))}
        </div>
        <div className="space-y-4">
          {middleColumn.map((t, i) => renderTestimonial(t, i, 1))}
        </div>
        <div className="space-y-4 hidden lg:block">
          {rightColumn.map((t, i) => renderTestimonial(t, i, 2))}
        </div>
      </div>
    </motion.main>
  );
}
