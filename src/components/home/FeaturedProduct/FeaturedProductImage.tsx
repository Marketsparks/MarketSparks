import Image from "next/image";

import { FEATURED_IMAGE_RADIUS } from "./featuredProduct.constants";
import { featuredProductData } from "./featuredProduct.data";

export default function FeaturedProductImage() {
  return (
    <div
      className="
        relative
        z-20

        w-full

        max-w-[430px]

        mx-auto

        sm:max-w-[470px]

        md:max-w-[390px]

        lg:max-w-[396px]
        lg:ml-10

        xl:max-w-[396px]
        xl:ml-14

        lg:-translate-y-8
        xl:-translate-y-10
        2xl:-translate-y-12
      "
    >
      <Image
        src={featuredProductData.image.src}
        alt={featuredProductData.image.alt}
        width={396}
        height={440}
        priority
        className="
          block
          h-auto
          w-full
        "
        style={{
          borderRadius: FEATURED_IMAGE_RADIUS,
        }}
      />
    </div>
  );
}