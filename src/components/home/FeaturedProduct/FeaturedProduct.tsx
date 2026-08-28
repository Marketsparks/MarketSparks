import { Col, Container, Row } from "@/components/layout";

import FeaturedProductBackground from "./FeaturedProductBackground";
import FeaturedProductContent from "./FeaturedProductContent";
import FeaturedProductImage from "./FeaturedProductImage";

export default function FeaturedProduct() {
  return (
<section
  className="
    relative
    overflow-hidden

    pt-[60px]
    pb-[60px]

    md:pt-[80px]
    md:pb-[70px]

    lg:pt-[115px]
    lg:pb-[85px]

    xl:pt-[120px]
    xl:pb-[90px]
  "
  style={{
    background: "var(--featured-bg)",
  }}
>
  {/* Background Panel */}
  <FeaturedProductBackground />

  <Container className="relative z-10">
    <Row className="items-center">
      {/* Image */}
      <Col
        lg={6}
        className="
          order-2
          lg:order-1

          lg:pr-1
        "
      >
        <FeaturedProductImage />
      </Col>

      {/* Content */}
      <Col
        lg={6}
        className="
          mb-12
          lg:mb-0
          order-1
          lg:order-2

          lg:pl-1
        "
      >
        <FeaturedProductContent />
      </Col>
    </Row>
  </Container>
</section>
  );
}