"use client";

import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import { useCartContext } from "@/context/CartContext";

import {
  cn,
} from "@/lib/utils";

import UserContainer from "./DashboardContainer";

import SearchBar from "../user/SearchBar";

import {
  Search,
  X,
} from "lucide-react";

type TopBarProps = {
  left?: ReactNode;

  center?: ReactNode;

  right?: ReactNode;

  className?: string;
};

export default function TopBar({
  left,
  center,
  right,
  className,
}: TopBarProps) {
  const {
    cartOpen,
  } = useCartContext();

  const [
    mobileSearchOpen,
    setMobileSearchOpen,
  ] = useState(false);

  useEffect(() => {
    if (!mobileSearchOpen) {
      document.body.style.overflow = "";

      return;
    }

    document.body.style.overflow =
      "hidden";

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape"
      ) {
        setMobileSearchOpen(
          false,
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    mobileSearchOpen,
  ]);

  return (
    <>
      <header
        className={cn(
          `
            sticky
            top-0
            z-40
            border-b
            border-[var(--border)]
            bg-[color-mix(in_srgb,var(--background)_92%,transparent)]
            backdrop-blur-xl
            transition-all
            duration-300
          `,
          cartOpen &&
            "pointer-events-none -translate-y-full opacity-0",
          className,
        )}
      >
        <UserContainer>
          <div
            className="
              flex
              h-[72px]
              items-center
              gap-4
            "
          >
            {/* Left */}

            <div
              className="
                flex
                min-w-0
                flex-1
                items-center
              "
            >
              {left}
            </div>

            {/* Center */}

            {center && (
              <>
                {/* Mobile */}

                <button
                  type="button"
                  aria-label="Search products"
                  aria-expanded={
                    mobileSearchOpen
                  }
                  onClick={() =>
                    setMobileSearchOpen(
                      true,
                    )
                  }
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    text-[var(--foreground-muted)]
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-[var(--primary)]
                    hover:text-[var(--primary)]
                    hover:shadow-md
                    active:scale-95
                    lg:hidden
                  "
                >
                  <Search
                    size={18}
                    strokeWidth={2.2}
                  />
                </button>

                {/* Desktop */}

                <div
                  className="
                    hidden
                    flex-1
                    justify-center
                    lg:flex
                  "
                >
                  <div
                    className="
                      hidden
                      flex-1
                      justify-end
                      pr-4
                      lg:flex
                      xl:pr-6
                    "
                  >
                    <div
                      className="
                        w-[240px]
                      "
                    >
                      {center}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Right */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-3
              "
            >
              {right}
            </div>
          </div>
        </UserContainer>
      </header>

      {/* Mobile Search Overlay */}

      {mobileSearchOpen && (
        <div
          className="
            fixed
            inset-x-0
            top-0
            z-[80]
            lg:hidden
          "
        >
          <div
            className="
              border-b
              border-[var(--border)]
              bg-[color-mix(in_srgb,var(--background)_96%,transparent)]
              px-4
              py-3
              shadow-[0_12px_30px_rgba(0,0,0,0.12)]
              backdrop-blur-xl
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <div
                className="
                  min-w-0
                  flex-1
                "
              >
                <SearchBar
                  placeholder="Search products..."
                  className="
                    h-11
                  "
                />
              </div>

              <button
                type="button"
                aria-label="Close search"
                onClick={() =>
                  setMobileSearchOpen(
                    false,
                  )
                }
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  text-[var(--foreground-muted)]
                  transition-colors
                  duration-200
                  hover:border-[var(--primary)]
                  hover:text-[var(--primary)]
                "
              >
                <X
                  size={18}
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}