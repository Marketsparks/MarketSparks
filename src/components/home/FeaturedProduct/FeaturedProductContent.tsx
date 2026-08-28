import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  FEATURED_BUTTON_HEIGHT,
  FEATURED_BUTTON_RADIUS,
  FEATURED_CONTENT_MAX_WIDTH,
} from "./featuredProduct.constants";
import { featuredProductData } from "./featuredProduct.data";

export default function FeaturedProductContent() {
  return (
<div
  className="
    mx-auto
    w-full

    lg:-translate-x-5
    xl:-translate-x-6
    2xl:-translate-x-8

    lg:-translate-y-4
    xl:-translate-y-5
    2xl:-translate-y-6
  "
  style={{
    maxWidth: FEATURED_CONTENT_MAX_WIDTH,
  }}
>
      {/* Subtitle */}
      <span
        className="
          mb-3
          inline-block
          text-[18px]
          font-bold
          text-[var(--featured-accent)]

          md:text-[19px]
        "
      >
        {featuredProductData.subtitle}
      </span>

{/* Title */}
<h2
  className="
    mb-4
    text-[24px]
    font-extrabold
    uppercase
    leading-[1.12]
    text-[var(--featured-title)]

    md:text-[30px]

    xl:text-[38px]
  "
>
  {featuredProductData.title}
</h2>

{/* Price */}
<p
  className="
    mb-4
    text-[26px]
    font-extrabold
    leading-none
    text-[var(--featured-accent)]

    md:text-[32px]

    xl:text-[40px]
  "
>
  {featuredProductData.price}
</p>

      {/* Description */}
      <p
        className="
          mb-8
          text-[16px]
          leading-8
          text-[var(--featured-text)]

          md:text-[17px]
        "
      >
        {featuredProductData.description}
      </p>

      {/* CTA */}
<Link
  href={featuredProductData.button.href}
className="
  inline-flex
  items-center
  justify-center
  gap-2

  px-7
  py-3

  text-[16px]
  font-bold

  transition-all
  duration-300

  hover:-translate-y-0.5
  hover:brightness-110

  active:scale-[0.98]

  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-[#5B5EF7]/30
"
style={{
  height: FEATURED_BUTTON_HEIGHT - 6,
  borderRadius: FEATURED_BUTTON_RADIUS,
  background: "var(--featured-accent)",
  color: "#FFFFFF",
}}
>
  {featuredProductData.button.label}

  <ArrowRight
    size={16}
    strokeWidth={2.2}
  />
</Link>
    </div>
  );
}