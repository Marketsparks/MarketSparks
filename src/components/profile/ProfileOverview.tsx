"use client";

import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";

import { AvatarUploader } from "./AvatarUploader";

type UserStatus =
  | "ACTIVE"
  | "PENDING_VERIFICATION"
  | "SUSPENDED"
  | "DEACTIVATED";

type ProfileOverviewProps = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  secondaryPhoneNumber: string | null;
  country: string;

  avatarKey: string | null;
  avatarUrl: string | null;

  status: UserStatus;
  createdAt: string;

  onAvatarUploaded: (
    avatarKey: string,
    avatarUrl: string,
  ) => void;

  onEdit: () => void;
};

function getBadgeStyles(
  status: UserStatus,
) {
  switch (status) {
    case "ACTIVE":
      return {
        background:
          "var(--user-badge-success-bg)",
        color:
          "var(--user-badge-success-text)",
        label: "Active",
      };

    case "PENDING_VERIFICATION":
      return {
        background:
          "var(--user-badge-warning-bg)",
        color:
          "var(--user-badge-warning-text)",
        label:
          "Pending Verification",
      };

    case "SUSPENDED":
    case "DEACTIVATED":
      return {
        background:
          "var(--user-badge-danger-bg)",
        color:
          "var(--user-badge-danger-text)",
        label:
          status === "SUSPENDED"
            ? "Suspended"
            : "Deactivated",
      };
  }
}

export function ProfileOverview({
  firstName,
  lastName,
  email,
  phoneNumber,
  secondaryPhoneNumber,
  country,
  avatarKey,
  avatarUrl,
  status,
  createdAt,
  onAvatarUploaded,
  onEdit,
}: ProfileOverviewProps) {
  const badge =
    getBadgeStyles(status);

  const fullName =
    `${firstName} ${lastName}`;

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
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
<AvatarUploader
  avatarKey={avatarKey}
  avatarUrl={avatarUrl}
  fullName={fullName}
  onUploaded={onAvatarUploaded}
/>

        <div className="flex-1">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  text-[var(--user-title)]
                "
              >
                {fullName}
              </h1>

              <div
                className="
                  mt-3
                  inline-flex
                  rounded-full
                  px-3
                  py-1
                  text-sm
                  font-medium
                "
                style={{
                  background:
                    badge.background,
                  color:
                    badge.color,
                }}
              >
                {badge.label}
              </div>
            </div>

            <button
              type="button"
              onClick={onEdit}
              className="
                rounded-[var(--user-radius-md)]
                bg-[var(--user-button-bg)]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-[var(--user-button-text)]
                transition
                hover:bg-[var(--user-button-hover)]
              "
            >
              Edit Profile
            </button>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <InfoItem
              icon={<Mail size={18} />}
              label="Email"
              value={email}
            />

            <InfoItem
              icon={<Phone size={18} />}
              label="Primary Phone"
              value={phoneNumber}
            />

            <InfoItem
              icon={<Phone size={18} />}
              label="Secondary Phone"
              value={
                secondaryPhoneNumber ??
                "Not added"
              }
            />

            <InfoItem
              icon={<MapPin size={18} />}
              label="Country"
              value={country}
            />

            <InfoItem
              icon={
                <CalendarDays
                  size={18}
                />
              }
              label="Member Since"
              value={new Date(
                createdAt,
              ).toLocaleDateString(
                undefined,
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div
      className="
        rounded-[var(--user-radius-md)]
        border
        p-4
      "
      style={{
        borderColor:
          "var(--user-divider)",
        background:
          "var(--user-surface)",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-[var(--user-icon-muted)]">
          {icon}
        </span>

        <span
          className="
            text-sm
            font-medium
            text-[var(--user-text-muted)]
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-2
          break-words
          text-base
          font-medium
          text-[var(--user-text)]
        "
      >
        {value}
      </p>
    </div>
  );
}