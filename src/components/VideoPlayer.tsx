"use client";

import { useState } from "react";
import Image from "next/image";

interface VideoPlayerProps {
  videoId: string;
  coverImage: string;
  title: string;
}

export default function VideoPlayer({ videoId, coverImage, title }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="relative w-full h-full group cursor-pointer"
      aria-label="Play video"
    >
      <Image
        src={coverImage}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 896px"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
