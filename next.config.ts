import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
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
    return retiredOffices.map((slug) => ({
      source: `/locations/${slug}`,
      destination: "/locations/rohtak",
      permanent: true,
    }));
  },
  async headers() {
    return [
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
