"use client";

import type { ReactNode } from "react";

import ThemeProvider from "./ThemeProvider";

import {
  AuthProvider,
} from "@/context/AuthContext";

import {
  CartProvider,
} from "@/context/CartContext";

import {
  CheckoutProvider,
} from "@/context/CheckoutContext";

import {
  SearchProvider,
} from "@/context/AppSearchContext";

import {
  WishlistProvider,
} from "@/context/WishlistContext";

import {
  SubscriptionProvider,
} from "@/context/SubscriptionContext";

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProvider({
  children,
}: AppProviderProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <SubscriptionProvider>
            <CartProvider>
              <CheckoutProvider>
                <SearchProvider>
                  {children}
                </SearchProvider>
              </CheckoutProvider>
            </CartProvider>
          </SubscriptionProvider>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}