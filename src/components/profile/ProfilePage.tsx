import { redirect } from "next/navigation";

import {
  CalendarDays,
  CheckCircle2,
  Globe2,
  Mail,
  UserCircle2,
} from "lucide-react";

import ProfileClient from "./ProfileClient";

import { DashboardPage } from "@/components/dashboard";

import { getCurrentSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  ).format(date);
}

export default async function ProfilePage() {
  const session =
    await getCurrentSession();

  if (!session) {
    redirect("/");
  }

  const user =
    await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        secondaryPhoneNumber: true,
        country: true,
        avatarKey: true,
        status: true,
        createdAt: true,
      },
    });

  if (!user) {
    redirect("/");
  }

  const profileCompletion = [
    user.firstName,
    user.lastName,
    user.phoneNumber,
    user.secondaryPhoneNumber,
    user.country,
    user.avatarKey,
  ].filter(Boolean).length;

  const completion = Math.round(
    (profileCompletion / 6) * 100,
  );

  return (
    <DashboardPage
      environment="user"
      breadcrumb={[
        {
          label: "My Profile",
        },
      ]}
    >
<section className="pt-2 pb-6 sm:pt-6">
        <section
className="
  relative
  overflow-hidden
  rounded-[var(--user-radius-lg)]
  border
  bg-[var(--user-card-bg)]
  p-3
  shadow-[var(--user-card-shadow)]
  sm:p-6
"
          style={{
            borderColor:
              "var(--user-card-border)",
          }}
        >
          <div
            className="
              pointer-events-none
              absolute
              inset-0
            "
            style={{
              background:
                "radial-gradient(circle at top right, rgba(99,102,241,.14), transparent 38%), radial-gradient(circle at bottom left, rgba(59,130,246,.10), transparent 42%)",
            }}
          />

          <div
className="
  relative
  flex
  flex-col
  gap-4
  sm:gap-5
  lg:flex-row
  lg:items-center
  lg:justify-between
"
          >
            <div className="max-w-2xl">
              <div
className="
  inline-flex
  items-center
  gap-1
  rounded-full
  border
  px-2
  py-0.5
  text-[10px]
  font-semibold
  sm:px-2.5
  sm:py-1
  sm:text-[11px]
"
                style={{
                  borderColor:
                    "var(--user-card-border)",
                  background:
                    "rgba(99,102,241,.08)",
                }}
              >
                <UserCircle2 size={12} />

                Hello, {user.firstName} 👋
              </div>

              <h1
className="
  mt-2
  text-[30px]
  font-extrabold
  tracking-tight
  leading-none
  text-[var(--user-title)]
  sm:mt-4
  sm:text-4xl
"
              >
                Welcome back.
              </h1>

              <p
className="
  mt-2
  max-w-xl
  text-[13px]
  leading-5
  text-[var(--user-text-muted)]
  sm:mt-3
  sm:text-[15px]
  sm:leading-7
"
              >
                Manage your personal details, keep your contact information
                up to date, and make sure your profile is always complete.
              </p>
            </div>

            <div
className="
  grid
  grid-cols-2
  gap-2
  sm:gap-2.5
  lg:w-[430px]
"
            >
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "Verified",
                },
                {
                  icon: Globe2,
                  label: "Country",
                  value: user.country,
                },
                {
                  icon: CalendarDays,
                  label: "Member Since",
                  value: formatDate(
                    user.createdAt,
                  ),
                },
                {
                  icon: CheckCircle2,
                  label: "Profile",
                  value: `${completion}% Complete`,
                },
              ].map(
                ({
                  icon: Icon,
                  label,
                  value,
                }) => (
                  <div
                    key={label}
className="
  rounded-lg
  border
  p-2.5
  sm:rounded-2xl
  sm:p-4
"
                    style={{
                      borderColor:
                        "var(--user-card-border)",
                      background:
                        "rgba(255,255,255,.03)",
                    }}
                  >
<Icon
  size={14}
  className="text-[var(--user-primary)] sm:w-4 sm:h-4"
/>

                    <p
className="
  mt-1.5
  text-[9px]
  font-semibold
  uppercase
  tracking-[0.08em]
  text-[var(--user-text-muted)]
  sm:mt-2
  sm:text-[10px]
"
                    >
                      {label}
                    </p>

                    <p
className="
  mt-0.5
  text-[12px]
  font-semibold
  leading-4
  text-[var(--user-title)]
  sm:text-sm
"
                    >
                      {value}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <div className="mt-6 sm:mt-8">
          <ProfileClient
            user={{
              ...user,
              createdAt:
                user.createdAt.toISOString(),
            }}
          />
        </div>
      </section>
    </DashboardPage>
  );
}