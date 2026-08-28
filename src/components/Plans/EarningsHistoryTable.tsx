"use client";

import type {
  AffiliateListing,
} from "@/types/affiliate.types";

type EarningsHistoryTableProps = {
  listings: AffiliateListing[];
};

export default function EarningsHistoryTable({
  listings,
}: EarningsHistoryTableProps) {
  if (listings.length === 0) {
    return (
      <section
        className="
          rounded-[var(--user-radius-md)]
          border
          p-6
          text-center
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
        <h3
          className="text-base font-semibold"
          style={{
            color:
              "var(--user-title)",
          }}
        >
          No earnings yet
        </h3>

        <p
          className="mt-2 text-sm"
          style={{
            color:
              "var(--user-text-muted)",
          }}
        >
          Your affiliate sales will appear here once you start making commissions.
        </p>
      </section>
    );
  }

  return (
    <section
      className="
        overflow-hidden
        rounded-[var(--user-radius-md)]
        border
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
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead
            style={{
              background:
                "var(--user-surface)",
            }}
          >
            <tr>
              <Header>
                Publication
              </Header>

              <Header>
                Sales
              </Header>

              <Header>
                Revenue
              </Header>

              <Header>
                Commission
              </Header>

              <Header>
                Last Sale
              </Header>

              <Header>
                Published
              </Header>
            </tr>
          </thead>

          <tbody>
            {listings.map(
              (listing) => {
                const publishedDate =
                  listing.publishedAt
                    ? new Date(
                        listing.publishedAt,
                      ).toLocaleDateString()
                    : "Not published";

                return (
                  <tr
                    key={
                      listing.id
                    }
                    className="border-t"
                    style={{
                      borderColor:
                        "var(--user-divider)",
                    }}
                  >
                    <Cell>
                      {formatPublicationStatus(
                        listing.publicationStatus,
                      )}
                    </Cell>

                    <Cell>
                      {listing.totalSales.toLocaleString()}
                    </Cell>

                    <Cell>
                      $
                      {listing.totalRevenue.toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits:
                            2,
                          maximumFractionDigits:
                            2,
                        },
                      )}
                    </Cell>

                    <Cell>
                      $
                      {listing.totalCommission.toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits:
                            2,
                          maximumFractionDigits:
                            2,
                        },
                      )}
                    </Cell>

                    <Cell>
                      {listing.lastSaleAt
                        ? new Date(
                            listing.lastSaleAt,
                          ).toLocaleDateString()
                        : "Never"}
                    </Cell>

                    <Cell>
                      {
                        publishedDate
                      }
                    </Cell>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function formatPublicationStatus(
  status:
    | "DRAFT"
    | "SUBMITTED"
    | "IN_REVIEW"
    | "APPROVED"
    | "REJECTED"
    | "PUBLISHED",
) {
  switch (status) {
    case "DRAFT":
      return "Draft";

    case "SUBMITTED":
      return "Submitted";

    case "IN_REVIEW":
      return "In Review";

    case "APPROVED":
      return "Approved";

    case "REJECTED":
      return "Rejected";

    case "PUBLISHED":
      return "Published";

    default:
      return status;
  }
}

function Header({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th
      className="
        px-4
        py-3
        text-left
        text-xs
        font-semibold
      "
      style={{
        color:
          "var(--user-text-muted)",
      }}
    >
      {children}
    </th>
  );
}

function Cell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <td
      className="
        px-4
        py-3
        text-sm
      "
      style={{
        color:
          "var(--user-title)",
      }}
    >
      {children}
    </td>
  );
}