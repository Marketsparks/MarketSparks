"use client";

import { useMemo } from "react";

import { useCartContext } from "@/context/CartContext";

export default function CartSummary() {
  const { cart } = useCartContext();

  const summary = useMemo(
    () => cart?.summary,
    [cart],
  );

  if (!summary) {
    return null;
  }

  return (
    <section
      className="space-y-4 rounded-2xl p-4"
      style={{
        background:
          "var(--cart-summary-bg)",

        border:
          "1px solid var(--cart-summary-border)",
      }}
    >
      <div className="flex items-center justify-between text-sm">
        <span
          style={{
            color:
              "var(--text-secondary)",
          }}
        >
          Items
        </span>

        <span className="font-medium">
          {summary.itemCount}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span
          style={{
            color:
              "var(--text-secondary)",
          }}
        >
          Subtotal
        </span>

        <span className="font-medium">
          $
          {summary.subtotal.toLocaleString()}
        </span>
      </div>

      {summary.savings > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span
            style={{
              color:
                "var(--success)",
            }}
          >
            You Save
          </span>

          <span
            className="font-semibold"
            style={{
              color:
                "var(--success)",
            }}
          >
            − $
            {summary.savings.toLocaleString()}
          </span>
        </div>
      )}

      <div
        className="my-1"
        style={{
          borderTop:
            "1px solid var(--cart-divider)",
        }}
      />

      <div className="flex items-center justify-between">
        <span className="text-base font-semibold">
          Total
        </span>

        <span className="text-lg font-bold tracking-tight">
          $
          {summary.total.toLocaleString()}
        </span>
      </div>
    </section>
  );
}