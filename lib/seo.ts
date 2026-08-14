import type { Metadata } from "next";
import { siteConfig } from "./site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  absolute?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function createMetadata({
  title,
  description,
  path = "/",
  image = "/images/hero-visual.png",
  keywords = [...siteConfig.keywords],
  noIndex = false,
  absolute = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: SeoInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const imageUrl = image.startsWith("http")
    ? image
    : new URL(image, siteConfig.url).toString();

  return {
    title: absolute ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        "en-IN": url,
        "x-default": url,
      },
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: title,
        },
      ],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime: modifiedTime || publishedTime,
            authors: [siteConfig.name],
            section: "Insights",
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    other: {
      "geo.region": "IN-HR",
      "geo.placename": siteConfig.address.locality,
      "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
      ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
    },
  };
}
