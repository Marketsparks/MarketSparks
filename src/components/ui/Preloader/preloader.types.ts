import { ReactNode } from "react";

export type AppPreloaderProps = {
  children: ReactNode;
};

export type ShoppingBagProps = {
  glowing: boolean;
  tilted: boolean;
};

export type SparkProps = {
  active: boolean;
};

export type FloatingProductsProps = {
  active: boolean;
  onComplete?: () => void;
};

export type ParticleBurstProps = {
  active: boolean;
  onComplete?: () => void;
};

export type ProductType =
  | "headset"
  | "gift"
  | "tag";