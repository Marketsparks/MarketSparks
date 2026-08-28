"use client";

import type {
  KycRecord,
} from "@/components/kyc/kyc.types";

type AdminKycTableProps = {
  submissions: KycRecord[];

  onReview: (
    id: string
  ) => void;
};

export default function AdminKycTable({
  submissions,
  onReview,
}: AdminKycTableProps) {
  if (submissions.length === 0) {
    return (
      <div
        className="
          rounded-[var(--admin-card-radius)]
          border
          border-[var(--admin-empty-border)]
          bg-[var(--admin-empty-bg)]
          p-12
          text-center
          shadow-[var(--admin-empty-shadow)]
        "
      >
        <h3
          className="
            text-lg
            font-semibold
            text-[var(--admin-empty-title)]
          "
        >
          No KYC submissions found
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-[var(--admin-empty-text)]
          "
        >
          There are currently no submissions matching your filters.
        </p>
      </div>
    );
  }

  return (
<div className="overflow-x-auto">
        <table className="min-w-full">
<thead
  className="
    sticky
    top-0
    z-10
    bg-[var(--admin-table-header-bg)]
  "
>
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--admin-table-header-text)]">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--admin-table-header-text)]">
                Nationality
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--admin-table-header-text)]">
                Document
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--admin-table-header-text)]">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--admin-table-header-text)]">
                Submitted
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-[var(--admin-table-header-text)]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {submissions.map(
              (submission) => (
                <tr
                  key={submission.id}
                  className="
                    border-t
                    border-[var(--admin-table-border)]
                    transition-colors
                    duration-[var(--admin-card-transition)]
                    hover:bg-[var(--admin-table-row-hover)]
                  "
                >
                  <td className="px-6 py-4 text-[var(--admin-table-text)]">
                    {submission.firstName}{" "}
                    {submission.lastName}
                  </td>

                  <td className="px-6 py-4 text-[var(--admin-table-muted)]">
                    {submission.nationality}
                  </td>

                  <td className="px-6 py-4 text-[var(--admin-table-muted)]">
                    {submission.documentType}
                  </td>

                  <td className="px-6 py-4">
                    {submission.status}
                  </td>

                  <td className="px-6 py-4 text-[var(--admin-table-muted)]">
                    {new Date(
                      submission.submittedAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        onReview(
                          submission.id
                        )
                      }
className="
  rounded-xl
  bg-purple-600
  px-4
  py-2
  text-sm
  font-medium
  text-white
  transition-colors
  duration-200
  hover:bg-purple-700
"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
  );
}