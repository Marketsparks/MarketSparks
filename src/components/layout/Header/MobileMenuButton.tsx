"use client";

import { Menu } from "lucide-react";

type MobileMenuButtonProps = {
  onClick: () => void;
};

export default function MobileMenuButton({
  onClick,
}: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      aria-label="Open navigation menu"
      onClick={onClick}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-[var(--border)]
        bg-[var(--surface)]
        text-[var(--icon-color)]
        shadow-sm
        transition-all
        duration-200
        hover:border-[var(--primary)]
        hover:bg-[var(--muted)]
        hover:text-[var(--primary)]
        active:scale-95
        lg:hidden
      "
    >
      <Menu
        size={20}
        strokeWidth={2.4}
      />
    </button>
  );
}