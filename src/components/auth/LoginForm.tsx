"use client";

import Link from "next/link";

import { toast } from "sonner";

import {
  ArrowRight,
  Mail,
} from "lucide-react";

import { validateLogin } from "./AuthValidation";
import AuthButton from "./AuthButton";
import AuthDivider from "./AuthDivider";
import AuthForm from "./AuthForm";
import AuthInput from "./AuthInput";
import AuthTabs from "./AuthTabs";
import PasswordField from "./PasswordField";

type LoginFormProps = {
  loading?: boolean;

  onSubmit?: (
    values: {
      email: string;

      password: string;

      rememberMe: boolean;
    }
  ) => void;

  onRegister?: () => void;
};

export default function LoginForm({
  loading = false,

  onSubmit,

  onRegister,
}: LoginFormProps) {
  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form =
      new FormData(event.currentTarget);

    const values = {
      email: String(
        form.get("email")
      ),

      password: String(
        form.get("password")
      ),

      rememberMe:
        form.get("rememberMe") ===
        "on",
    };

    const validation =
      validateLogin(values);

    if (!validation.success) {
      toast.error(
        validation.message
      );

      return;
    }

    onSubmit?.(values);
  }

  return (
    <AuthForm
      title="Welcome Back"
      description="
Sign in to continue building your business with MarketSparks.
      "
      footer={
        <p
          className="
            text-center
            text-[13px]
            text-[var(--foreground-muted)]
          "
        >
          Don't have an account?{" "}

          <button
            type="button"
            onClick={onRegister}
            className="
              font-semibold
              text-[var(--primary)]
              transition-colors
              duration-300
              hover:opacity-80
            "
          >
            Create one
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
          value="login"
          onChange={(value) => {
            if (
              value ===
              "register"
            ) {
              onRegister?.();
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
        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          autoComplete="email"
          required
          leftIcon={
            <Mail size={17} />
          }
        />

        <PasswordField
          id="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <label
            className="
              flex
              cursor-pointer
              items-center
              gap-2
              text-[13px]
              text-[var(--foreground-muted)]
            "
          >
            <input
              type="checkbox"
              name="rememberMe"
              className="
                h-4
                w-4
                rounded
                border-[var(--border)]
                accent-[var(--primary)]
              "
            />

            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="
              text-[13px]
              font-medium
              text-[var(--primary)]
              transition-opacity
              duration-300
              hover:opacity-80
            "
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton
          type="submit"
          loading={loading}
          loadingText="Signing In..."
          rightIcon={
            <ArrowRight
              size={17}
            />
          }
        >
          Sign In
        </AuthButton>

        <AuthDivider
          label="or continue with"
        />

        <AuthButton
          type="button"
          variant="secondary"
        >
          Continue with Google
        </AuthButton>
      </form>
    </AuthForm>
  );
}