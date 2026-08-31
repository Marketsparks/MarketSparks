"use client";

import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Camera,
  ChevronDown,
  CircleHelp,
  Coins,
  CreditCard,
  Loader2,
  LogOut,
  MapPin,
  Package,
  Shield,
  ShieldCheck,
  BadgeCheck,
  User,
  Wallet,
  Package2,
  FolderTree,
} from "lucide-react";

import ThemeToggle from "@/components/ui/ThemeToggle";

import { toast } from "sonner";

import { uploadAvatar } from "@/components/profile/profile.service";

import {
  getCloudinaryImageUrl,
} from "@/lib/cloudinary";

import {
  useCurrentSubscription,
} from "@/hooks/useCurrentSubscription";

type MenuItem = {
  href: string;

  label: string;

  icon: React.ElementType;
};

type MoreMenuProps = {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    avatarKey: string |null;
  };

  environment: "user" | "admin";

  onAvatarChanged?: (
    avatarKey: string,
  ) => void;
};

const administrationItems = {
  user: [
    {
      href: "/Profile",
      label: "Profile",
      icon: User,
    },
    {
      href: "/addresses",
      label: "Manage Addresses",
      icon: MapPin,
    },
  ],

  admin: [
  {
    href: "/admin/users",
    label: "User Management",
    icon: User,
  },
]
};

const financeItems = {
  user: [
    {
      href: "/Deposit",
      label: "Deposit",
      icon: ArrowDownLeft,
    },
    {
      href: "/Withdraw",
      label: "Withdraw",
      icon: ArrowUpRight,
    },
    {
      href: "/orders",
      label: "Orders",
      icon: Package,
    },
  ],

  admin: [
    {
      href: "/admin/deposit-methods",
      label: "Deposit Methods",
      icon: ArrowDownLeft,
    },
    {
      href: "/admin/deposits",
      label: "Manage Deposits",
      icon: CreditCard,
    },
    {
      href: "/admin/wallet",
      label: "Credit / Debit",
      icon: Coins,
    },
    {
      href: "/admin/withdrawal-methods",
      label: "Withdrawal Methods",
      icon: ArrowUpRight,
    },
    {
      href: "/admin/withdrawals",
      label: "Manage Withdrawals",
      icon: Wallet,
    },
  ],
};

const marketplaceItems = {
  admin: [
    {
      href: "/admin/orders",
      label: "Orders",
      icon: Package,
    },
    {
      href: "/admin/products",
      label: "Products",
      icon: Package2,
    },
    {
      href: "/admin/affiliate",
      label: "Affiliate Products",
      icon: Coins,
    },
    {
      href: "/admin/affiliate/test-buyers",
      label: "Affiliate Buyers",
      icon: User,
    },
    {
      href: "/admin/categories",
      label: "Categories",
      icon: FolderTree,
    },
  ],
};

const operationsItems = {
  admin: [] as MenuItem[],
};

export default function MoreMenu({
  user,
  environment,
  onAvatarChanged,
}: MoreMenuProps) {

  console.log("MoreMenu user:", user);
  
  const router = useRouter();

const {
  subscription,
  loading:
    subscriptionLoading,
} =
  useCurrentSubscription();

const hasActiveSubscription =
  Boolean(
    subscription &&
      subscription.status ===
        "ACTIVE",
  );

  const [open, setOpen] =
    useState(false);

  const [loggingOut, setLoggingOut] =
    useState(false);

const [uploadingAvatar, setUploadingAvatar] =
  useState(false);

const [
  expanded,
  setExpanded,
] = useState<
  | "account"
  | "business"
  | "administration"
  | "finance"
  | "marketplace"
  | "operations"
  | null
>(null);

  const [avatarKey, setAvatarKey] =
  useState(user?.avatarKey ?? null);

const avatarUrl =
  getCloudinaryImageUrl(
    avatarKey,
    "c_fill,w_320,h_320,f_auto,q_auto",
  );

const fullName = user
  ? `${user.firstName} ${user.lastName}`
  : "Administrator";

  const ref =
    useRef<HTMLDivElement>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

function closeMenu() {
  setOpen(false);
  setExpanded(null);
}

async function handleAvatarChange(
  event: React.ChangeEvent<HTMLInputElement>,
) {
  const file =
    event.target.files?.[0];

  if (!file) {
    return;
  }

try {
  setUploadingAvatar(true);

  const result =
    await uploadAvatar(file);

  setAvatarKey(
    result.avatarKey,
  );

  onAvatarChanged?.(
    result.avatarKey,
  );

  toast.success(
    "Avatar updated successfully.",
  );
} catch (error) {
  console.error(error);

  toast.error(
    error instanceof Error
      ? error.message
      : "Unable to upload avatar.",
  );
} finally {
  setUploadingAvatar(false);

  event.target.value = "";
}
}

async function handleLogout() {
  if (loggingOut) {
    return;
  }

  try {
    setLoggingOut(true);

    const response = await fetch(
      "/api/auth/logout",
      {
        method: "POST",
      },
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error ??
          "Unable to sign out",
      );
    }

    closeMenu();

    router.replace("/");
    router.refresh();
  } catch (error) {
    console.error(
      "Logout request failed:",
      error,
    );

    setLoggingOut(false);
  }
}

  useEffect(() => {
    function handleClick(
      event: MouseEvent
    ) {
if (
  ref.current &&
  !ref.current.contains(
    event.target as Node
  )
) {
  closeMenu();
}
    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

function MenuLink({
  href,
  label,
  icon: Icon,
}: MenuItem) {
  return (
    <Link
      href={href}
      onClick={closeMenu}
      className="
        flex

        items-center

        gap-2.5

        rounded-2xl

        px-2.5

        py-1.5

        text-[12px]

        sm:px-3

        sm:py-2

        sm:text-[13px]

        text-[var(--profile-menu-text)]

        transition-colors

        duration-300

        hover:bg-[var(--profile-menu-hover)]
      "
    >
<Icon
  size={14}
  className="sm:h-4 sm:w-4"
/>

      <span>{label}</span>
    </Link>
  );
}

function Accordion({
  title,
  open,
  setOpen,
  items,
}: {
  title: string;
  open: boolean;
  setOpen: () => void;
  items: MenuItem[];
}) {
  return (
    <motion.div
      layout
      transition={{
        layout: {
          type: "spring",
          stiffness: 110,
          damping: 22,
          mass: 0.9,
        },
      }}
      className="mb-2"
    >
      <button
        type="button"
        onClick={setOpen}
        className="
          flex
          w-full
          items-center
          justify-between
          rounded-2xl
          px-2.5
          py-2

          sm:px-3
          sm:py-2.5

          transition-colors
          duration-300
          hover:bg-[var(--profile-menu-hover)]
        "
      >
        <span
          className="
            text-[12px]

            sm:text-[13px]

            font-semibold
          "
        >
          {title}
        </span>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 18,
          }}
        >
<ChevronDown
  size={16}
  className="sm:h-[18px] sm:w-[18px]"
/>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            layout
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              layout: {
                type: "spring",
                stiffness: 110,
                damping: 22,
                mass: 0.9,
              },
              height: {
                type: "spring",
                stiffness: 110,
                damping: 22,
                mass: 0.9,
              },
              opacity: {
                duration: 0.2,
              },
            }}
            className="overflow-hidden"
          >
            <div
              className="
                space-y-1
                pb-2
                pl-2
              "
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{
                    opacity: 0,
                    y: -4,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -4,
                  }}
                  transition={{
                    delay: index * 0.04,
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <MenuLink {...item} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

  return (
    <div
      ref={ref}
      className="
        relative
      "
    >
<button
  type="button"
  aria-label="Profile menu"
  onClick={() => {
    if (open) {
      closeMenu();
      return;
    }

    setOpen(true);
  }}
className="
  group
  relative
  h-8
  w-8

  sm:h-11
  sm:w-11

  overflow-hidden
  rounded-full
  border-2
  border-[var(--profile-menu-avatar-border)]
  bg-[var(--profile-menu-avatar-bg)]
  transition-all
  duration-300
  hover:border-[#5b5cf0]
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-[#5b5cf0]/30
"
>
  {avatarUrl ? (
    <Image
      src={avatarUrl}
      alt={fullName}
      fill
      className="object-cover"
    />
  ) : (
    <div
      className="
        flex
        h-full
        w-full
        items-center
        justify-center
      "
    >
      <User
        size={20}
        className="
          text-[var(--profile-menu-muted)]
        "
      />
    </div>
  )}
</button>

      <AnimatePresence>
        {open && (
            <motion.div
  initial={{
    opacity: 0,
    y: 12,
    scale: 0.96,
  }}
  animate={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  exit={{
    opacity: 0,
    y: 12,
    scale: 0.96,
  }}
  transition={{
    duration: 0.18,
  }}
className="
  absolute

  bottom-16

  right-[-8px]

  w-[240px]

  overflow-hidden

  rounded-[20px]

  border

  border-[var(--profile-menu-border)]

  bg-[var(--profile-menu-bg)]

  shadow-[0_20px_45px_var(--profile-menu-glow)]

  sm:right-[-12px]

  sm:w-[280px]

  sm:rounded-[28px]

  sm:shadow-[0_24px_60px_var(--profile-menu-glow)]
"
>
<div
  className="
    max-h-[70vh]

    overflow-y-auto

    p-2

    sm:max-h-[75vh]

    sm:p-3
  "
>
<div
className="
  flex
  flex-col
  items-center
  pb-3

  sm:pb-4
"
>
      <button
        type="button"
        onClick={() =>
          fileInputRef.current?.click()
        }
        className="
          group

          relative
        "
      >
<div
  className="
    relative
    h-14
    w-14

    sm:h-16
    sm:w-16

    overflow-hidden
    rounded-full
    border-2
    border-[var(--profile-menu-avatar-border)]
    bg-[var(--profile-menu-avatar-bg)]
  "
>
  {avatarUrl ? (
    <Image
      src={avatarUrl}
      alt={fullName}
      fill
      className="object-cover"
    />
  ) : (
    <div
      className="
        flex
        h-full
        w-full
        items-center
        justify-center
      "
    >
      <User
        size={34}
        className="
          text-[var(--profile-menu-muted)]
        "
      />
    </div>
  )}
</div>

<div
  className="
    absolute

    bottom-0

    right-0

    flex

    h-6

    w-6

    sm:h-7
    sm:w-7

    items-center

    justify-center

    rounded-full

    border-2

    border-white

    bg-[#5b5cf0]

    text-white

    shadow-lg

    transition-all
    duration-300

    group-hover:scale-110
  "
>
{uploadingAvatar ? (
  <Loader2
    size={15}
    className="animate-spin text-white"
  />
) : (
  <Camera
    size={13}
    className="text-white"
  />
)}
</div>
    </button>

<input
  ref={fileInputRef}
  type="file"
  hidden
  accept="image/png,image/jpeg,image/webp"
  onChange={handleAvatarChange}
/>

      <h3
        className="
          mt-4

          text-[15px]

          font-semibold

          text-[var(--profile-menu-title)]

          text-[var(--profile-menu-title)]
        "
      >
{user
  ? `${user.firstName} ${user.lastName}`.trim()
  : "Administrator"}
      </h3>

      <p
        className="
          mt-1

          text-[12px]

          text-[var(--profile-menu-muted)]
        "
      >
{user?.email ?? "admin@marketsparks.com"}
      </p>
    </div>

    <div
      className="
        border-t

        border-[var(--profile-menu-divider)]

        pt-4
      "
    >
{environment === "admin" ? (
  <>
    <Accordion
      title="Administration"
      open={
        expanded === "administration"
      }
      setOpen={() =>
        setExpanded(
          expanded === "administration"
            ? null
            : "administration",
        )
      }
      items={administrationItems.admin}
    />

    <Accordion
      title="Finance"
      open={expanded === "finance"}
      setOpen={() =>
        setExpanded(
          expanded === "finance"
            ? null
            : "finance",
        )
      }
      items={financeItems.admin}
    />

    <Accordion
      title="Marketplace"
      open={
        expanded === "marketplace"
      }
      setOpen={() =>
        setExpanded(
          expanded === "marketplace"
            ? null
            : "marketplace",
        )
      }
      items={marketplaceItems.admin}
    />

    <Accordion
      title="Operations"
      open={
        expanded === "operations"
      }
      setOpen={() =>
        setExpanded(
          expanded === "operations"
            ? null
            : "operations",
        )
      }
      items={operationsItems.admin}
    />
  </>
) : (
  <>
    <Accordion
      title="Account"
      open={expanded === "account"}
      setOpen={() =>
        setExpanded(
          expanded === "account"
            ? null
            : "account",
        )
      }
      items={administrationItems.user}
    />

    <Accordion
      title="Business"
      open={expanded === "business"}
      setOpen={() =>
        setExpanded(
          expanded === "business"
            ? null
            : "business",
        )
      }
      items={financeItems.user}
    />
  </>
)}

      <div
        className="
          mt-2

          space-y-1
        "
      >
<MenuLink
  href={
    environment === "admin"
      ? "/admin/plans"
      : "/plans"
  }
  label={
    environment === "admin"
      ? "Manage Subscriptions"
      : "Subscriptions"
  }
  icon={BadgeCheck}
/>

{environment === "user" &&
  !subscriptionLoading &&
  hasActiveSubscription && (
    <MenuLink
      href="/affiliate"
      label="Affiliate Products"
      icon={Coins}
    />
  )}

<MenuLink
  href={
    environment === "admin"
      ? "/admin/kyc"
      : "/kyc"
  }
  label="KYC Verification"
  icon={ShieldCheck}
/>

<MenuLink
  href={
    environment === "admin"
      ? "/admin/settings/security"
      : "/settings/security"
  }
  label="Security"
  icon={Shield}
/>

        <MenuLink
          href="/help-center"
          label="Help Center"
          icon={CircleHelp}
        />
      </div>

      <div
        className="
          mt-5

          border-t

          border-[var(--profile-menu-divider)]

          pt-4
        "
      >
        <div
          className="
            flex

            items-center

            justify-between

            rounded-2xl

            px-2.5

            py-1.5

            sm:px-3

            sm:py-2
          "
        >
          <span
            className="
              text-[12px]

              sm:text-[14px]

              font-medium
            "
          >
            Theme
          </span>

          <ThemeToggle />
        </div>

<button
  type="button"
  onClick={handleLogout}
  disabled={loggingOut}
  className="
    mt-2
    flex
    w-full
    items-center
    gap-3
    rounded-2xl
    px-2.5
    py-2
    text-[12px]

    sm:px-3
    sm:py-2.5
    sm:text-[14px]
    text-[var(--profile-menu-danger)]
    transition-colors
    duration-300
    hover:bg-[var(--profile-menu-danger-hover)]
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
<LogOut
  size={16}
  className="sm:h-[18px] sm:w-[18px]"
/>

  {loggingOut
    ? "Signing out..."
    : "Logout"}
</button>
      </div>
    </div>
  </div>
</motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}