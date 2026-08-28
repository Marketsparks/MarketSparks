"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function Logo({
  className,
  size = "md",
}: LogoProps) {
  const sizeClasses = {
    sm: "w-[120px] h-auto",
    md: "w-[120px] h-auto lg:w-[160px]",
    lg: "w-[140px] h-auto lg:w-[180px]",
  };

  return (
    <Link
      href="/"
      aria-label="MarketSparks"
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        className
      )}
    >
      <Image
        src="/assets/images/general/logo.png"
        alt="MarketSparks"
        width={160}
        height={48}
        priority
        className={cn(
          "object-contain",
          sizeClasses[size]
        )}
      />
    </Link>
  );
}