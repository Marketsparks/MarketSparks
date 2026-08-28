"use client";

export default function WalletPageHeader() {
  return (
    <header
      className="
        flex

        flex-col

        gap-2
      "
    >
      <h1
        className="
          text-2xl

          font-bold

          tracking-tight

          text-[var(--admin-title)]

          sm:text-3xl
        "
      >
        Wallet Management
      </h1>

      <p
        className="
          max-w-2xl

          text-sm

          leading-6

          text-[var(--admin-muted)]

          sm:text-base
        "
      >
        Search for any user and instantly credit or debit their wallet balance.
      </p>
    </header>
  );
}