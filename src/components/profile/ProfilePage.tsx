import { redirect } from "next/navigation";

import ProfileClient from "./ProfileClient";

import {
  PageHeader,
  DashboardPage,
} from "@/components/dashboard";

import { getCurrentSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

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

  return (
<DashboardPage
  environment="user"
  breadcrumb={[
    {
      label: "My Profile",
    },
  ]}
>
      <section className="py-6">
        <PageHeader
          title="My Profile"
          description="Manage your personal information, profile photo, and account settings."
        />

        <div className="mt-8">
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