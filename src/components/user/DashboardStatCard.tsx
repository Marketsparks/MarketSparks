import Link from "next/link";

import { LucideIcon } from "lucide-react";

type DashboardStatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  href?: string;
};

export default function DashboardStatCard({
  title,
  value,
  icon: Icon,
  href,
}: DashboardStatCardProps) {
  const className = `
    group

    relative

    flex

    h-[122px]

    items-center

    overflow-hidden

    rounded-2xl

    border

    border-[var(--dashboard-card-border)]

    bg-[var(--dashboard-card)]

    px-5

    shadow-[0_10px_30px_rgba(0,0,0,.08)]

    transition-all
    duration-300

    hover:-translate-y-[3px]

    hover:border-[color-mix(in_srgb,var(--dashboard-card-border)_70%,var(--primary)_30%)]

    hover:shadow-[0_18px_45px_rgba(91,92,240,.16)]
  `;

  const content = (
    <>
      <span
        className="
          pointer-events-none

          absolute

          right-[-24px]

          top-1/2

          h-32

          w-32

          -translate-y-1/2

          rounded-full

          bg-[var(--dashboard-card-glow)]

          opacity-70

          blur-[75px]

          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />

      <div
        className="
          relative

          flex

          h-10

          w-10

          shrink-0

          items-center

          justify-center

          rounded-full

          bg-[#5b5cf0]

          text-white
        "
      >
        <Icon
          size={20}
          strokeWidth={2.2}
          className="h-5 w-5 text-white"
        />
      </div>

      <div
        className="
          w-[calc(100%-60px)]

          pl-[15px]

          text-left
        "
      >
        <h5
          className="
            mb-[10px]

            text-[17px]

            font-semibold

            leading-none

            text-[var(--foreground)]
          "
        >
          {title}
        </h5>

        <p
          className="
            text-[14px]

            leading-none

            text-[var(--foreground-muted)]
          "
        >
          {value}
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={className}
    >
      {content}
    </div>
  );
}