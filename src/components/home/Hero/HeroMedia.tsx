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
{/* Main Glow */}
<div
  className="
    absolute
    bottom-6
    left-1/2
    -translate-x-1/2
    h-16
    w-[54%]
    rounded-full
    blur-2xl
    -z-10
  "
  style={{
    background: "rgba(92, 102, 255, 0.95)",
  }}
/>

{/* Neon Ring */}
<div
  className="
    absolute
    bottom-3
    left-1/2
    -translate-x-1/2
    w-[92%]
    h-10
    rounded-full
    border
    border-[#6f6cff]
    opacity-90
    blur-[1px]
    -z-20
  "
/>

        <Image
          src={heroData.image.src}
          alt={heroData.image.alt}
          width={510}
          height={580}
          priority
  className="
    relative
    z-20
    drop-shadow-[0_35px_45px_rgba(0,0,0,.35)]
  "
        />
      </div>
    </div>
  );
}