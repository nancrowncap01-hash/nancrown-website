import Image from "next/image";

export default function BrandLogo({
  className = "",
  preload = false,
}: {
  className?: string;
  preload?: boolean;
}) {
  return (
    <Image
      src="/images/brand/nancrown-logo-20261009.png"
      alt="NanCrown"
      width={1300}
      height={259}
      className={`block h-auto ${className}`}
      preload={preload}
      unoptimized
    />
  );
}
