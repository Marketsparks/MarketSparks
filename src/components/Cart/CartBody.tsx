"use client";

import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import SavedForLater from "./SavedForLater";

import { useCart } from "@/components/Cart";

import type {
  AppEnvironment,
} from "@/types/environment";

type CartBodyProps = {
  environment?: AppEnvironment;
  onClose: () => void;
};

export default function CartBody({
  environment = "public",
  onClose,
}: CartBodyProps) {
  const {
    cart,
    loading,
  } = useCart();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center px-6">
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-10 w-10 animate-spin rounded-full border-2 border-t-transparent"
            style={{
              borderColor:
                "var(--cart-border)",

              borderTopColor:
                "transparent",
            }}
          />

          <p
            className="text-sm"
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Loading your cart...
          </p>
        </div>
      </div>
    );
  }

  if (!cart) {
    return null;
  }

  const hasCartItems =
    cart.items.length > 0;

  const hasSavedItems =
    cart.savedItems.length > 0;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-4">
        <section
          className="
            rounded-[24px]
            border
            p-4
            shadow-sm
          "
          style={{
            background:
              "var(--cart-button-secondary-bg)",

            borderColor:
              "var(--cart-border)",
          }}
        >
          {hasCartItems ? (
            <div className="space-y-3">
              {cart.items.map(
                (item) => (
<CartItem
  key={item.id}
  item={item}
  environment={
    environment
  }
  onClose={
    onClose
  }
/>
                ),
              )}
            </div>
          ) : (
            <div className="min-h-[260px]">
              <EmptyCart
                hasSavedItems={false}
              />
            </div>
          )}
        </section>
      </div>

      {hasSavedItems && (
        <section
          className="
            shrink-0
            border-t
            px-4
            pb-4
            pt-4
          "
          style={{
            borderColor:
              "var(--cart-divider)",

            background:
              "var(--cart-bg)",
          }}
        >
          <div className="mb-3 flex items-center gap-3 px-1">
            <div
              className="h-px flex-1"
              style={{
                background:
                  "var(--cart-divider)",
              }}
            />

            <span
              className="
                shrink-0
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.24em]
              "
              style={{
                color:
                  "var(--text-secondary)",
              }}
            >
              Saved For Later
            </span>

            <div
              className="h-px flex-1"
              style={{
                background:
                  "var(--cart-divider)",
              }}
            />
          </div>

          <div
            className="
              max-h-[180px]
              overflow-y-auto
              rounded-[22px]
              border
              p-2
            "
            style={{
              background:
                "var(--cart-button-secondary-bg)",

              borderColor:
                "var(--cart-border)",
            }}
          >
            <SavedForLater
              items={
                cart.savedItems
              }
            />
          </div>
        </section>
      )}
    </div>
  );
}