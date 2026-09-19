import Image from "next/image";
import { isVideoUrl } from "@/lib/media";

export function MediaCover({
  src,
  alt,
  className = "object-cover",
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (isVideoUrl(src)) {
    return (
      <video
        src={src}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        muted
        loop
        playsInline
        autoPlay
        aria-label={alt}
      />
    );
  }

  return <Image src={src} alt={alt} fill className={className} sizes={sizes} priority={priority} />;
}
