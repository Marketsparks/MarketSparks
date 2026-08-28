"use client";

import Link from "next/link";

import { ArrowLeft, Search } from "lucide-react";

import { NOT_FOUND_HERO } from "./notFound.constants";

export default function NotFoundHero() {
  return (
    <section
      className="
        flex

        min-h-[calc(100vh-80px)]

        items-center

        bg-[var(--services-hero-bg)]

        px-5

        py-20

        transition-colors
        duration-300
      "
    >
      <div
        className="
          mx-auto

          w-full

          max-w-3xl

          text-center
        "
      >
        <p
          className="
            text-7xl

            font-black

            leading-none

            text-[var(--primary)]

            sm:text-8xl

            lg:text-9xl
          "
        >
          {NOT_FOUND_HERO.code}
        </p>

        <h1
          className="
            mt-8

            text-3xl

            font-bold

            leading-tight

            text-[var(--services-hero-title)]

            transition-colors
            duration-300

            sm:text-5xl
          "
        >
          {NOT_FOUND_HERO.title}
        </h1>

        <p
          className="
            mx-auto

            mt-6

            max-w-2xl

            text-base

            leading-8

            text-[var(--services-hero-text)]

            transition-colors
            duration-300

            sm:text-lg
          "
        >
          {NOT_FOUND_HERO.description}
        </p>

        <div
          className="
            mt-10

            flex

            flex-col

            gap-4

            sm:flex-row

            sm:justify-center
          "
        >
          <Link
            href="/"
            style={{
              backgroundColor:
                "var(--services-cta-primary-bg)",
              color:
                "var(--services-cta-primary-text)",
            }}
            className="
              inline-flex

              items-center

              justify-center

              gap-3

              rounded-xl

              px-8

              py-4

              font-semibold

              transition-all

              duration-300

              hover:opacity-90

              hover:scale-[1.02]
            "
          >
            <ArrowLeft
              className="
                h-5

                w-5
              "
            />

            {NOT_FOUND_HERO.primaryButton}
          </Link>

          <Link
            href="/shop"
            className="
              inline-flex

              items-center

              justify-center

              gap-3

              rounded-xl

              border

              border-[var(--border)]

              bg-transparent

              px-8

              py-4

              font-semibold

              text-[var(--foreground)]

              transition-all

              duration-300

              hover:border-[var(--primary)]

              hover:text-[var(--primary)]
            "
          >
            <Search
              className="
                h-5

                w-5
              "
            />

            {NOT_FOUND_HERO.secondaryButton}
          </Link>
        </div>
      </div>
    </section>
  );
}