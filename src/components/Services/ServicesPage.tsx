"use client";

import CTA from "./CTA";
import HowWeHelp from "./HowWeHelp";
import ServicesHero from "./ServicesHero";
import WhatWeDo from "./WhatWeDo";
import WhyChooseMarketSparks from "./WhyChooseMarketSparks";

export default function ServicesPage() {
  return (
    <main
      className="
        overflow-x-hidden

        bg-[var(--background)]
      "
    >
      <ServicesHero />

      <WhatWeDo />

      <HowWeHelp />

      <WhyChooseMarketSparks />

      <CTA />
    </main>
  );
}