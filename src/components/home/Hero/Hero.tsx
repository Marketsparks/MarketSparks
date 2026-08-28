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

pt-[70px]
pb-[90px]

md:pt-[80px]
md:pb-[120px]

lg:pt-[95px]
lg:pb-[140px]

xl:pt-[110px]
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
      </Container>
      <HeroDecoration />
    </section>
  );
}