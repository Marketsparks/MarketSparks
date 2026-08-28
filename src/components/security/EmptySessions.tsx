"use client";

import {
  MonitorOff,
} from "lucide-react";

export default function EmptySessions() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-[var(--user-radius-md)]
        border
        border-dashed
        border-[var(--user-card-border)]
        py-10
        text-center
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-[var(--user-button-bg)]/10
          text-[var(--user-button-bg)]
        "
      >
        <MonitorOff size={22} />
      </div>

      <h3
        className="
          mt-3
          text-sm
          font-semibold
          text-[var(--user-title)]
        "
      >
        No Active Sessions
      </h3>

      <p
        className="
          mt-1
          max-w-sm
          text-xs
          leading-5
          text-[var(--user-text-muted)]
        "
      >
        There are no other active sessions associated
        with this account.
      </p>
    </div>
  );
}