"use client";

import Image from "next/image";

import {
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

export default function ProfileHeader({
  user,
  onEdit,
}: ProfileHeaderProps) {
  const avatar =
    getCloudinaryImageUrl(
      user.avatarKey,
      "c_fill,w_320,h_320,f_auto,q_auto",
    );

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[var(--user-radius-lg)]
        border
        bg-[var(--user-card-bg)]
        p-4
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
            "radial-gradient(circle at top right, rgba(99,102,241,.10), transparent 36%), radial-gradient(circle at bottom left, rgba(59,130,246,.07), transparent 42%)",
        }}
      />

      <div
        className="
          relative
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div
          className="
            flex
            items-start
            gap-4
          "
        >
          <div
            className="
              relative
              flex
              h-[88px]
              w-[88px]
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              sm:h-[var(--profile-avatar-size-desktop)]
              sm:w-[var(--profile-avatar-size-desktop)]
            "
            style={{
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

          <div className="min-w-0">
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[var(--user-text-muted)]
              "
            >
              Account Overview
            </p>

            <h2
              className="
                mt-1
                text-xl
                font-bold
                text-[var(--user-title)]
                sm:text-2xl
              "
            >
              {user.firstName} {user.lastName}
            </h2>

            <div
              className="
                mt-5
                grid
                gap-3
                text-sm
              "
            >
              <div className="flex items-start gap-3">
                <Mail
                  size={17}
                  className="mt-0.5 text-[var(--user-icon-muted)]"
                />

                <div>
                  <p className="text-xs text-[var(--user-text-muted)]">
                    Email
                  </p>

                  <p className="break-all font-medium text-[var(--user-title)]">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone
                  size={17}
                  className="mt-0.5 text-[var(--user-icon-muted)]"
                />

                <div>
                  <p className="text-xs text-[var(--user-text-muted)]">
                    Primary Phone
                  </p>

                  <p className="font-medium text-[var(--user-title)]">
                    {user.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone
                  size={17}
                  className="mt-0.5 text-[var(--user-icon-muted)]"
                />

                <div>
                  <p className="text-xs text-[var(--user-text-muted)]">
                    Secondary Phone
                  </p>

                  <p className="font-medium text-[var(--user-title)]">
                    {user.secondaryPhoneNumber ??
                      "Not added"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  size={17}
                  className="mt-0.5 text-[var(--user-icon-muted)]"
                />

                <div>
                  <p className="text-xs text-[var(--user-text-muted)]">
                    Country
                  </p>

                  <p className="font-medium text-[var(--user-title)]">
                    {user.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onEdit}
className="
  h-9
  rounded-full
  border
  border-[var(--user-card-border)]
  bg-[color:rgba(255,255,255,.06)]
  px-5
  text-sm
  font-medium
  text-[var(--user-title)]
  backdrop-blur-sm
  transition-all
  duration-300
  hover:border-[var(--user-primary)]
  hover:bg-[color:rgba(255,255,255,.10)]
  sm:h-10
  sm:px-6
"
        >
          Edit Profile
        </button>
      </div>
    </section>
  );
}