"use client";
import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
}

const team: TeamMember[] = [
  { name: "Kate Williams", role: "Founder" },
  { name: "John Smith", role: "Co-Founder" },
  { name: "Amy Johnson", role: "Lead Designer" },
  { name: "Mark Brown", role: "Tech Lead" },
  { name: "Sarah Davis", role: "Product Manager" },
  { name: "Peter Wilson", role: "Marketing Lead" },
];

export default function MinimalTeam() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          The team
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-full">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index }}
            className="group text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-medium text-foreground dark:text-foreground text-sm">{member.name}</h3>
            <p className="text-xs text-muted-foreground mb-3">{member.role}</p>
            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <a href="#" className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <Twitter className="w-3 h-3 text-muted-foreground" />
              </a>
              <a href="#" className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <Linkedin className="w-3 h-3 text-muted-foreground" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
