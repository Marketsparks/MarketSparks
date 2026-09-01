"use client";

import {
  ReactNode,
  useState,
} from "react";

import {
  Search,
} from "lucide-react";

import Logo from "@/components/layout/Header/Logo";
import PublicTopBar from "@/components/layout/Header/TopBar";

import BottomDock from "./BottomDock";
import MoreMenu from "./MoreMenu";
import TopBar from "./TopBar";
import DashboardContent from "./DashboardContent";
import DashboardFooter from "./DashboardFooter";

import NotificationDropdown from "../user/NotificationDropdown";
import UserChip from "../user/UserChip";

import {
  getCloudinaryImageUrl,
} from "@/lib/cloudinary";

import {
  CartDrawer,
} from "@/components/Cart";

import {
  useCartContext,
} from "@/context/CartContext";

import {
  useSearchContext,
} from "@/context/AppSearchContext";

type DashboardUser = {
  firstName: string;
  lastName: string;
  email: string;
  avatarKey: string | null;
};

type DashboardLayoutProps = {
  children: ReactNode;

  environment:
    | "user"
    | "admin";

  user?: DashboardUser;

  topBarCenter?: ReactNode;

  topBarRight?: ReactNode;
};

export default function DashboardLayout({
  children,
  environment,
  user,
  topBarCenter,
  topBarRight,
}: DashboardLayoutProps) {
  const [
    avatarKey,
    setAvatarKey,
  ] = useState(
    user?.avatarKey ?? null,
  );

  const {
    cartOpen,
    closeCart,
  } = useCartContext();

  const {
    openSearch,
  } =
    useSearchContext();

  return (
    <div
      className="
        flex
        min-h-screen
        flex-col
        bg-[var(--background)]
        text-[var(--foreground)]
        transition-colors
        duration-300
      "
    >
      <PublicTopBar />

      <TopBar
        left={
          <Logo />
        }
        center={
          topBarCenter ?? (
<button
  type="button"
  onClick={openSearch}
  className="
    group
    flex
    h-11
    w-full
    max-w-[360px]
    items-center
    gap-3
    rounded-xl
    border
    border-[var(--border)]
    bg-[var(--surface)]
    px-4
    text-sm
    text-[var(--foreground-muted)]
    transition-all
    duration-200
    hover:border-[var(--primary)]
    hover:bg-[var(--muted)]
    hover:text-[var(--primary)]
  "
>
  <Search
    size={18}
    className="
      transition-colors
      duration-200
      group-hover:text-[var(--primary)]
    "
  />

  <span>Search products...</span>
</button>
          )
        }
        right={
          topBarRight ?? (
            <>
              <NotificationDropdown />

              <UserChip
                image={getCloudinaryImageUrl(
                  avatarKey,
                  "c_fill,w_160,h_160,f_auto,q_auto",
                )}
                firstName={
                  user?.firstName
                }
                lastName={
                  user?.lastName
                }
              />
            </>
          )
        }
      />

      <DashboardContent
        className="
          flex-1
        "
      >
        {children}
      </DashboardContent>

      <DashboardFooter />

      <BottomDock
        environment={
          environment
        }
        moreButton={
          <MoreMenu
            user={{
              ...user!,
              avatarKey,
            }}
            environment={
              environment
            }
            onAvatarChanged={
              setAvatarKey
            }
          />
        }
      />

      {environment ===
        "user" && (
        <CartDrawer
          open={
            cartOpen
          }
          onClose={
            closeCart
          }
          environment="user"
        />
      )}
    </div>
  );
}