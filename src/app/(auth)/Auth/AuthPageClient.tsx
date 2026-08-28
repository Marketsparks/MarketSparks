"use client";

import { useState } from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { toast } from "sonner";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  AuthLayout,
  AuthTabs,
  LoginForm,
  RegisterForm,
} from "@/components/auth";

import type {
  RegisterFormValues,
} from "@/components/auth/RegisterForm";

import {
  useAuth,
} from "@/context/AuthContext";

import {
  useCartContext,
} from "@/context/CartContext";

import {
  submitAffiliateProduct,
} from "@/services/affiliate-api.service";

type LoginSuccessResponse = {
  success: true;

  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "USER" | "ADMIN";
    status: string;
  };
};

type LoginErrorResponse = {
  success: false;

  error?: string;

  code?: string;

  email?: string;
};

type LoginResponse =
  | LoginSuccessResponse
  | LoginErrorResponse;

export default function AuthPageClient() {
  const router =
    useRouter();

  const {
    refresh:
      refreshAuth,
  } = useAuth();

  const searchParams =
    useSearchParams();

  const redirect =
    searchParams.get(
      "redirect",
    );

  const wishlistProduct =
    searchParams.get(
      "wishlistProduct",
    );

  const affiliateProduct =
    searchParams.get(
      "affiliateProduct",
    );

  const {
    openCart,
  } = useCartContext();

  const [
    mode,
    setMode,
  ] = useState<
    "login" | "register"
  >("login");

  const [
    loading,
    setLoading,
  ] = useState(false);

  async function saveWishlistProduct(
    productId: string,
  ) {
    const response =
      await fetch(
        "/api/wishlist",
        {
          method:
            "POST",

          credentials:
            "include",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({
              productId,
            }),
        },
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ??
          "Unable to save product to wishlist.",
      );
    }
  }

  async function submitAffiliateProductAfterLogin(
    productId: string,
  ) {
    const subscriptionResponse =
      await fetch(
        "/api/subscriptions/current",
        {
          credentials:
            "include",

          cache:
            "no-store",
        },
      );

    const subscriptionData =
      await subscriptionResponse.json();

    if (
      !subscriptionResponse.ok
    ) {
      throw new Error(
        subscriptionData.error ??
          "Unable to verify your subscription.",
      );
    }

    if (
      !subscriptionData.subscription ||
      subscriptionData.subscription.status !==
        "ACTIVE"
    ) {
      toast.info(
        "You need an active subscription plan to become an affiliate.",
      );

      router.push(
        "/plans",
      );

      return false;
    }

    await submitAffiliateProduct(
      productId,
    );

    toast.success(
      "Product submitted for admin review.",
    );

    router.push(
      "/affiliate",
    );

    return true;
  }

  async function handleLogin(
    values: {
      email: string;
      password: string;
      rememberMe: boolean;
    },
  ) {
    try {
      setLoading(
        true,
      );

      const response =
        await fetch(
          "/api/auth/login",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                values,
              ),
          },
        );

      const data =
        (await response.json()) as LoginResponse;

      if (!response.ok) {
        if (
          data.success ===
            false &&
          data.code ===
            "EMAIL_NOT_VERIFIED"
        ) {
          if (data.email) {
            router.push(
              `/verify-email?email=${encodeURIComponent(
                data.email,
              )}`,
            );
          }

          return;
        }

        toast.error(
          data.success ===
            false &&
            data.error
            ? data.error
            : "Unable to sign in",
        );

        return;
      }

      if (
        data.success !==
          true ||
        !data.user
      ) {
        toast.error(
          "Unable to sign in. Please try again.",
        );

        return;
      }

      await refreshAuth();

      const wantsCart =
        redirect ===
        "/checkout";

      if (wantsCart) {
        openCart();

        router.push(
          "/Dashboard",
        );

        return;
      }

      if (
        affiliateProduct &&
        data.user.role !==
          "ADMIN"
      ) {
        try {
          await submitAffiliateProductAfterLogin(
            affiliateProduct,
          );
        } catch (
          error
        ) {
          console.error(
            "Affiliate submission after login failed:",
            error,
          );

          toast.error(
            error instanceof
              Error
              ? error.message
              : "Unable to submit this product for review.",
          );
        }

        return;
      }

      if (
        wishlistProduct &&
        data.user.role !==
          "ADMIN"
      ) {
        try {
          await saveWishlistProduct(
            wishlistProduct,
          );

          toast.success(
            "Product saved to wishlist.",
          );
        } catch (
          error
        ) {
          console.error(
            "Wishlist save after login failed:",
            error,
          );

          toast.error(
            error instanceof
              Error
              ? error.message
              : "Unable to save product to wishlist.",
          );
        }
      } else {
        toast.success(
          "Signed in successfully",
        );
      }

      const destination =
        data.user.role ===
        "ADMIN"
          ? "/admin"
          : wishlistProduct
            ? "/wishlist"
            : redirect ??
              "/Dashboard";

      router.push(
        destination,
      );
    } catch (
      error
    ) {
      console.error(
        "Login request error:",
        error,
      );

      toast.error(
        "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(
        false,
      );
    }
  }

  async function handleRegister(
    values: RegisterFormValues,
  ) {
    try {
      setLoading(
        true,
      );

      const response =
        await fetch(
          "/api/auth/register",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                firstName:
                  values.firstName,

                lastName:
                  values.lastName,

                email:
                  values.email,

                phoneNumber:
                  values.phoneNumber,

                country:
                  values.country,

                password:
                  values.password,

                confirmPassword:
                  values.confirmPassword,

                heardFrom:
                  values.heardFrom,

                acceptedTerms:
                  values.acceptedTerms,
              }),
          },
        );

      const data: unknown =
        await response.json();

      if (
        typeof data !==
          "object" ||
        data === null
      ) {
        toast.error(
          "Unable to create your account. Please try again.",
        );

        return;
      }

      if (!response.ok) {
        const errorMessage =
          "error" in data &&
          typeof data.error ===
            "string"
            ? data.error
            : "Unable to create your account. Please try again.";

        toast.error(
          errorMessage,
        );

        return;
      }

      toast.success(
        "Account created successfully. Please check your email to verify your account.",
      );

      router.push(
        `/verify-email?email=${encodeURIComponent(
          values.email,
        )}`,
      );
    } catch (
      error
    ) {
      console.error(
        "Registration request error:",
        error,
      );

      toast.error(
        "Unable to create your account. Please try again.",
      );
    } finally {
      setLoading(
        false,
      );
    }
  }

  function handleModeChange(
    nextMode:
      | "login"
      | "register",
  ) {
    if (loading) {
      return;
    }

    setMode(
      nextMode,
    );
  }

return (
  <AuthLayout>
    <AnimatePresence
      mode="wait"
    >
      <motion.div
        key={mode}
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -18,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        {mode ===
        "login" ? (
          <LoginForm
            loading={
              loading
            }
            onSubmit={
              handleLogin
            }
            onRegister={() =>
              handleModeChange(
                "register",
              )
            }
          />
        ) : (
          <RegisterForm
            loading={
              loading
            }
            onSubmit={
              handleRegister
            }
            onSignIn={() =>
              handleModeChange(
                "login",
              )
            }
          />
        )}
      </motion.div>
    </AnimatePresence>
  </AuthLayout>
);
}