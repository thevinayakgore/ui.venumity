"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Twitter, Github, Linkedin } from "lucide-react";

const contactInfo = [
  { icon: MapPin, text: "123 Business Avenue, Tech City, TC 12345" },
  { icon: Phone, text: "+1 (555) 123-4567" },
  { icon: Mail, text: "hello@company.com" },
  { icon: Clock, text: "Mon - Fri: 9am - 6pm" },
];

const socials = [
  { icon: Twitter, label: "Twitter" },
  { icon: Github, label: "GitHub" },
  { icon: Linkedin, label: "LinkedIn" },
];

export default function ContactFooter() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <footer className="w-full pt-16 pb-8 border-t border-border">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="text-2xl font-bold font-display text-foreground dark:text-foreground mb-6">
              Logo
            </div>
            <p className="text-muted-foreground mb-6">
              We create digital experiences that help businesses grow. 
              Let&apos;s build something amazing together.
            </p>
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="p-3 rounded-xl bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-semibold text-foreground dark:text-foreground mb-6">Contact Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info) => (
                <div key={info.text} className="flex items-start gap-3 p-4 rounded-xl bg-secondary">
                  <info.icon className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-sm text-muted-foreground">{info.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Company. All rights reserved.
          </p>
          <nav className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a key={link} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </motion.main>
  );
}
