"use client";

import Link from "next/link";

import {
  Clock3,
  Mail,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import {
  CONTACT_INTRO,
  CONTACT_METHODS,
  SOCIAL_LINKS,
} from "./contact.constants";

export default function ContactContent() {
  return (
    <section
      className="
        bg-[var(--background)]

        py-16

        transition-colors
        duration-300

        sm:py-20

        lg:py-24
      "
    >
      <div
        className="
          mx-auto

          grid

          max-w-7xl

          gap-16

          px-5

          lg:grid-cols-[420px_1fr]

          lg:gap-20

          lg:px-8
        "
      >
        {/* Left Side */}

        <div>
          <h2
            className="
              text-3xl

              font-bold

              leading-tight

              text-[var(--foreground)]

              sm:text-4xl
            "
          >
            {CONTACT_INTRO.title}
          </h2>

          <p
            className="
              mt-6

              text-base

              leading-8

              text-[var(--foreground-muted)]

              sm:text-lg
            "
          >
            {CONTACT_INTRO.description}
          </p>

<div
  className="
    mt-12

    border-t

    border-[var(--border)]

    pt-8
  "
>
  <div
    className="
      space-y-6
    "
  >
    {CONTACT_METHODS.map((item) => {
const Icon =
  item.title === "Phone"
    ? Phone
    : item.title === "Email"
      ? Mail
      : Clock3;

      return (
        <Link
          key={item.title}
          href={item.href ?? "#"}
          className="
            flex

            items-center

            gap-4

            text-[var(--foreground)]

            transition-colors
            duration-300

            hover:text-[var(--primary)]
          "
        >
          <Icon
            className="
              h-5

              w-5

              shrink-0

              text-[var(--primary)]
            "
          />

          <span
            className="
              text-lg

              font-medium
            "
          >
            {item.value}
          </span>
        </Link>
      );
    })}
  </div>

  <div
    className="
      mt-10

      border-t

      border-[var(--border)]

      pt-8
    "
  >
    <p
      className="
        text-sm

        font-semibold

        uppercase

        tracking-[0.16em]

        text-[var(--primary)]
      "
    >
      Follow Us
    </p>

    <div
      className="
        mt-5

        flex

        items-center

        gap-4
      "
    >
      {SOCIAL_LINKS.map((social) => {
        const icons = {
          Facebook: FaFacebookF,
          Instagram: FaInstagram,
          X: FaXTwitter,
          LinkedIn: FaLinkedinIn,
        };

        const Icon =
          icons[
            social.name as keyof typeof icons
          ];

        return (
          <Link
            key={social.name}
            href={social.href}
            aria-label={social.name}
            className="
              flex

              h-11

              w-11

              items-center

              justify-center

              rounded-full

              border

              border-[var(--border)]

              bg-[var(--background)]

              text-[var(--foreground)]

              transition-all
              duration-300

              hover:border-[var(--primary)]

              hover:bg-[var(--primary)]

              hover:text-[var(--background)]
            "
          >
            <Icon
              className="
                h-5

                w-5
              "
            />
          </Link>
        );
      })}
    </div>
  </div>
</div>
</div>

        {/* Right Side */}

        <form
         id="contact-form"
          className="
            rounded-3xl

            border

            border-[var(--border)]

            bg-[var(--surface)]

            p-6

            transition-colors
            duration-300

            sm:p-8

            lg:p-10
          "
        >
          <div className="space-y-6 pb-16">
            <div>
              <label
                htmlFor="fullName"
                className="
                  mb-2

                  block

                  font-medium

                  text-[var(--foreground)]
                "
              >
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                placeholder="Your Name"
                className="
                  w-full

                  rounded-xl

                  border

                  border-[var(--border)]

                  bg-[var(--background)]

                  px-5
                  py-4

                  text-[var(--foreground)]

                  outline-none

                  transition-all
                  duration-300

                  focus:border-[var(--primary)]
                "
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="
                  mb-2

                  block

                  font-medium

                  text-[var(--foreground)]
                "
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="
                  w-full

                  rounded-xl

                  border

                  border-[var(--border)]

                  bg-[var(--background)]

                  px-5
                  py-4

                  text-[var(--foreground)]

                  outline-none

                  transition-all
                  duration-300

                  focus:border-[var(--primary)]
                "
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="
                  mb-2

                  block

                  font-medium

                  text-[var(--foreground)]
                "
              >
                Subject
              </label>

              <input
                id="subject"
                type="text"
                placeholder="How can we help?"
                className="
                  w-full

                  rounded-xl

                  border

                  border-[var(--border)]

                  bg-[var(--background)]

                  px-5
                  py-4

                  text-[var(--foreground)]

                  outline-none

                  transition-all
                  duration-300

                  focus:border-[var(--primary)]
                "
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="
                  mb-2

                  block

                  font-medium

                  text-[var(--foreground)]
                "
              >
                Message
              </label>

              <textarea
                id="message"
                rows={7}
                placeholder="Tell us about your inquiry..."
                className="
                  w-full

                  resize-none

                  rounded-xl

                  border

                  border-[var(--border)]

                  bg-[var(--background)]

                  px-5
                  py-4

                  text-[var(--foreground)]

                  outline-none

                  transition-all
                  duration-300

                  focus:border-[var(--primary)]
                "
              />
            </div>

            <button
              type="submit"
              className="
                inline-flex

                w-full

                items-center
                justify-center

                rounded-xl

                bg-[var(--primary)]

                px-8
                py-4

                font-semibold

                text-[var(--button-text)]

                transition-all
                duration-300

                hover:opacity-90
              "
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}