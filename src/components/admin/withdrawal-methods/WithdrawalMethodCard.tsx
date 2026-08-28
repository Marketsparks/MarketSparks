"use client";

import {
  Edit2,
  Trash2,
} from "lucide-react";

import WithdrawalMethodStatus from "./WithdrawalMethodStatus";

import type {
  WithdrawalMethod,
} from "./withdrawal-method.types";

import Image from "next/image";

import { getCloudinaryImageUrl } from "@/lib/cloudinary";

type WithdrawalMethodCardProps = {
  method: WithdrawalMethod;

  desktop?: boolean;

  onEdit: () => void;

  onDelete: () => void;
};

export default function WithdrawalMethodCard({
  method,
  desktop = false,
  onEdit,
  onDelete,
}: WithdrawalMethodCardProps) {

const iconUrl =
  getCloudinaryImageUrl(method.icon);

  const fee =
    method.feeType === "percentage"
      ? `${method.fee}%`
      : `$${method.fee.toLocaleString()}`;

  const type =
    method.type === "crypto"
      ? "Crypto"
      : "Bank";

  if (desktop) {
    return (
      <tr
        className="
          border-b
          border-[var(--admin-card-border)]
          transition-colors
          hover:bg-[var(--admin-table-row-hover)]
        "
      >
        <td className="px-6 py-5">
          <div className="flex items-center gap-4">
<div
  className="
    flex
    h-12
    w-12
    items-center
    justify-center
    overflow-hidden
    rounded-xl
    bg-[var(--admin-card-secondary-bg)]
  "
>
  {iconUrl ? (
    <Image
      src={iconUrl}
      alt={method.name}
      width={48}
      height={48}
      className="h-full w-full object-cover"
    />
  ) : (
    <span
      className="
        text-sm
        font-bold
        uppercase
        text-[var(--admin-title)]
      "
    >
      {method.symbol.slice(0, 2)}
    </span>
  )}
</div>

            <div>
              <p
                className="
                  font-semibold
                  text-[var(--admin-title)]
                "
              >
                {method.name}
              </p>

              <p
                className="
                  text-sm
                  text-[var(--admin-muted)]
                "
              >
                {method.symbol}
                {method.network
                  ? ` • ${method.network}`
                  : ""}
              </p>
            </div>
          </div>
        </td>

        <td
          className="
            px-6
            py-5
            text-sm
            text-[var(--admin-text)]
          "
        >
          {type}
        </td>

        <td
          className="
            px-6
            py-5
            text-sm
            font-medium
            text-[var(--admin-text)]
          "
        >
          {fee}
        </td>

        <td className="px-6 py-5">
          <WithdrawalMethodStatus
            active={method.isActive}
          />
        </td>

        <td className="px-6 py-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onEdit}
              className="
                inline-flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                border
                border-[var(--admin-button-secondary-border)]
                text-[var(--admin-button-secondary-text)]
                transition-all
                duration-300
                hover:bg-[var(--admin-button-secondary-hover)]
              "
            >
              <Edit2 size={16} />
            </button>

            <button
              type="button"
              onClick={onDelete}
              className="
                inline-flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                border
                border-[var(--admin-button-danger-border)]
                text-[var(--admin-button-danger-text)]
                transition-all
                duration-300
                hover:bg-[var(--admin-button-danger-hover)]
              "
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div
      className="
        rounded-[var(--admin-card-radius)]
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
        p-5
        shadow-[var(--admin-card-shadow)]
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div className="flex items-center gap-4">
<div
  className="
    flex
    h-12
    w-12
    items-center
    justify-center
    overflow-hidden
    rounded-xl
    bg-[var(--admin-card-secondary-bg)]
  "
>
  {iconUrl ? (
    <Image
      src={iconUrl}
      alt={method.name}
      width={48}
      height={48}
      className="h-full w-full object-cover"
    />
  ) : (
    <span
      className="
        text-sm
        font-bold
        uppercase
        text-[var(--admin-title)]
      "
    >
      {method.symbol.slice(0, 2)}
    </span>
  )}
</div>

          <div>
            <h3
              className="
                font-semibold
                text-[var(--admin-title)]
              "
            >
              {method.name}
            </h3>

            <p
              className="
                text-sm
                text-[var(--admin-muted)]
              "
            >
              {method.symbol}
              {method.network
                ? ` • ${method.network}`
                : ""}
            </p>
          </div>
        </div>

        <WithdrawalMethodStatus
          active={method.isActive}
        />
      </div>

      <div
        className="
          mt-5
          grid
          grid-cols-2
          gap-4
        "
      >
        <div>
          <p
            className="
              text-xs
              uppercase
              tracking-wide
              text-[var(--admin-muted)]
            "
          >
            Type
          </p>

          <p
            className="
              mt-1
              text-sm
              font-medium
              text-[var(--admin-text)]
            "
          >
            {type}
          </p>
        </div>

        <div>
          <p
            className="
              text-xs
              uppercase
              tracking-wide
              text-[var(--admin-muted)]
            "
          >
            Fee
          </p>

          <p
            className="
              mt-1
              text-sm
              font-medium
              text-[var(--admin-text)]
            "
          >
            {fee}
          </p>
        </div>
      </div>

      <div
        className="
          mt-6
          flex
          gap-3
        "
      >
        <button
          type="button"
          onClick={onEdit}
          className="
            flex-1
            rounded-[var(--admin-input-radius)]
            border
            border-[var(--admin-button-secondary-border)]
            bg-[var(--admin-button-secondary-bg)]
            py-3
            text-sm
            font-semibold
            text-[var(--admin-button-secondary-text)]
            transition-all
            duration-300
            hover:bg-[var(--admin-button-secondary-hover)]
          "
        >
          Edit
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="
            flex-1
            rounded-[var(--admin-input-radius)]
            bg-[var(--admin-button-danger-bg)]
            py-3
            text-sm
            font-semibold
            text-[var(--admin-button-danger-text)]
            transition-all
            duration-300
            hover:bg-[var(--admin-button-danger-hover)]
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}