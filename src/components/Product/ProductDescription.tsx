"use client";

type ProductDescriptionProps = {
  description: string;
};

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  return (
    <section
      className="
        rounded-2xl

        border

        border-[var(--border)]

        bg-[var(--surface)]

        p-5

        transition-colors
        duration-300

        lg:p-6
      "
    >
      <h2
        className="
          text-[18px]

          font-bold

          tracking-[-0.02em]

          text-[var(--foreground)]
        "
      >
        Product Description
      </h2>

      <div
        className="
          mt-4

          space-y-4

          text-[14px]

          leading-7

          text-[var(--foreground-muted)]
        "
      >
        {description
          .split("\n")
          .filter(Boolean)
          .map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
      </div>
    </section>
  );
}