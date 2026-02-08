"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function StorytellingAbout() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-foreground dark:text-foreground mb-6">
            The story behind our <span className="text-gradient">mission</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <p className="text-xl text-foreground dark:text-foreground leading-relaxed">
              It all started in a small garage with a big dream. We believed that technology 
              should be accessible, beautiful, and transformative for everyone.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we&apos;re proud to have grown into a team of over 200 talented individuals, 
              serving clients across 30+ countries. But our core belief remains the same: 
              great technology should make life better.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every product we build, every solution we deliver, and every partnership we forge 
              is guided by this simple principle. We&apos;re not just building software; we&apos;re 
              creating the future.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20">
              <Quote className="w-10 h-10 text-primary mb-4" />
              <p className="text-lg text-foreground dark:text-foreground italic leading-relaxed mb-6">
                &quot;We don&apos;t just deliver projects; we build partnerships that last for decades.&ldquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20" />
                <div>
                  <div className="font-semibold text-foreground dark:text-foreground">Sarah Chen</div>
                  <div className="text-sm text-muted-foreground">CEO & Founder</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { value: "$2B+", label: "Revenue Generated for Clients" },
            { value: "200+", label: "Team Members Globally" },
            { value: "30+", label: "Countries Served" },
            { value: "98%", label: "Client Retention Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.main>
  );
}
