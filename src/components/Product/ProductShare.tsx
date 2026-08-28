"use client";

import { useState } from "react";

import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

import {
  Link2,
  Check,
} from "lucide-react";

type ProductShareProps = {
  productUrl: string;
};

export default function ProductShare({
  productUrl,
}: ProductShareProps) {
  const [copied, setCopied] =
    useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(
        productUrl
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {}
  }

  const shareLinks = [
    {
      label: "Facebook",

      icon: FaFacebookF,

      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        productUrl
      )}`,
    },

    {
      label: "Twitter",

      icon: FaXTwitter,

      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        productUrl
      )}`,
    },

    {
      label: "LinkedIn",

      icon: FaLinkedinIn,

      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        productUrl
      )}`,
    },
  ];

  return (
    <div
      className="
        mt-6

        flex

        flex-wrap

        items-center

        gap-2.5
      "
    >
      <span
        className="
          mr-1

          text-[14px]

          font-semibold

          text-[var(--foreground)]
        "
      >
        Share:
      </span>

      {shareLinks.map(
        ({
          href,
          icon: Icon,
          label,
        }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="
              flex

              h-9

              w-9

              items-center

              justify-center

              rounded-lg

              border

              border-[var(--border)]

              bg-[var(--surface)]

              text-[var(--foreground-muted)]

              transition-all
              duration-300

              hover:border-[var(--primary)]

              hover:bg-[var(--primary)]/10

              hover:text-[var(--primary)]
            "
          >
            <Icon
              size={16}
            />
          </a>
        )
      )}

      <button
        type="button"
        onClick={copyLink}
        className="
          flex

          h-9

          items-center

          gap-1.5

          rounded-lg

          border

          border-[var(--border)]

          bg-[var(--surface)]

          px-3.5

          text-[13px]

          font-medium

          text-[var(--foreground)]

          transition-all
          duration-300

          hover:border-[var(--primary)]

          hover:bg-[var(--primary)]/10

          hover:text-[var(--primary)]
        "
      >
        {copied ? (
          <>
            <Check
              size={15}
              strokeWidth={2.3}
            />

            Copied
          </>
        ) : (
          <>
            <Link2
              size={15}
              strokeWidth={2.3}
            />

            Copy Link
          </>
        )}
      </button>
    </div>
  );
}