"use client";

export default function NotificationSkeleton() {
  return (
    <div className="space-y-3 p-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="
            flex
            items-start
            gap-3
            rounded-xl
            p-3
          "
        >
          <div
            className="
              h-11
              w-11
              flex-shrink-0
              animate-pulse
              rounded-full
              bg-[var(--border)]
            "
          />

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div
                  className="
                    h-3
                    w-40
                    animate-pulse
                    rounded
                    bg-[var(--border)]
                  "
                />

                <div
                  className="
                    h-3
                    w-56
                    animate-pulse
                    rounded
                    bg-[var(--border)]
                  "
                />

                <div
                  className="
                    h-3
                    w-32
                    animate-pulse
                    rounded
                    bg-[var(--border)]
                  "
                />
              </div>

              <div
                className="
                  h-3
                  w-10
                  animate-pulse
                  rounded
                  bg-[var(--border)]
                "
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}