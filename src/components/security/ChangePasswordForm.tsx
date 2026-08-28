"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import {
  useForm,
} from "react-hook-form";

import { toast } from "sonner";

import PasswordField from "@/components/auth/PasswordField";

import {
  changePassword,
} from "./security.service";

import {
  changePasswordSchema,
  type ChangePasswordValues,
} from "./security.validation";

export default function ChangePasswordForm() {
  const router =
    useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<ChangePasswordValues>({
      resolver:
        zodResolver(
          changePasswordSchema,
        ),
    });

  async function onSubmit(
    values: ChangePasswordValues,
  ) {
    try {
      const response =
        await changePassword(values);

      toast.success(
        response.message,
      );

      reset();

      setTimeout(() => {
        router.replace("/Auth");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to change password.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit,
      )}
      className="
        space-y-4
      "
    >
      <PasswordField
        {...register(
          "currentPassword",
        )}
        id="currentPassword"
        label="Current Password"
        placeholder="Enter your current password"
        autoComplete="current-password"
        error={
          errors.currentPassword
            ?.message
        }
        required
        disabled={isSubmitting}
      />

      <PasswordField
        {...register(
          "newPassword",
        )}
        id="newPassword"
        label="New Password"
        placeholder="Create a new password"
        autoComplete="new-password"
        error={
          errors.newPassword
            ?.message
        }
        required
        disabled={isSubmitting}
        showStrength
      />

      <PasswordField
        {...register(
          "confirmPassword",
        )}
        id="confirmPassword"
        label="Confirm New Password"
        placeholder="Confirm your new password"
        autoComplete="new-password"
        error={
          errors.confirmPassword
            ?.message
        }
        required
        disabled={isSubmitting}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          h-10
          w-full
          rounded-lg
          bg-[var(--user-button-bg)]
          px-4
          text-sm
          font-semibold
          text-[var(--user-button-text)]
          transition-colors
          duration-[var(--user-transition)]
          hover:bg-[var(--user-button-hover)]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isSubmitting
          ? "Updating..."
          : "Update Password"}
      </button>
    </form>
  );
}