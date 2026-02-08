"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  department: string;
}

const team: TeamMember[] = [
  { name: "Anna Lee", role: "Senior Engineer", department: "Engineering" },
  { name: "Tom Brown", role: "Product Designer", department: "Design" },
  { name: "Lisa White", role: "Marketing Lead", department: "Marketing" },
  { name: "Chris Davis", role: "Sales Director", department: "Sales" },
  { name: "Emma Taylor", role: "HR Manager", department: "People" },
  { name: "Ryan Miller", role: "DevOps Engineer", department: "Engineering" },
  { name: "Sophie Clark", role: "UX Researcher", department: "Design" },
  { name: "Jake Thompson", role: "Content Writer", department: "Marketing" },
];

export default function ListTeam() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          Our talented team
        </h2>
        <p className="text-muted-foreground text-lg">The best people working on the best product</p>
      </motion.div>

      <div className="w-full max-w-3xl divide-y divide-border rounded-3xl bg-card dark:bg-card border border-border overflow-hidden">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20" />
              <div>
                <h3 className="font-medium text-foreground dark:text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-primary hidden sm:block">{member.department}</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
