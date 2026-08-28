import Link from "next/link";

import {
  ArrowRight,
  Clock3,
} from "lucide-react";

type Activity = {
  id: string;

  action: string;

  entity: string;

  description: string | null;

  createdAt: Date;

  admin: {
    firstName: string;

    lastName: string;
  };
};

type AdminRecentActivityProps = {
  activities: Activity[];
};

export default function AdminRecentActivity({
  activities,
}: AdminRecentActivityProps) {
  return (
    <section
      className="
        rounded-[var(--admin-card-radius)]
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
        p-[var(--admin-card-padding)]
        shadow-[var(--admin-card-shadow)]
      "
    >
      <div
        className="
          mb-5
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h2
            className="
              text-base
              font-semibold
              text-[var(--admin-title)]
            "
          >
            Recent Activity
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-[var(--admin-muted)]
            "
          >
            Latest administrator actions.
          </p>
        </div>

        <Link
          href="/admin/activity"
          className="
            flex
            items-center
            gap-1
            text-xs
            font-medium
            text-[var(--admin-primary)]
            transition-opacity
            duration-[var(--admin-transition)]
            hover:opacity-80
          "
        >
          View All

          <ArrowRight size={14} />
        </Link>
      </div>

      {activities.length === 0 ? (
        <div
          className="
            rounded-[var(--admin-surface-radius)]
            border
            border-[var(--admin-surface-border)]
            bg-[var(--admin-surface-bg)]
            py-10
            text-center
          "
        >
          <div
            className="
              mx-auto
              mb-3
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[var(--admin-stat-border)]
              bg-[var(--admin-stat-bg)]
            "
          >
            <Clock3
              size={18}
              className="
                text-[var(--admin-primary)]
              "
            />
          </div>

          <p
            className="
              text-sm
              font-medium
              text-[var(--admin-title)]
            "
          >
            No recent activity.
          </p>
        </div>
      ) : (
        <div
          className="
            space-y-3
          "
        >
          {activities.map(
            (activity) => (
              <div
                key={activity.id}
                className="
                  rounded-[var(--admin-surface-radius)]
                  border
                  border-[var(--admin-surface-border)]
                  bg-[var(--admin-surface-bg)]
                  p-4
                "
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-3
                  "
                >
                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <p
                      className="
                        text-sm
                        font-semibold
                        text-[var(--admin-title)]
                      "
                    >
                      {activity.action.replaceAll(
                        "_",
                        " ",
                      )}
                    </p>

                    {activity.description && (
                      <p
                        className="
                          mt-1
                          text-xs
                          text-[var(--admin-muted)]
                        "
                      >
                        {activity.description}
                      </p>
                    )}

                    <p
                      className="
                        mt-2
                        text-[11px]
                        text-[var(--admin-muted)]
                      "
                    >
                      {activity.admin.firstName}{" "}
                      {activity.admin.lastName}
                    </p>
                  </div>

                  <time
                    className="
                      shrink-0
                      text-[11px]
                      text-[var(--admin-muted)]
                    "
                    dateTime={activity.createdAt.toISOString()}
                  >
                    {activity.createdAt.toLocaleDateString()}
                  </time>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </section>
  );
}