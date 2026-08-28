"use client";

import {
  Monitor,
  Smartphone,
  Globe,
  Clock3,
  LogOut,
} from "lucide-react";

import type {
  ActiveSession,
} from "./security.types";

type SessionItemProps = {
  session: ActiveSession;

  loading?: boolean;

  onRevoke: (
    sessionId: string,
  ) => void;
};

export default function SessionItem({
  session,
  loading = false,
  onRevoke,
}: SessionItemProps) {
  const isMobile =
    session.userAgent
      ?.toLowerCase()
      .includes("mobile") ?? false;

  return (
    <div
      className="
        flex
        flex-col
        gap-3
        rounded-[var(--user-radius-md)]
        border
        border-[var(--user-card-border)]
        bg-[var(--user-surface)]
        p-3
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div
        className="
          flex
          min-w-0
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
          {isMobile ? (
            <Smartphone
              size={18}
            />
          ) : (
            <Monitor
              size={18}
            />
          )}
        </div>

        <div
          className="
            min-w-0
            space-y-1
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <p
              className="
                truncate
                text-sm
                font-semibold
                text-[var(--user-title)]
              "
            >
              {session.userAgent ??
                "Unknown Device"}
            </p>

            {session.current && (
              <span
                className="
                  rounded-full
                  bg-emerald-500/10
                  px-2
                  py-0.5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-emerald-600
                "
              >
                Current
              </span>
            )}
          </div>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-4
              gap-y-1
              text-xs
              text-[var(--user-text-muted)]
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-1
              "
            >
              <Globe size={13} />

              {session.ipAddress ??
                "Unknown IP"}
            </span>

            <span
              className="
                inline-flex
                items-center
                gap-1
              "
            >
              <Clock3 size={13} />

              {new Date(
                session.lastActivityAt,
              ).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {!session.current && (
        <button
          type="button"
          disabled={loading}
          onClick={() =>
            onRevoke(session.id)
          }
          className="
            inline-flex
            h-9
            items-center
            justify-center
            gap-2
            self-start
            rounded-lg
            border
            border-[var(--user-card-border)]
            px-3
            text-xs
            font-medium
            text-[var(--user-danger)]
            transition-colors
            duration-[var(--user-transition)]
            hover:bg-[var(--user-danger)]/10
            disabled:cursor-not-allowed
            disabled:opacity-50
            sm:self-center
          "
        >
          <LogOut size={14} />

          Revoke
        </button>
      )}
    </div>
  );
}