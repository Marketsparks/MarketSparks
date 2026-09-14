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
        gap-2.5
        rounded-lg
        border
        border-[var(--user-card-border)]
        bg-[var(--user-surface)]
        p-2.5
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:gap-3
        sm:rounded-[var(--user-radius-md)]
        sm:p-3
      "
    >
      <div
        className="
          flex
          min-w-0
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
            bg-[var(--user-button-bg)]/10
            text-[var(--user-button-bg)]
            sm:h-9
            sm:w-9
          "
        >
          {isMobile ? (
            <>
              <Smartphone
                size={16}
                className="sm:hidden"
              />
              <Smartphone
                size={18}
                className="hidden sm:block"
              />
            </>
          ) : (
            <>
              <Monitor
                size={16}
                className="sm:hidden"
              />
              <Monitor
                size={18}
                className="hidden sm:block"
              />
            </>
          )}
        </div>

        <div
          className="
            min-w-0
            space-y-0.5
            sm:space-y-1
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-1.5
              sm:gap-2
            "
          >
            <p
              className="
                min-w-0
                truncate
                text-[11px]
                font-semibold
                text-[var(--user-title)]
                sm:text-sm
              "
            >
              {session.userAgent ??
                "Unknown Device"}
            </p>

            {session.current && (
              <span
                className="
                  shrink-0
                  rounded-full
                  bg-emerald-500/10
                  px-1.5
                  py-0.5
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-emerald-600
                  sm:px-2
                  sm:text-[10px]
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
              gap-x-2.5
              gap-y-0.5
              text-[9px]
              text-[var(--user-text-muted)]
              sm:gap-x-4
              sm:gap-y-1
              sm:text-xs
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-1
              "
            >
              <Globe
                size={11}
                className="sm:hidden"
              />
              <Globe
                size={13}
                className="hidden sm:block"
              />

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
              <Clock3
                size={11}
                className="sm:hidden"
              />
              <Clock3
                size={13}
                className="hidden sm:block"
              />

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
            h-8
            items-center
            justify-center
            gap-1.5
            self-start
            rounded-lg
            border
            border-[var(--user-card-border)]
            px-2.5
            text-[10px]
            font-medium
            text-[var(--user-danger)]
            transition-colors
            duration-[var(--user-transition)]
            hover:bg-[var(--user-danger)]/10
            disabled:cursor-not-allowed
            disabled:opacity-50
            sm:h-9
            sm:gap-2
            sm:self-center
            sm:px-3
            sm:text-xs
          "
        >
          <LogOut
            size={12}
            className="sm:hidden"
          />
          <LogOut
            size={14}
            className="hidden sm:block"
          />

          Revoke
        </button>
      )}
    </div>
  );
}