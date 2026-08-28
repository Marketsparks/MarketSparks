import type { Metadata } from "next";

import { ServicesPage } from "@/components/Services";

export const metadata: Metadata = {
  title: "Services | MarketSparks",

  description:
    "Discover practical digital products, affiliate marketing resources, SEO strategies, and business growth solutions designed to help entrepreneurs build, market, and scale with confidence.",

  keywords: [
    "MarketSparks services",
    "digital products",
    "affiliate marketing",
    "SEO resources",
    "business growth",
    "online business",
    "entrepreneur resources",
    "digital marketing",
  ],

  openGraph: {
    title: "Services | MarketSparks",

    description:
      "Explore MarketSparks' collection of premium digital resources, practical business education, and growth focused solutions.",

    url: "/services",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Services | MarketSparks",

    description:
      "Practical digital resources and business solutions for entrepreneurs looking to build and grow online.",
  },
};

export default function Services() {
  return <ServicesPage />;
}