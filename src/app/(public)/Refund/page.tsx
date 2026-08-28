import type { Metadata } from "next";

import { RefundPolicyPage } from "@/components/RefundPolicy";

export const metadata: Metadata = {
  title: "Refund Policy | MarketSparks",

  description:
    "Read the MarketSparks Refund Policy to understand our refund eligibility, digital product policy, and how approved refunds are processed.",
};

export default function RefundPolicy() {
  return <RefundPolicyPage />;
}