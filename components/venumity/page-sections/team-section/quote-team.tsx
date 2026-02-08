"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  quote: string;
}

const team: TeamMember[] = [
  { name: "Jennifer Adams", role: "VP of Product", quote: "We're building something that will change how people work." },
  { name: "Robert Chen", role: "Engineering Lead", quote: "Every line of code is an opportunity to make someone's life easier." },
  { name: "Michelle Park", role: "Design Director", quote: "Great design is invisible. It just works." },
];

export default function QuoteTeam() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          In their own words
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 w-full">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-linear-to-br from-primary/10 to-accent/10 mb-6 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-primary/20" />
              </div>
            </div>
            <div className="absolute bottom-0 left-4 right-4 p-6 rounded-2xl bg-card dark:bg-card border border-border shadow-lg">
              <Quote className="w-6 h-6 text-primary/30 mb-2" />
              <p className="text-sm text-foreground dark:text-foreground italic mb-4">&quot;{member.quote}&ldquo;</p>
              <div>
                <div className="font-semibold text-foreground dark:text-foreground">{member.name}</div>
                <div className="text-sm text-primary">{member.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
