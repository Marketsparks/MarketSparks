"use client";

import type {
  AffiliateOverview,
} from "@/types/affiliate.types";

type EarningsSummaryCardProps = {
  overview: AffiliateOverview;
};

export default function EarningsSummaryCard({
  overview,
}: EarningsSummaryCardProps) {
  return (
    <section
      className="
        rounded-[var(--user-radius-md)]
        border
        p-4
      "
      style={{
        background:
          "var(--user-card-bg)",
        borderColor:
          "var(--user-card-border)",
        boxShadow:
          "var(--user-card-shadow)",
      }}
    >
      <div className="mb-4">
        <h2
          className="text-base font-semibold"
          style={{
            color:
              "var(--user-title)",
          }}
        >
          Earnings Overview
        </h2>

        <p
          className="mt-1 text-xs"
          style={{
            color:
              "var(--user-text-muted)",
          }}
        >
          Your affiliate performance at a glance.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric
          label="Published"
          value={overview.totalPublishedProducts.toLocaleString()}
        />

        <Metric
          label="Sales"
          value={overview.totalSales.toLocaleString()}
        />

        <Metric
          label="Revenue"
          value={`$${overview.totalRevenue.toLocaleString()}`}
        />

        <Metric
          label="Commission"
          value={`$${overview.totalCommission.toLocaleString()}`}
        />
      </div>
    </section>
  );
}

type MetricProps = {
  label: string;
  value: string;
};

function Metric({
  label,
  value,
}: MetricProps) {
  return (
    <div
      className="
        rounded-[var(--user-radius-sm)]
        border
        px-3
        py-3
      "
      style={{
        background:
          "var(--user-surface)",
        borderColor:
          "var(--user-divider)",
      }}
    >
      <p
        className="text-[11px]"
        style={{
          color:
            "var(--user-text-muted)",
        }}
      >
        {label}
      </p>

      <p
        className="mt-1 truncate text-sm font-semibold"
        style={{
          color:
            "var(--user-title)",
        }}
      >
        {value}
      </p>
    </div>
  );
}