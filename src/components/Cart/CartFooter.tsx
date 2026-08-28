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

  if (!cart || cart.items.length === 0) {
    return null;
  }

  return (
    <footer
      className="shrink-0 space-y-4 px-4 py-4"
      style={{
        background:
          "var(--cart-bg)",
        borderTop:
          "1px solid var(--cart-divider)",
      }}
    >
      <CartSummary />

      <CartCheckoutButton
        onCheckout={onClose}
      />
    </footer>
  );
}