"use client";

import {
  ShieldCheck,
} from "lucide-react";

export default function SecurityHeader() {
  return (
    <header
      className="
        rounded-[var(--user-radius-lg)]
        border
        bg-[var(--user-card-bg)]
        p-5
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
          gap-3
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[var(--user-button-bg)]
            text-[var(--user-button-text)]
          "
        >
          <ShieldCheck size={20} />
        </div>

        <div className="min-w-0">
          <h1
            className="
              text-lg
              font-semibold
              text-[var(--user-text)]
            "
          >
            Security
          </h1>

          <p
            className="
              mt-1
              max-w-2xl
              text-sm
              leading-6
              text-[var(--user-text-muted)]
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