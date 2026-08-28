"use client";

import {
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

type ProductShippingProps = {
  shippingMethod: string;

  estimatedDelivery: string;

  returnPolicy: string;
};

export default function ProductShipping({
  shippingMethod,
  estimatedDelivery,
  returnPolicy,
}: ProductShippingProps) {
  return (
    <div
      className="
        mt-6

        rounded-xl

        border

        border-[var(--border)]

        bg-[var(--surface)]

        p-4
      "
    >
      <div
        className="
          space-y-4
        "
      >
        {/* Shipping */}

        <div
          className="
            flex

            items-start

            gap-3
          "
        >
          <div
            className="
              flex

              h-9

              w-9

              shrink-0

              items-center

              justify-center

              rounded-lg

              bg-[var(--primary)]/10

              text-[var(--primary)]
            "
          >
            <Truck
              size={17}
              strokeWidth={2.2}
            />
          </div>

          <div>
            <h3
              className="
                text-[14px]

                font-semibold

                text-[var(--foreground)]
              "
            >
              Shipping
            </h3>

            <p
              className="
                mt-0.5

                text-[13px]

                leading-6

                text-[var(--foreground-muted)]
              "
            >
              {shippingMethod}
            </p>

            <p
              className="
                mt-0.5

                text-[12px]

                font-medium

                text-[var(--primary)]
              "
            >
              Estimated delivery:
              {" "}
              {estimatedDelivery}
            </p>
          </div>
        </div>

        {/* Returns */}

        <div
          className="
            flex

            items-start

            gap-3
          "
        >
          <div
            className="
              flex

              h-9

              w-9

              shrink-0

              items-center

              justify-center

              rounded-lg

              bg-[var(--primary)]/10

              text-[var(--primary)]
            "
          >
            <RotateCcw
              size={17}
              strokeWidth={2.2}
            />
          </div>

          <div>
            <h3
              className="
                text-[14px]

                font-semibold

                text-[var(--foreground)]
              "
            >
              Returns
            </h3>

            <p
              className="
                mt-0.5

                text-[13px]

                leading-6

                text-[var(--foreground-muted)]
              "
            >
              {returnPolicy}
            </p>
          </div>
        </div>

        {/* Buyer Protection */}

        <div
          className="
            flex

            items-start

            gap-3
          "
        >
          <div
            className="
              flex

              h-9

              w-9

              shrink-0

              items-center

              justify-center

              rounded-lg

              bg-[var(--primary)]/10

              text-[var(--primary)]
            "
          >
            <ShieldCheck
              size={17}
              strokeWidth={2.2}
            />
          </div>

          <div>
            <h3
              className="
                text-[14px]

                font-semibold

                text-[var(--foreground)]
              "
            >
              Buyer Protection
            </h3>

            <p
              className="
                mt-0.5

                text-[13px]

                leading-6

                text-[var(--foreground-muted)]
              "
            >
              Every purchase is protected through our secure checkout process
              and verified merchant network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}