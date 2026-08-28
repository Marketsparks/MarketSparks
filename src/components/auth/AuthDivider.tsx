"use client";

type AuthDividerProps = {
  label?: string;

  className?: string;
};

export default function AuthDivider({
  label = "or",

  className = "",
}: AuthDividerProps) {
  return (
    <div
      className={`
        flex

        items-center

        gap-4

        ${className}
      `}
      role="separator"
      aria-label={label}
    >
      <div
        className="
          h-px

          flex-1

          bg-[var(--border)]
        "
      />

      <span
        className="
          shrink-0

          text-[12px]

          font-medium

          uppercase

          tracking-[0.08em]

          text-[var(--foreground-muted)]
        "
      >
        {label}
      </span>

      <div
        className="
          h-px

          flex-1

          bg-[var(--border)]
        "
      />
    </div>
  );
}