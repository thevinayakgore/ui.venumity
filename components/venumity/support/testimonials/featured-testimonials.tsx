"use client";
import { motion } from "framer-motion";
import { Star, Users, TrendingUp } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  logo: string;
  avatar: string;
  content: string;
  rating: number;
  stats: { label: string; value: string };
}

export default function FeaturedTestimonials() {
  const featuredTestimonial: Testimonial = {
    name: "Jennifer Adams",
    role: "VP of Customer Success",
    company: "Fortune 500 Company",
    logo: "F500",
    avatar: "JA",
    content: "Implementing this solution transformed our customer support operations. Within three months, we saw a 45% reduction in response times and a 30% increase in customer satisfaction scores. The support team's expertise and dedication made our transition seamless.",
    rating: 5,
    stats: { label: "Support tickets resolved", value: "50,000+" },
  };

  const additionalTestimonials: Testimonial[] = [
    {
      name: "Robert Kim",
      role: "Support Manager",
      company: "TechGiant",
      logo: "TG",
      avatar: "RK",
      content: "The analytics dashboard alone has saved us countless hours. We can now identify trends and proactively address issues before they escalate.",
      rating: 5,
      stats: { label: "Time saved weekly", value: "20 hours" },
    },
    {
      name: "Lisa Chen",
      role: "Operations Director",
      company: "ScaleUp Inc",
      logo: "SU",
      avatar: "LC",
      content: "Scalability was our main concern, and this platform delivered. We've grown 3x and the support infrastructure kept pace effortlessly.",
      rating: 5,
      stats: { label: "Growth supported", value: "300%" },
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-linear-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-3xl border border-border p-8 sm:p-10 shadow-xl overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-linear-to-br from-primary to-accent blur-3xl"
          />

          <div className="relative">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-display font-bold">
                    {featuredTestimonial.logo}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{featuredTestimonial.company}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < featuredTestimonial.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-xl sm:text-2xl font-display text-foreground leading-relaxed mb-8">
                  &ldquo;{featuredTestimonial.content}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" as const }}
                    className="w-14 h-14 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-lg"
                  >
                    {featuredTestimonial.avatar}
                  </motion.div>
                  <div>
                    <p className="font-display font-semibold text-foreground text-lg">
                      {featuredTestimonial.name}
                    </p>
                    <p className="text-muted-foreground">{featuredTestimonial.role}</p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:w-64 flex lg:flex-col gap-4"
              >
                <div className="flex-1 p-5 bg-card/50 dark:bg-card/50 backdrop-blur rounded-2xl border border-border">
                  <TrendingUp className="w-6 h-6 text-primary mb-2" />
                  <p className="text-3xl font-display font-bold text-foreground">
                    {featuredTestimonial.stats.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{featuredTestimonial.stats.label}</p>
                </div>
                <div className="flex-1 p-5 bg-card/50 dark:bg-card/50 backdrop-blur rounded-2xl border border-border">
                  <Users className="w-6 h-6 text-accent mb-2" />
                  <p className="text-3xl font-display font-bold text-foreground">98%</p>
                  <p className="text-sm text-muted-foreground">Satisfaction rate</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {additionalTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-card dark:bg-card rounded-2xl border border-border p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center font-semibold text-foreground">
                    {testimonial.logo}
                  </div>
                  <div className="flex gap-0.5">
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
                </div>
                <div className="text-right">
                  <p className="text-xl font-display font-bold text-primary">{testimonial.stats.value}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.stats.label}</p>
                </div>
              </div>

              <p className="text-foreground mb-4">&ldquo;{testimonial.content}&rdquo;</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-sm font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.main>
  );
}
