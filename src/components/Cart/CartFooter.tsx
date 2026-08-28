"use client";

import CartSummary from "./CartSummary";
import CartCheckoutButton from "./CartCheckoutButton";

import { useCart } from "@/components/Cart";

type CartFooterProps = {
  onClose: () => void;
};

export default function CartFooter({
  onClose,
}: CartFooterProps) {
  const { cart } = useCart();

  if (
    !cart ||
    cart.items.length === 0
  ) {
    return null;
  }

  return (
    <footer
      className="
        sticky
        bottom-0
        z-20
        shrink-0
        border-t
        px-3
        py-3
        shadow-[0_-8px_24px_rgba(0,0,0,0.08)]
      "
      style={{
        background:
          "var(--cart-bg)",
        borderColor:
          "var(--cart-divider)",
      }}
    >
      <div className="space-y-3">
        <CartSummary />

        <CartCheckoutButton
          onCheckout={onClose}
        />
      </div>
    </footer>
  );
}