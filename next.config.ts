import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
  async redirects() {
    const retiredOffices = [
      "delhi-ncr",
      "mumbai",
      "bengaluru",
      "hyderabad",
      "pune",
      "chennai",
      "ahmedabad",
      "kolkata",
    ];
    return [
      {
        source: "/",
        has: [{ type: "host", value: "adshouse.in" }],
        destination: "https://www.adshouse.in/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "adshouse.in" }],
        destination: "https://www.adshouse.in/:path*",
        permanent: true,
      },
      ...retiredOffices.map((slug) => ({
        source: `/locations/${slug}`,
        destination: "/locations/rohtak",
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/google23e6444971272bf3.html",
        headers: [
          { key: "Content-Type", value: "text/html; charset=utf-8" },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
