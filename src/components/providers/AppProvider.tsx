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
  SearchProvider,
} from "@/context/SearchContext";

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProvider({
  children,
}: AppProviderProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            {children}
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}