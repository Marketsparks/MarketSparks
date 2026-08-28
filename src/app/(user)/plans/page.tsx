"use client";

import {
  useState,
} from "react";

import { toast } from "sonner";

import {
  PlanCard,
} from "@/components/Plans/PlanCard";

import {
  CurrentPlanCard,
} from "@/components/Plans/CurrentPlanCard";

import SubscribeDialog from "@/components/Plans/SubscribeDialog";

import {
  useCurrentSubscription,
} from "@/hooks/useCurrentSubscription";

import {
  getPlans,
} from "@/services/plan.service";

import {
  subscribeToPlan,
} from "@/services/subscription.client";

import type {
  SubscriptionPlan,
} from "@/types/plan.types";

import {
  useEffect,
} from "react";

import DashboardPageLayout from "@/components/dashboard/DashboardPage";
import { PageHeader } from "@/components/dashboard";



export default function PlansPage() {
  const {
    subscription,
    loading: subscriptionLoading,
    refresh,
  } = useCurrentSubscription();

const currentPriority =
  subscription?.priority ?? 0;

const hasActiveSubscription =
  !!subscription;

  const [
    plans,
    setPlans,
  ] = useState<
    SubscriptionPlan[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    selectedPlan,
    setSelectedPlan,
  ] = useState<SubscriptionPlan | null>(
    null,
  );

  const [
    subscribing,
    setSubscribing,
  ] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getPlans();

        setPlans(data.plans);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to load plans.",
        );
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  async function handleSubscribe() {
    if (!selectedPlan) {
      return;
    }

    try {
      setSubscribing(true);

await subscribeToPlan(
  selectedPlan.id,
);

      toast.success(
        "Subscription activated.",
      );

      setSelectedPlan(
        null,
      );

      await refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Subscription failed.",
      );
    } finally {
      setSubscribing(false);
    }
  }

return (
  <DashboardPageLayout
    environment="user"
    breadcrumb={[
      {
        label: "Subscription Plans",
      },
    ]}
  >
    <div className="space-y-6 pb-16">
      <PageHeader
        title=""
        description="Choose the subscription plan that best fits your affiliate business."
      />

      <CurrentPlanCard
        subscription={subscription}
        loading={subscriptionLoading}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? null : plans.map((plan) => (
<PlanCard
  key={plan.id}
  plan={plan}
  current={
    subscription?.planId ===
    plan.id
  }
  hasActiveSubscription={
    hasActiveSubscription
  }
  disabled={
    hasActiveSubscription &&
    plan.priorityLevel <=
      currentPriority &&
    subscription?.planId !==
      plan.id
  }
  onSubscribe={
    setSelectedPlan
  }
/>
        ))}
      </section>

<SubscribeDialog
  open={
    selectedPlan !==
    null
  }
  plan={
    selectedPlan
  }
  loading={
    subscribing
  }
  hasActiveSubscription={
    hasActiveSubscription
  }
  onClose={() =>
    setSelectedPlan(
      null,
    )
  }
  onConfirm={
    handleSubscribe
  }
/>
    </div>
  </DashboardPageLayout>
);
}