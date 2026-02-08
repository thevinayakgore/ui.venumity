"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink } from "lucide-react";
import { useState } from "react";

interface Location {
  id: number;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  position: { x: string; y: string };
}

export default function InteractiveMapContactInfo() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const locations: Location[] = [
    {
      id: 1,
      city: "New York",
      address: "350 Fifth Avenue, NY 10118",
      phone: "+1 (212) 555-0100",
      email: "ny@company.com",
      hours: "Mon-Fri 8AM-6PM",
      position: { x: "75%", y: "35%" },
    },
    {
      id: 2,
      city: "Los Angeles",
      address: "633 West 5th Street, CA 90071",
      phone: "+1 (213) 555-0200",
      email: "la@company.com",
      hours: "Mon-Fri 9AM-5PM",
      position: { x: "18%", y: "48%" },
    },
    {
      id: 3,
      city: "Chicago",
      address: "233 S Wacker Dr, IL 60606",
      phone: "+1 (312) 555-0300",
      email: "chi@company.com",
      hours: "Mon-Fri 8AM-5PM",
      position: { x: "58%", y: "32%" },
    },
    {
      id: 4,
      city: "Miami",
      address: "100 SE 2nd St, FL 33131",
      phone: "+1 (305) 555-0400",
      email: "mia@company.com",
      hours: "Mon-Fri 9AM-6PM",
      position: { x: "75%", y: "72%" },
    },
  ];

  const pulseVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.7, 0, 0.7],
    },
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 relative bg-linear-to-br from-secondary/80 to-secondary/40 dark:from-secondary/40 dark:to-secondary/20 rounded-2xl border border-border overflow-hidden min-h-[400px]"
        >
          <div className="absolute inset-0 opacity-10 dark:opacity-5">
            <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M10,25 Q15,20 20,25 T30,22 T40,28 T50,20 T60,25 T70,20 T80,30 T90,25"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <path
                d="M5,35 Q15,30 25,38 T45,32 T65,40 T85,35 T95,38"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          {locations.map((location) => (
            <motion.button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              style={{ left: location.position.x, top: location.position.y }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative">
                <motion.div
                  variants={pulseVariants}
                  animate="animate"
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-primary"
                />
                <div
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                    selectedLocation?.id === location.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card dark:bg-card text-primary border-2 border-primary"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                </div>
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs font-medium text-foreground whitespace-nowrap bg-card/80 dark:bg-card/80 px-2 py-1 rounded"
                >
                  {location.city}
                </motion.span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card dark:bg-card rounded-2xl border border-border p-6 shadow-lg"
        >
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">
            Our Locations
          </h3>

          <AnimatePresence mode="wait">
            {selectedLocation ? (
              <motion.div
                key={selectedLocation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{selectedLocation.city}</h4>
                    <p className="text-xs text-muted-foreground">Regional Office</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm text-foreground">{selectedLocation.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`tel:${selectedLocation.phone}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {selectedLocation.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`mailto:${selectedLocation.email}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {selectedLocation.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-foreground">{selectedLocation.hours}</p>
                  </div>
                </div>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full py-3 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
                >
                  Get Directions
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">
                  Select a location on the map to view details
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Quick select:</p>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <motion.button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                    selectedLocation?.id === loc.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary dark:bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {loc.city}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
