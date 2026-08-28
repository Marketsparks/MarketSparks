"use client";

import Image from "next/image";

import {
  BadgeCheck,
  Clock3,
  Mail,
  MapPin,
  Phone,
  UserCircle2,
} from "lucide-react";

import {
  getCloudinaryImageUrl,
} from "@/lib/cloudinary";

import type {
  ProfileHeaderProps,
} from "./profile.types";

function formatDate(date: string) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(new Date(date));
}

function getStatusBadge(status: string) {
  switch (status) {
    case "ACTIVE":
      return {
        label: "Active",
        background:
          "var(--user-badge-success-bg)",
        color:
          "var(--user-badge-success-text)",
      };

    case "PENDING_VERIFICATION":
      return {
        label: "Pending Verification",
        background:
          "var(--user-badge-warning-bg)",
        color:
          "var(--user-badge-warning-text)",
      };

    case "SUSPENDED":
      return {
        label: "Suspended",
        background:
          "var(--user-badge-danger-bg)",
        color:
          "var(--user-badge-danger-text)",
      };

    case "DEACTIVATED":
      return {
        label: "Deleted",
        background:
          "var(--user-badge-danger-bg)",
        color:
          "var(--user-badge-danger-text)",
      };

    default:
      return {
        label: status,
        background:
          "var(--user-badge-warning-bg)",
        color:
          "var(--user-badge-warning-text)",
      };
  }
}

export default function ProfileHeader({
  user,
  onEdit,
}: ProfileHeaderProps) {
  const avatar =
    getCloudinaryImageUrl(
      user.avatarKey,
      "c_fill,w_320,h_320,f_auto,q_auto",
    );

  const badge =
    getStatusBadge(user.status);

  return (
    <section
      className="
        rounded-[var(--user-radius-lg)]
        border
        bg-[var(--user-card-bg)]
        p-6
        shadow-[var(--user-card-shadow)]
      "
      style={{
        borderColor:
          "var(--user-card-border)",
      }}
    >
      <div
        className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
            gap-5
            sm:flex-row
            sm:items-start
          "
        >
          <div
            className="
              relative
              flex
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
            "
            style={{
              width:
                "var(--profile-avatar-size-desktop)",
              height:
                "var(--profile-avatar-size-desktop)",
              background:
                "var(--user-avatar-bg)",
              borderColor:
                "var(--user-avatar-border)",
            }}
          >
            {avatar ? (
              <Image
                src={avatar}
                alt="Profile photo"
                fill
                className="object-cover"
              />
            ) : (
              <UserCircle2
                size={64}
                color="var(--user-icon-muted)"
              />
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  text-[var(--user-title)]
                "
              >
                {user.firstName}{" "}
                {user.lastName}
              </h1>

              <div
                className="
                  mt-3
                  inline-flex
                  items-center
                  rounded-full
                  px-3
                  py-1
                  text-sm
                  font-semibold
                "
                style={{
                  background:
                    badge.background,
                  color: badge.color,
                }}
              >
                <BadgeCheck
                  size={15}
                  className="mr-2"
                />

                {badge.label}
              </div>
            </div>

            <div
              className="
                grid
                gap-3
                text-sm
                text-[var(--user-text-muted)]
              "
            >
              <div className="flex items-center gap-3">
                <Mail size={17} />
                <span>{user.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={17} />
                <span>{user.phoneNumber}</span>
              </div>

              {user.secondaryPhoneNumber && (
                <div className="flex items-center gap-3">
                  <Phone size={17} />
                  <span>
                    {user.secondaryPhoneNumber}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <MapPin size={17} />
                <span>{user.country}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock3 size={17} />
                <span>
                  Member since{" "}
                  {formatDate(
                    user.createdAt,
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="
            h-12
            rounded-[var(--user-radius-md)]
            bg-[var(--user-button-bg)]
            px-6
            font-medium
            text-[var(--user-button-text)]
            transition
            hover:bg-[var(--user-button-hover)]
          "
        >
          Edit Profile
        </button>
      </div>
    </section>
  );
}