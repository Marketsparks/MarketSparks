import {
  Globe2,
  Headphones,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Col, Container, Row } from "@/components/layout";

import HeroContent from "./HeroContent";
import HeroMedia from "./HeroMedia";
import HeroDecoration from "./HeroDecoration";

export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden

        pt-[48px]
        pb-[32px]

        md:pt-[60px]
        md:pb-[120px]

        lg:pt-[78px]
        lg:pb-[140px]

        xl:pt-[92px]
        xl:pb-[180px]
      "
      style={{
        background: "var(--surface-hero)",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[var(--hero-overlay)]" />

      {/* Glow */}
      <div
        className="
          absolute
          left-[15%]
          top-85
          h-[440px]
          w-[440px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          opacity-80
          blur-[30px]
        "
        style={{
          background: "var(--hero-glow)",
        }}
      />

      <Container className="relative z-10">
        <Row className="items-center">
          <Col lg={6}>
            <HeroContent />
          </Col>

          <Col lg={6}>
            <HeroMedia />
          </Col>
        </Row>

        {/* Hero Features */}
        <div
          className="
            mt-10
            border-t
            border-white/10
            pt-6

            grid
            grid-cols-4

            lg:mt-16
            lg:pt-8
          "
        >
          {[
            {
              icon: Truck,
              title: "Fast & Reliable",
              subtitle: "Delivery",
            },
            {
              icon: ShieldCheck,
              title: "Secure",
              subtitle: "Payments",
            },
            {
              icon: Headphones,
              title: "24/7",
              subtitle: "Support",
            },
            {
              icon: Globe2,
              title: "Global",
              subtitle: "Marketplace",
            },
          ].map(({ icon: Icon, title, subtitle }, index) => (
            <div
              key={title}
              className={`
                flex
                flex-col
                items-center
                text-center
                px-1

                ${
                  index !== 3
                    ? "border-r border-white/10"
                    : ""
                }

                lg:px-2
                lg:border-r-0
              `}
            >
<Icon
  className="
    h-5
    w-5
    text-[color:var(--hero-badge-bg)]

    md:h-6
    md:w-6

    lg:h-9
    lg:w-9
  "
/>

<p
  className="
    mt-2
    text-[11px]
    font-semibold
    leading-tight
    tracking-tight
    text-[var(--foreground)]

    md:text-xs

    lg:mt-3
    lg:text-lg
  "
>
  {title}
</p>

<p
  className="
    mt-0.5
    text-[9px]
    leading-tight
    text-[var(--foreground-muted)]

    md:text-[10px]

    lg:mt-1
    lg:text-base
  "
>
  {subtitle}
</p>
            </div>
          ))}
        </div>
      </Container>

{/* Bottom Fade Into Next Section */}
<div
  className="
    pointer-events-none
    absolute
    bottom-0
    left-0
    right-0
    h-24
    md:h-32
    lg:h-40
    z-[1]
  "
  style={{
    background:
      "linear-gradient(to bottom, transparent 0%, #0B1435 100%)",
  }}
/>

      <HeroDecoration />
    </section>
  );
}