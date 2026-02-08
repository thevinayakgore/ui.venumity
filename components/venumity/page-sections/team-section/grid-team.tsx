"use client";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Github } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

const team: TeamMember[] = [
  { name: "Sarah Chen", role: "CEO & Founder", bio: "Visionary leader with 15+ years in tech" },
  { name: "Michael Park", role: "CTO", bio: "Former Google engineer, AI specialist" },
  { name: "Emily Watson", role: "Head of Design", bio: "Award-winning designer and UX expert" },
  { name: "David Kim", role: "VP of Engineering", bio: "Scaled teams at multiple unicorns" },
];

export default function GridTeam() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          Meet our team
        </h2>
        <p className="text-muted-foreground text-lg">The people behind the product</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="group p-6 rounded-2xl bg-card dark:bg-card border border-border hover:border-primary/50 transition-colors text-center"
          >
            <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4" />
            <h3 className="font-semibold text-foreground dark:text-foreground mb-1">{member.name}</h3>
            <p className="text-sm text-primary mb-3">{member.role}</p>
            <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
            <div className="flex items-center justify-center gap-3">
              <a href="#" className="p-2 rounded-lg hover:bg-secondary transition-colors"><Twitter className="w-4 h-4 text-muted-foreground" /></a>
              <a href="#" className="p-2 rounded-lg hover:bg-secondary transition-colors"><Linkedin className="w-4 h-4 text-muted-foreground" /></a>
              <a href="#" className="p-2 rounded-lg hover:bg-secondary transition-colors"><Github className="w-4 h-4 text-muted-foreground" /></a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
