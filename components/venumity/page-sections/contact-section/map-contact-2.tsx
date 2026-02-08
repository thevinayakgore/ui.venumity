"use client";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";

interface Location {
  city: string;
  address: string;
  phone: string;
  hours: string;
}

const locations: Location[] = [
  { city: "New York", address: "123 Broadway, NY 10001", phone: "+1 (212) 555-0100", hours: "Mon-Fri 9am-6pm" },
  { city: "London", address: "456 Oxford Street, W1D 1BS", phone: "+44 20 7123 4567", hours: "Mon-Fri 9am-5pm" },
  { city: "Tokyo", address: "789 Shibuya, 150-0002", phone: "+81 3-1234-5678", hours: "Mon-Fri 10am-7pm" },
];

export default function MapContact() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-8"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground dark:text-foreground mb-4">
          Visit our offices
        </h2>
        <p className="text-muted-foreground text-lg">
          Find us in major cities around the world
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full h-64 lg:h-80 rounded-3xl overflow-hidden bg-secondary mb-8"
      >
        <div className="w-full h-full bg-linear-to-br from-primary/5 to-accent/5 flex items-center justify-center">
          <MapPin className="w-16 h-16 text-primary/30" />
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {locations.map((location, index) => (
          <motion.div
            key={location.city}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="p-6 rounded-2xl bg-card dark:bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <h3 className="text-xl font-semibold text-foreground dark:text-foreground mb-4">{location.city}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">{location.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{location.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{location.hours}</span>
              </div>
            </div>
            <button className="mt-4 text-primary text-sm font-medium hover:underline">
              Get directions →
            </button>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
