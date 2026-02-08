"use client";
import { motion } from "framer-motion";
import { Tag, ChevronRight, Sparkles, Gift } from "lucide-react";

export default function OfferBanner4_5() {
  const offers = [
    {
      id: 1,
      icon: Tag,
      title: "Black Friday Sale",
      description: "Up to 70% off sitewide",
      color: "from-red-600 to-orange-500",
      cta: "Shop Now",
    },
    {
      id: 2,
      icon: Sparkles,
      title: "New Arrivals",
      description: "Fresh styles just dropped",
      color: "from-blue-600 to-cyan-500",
      cta: "Explore",
    },
    {
      id: 3,
      icon: Gift,
      title: "Free Gift",
      description: "On orders over $100",
      color: "from-green-500 to-emerald-600",
      cta: "Claim Offer",
    },
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="relative overflow-hidden rounded-2xl">
        {/* Scrolling Container */}
        <motion.div
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
          className="flex"
        >
          {/* Duplicate offers for seamless scrolling */}
          {[...offers, ...offers].map((offer, index) => (
            <div
              key={`${offer.id}-${index}`}
              className={`shrink-0 w-full md:w-1/3 px-2`}
            >
              <div
                className={`bg-linear-to-r ${offer.color} rounded-xl p-6 text-white h-full`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <offer.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{offer.title}</h3>
                      <p className="text-white/80 text-sm">
                        {offer.description}
                      </p>
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center gap-2 hover:bg-white/30 transition">
                  {offer.cta}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Overlay gradients */}
        <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-white dark:from-gray-900 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-white dark:from-gray-900 to-transparent pointer-events-none" />
      </div>

      {/* Static Offer Cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`bg-linear-to-r ${offer.color} rounded-xl p-6 text-white`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <offer.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl">{offer.title}</h3>
                <p className="text-white/80">{offer.description}</p>
              </div>
            </div>

            <button className="w-full py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2">
              {offer.cta}
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
