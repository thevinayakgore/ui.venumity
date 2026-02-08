"use client";
import { motion } from "framer-motion";
import { Twitter, Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  description: string;
}

const team: TeamMember[] = [
  { name: "Alex Johnson", role: "CEO", description: "Leading our mission to transform the industry with innovative solutions." },
  { name: "Maria Garcia", role: "CTO", description: "Building the technology that powers thousands of businesses worldwide." },
  { name: "James Wilson", role: "COO", description: "Ensuring operational excellence and sustainable growth." },
];

export default function CardsTeam() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">Our Leadership</span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground">
          Driven by passion
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 w-full">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="group"
          >
            <div className="aspect-4/5 rounded-3xl bg-linear-to-br from-primary/20 to-accent/20 mb-6 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/30" />
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground dark:text-foreground mb-1">{member.name}</h3>
                <p className="text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </div>
              <div className="flex flex-col gap-2">
                <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
