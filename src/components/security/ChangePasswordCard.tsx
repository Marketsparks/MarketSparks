"use client";

import {
  ShieldCheck,
} from "lucide-react";

import ChangePasswordForm from "./ChangePasswordForm";

export default function ChangePasswordCard() {
  return (
    <section
      className="
        rounded-lg
        border
        border-[var(--user-card-border)]
        bg-[var(--user-card-bg)]
        p-3
        sm:rounded-[var(--user-radius-lg)]
        sm:p-5
      "
    >
      <div
        className="
          mb-3
          flex
          items-start
          gap-2.5
          sm:mb-4
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
            bg-[var(--user-button-bg)]/10
            text-[var(--user-button-bg)]
            sm:h-9
            sm:w-9
          "
        >
          <ShieldCheck
            size={16}
            className="sm:hidden"
          />
          <ShieldCheck
            size={18}
            className="hidden sm:block"
          />
        </div>

        <div className="min-w-0">
          <h2
            className="
              text-[12px]
              font-semibold
              text-[var(--user-title)]
              sm:text-sm
            "
          >
            Change Password
          </h2>

          <p
            className="
              mt-0.5
              text-[10px]
              leading-4
              text-[var(--user-text-muted)]
              sm:mt-1
              sm:text-xs
              sm:leading-5
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