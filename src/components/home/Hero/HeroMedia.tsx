import Image from "next/image";

import { heroData } from "./hero.data";
import { HERO_IMAGE_MAX_WIDTH } from "./hero.constants";

export default function HeroMedia() {
  return (
    <div
      className="
        relative
        flex
        justify-start
        lg:justify-end
      "
    >
<div
  className="
    relative
    w-full

    mt-6
    sm:mt-8
    lg:mt-0
  "
  style={{
    maxWidth: `${HERO_IMAGE_MAX_WIDTH}px`,
  }}
>
        <Image
          src={heroData.image.src}
          alt={heroData.image.alt}
          width={510}
          height={580}
          priority
          className="
            h-auto
            w-full
            object-contain
            select-none
          "
        />
      </div>
    </div>
  );
}