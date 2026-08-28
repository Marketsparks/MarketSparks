"use client";

import Link from "next/link";
import { useState } from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { toast } from "sonner";

import {
  ArrowRight,
  Mail,
  User,
  Users,
} from "lucide-react";

import { validateRegister } from "./AuthValidation";
import AuthButton from "./AuthButton";
import AuthForm from "./AuthForm";
import AuthInput from "./AuthInput";
import AuthTabs from "./AuthTabs";
import PasswordField from "./PasswordField";

import { CountrySelect } from "@/components/ui/CountrySelect";
import type { Country } from "@/lib/countries";



export type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  password: string;
  confirmPassword: string;
  heardFrom: string;
  referralCode: string;
  acceptedTerms: boolean;
};

type RegisterFormProps = {
  loading?: boolean;

  onSubmit?: (
    values: RegisterFormValues,
  ) => void;

  onSignIn?: () => void;
};

export default function RegisterForm({
  loading = false,
  onSubmit,
  onSignIn,
}: RegisterFormProps) {

const [heardFrom, setHeardFrom] =
  useState("");

const [country, setCountry] =
  useState<Country | "">("");


  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (loading) {
      return;
    }

    const form =
      new FormData(event.currentTarget);

    const values: RegisterFormValues = {
      firstName: String(
        form.get("firstName") ?? "",
      ).trim(),

      lastName: String(
        form.get("lastName") ?? "",
      ).trim(),

      email: String(
        form.get("email") ?? "",
      ).trim(),

phoneNumber: String(
  form.get("phoneNumber") ?? ""
).trim(),

country,

      password: String(
        form.get("password") ?? "",
      ),

      confirmPassword: String(
        form.get("confirmPassword") ?? "",
      ),

      heardFrom: String(
        form.get("heardFrom") ?? "",
      ),

      referralCode: String(
        form.get("referralCode") ?? "",
      ),

      acceptedTerms:
        form.get("terms") === "on",
    };

    const validation =
      validateRegister(values);

    if (!validation.success) {
      toast.error(
        validation.message,
      );

      return;
    }

    onSubmit?.(values);
  }

  return (
    <AuthForm
    
      title="Create Your Account"
      description="
        Join MarketSparks and start building your online business today.
      "
      footer={
        <p
          className="
            text-center
            text-[13px]
            text-[var(--foreground-muted)]
          "
        >
          Already have an account?{" "}

          <button
            type="button"
            onClick={onSignIn}
            disabled={loading}
            className="
              font-semibold
              text-[var(--primary)]
              transition-opacity
              duration-300
              hover:opacity-80
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Sign In
          </button>
        </p>
      }
    >
      <div
  className="
    mb-6
  "
>
  <AuthTabs
    value="register"
    onChange={(value) => {
      if (
        value ===
        "login"
      ) {
        onSignIn?.();
      }
    }}
  />
</div>
      <form
        onSubmit={handleSubmit}
        className="
          space-y-5
        "
      >
        <div
          className="
            grid
            gap-4
            sm:grid-cols-2
          "
        >
          <AuthInput
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="First name"
            autoComplete="given-name"
            required
            disabled={loading}
            leftIcon={
              <User size={17} />
            }
          />

          <AuthInput
            id="lastName"
            name="lastName"
            label="Last Name"
            placeholder="Last name (optional)"
            autoComplete="family-name"
            disabled={loading}
            leftIcon={
              <User size={17} />
            }
          />
        </div>

        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          autoComplete="email"
          required
          disabled={loading}
          leftIcon={
            <Mail size={17} />
          }
        />

<AuthInput
  id="phoneNumber"
  name="phoneNumber"
  type="tel"
  label="Phone Number"
  placeholder="+234 800 000 0000"
  autoComplete="tel"
  required
  disabled={loading}
  leftIcon={
    <User size={17} />
  }
/>

<CountrySelect
  label="Country"
  value={country}
  onChange={(country: Country) => {
    setCountry(country);
  }}
/>

<input
  type="hidden"
  name="country"
  value={country}
/>

        <PasswordField
          id="password"
          name="password"
          label="Password"
          placeholder="Create a password"
          autoComplete="new-password"
          required
          disabled={loading}
          showStrength
        />

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          required
          disabled={loading}
        />

        <div>
          <label
            htmlFor="heardFrom"
            className="
              mb-2
              block
              text-[13px]
              font-semibold
              text-[var(--foreground)]
            "
          >
            How did you hear about MarketSparks?
          </label>

          <div
            className="
              flex
              h-11
              items-center
              gap-3
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              px-3.5
              transition-all
              duration-300
              focus-within:border-[var(--primary)]
              focus-within:ring-2
              focus-within:ring-[var(--primary)]/20
            "
          >

            <select
              id="heardFrom"
              name="heardFrom"
              value={heardFrom}
              disabled={loading}
              onChange={(event) => {
                const value =
                  event.target.value;

                setHeardFrom(value);

                if (
                  value !== "affiliate"
                ) {
                  const input =
                    document.getElementById(
                      "referralCode",
                    ) as
                      | HTMLInputElement
                      | null;

                  if (input) {
                    input.value = "";
                  }
                }
              }}
              className="
                h-full
                w-full
                border-0
                bg-transparent
                text-[14px]
                text-[var(--foreground)]
                outline-none
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <option value="">
                Select an option (optional)
              </option>

              <option value="google">
                Google Search
              </option>

              <option value="youtube">
                YouTube
              </option>

              <option value="instagram">
                Instagram
              </option>

              <option value="facebook">
                Facebook
              </option>

              <option value="tiktok">
                TikTok
              </option>

              <option value="x">
                X (Twitter)
              </option>

              <option value="friend">
                Friend or Colleague
              </option>

              <option value="affiliate">
                Affiliate / Referral
              </option>

              <option value="blog">
                Blog or Article
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </div>
        </div>

        <AnimatePresence>
          {heardFrom === "affiliate" && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
                y: -8,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -8,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                overflow-hidden
              "
            >
              <AuthInput
                id="referralCode"
                name="referralCode"
                label="Referral Code"
                placeholder="Enter your referral code"
                disabled={loading}
                leftIcon={
                  <Users size={17} />
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        <label
          className="
            flex
            cursor-pointer
            items-start
            gap-3
            text-[13px]
            leading-6
            text-[var(--foreground-muted)]
          "
        >
          <input
            type="checkbox"
            name="terms"
            required
            disabled={loading}
            className="
              mt-1
              h-4
              w-4
              rounded
              border-[var(--border)]
              accent-[var(--primary)]
            "
          />

          <span>
            I agree to{" "}

            <Link
              href="/Terms"
              className="
                font-medium
                text-[var(--primary)]
              "
            >
              Terms & Conditions
            </Link>

            {" "}and{" "}

            <Link
              href="/Privacy"
              className="
                font-medium
                text-[var(--primary)]
              "
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <AuthButton
          type="submit"
          loading={loading}
          loadingText="Creating Account..."
          rightIcon={
            <ArrowRight size={17} />
          }
        >
          Create Account
        </AuthButton>
      </form>
    </AuthForm>
  );
}