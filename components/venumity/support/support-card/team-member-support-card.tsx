"use client";
import { motion } from "framer-motion";
import { Mail, Building, Briefcase, Star, MessageSquare, ExternalLink } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  department: string;
  email: string;
  avatar: string;
  rating: number;
  reviews: number;
  specialties: string[];
}

export default function TeamMemberSupportCard() {
  const teamMembers: TeamMember[] = [
    {
      name: "Sarah Chen",
      role: "Senior Support Lead",
      department: "Technical Support",
      email: "sarah@company.com",
      avatar: "SC",
      rating: 4.9,
      reviews: 234,
      specialties: ["Billing", "Integrations", "API"],
    },
    {
      name: "Marcus Johnson",
      role: "Support Specialist",
      department: "Customer Success",
      email: "marcus@company.com",
      avatar: "MJ",
      rating: 4.8,
      reviews: 189,
      specialties: ["Onboarding", "Training", "Best Practices"],
    },
    {
      name: "Emily Rodriguez",
      role: "Technical Expert",
      department: "Engineering Support",
      email: "emily@company.com",
      avatar: "ER",
      rating: 4.9,
      reviews: 312,
      specialties: ["Bug Reports", "Performance", "Security"],
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full grid md:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-card dark:bg-card rounded-2xl border border-border p-6 shadow-lg group"
          >
            <div className="flex items-start justify-between mb-4">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-display font-bold text-xl"
              >
                {member.avatar}
              </motion.div>
              <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/10 rounded-lg">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">{member.rating}</span>
              </div>
            </div>

            <h3 className="text-lg font-display font-semibold text-foreground">{member.name}</h3>
            <p className="text-sm text-primary font-medium mb-1">{member.role}</p>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Building className="w-3.5 h-3.5" />
              <span>{member.department}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {member.specialties.map((specialty, sIndex) => (
                <motion.span
                  key={sIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + sIndex * 0.05 }}
                  className="px-2 py-1 text-xs font-medium bg-secondary dark:bg-secondary text-foreground rounded-md"
                >
                  {specialty}
                </motion.span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                {member.reviews} reviews
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" />
                Expert
              </span>
            </div>

            <div className="flex gap-2">
              <motion.a
                href={`mailto:${member.email}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-2.5 bg-secondary dark:bg-secondary text-foreground rounded-xl"
              >
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
