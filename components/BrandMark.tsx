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
  const mark = size === "sm" ? "h-9 w-9 md:h-10 md:w-10" : "h-9 w-9 md:h-11 md:w-11";
  const title = size === "sm" ? "text-[12px] md:text-[13px]" : "text-[12px] sm:text-[14px] md:text-[15px]";

  return (
    <span className="flex min-w-0 items-center gap-2 md:gap-2.5">
      <Image
        src="/mark.png"
        alt=""
        width={88}
        height={88}
        className={`${mark} shrink-0 object-contain`}
        priority={priority}
      />
      <span className="min-w-0 leading-none">
        <span
          className={`block truncate font-extrabold tracking-[0.12em] md:tracking-[0.14em] ${title} ${
            variant === "light" ? "text-white" : "text-sky-dark"
          }`}
        >
          ADS HOUSE
        </span>
        <span
          className={`mt-1 hidden text-[8px] font-semibold tracking-[0.18em] sm:block md:text-[9px] md:tracking-[0.22em] ${
            variant === "light" ? "text-white/65" : "text-muted"
          }`}
        >
          GROWTH. BY DESIGN.
        </span>
      </span>
    </span>
  );
}
