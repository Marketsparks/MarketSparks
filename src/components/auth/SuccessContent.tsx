"use client";

import Link from "next/link";

import {
  ArrowRight,
  CircleCheckBig,
} from "lucide-react";

import AuthButton from "./AuthButton";
import AuthCard from "./AuthCard";

type SuccessContentProps = {
  title: string;

  description: string;

  buttonLabel?: string;

  buttonHref?: string;
};

export default function SuccessContent({
  title,

  description,

  buttonLabel = "Continue",

  buttonHref = "/Auth",
}: SuccessContentProps) {
  return (
    <AuthCard>
      <div
        className="
          text-center
        "
      >
        <div
          className="
            mx-auto

            flex

            h-16

            w-16

            items-center

            justify-center

            rounded-full

            bg-emerald-500/10

            text-emerald-500
          "
        >
          <CircleCheckBig
            size={32}
          />
        </div>

        <h1
          className="
            mt-6

            text-[26px]

            font-extrabold

            leading-tight

            text-[var(--foreground)]
          "
        >
          {title}
        </h1>

        <p
          className="
            mx-auto

            mt-3

            max-w-[340px]

            text-[14px]

            leading-7

            text-[var(--foreground-muted)]
          "
        >
          {description}
        </p>

        <div
          className="
            mt-8
          "
        >
          <Link
            href={buttonHref}
          >
            <AuthButton
              rightIcon={
                <ArrowRight
                  size={17}
                />
              }
            >
              {buttonLabel}
            </AuthButton>
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}