import type { Metadata } from "next";

import { TermsPage } from "@/components/Terms";

export const metadata: Metadata = {
  title: "Terms of Service | MarketSparks",

  description:
    "Read the Terms of Service governing your use of MarketSparks, our website, digital products, and services.",
};

export default function Terms() {
  return <TermsPage />;
}