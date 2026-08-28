"use client";

import { useRouter } from "next/navigation";

import ThemeToggle from "@/components/ui/ThemeToggle";

import { X } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";

import Logo from "./Logo";
import NavLinks from "./NavLinks";

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileDrawer({
  isOpen,
  onClose,
}: MobileDrawerProps) {
  const router = useRouter();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[85%] max-w-sm flex-col bg-[var(--background)] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pl-4 pr-5 pt-6 pb-4">
          <Logo className="-ml-1" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-2 transition-colors hover:bg-[var(--muted)]"
          >
            <X size={22} />
          </button>
        </div>

{/* Search */}
<div className="border-b border-[var(--border)] px-5 py-4">
  <SearchBar />
</div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <NavLinks
            orientation="vertical"
            onNavigate={onClose}
          />

          {/* Authentication */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                onClose();
                router.push("/Auth");
              }}
              className="
                flex
                h-11
                w-full
                items-center
                justify-center

                rounded-xl

                bg-[#5B5EF7]

                text-sm
                font-semibold
                text-white

                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:brightness-110

                active:scale-[0.98]
              "
            >
              Register / Login
            </button>
          </div>
        </nav>

        {/* Appearance */}
        <div className="border-t border-[var(--border)] px-5 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[15px] font-medium">
                Appearance
              </p>

              <p className="mt-1 text-xs text-[var(--foreground-muted)]">
                Switch between light and dark mode
              </p>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
}