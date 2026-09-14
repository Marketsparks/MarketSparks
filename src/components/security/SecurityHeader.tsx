"use client";

import {
  ShieldCheck,
} from "lucide-react";

export default function SecurityHeader() {
  return (
    <header
      className="
        rounded-lg
        border
        bg-[var(--user-card-bg)]
        p-3
        sm:rounded-[var(--user-radius-lg)]
        sm:p-5
      "
      style={{
        borderColor:
          "var(--user-card-border)",
      }}
    >
      <div
        className="
          flex
          items-start
          gap-2.5
          sm:gap-3
        "
      >
        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-[var(--user-button-bg)]
            text-[var(--user-button-text)]
            sm:h-10
            sm:w-10
            sm:rounded-xl
          "
        >
          <ShieldCheck
            size={16}
            className="sm:hidden"
          />
          <ShieldCheck
            size={20}
            className="hidden sm:block"
          />
        </div>

        <div className="min-w-0">
          <h1
            className="
              text-[15px]
              font-semibold
              text-[var(--user-text)]
              sm:text-lg
            "
          >
            Security
          </h1>

          <p
            className="
              mt-0.5
              max-w-2xl
              text-[10px]
              leading-4
              text-[var(--user-text-muted)]
              sm:mt-1
              sm:text-sm
              sm:leading-6
            "
          >
            Update your password and manage the
            devices currently signed in to your
            account.
          </p>
        </div>
      </div>
    </header>
  );
}