"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const mainImage = images[active] ?? images[0];

  return (
    <div>
      <div className="aspect-square bg-white rounded-2xl relative overflow-hidden border border-gray-200">
        <Image
          src={mainImage}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* 固定 5 列:手机上 5 张小图也排成一排,不会最后一张单独掉到第二行 */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${alt} ${i + 1}`}
              aria-current={i === active}
              className={`aspect-square w-full relative bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                i === active
                  ? "border-amber-500"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={img}
                alt=""
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 20vw, 120px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
