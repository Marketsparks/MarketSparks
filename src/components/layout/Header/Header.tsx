"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import { useStickyHeader } from "@/hooks/useStickyHeader";

import MobileDrawer from "./MobileDrawer";
import MobileHeader from "./MobileHeader";
import Navbar from "./Navbar";
import TopBar from "./TopBar";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const { isSticky } = useStickyHeader();

  return (
    <>
      <TopBar />

      {/* Normal desktop navbar */}
      <Navbar />

      {/* Normal mobile header */}
      <MobileHeader
        onMenuClick={() =>
          setIsMobileMenuOpen(true)
        }
      />

      {/* Sticky desktop + mobile headers */}
      <AnimatePresence>
        {isSticky && (
          <>
            <Navbar sticky />

            <MobileHeader
              sticky
              onMenuClick={() =>
                setIsMobileMenuOpen(true)
              }
            />
          </>
        )}
      </AnimatePresence>

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() =>
          setIsMobileMenuOpen(false)
        }
      />
    </>
  );
}