"use client";
import { use } from "react";
import Image from "next/image";

export default function ThumbnailViewer({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);

  return (
    <Image
      src={`/api/thumbnails?name=${encodeURIComponent(name)}`}
      alt={name}
      fill
      unoptimized
      priority
      className="object-contain"
    />
  );
}
