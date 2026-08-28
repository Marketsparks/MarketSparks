import Link from "next/link";

import {
  ArrowRight,
  Package,
} from "lucide-react";

type Listing = {
  id: string;

  submittedAt: Date | null;

  user: {
    firstName: string;

    lastName: string;
  };

  product: {
    id: string;

    name: string;
  };
};

type AdminAffiliateProductsProps = {
  listings: Listing[];
};

export default function AdminAffiliateProducts({
  listings,
}: AdminAffiliateProductsProps) {
  return (
    <section
      className="
        rounded-[var(--admin-card-radius)]
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
        p-[var(--admin-card-padding)]
        shadow-[var(--admin-card-shadow)]
      "
    >
      <div
        className="
          mb-5
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h2
            className="
              text-base
              font-semibold
              text-[var(--admin-title)]
            "
          >
            Affiliate Products
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-[var(--admin-muted)]
            "
          >
            Awaiting review.
          </p>
        </div>

        <Link
          href="/admin/affiliate"
          className="
            flex
            items-center
            gap-1
            text-xs
            font-medium
            text-[var(--admin-primary)]
            transition-opacity
            duration-[var(--admin-transition)]
            hover:opacity-80
          "
        >
          View All

          <ArrowRight size={14} />
        </Link>
      </div>

      {listings.length === 0 ? (
        <div
          className="
            rounded-[var(--admin-surface-radius)]
            border
            border-[var(--admin-surface-border)]
            bg-[var(--admin-surface-bg)]
            py-10
            text-center
          "
        >
          <div
            className="
              mx-auto
              mb-3
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-[var(--admin-stat-bg)]
              border
              border-[var(--admin-stat-border)]
            "
          >
            <Package
              size={18}
              className="
                text-[var(--admin-primary)]
              "
            />
          </div>

          <p
            className="
              text-sm
              font-medium
              text-[var(--admin-title)]
            "
          >
            No products awaiting review.
          </p>
        </div>
      ) : (
        <div
          className="
            divide-y
            divide-[var(--admin-card-border)]
          "
        >
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/admin/affiliate/${listing.id}`}
              className="
                flex
                items-center
                justify-between
                gap-4
                py-4
                transition-opacity
                duration-[var(--admin-transition)]
                hover:opacity-80
              "
            >
              <div
                className="
                  min-w-0
                  flex-1
                "
              >
                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-[var(--admin-title)]
                  "
                >
                  {listing.product.name}
                </p>

                <p
                  className="
                    mt-1
                    truncate
                    text-xs
                    text-[var(--admin-muted)]
                  "
                >
                  Submitted by{" "}
                  {listing.user.firstName}{" "}
                  {listing.user.lastName}
                </p>
              </div>

              <ArrowRight
                size={16}
                className="
                  shrink-0
                  text-[var(--admin-muted)]
                "
              />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}