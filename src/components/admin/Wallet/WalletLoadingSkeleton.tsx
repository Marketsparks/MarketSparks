"use client";

export default function WalletLoadingSkeleton() {
  return (
    <div
      className="
        overflow-hidden

        rounded-[var(--admin-card-radius)]

        border

        border-[var(--admin-card-border)]

        bg-[var(--admin-card-bg)]

        shadow-[var(--admin-card-shadow)]
      "
    >
      <div
        className="
          animate-pulse

          overflow-x-auto
        "
      >
        <table
          className="
            min-w-[960px]

            w-full
          "
        >
          <thead>
            <tr
              className="
                border-b

                border-[var(--admin-table-border)]

                bg-[var(--admin-table-header-bg)]
              "
            >
              {Array.from({
                length: 5,
              }).map((_, index) => (
                <th
                  key={index}
                  className="px-6 py-5"
                >
                  <div
                    className="
                      h-4

                      w-20

                      rounded

                      bg-[var(--admin-surface-bg)]
                    "
                  />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({
              length: 8,
            }).map((_, index) => (
              <tr
                key={index}
                className="
                  border-b

                  border-[var(--admin-table-border)]
                "
              >
                <td className="px-6 py-5">
                  <div className="space-y-2">
                    <div
                      className="
                        h-4

                        w-36

                        rounded

                        bg-[var(--admin-surface-bg)]
                      "
                    />

                    <div
                      className="
                        h-3

                        w-24

                        rounded

                        bg-[var(--admin-surface-bg)]
                      "
                    />
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div
                    className="
                      h-4

                      w-56

                      rounded

                      bg-[var(--admin-surface-bg)]
                    "
                  />
                </td>

                <td className="px-6 py-5">
                  <div
                    className="
                      h-4

                      w-28

                      rounded

                      bg-[var(--admin-surface-bg)]
                    "
                  />
                </td>

                <td className="px-6 py-5">
                  <div
                    className="
                      h-8

                      w-24

                      rounded-full

                      bg-[var(--admin-surface-bg)]
                    "
                  />
                </td>

                <td className="px-6 py-5 text-right">
                  <div
                    className="
                      ml-auto

                      h-10

                      w-24

                      rounded-xl

                      bg-[var(--admin-surface-bg)]
                    "
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}