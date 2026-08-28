"use client";

import {
  ShieldCheck,
} from "lucide-react";

import ChangePasswordForm from "./ChangePasswordForm";

export default function ChangePasswordCard() {
  return (
    <section
      className="
        rounded-[var(--user-radius-lg)]
        border
        border-[var(--user-card-border)]
        bg-[var(--user-card-bg)]
        p-4
        sm:p-5
      "
    >
      <div
        className="
          mb-4
          flex
          items-start
          gap-3
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-[var(--user-button-bg)]/10
            text-[var(--user-button-bg)]
          "
        >
          <ShieldCheck size={18} />
        </div>

        <div>
          <h2
            className="
              text-sm
              font-semibold
              text-[var(--user-title)]
            "
          >
            Change Password
          </h2>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-[var(--user-text-muted)]
            "
          >
            Update your password regularly to help keep your
            account secure.
          </p>
        </div>
      </div>

      <ChangePasswordForm />
    </section>
  );
}