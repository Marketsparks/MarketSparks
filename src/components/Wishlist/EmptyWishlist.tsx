"use client";

import Link from "next/link";

import { Heart } from "lucide-react";

export default function EmptyWishlist() {
  return (
    <section
      className="
        flex

        flex-col

        items-center

        justify-center

        rounded-[var(--user-radius-md)]

        border

        border-[var(--user-card-border)]

        bg-[var(--user-card-bg)]

        px-6

        py-10

        text-center

        shadow-[var(--user-card-shadow)]
      "
    >
      <div
        className="
          flex

          h-14

          w-14

          items-center

          justify-center

          rounded-full

          bg-[var(--user-avatar-bg)]

          text-[var(--user-icon-muted)]
        "
      >
        <Heart
          size={26}
          strokeWidth={2}
        />
      </div>

      <h2
        className="
          mt-5

          text-lg

          font-semibold

          text-[var(--user-title)]
        "
      >
        Your wishlist is empty
      </h2>

      <p
        className="
          mt-2

          max-w-md

          text-sm

          leading-6

          text-[var(--user-text-muted)]
        "
      >
        Save products you love so you can
        quickly find them later and add
        them to your cart whenever you are
        ready.
      </p>

<Link
  href="/Market-Place"
  className="
    mt-6

    inline-flex

    h-10

    items-center

    justify-center

    rounded-[var(--user-radius-sm)]

    bg-[#5B5EF7]

    px-5

    text-sm

    font-semibold

    text-white

    transition-all

    duration-[var(--user-transition)]

    hover:bg-[#4847D4]
  "
>
  Browse Products
</Link>
    </section>
  );
}