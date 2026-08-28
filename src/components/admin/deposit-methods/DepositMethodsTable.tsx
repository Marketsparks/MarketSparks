"use client";

import Image from "next/image";

import {
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import type {
  DepositMethod,
} from "./types";

import {
  getCloudinaryImageUrl,
} from "@/lib/cloudinary";

type Props = {
  methods: DepositMethod[];

  loading: boolean;

  onCreate: () => void;

  onEdit: (
    method: DepositMethod,
  ) => void;

  onDelete: (
    method: DepositMethod,
  ) => void;
};

export default function DepositMethodsTable({
  methods,
  loading,
  onCreate,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
className="
  mb-28
  mt-12
  overflow-hidden
  rounded-[var(--admin-deposit-methods-radius)]
  border
  border-[var(--admin-deposit-methods-border)]
  bg-[var(--admin-deposit-methods-bg)]
  shadow-[var(--admin-deposit-methods-shadow)]
  transition-all
  duration-300
"
    >
      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-[var(--admin-deposit-methods-header-border)]
          bg-[var(--admin-deposit-methods-header-bg)]
          p-4
          transition-colors
          duration-300
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:p-6
        "
      >
        <div>
          <h1
            className="
              text-xl
              font-semibold
              text-[var(--admin-deposit-methods-title)]
            "
          >
            Deposit Methods
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-[var(--admin-deposit-methods-text)]
            "
          >
            Manage supported deposit methods.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreate}
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[var(--admin-deposit-methods-button-bg)]
            px-5
            text-sm
            font-medium
            text-[var(--admin-deposit-methods-button-text)]
            transition-all
            duration-300
            hover:bg-[var(--admin-deposit-methods-button-hover)]
            active:scale-[0.98]
          "
        >
          <Plus size={18} />
          Add Method
        </button>
      </div>

      {loading ? (
        <div
          className="
            flex
            items-center
            justify-center
            p-12
            text-sm
            text-[var(--admin-deposit-methods-text)]
          "
        >
          Loading...
        </div>
      ) : methods.length === 0 ? (
        <div
          className="
            flex
            items-center
            justify-center
            p-12
            text-sm
            text-[var(--admin-deposit-methods-text)]
          "
        >
          No deposit methods found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full">
            <thead>
              <tr
                className="
                  border-b
                  border-[var(--admin-deposit-methods-header-border)]
                  bg-[var(--admin-deposit-methods-header-bg)]
                  transition-colors
                  duration-300
                "
              >
                {[
                  "Icon",
                  "Name",
                  "Symbol",
                  "Network",
                  "Min",
                  "Max",
                  "Status",
                  "Order",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className={`
                      px-6
                      py-4
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.08em]
                      text-[var(--admin-deposit-methods-heading)]
                      ${
                        heading === "Actions"
                          ? "text-right"
                          : "text-left"
                      }
                    `}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {methods.map((method) => (
                <tr
                  key={method.id}
                  className="
                    border-b
                    border-[var(--admin-deposit-methods-row-border)]
                    text-[var(--admin-deposit-methods-row-text)]
                    transition-colors
                    duration-300
                    hover:bg-[var(--admin-deposit-methods-row-hover)]
                  "
                >
                  <td className="px-6 py-4">
                    {method.iconKey ? (
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[var(--admin-deposit-methods-icon-border)]
                          bg-[var(--admin-deposit-methods-icon-bg)]
                        "
                      >
                        <Image
                          src={
                            getCloudinaryImageUrl(
                              method.iconKey,
                            ) ??
                            "/images/placeholders/crypto.svg"
                          }
                          alt={method.name}
                          width={30}
                          height={30}
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span className="text-[var(--admin-deposit-methods-text)]">
                        N/A
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {method.name}
                  </td>

                  <td className="px-6 py-4">
                    {method.symbol}
                  </td>

                  <td className="px-6 py-4">
                    {method.network}
                  </td>

                  <td className="px-6 py-4">
                    {method.minimumAmount}
                  </td>

                  <td className="px-6 py-4">
                    {method.maximumAmount ?? "Unlimited"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={
                        method.isActive
                          ? "font-medium text-[var(--admin-deposit-methods-active)]"
                          : "font-medium text-[var(--admin-deposit-methods-inactive)]"
                      }
                    >
                      {method.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {method.displayOrder}
                  </td>

                  <td className="px-6 py-4">
                    <div
                      className="
                        flex
                        justify-end
                        gap-2
                      "
                    >
                      <button
                        type="button"
                        onClick={() => onEdit(method)}
                        className="
                          rounded-lg
                          p-2
                          text-[var(--admin-deposit-methods-action)]
                          transition-all
                          duration-300
                          hover:bg-[var(--admin-deposit-methods-action-hover-bg)]
                          hover:text-[var(--admin-deposit-methods-action-hover)]
                        "
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(method)}
                        className="
                          rounded-lg
                          p-2
                          text-[var(--admin-deposit-methods-danger)]
                          transition-all
                          duration-300
                          hover:bg-[var(--admin-deposit-methods-danger-bg)]
                          hover:text-[var(--admin-deposit-methods-danger-hover)]
                        "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}