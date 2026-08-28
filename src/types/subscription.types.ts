export type SubscriptionStatus =
  | "ACTIVE"
  | "EXPIRED"
  | "CANCELLED";

export type UserSubscription = {
  id: string;

  userId: string;

  planId: string;

  amountPaid: number;

  commissionRate: number;

  maxPublishedProducts: number;

  priority: number;

  badgeName: string;

  badgeColor: string;

  status: SubscriptionStatus;

  startsAt: string;

  expiresAt: string;

  cancelledAt: string | null;

  createdAt: string;

  updatedAt: string;
};

export type CurrentSubscriptionResponse = {
  subscription: UserSubscription | null;
};

export type SubscribeInput = {
  planId: string;
};

export type SubscribeResponse = {
  message: string;

  subscription: UserSubscription;
};