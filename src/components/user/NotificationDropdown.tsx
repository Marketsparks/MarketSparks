"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ScrollArea } from "@/components/ui/scroll-area";

import NotificationBell from "./NotificationBell";
import NotificationItem from "./NotificationItem";
import useNotifications from "./useNotifications";

export default function NotificationDropdown() {
  const {
    open,
    toggle,
    loading,
    unreadCount,
    notifications,
    markRead,
    markAllRead,
  } = useNotifications();

  return (
    <DropdownMenu
      open={open}
      onOpenChange={toggle}
    >
<DropdownMenuTrigger>
  <NotificationBell
    unreadCount={unreadCount}
    renderAs="div"
  />
</DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          w-[380px]
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--background)]
          p-0
          shadow-xl
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[var(--border)]
            p-4
          "
        >
          <h3
            className="
              text-base
              font-semibold
            "
          >
            Notifications
          </h3>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllRead}
              className="
                text-sm
                font-medium
                text-[var(--primary)]
                hover:underline
              "
            >
              Mark all as read
            </button>
          )}
        </div>

        <ScrollArea className="max-h-[420px]">
          {loading ? (
            <div className="p-6 text-center text-sm text-[var(--foreground-muted)]">
              Loading...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-[var(--foreground-muted)]">
              No notifications yet.
            </div>
          ) : (
            <div className="space-y-3 p-3">
              {notifications.map(
                (notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={
                      notification
                    }
                    onRead={markRead}
                  />
                ),
              )}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}