"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import type {
  CurrentSubscriptionResponse,
  UserSubscription,
} from "@/types/subscription.types";

import { useAuth } from "@/context/AuthContext";

type UseCurrentSubscriptionResult = {
  subscription: UserSubscription | null;

  loading: boolean;

  error: string | null;

  refresh: () => Promise<UserSubscription | null>;
};

export function useCurrentSubscription(): UseCurrentSubscriptionResult {
  const {
    user,
    loading: authLoading,
  } = useAuth();

  const [
    subscription,
    setSubscription,
  ] = useState<UserSubscription | null>(
    null,
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  const fetchSubscription =
    useCallback(
      async (): Promise<UserSubscription | null> => {
        if (authLoading) {
          return null;
        }

        if (!user) {
          setSubscription(null);

          setError(null);

          setLoading(false);

          return null;
        }

        try {
          setLoading(true);

          setError(null);

          const response =
            await fetch(
              "/api/subscriptions/current",
              {
                credentials:
                  "include",

                cache: "no-store",
              },
            );

          const data =
            (await response.json()) as
              | CurrentSubscriptionResponse
              | {
                  success: false;
                  error?: string;
                };

          if (!response.ok) {
            throw new Error(
              "error" in data &&
                typeof data.error ===
                  "string"
                ? data.error
                : "Failed to load subscription.",
            );
          }

          const currentSubscription =
            "subscription" in data
              ? data.subscription
              : null;

          setSubscription(
            currentSubscription,
          );

          return currentSubscription;
        } catch (error) {
          setSubscription(null);

          setError(
            error instanceof Error
              ? error.message
              : "Something went wrong.",
          );

          return null;
        } finally {
          setLoading(false);
        }
      },
      [
        authLoading,
        user,
      ],
    );

  useEffect(() => {
    void fetchSubscription();
  }, [fetchSubscription]);

  return {
    subscription,

    loading:
      authLoading || loading,

    error,

    refresh:
      fetchSubscription,
  };
}