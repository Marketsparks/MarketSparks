import type { Metadata } from "next";

import { ContactPage } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact | MarketSparks",

  description:
    "Get in touch with MarketSparks for questions, partnerships, support, or business inquiries. We'd love to hear from you.",
};

export default function Contact() {
  return <ContactPage />;
}