"use client";
import { motion } from "framer-motion";
import { Heart, Shield, Zap, Users } from "lucide-react";

interface ValueItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    icon: Heart,
    title: "Passion",
    description: "We love what we do and it shows in every project we deliver",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Honest, transparent, and accountable in all our dealings",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "Constantly pushing boundaries to create cutting-edge solutions",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working together to achieve extraordinary results",
  },
];

export default function ValuesDrivenAbout() {
  return (
    <main className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen">
      <div className="grid lg:grid-cols-2 gap-16 items-start w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:sticky lg:top-24 space-y-6"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Our Values
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground">
            What drives us forward every day
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our core values shape everything we do. They guide our decisions,
            define our culture, and help us build lasting relationships with our
            clients.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
              Join Our Team
            </button>
            <button className="px-6 py-3 rounded-xl border border-border text-foreground dark:text-foreground hover:bg-secondary transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>

        <div className="space-y-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="group p-8 rounded-2xl bg-card dark:bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <value.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground dark:text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
