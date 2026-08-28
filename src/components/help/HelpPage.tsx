"use client";

import { MessageCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div
      className="
        space-y-6
      "
    >
      <header>
        <h1
          className="
            text-2xl
            font-bold
            text-[var(--foreground)]
          "
        >
          Help Center
        </h1>

        <p
          className="
            mt-2
            max-w-2xl
            text-sm
            text-[var(--foreground-muted)]
          "
        >
          Need assistance? Our support team is available through live chat.
          Click the chat bubble in the bottom right corner of your screen to
          start a conversation. We typically respond as quickly as possible.
        </p>
      </header>

      <section
        className="
          rounded-[var(--card-radius)]
          border
          border-[var(--border)]
          bg-[var(--surface-card)]
          p-6
          shadow-[var(--shadow-sm)]
        "
      >
        <div
          className="
            flex
            items-start
            gap-4
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]
              text-[var(--primary)]
            "
          >
            <MessageCircle className="h-6 w-6" />
          </div>

          <div className="space-y-2">
            <h2
              className="
                text-lg
                font-semibold
                text-[var(--foreground)]
              "
            >
              Live Chat Support
            </h2>

            <p
              className="
                text-sm
                leading-6
                text-[var(--foreground-muted)]
              "
            >
              Our support team is ready to help with your account, orders,
              deposits, withdrawals, affiliate products, or any other questions.
              Simply open the live chat widget to begin chatting with us.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}