export default function LoadingSkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border
        border-[var(--admin-card-border)]
        bg-[var(--admin-card-bg)]
        shadow-[var(--admin-card-shadow)]
      "
    >
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full border-collapse">
          <thead>
            <tr
              className="
                border-b
                border-[var(--admin-table-border)]
                bg-[var(--admin-table-header-bg)]
              "
            >
              {[
                "Order",
                "Customer",
                "Total",
                "Payment",
                "Payment Status",
                "Order Status",
                "Created",
                "View",
              ].map((label) => (
                <th
                  key={label}
                  className="
                    px-4
                    py-3.5
                    text-left
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.08em]
                    text-[var(--admin-table-header-text)]
                  "
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <tr
                key={index}
                className="
                  border-b
                  border-[var(--admin-table-border)]
                "
              >
                {Array.from({
                  length: 8,
                }).map(
                  (_, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-4"
                    >
                      <div
                        className="
                          h-3
                          rounded
                          bg-[var(--admin-table-header-bg)]
                          animate-pulse
                        "
                      />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}