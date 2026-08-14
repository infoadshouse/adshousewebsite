import Image from "next/image";

export function BrandMark({
  variant = "dark",
  size = "md",
  priority = false,
}: {
  variant?: "dark" | "light";
  size?: "sm" | "md";
  priority?: boolean;
}) {
  const mark = size === "sm" ? "h-10 w-10" : "h-11 w-11";
  const title = size === "sm" ? "text-[13px]" : "text-[15px]";

  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/mark.png"
        alt=""
        width={88}
        height={88}
        className={`${mark} object-contain`}
        priority={priority}
      />
      <span className="leading-none">
        <span
          className={`block font-extrabold tracking-[0.14em] ${title} ${
            variant === "light" ? "text-white" : "text-sky-dark"
          }`}
        >
          ADS HOUSE
        </span>
        <span
          className={`mt-1 block text-[9px] font-semibold tracking-[0.22em] ${
            variant === "light" ? "text-white/65" : "text-muted"
          }`}
        >
          GROWTH. BY DESIGN.
        </span>
      </span>
    </span>
  );
}
