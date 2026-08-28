"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import type { Notification } from "./useNotifications";

type NotificationItemProps = {
  notification: Notification;

  onRead: (
    id: string,
  ) => void;
};

export default function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  const content = (
    <div
      className={cn(
        `
          flex
          items-start
          justify-between
          gap-4
          rounded-xl
          border
          border-[var(--border)]
          p-4
          transition-colors
          hover:bg-[var(--surface)]
        `,
        !notification.isRead &&
          "border-[var(--primary)]/20 bg-[var(--primary)]/5",
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {!notification.isRead && (
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-[var(--primary)]
              "
            />
          )}

          <h4
            className="
              text-sm
              font-semibold
            "
          >
            {notification.title}
          </h4>
        </div>

        <p
          className="
            mt-2
            text-sm
            text-[var(--foreground-muted)]
          "
        >
          {notification.message}
        </p>

        <p
          className="
            mt-3
            text-xs
            text-[var(--foreground-muted)]
          "
        >
          {new Date(
            notification.createdAt,
          ).toLocaleString()}
        </p>
      </div>

      <ChevronRight
        size={18}
        className="
          mt-1
          shrink-0
          text-[var(--foreground-muted)]
        "
      />
    </div>
  );

  if (notification.link) {
    return (
      <Link
        href={notification.link}
        onClick={() =>
          onRead(notification.id)
        }
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        onRead(notification.id)
      }
      className="
        block
        w-full
        text-left
      "
    >
      {content}
    </button>
  );
}