"use client";
import Image from "next/image";

const ITEMS = [
  {
    height: 300,
    src: "/assets/image1.jpeg",
  },
  {
    height: 320,
    src: "/assets/image2.jpeg",
  },
  {
    height: 360,
    src: "/assets/image3.jpeg",
  },
  {
    height: 360,
    src: "/assets/image4.jpeg",
  },
  {
    height: 360,
    src: "/assets/image5.jpeg",
  },
  {
    height: 320,
    src: "/assets/image6.jpeg",
  },
  {
    height: 360,
    src: "/assets/image1.jpeg",
  },
  {
    height: 300,
    src: "/assets/image2.jpeg",
  },
  {
    height: 360,
    src: "/assets/image3.jpeg",
  },
  {
    height: 300,
    src: "/assets/image4.jpeg",
  },
  {
    height: 280,
    src: "/assets/image5.jpeg",
  },
];

export default function MasonryImageGallery() {
  return (
    <main className="flex flex-col items-center justify-center m-auto w-full">
      <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5 p-6 overflow-auto w-full">
        {ITEMS.map((item, index) => (
          <div
            key={index}
            className={`relative rounded-2xl hover:shadow-lg transition-all duration-500 break-inside-avoid overflow-hidden w-full ${item.height}`}
          >
            <Image
              src={item.src}
              alt="Card Image"
              width={5000}
              height={5000}
              className="object-cover w-full h-full"
            />
            <span className="absolute top-5 left-5 px-4 py-2 bg-white/30 backdrop-blur-lg text-white text-sm font-semibold uppercase shadow-lg rounded-sm">
              Image - {index + 1}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
