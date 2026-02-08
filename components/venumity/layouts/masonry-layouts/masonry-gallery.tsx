"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const items = [
  {
    id: 1,
    height: 300,
    src: "/image1.jpeg",
  },
  {
    id: 2,
    height: 320,
    src: "/image2.jpeg",
  },
  {
    id: 3,
    height: 360,
    src: "/image3.jpeg",
  },
  {
    id: 4,
    height: 360,
    src: "/image4.jpeg",
  },
  {
    id: 5,
    height: 360,
    src: "/image5.jpeg",
  },
  {
    id: 6,
    height: 320,
    src: "/image6.jpeg",
  },
  {
    id: 7,
    height: 360,
    src: "/image1.jpeg",
  },
  {
    id: 8,
    height: 300,
    src: "/image2.jpeg",
  },
  {
    id: 9,
    height: 360,
    src: "/image3.jpeg",
  },
  {
    id: 10,
    height: 300,
    src: "/image4.jpeg",
  },
  {
    id: 11,
    height: 280,
    src: "/image5.jpeg",
  },
  {
    id: 12,
    height: 400,
    src: "/image6.jpeg",
  },
];

export default function MinimalMasonryLayout() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full columns-1 md:columns-2 lg:columns-3 gap-10"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="mb-10 break-inside-avoid"
            style={{ height: item.height }}
          >
            {/* Card */}
            <div className="relative rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-500 w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt="Card Image"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="absolute top-3 left-3 px-4 py-2 bg-blue-500 text-white text-sm font-medium uppercase shadow-lg rounded-sm">
                Image - {item.id}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.main>
  );
}
