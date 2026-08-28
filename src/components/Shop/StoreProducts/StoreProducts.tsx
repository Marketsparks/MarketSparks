import { Container } from "@/components/layout";

import type {
  ProductCard,
} from "@/lib/products/product.types";

import type {
  AppEnvironment,
} from "@/types/environment";

import StoreProductCard from "./StoreProductCard";

type StoreProductsProps = {
  products: ProductCard[];

  environment?: AppEnvironment;

  variant?: "default" | "compact";

  showHeading?: boolean;

  useContainer?: boolean;

  gridClassName?: string;

  eyebrow?: string;

  title?: string;

  subtitle?: string;

  sectionClassName?: string;
};

export default function StoreProducts({
  products,

  environment = "public",

  variant = "default",

  showHeading = true,

  useContainer = true,

  gridClassName,

  sectionClassName,

  eyebrow = "Store Products",

  title = "Our Store Products",

  subtitle =
    "Discover our most popular products, carefully selected for their quality, performance, and exceptional value.",
}: StoreProductsProps) {
  const sectionClasses =
    environment === "user"
      ? `
          pt-0

          pb-8

          lg:pb-12
        `
      : `
          py-16

          md:py-20

          lg:py-24
        `;

  const content = (
    <>
      {showHeading && (
        <div
          className="
            mx-auto

            mb-12

            max-w-[700px]

            px-4

            text-center

            md:mb-14
          "
        >
          <span
            className="
              text-[18px]

              font-extrabold

              leading-none

              text-[#5658EC]

              sm:text-[19px]

              lg:text-[20px]
            "
          >
            {eyebrow}
          </span>

          <h2
            className="
              mt-3

              text-[30px]

              font-extrabold

              leading-[1.1]

              text-[var(--foreground)]

              sm:text-[36px]

              md:text-[44px]

              lg:text-[40px]
            "
          >
            {title}
          </h2>

          <p
            className="
              mx-auto

              mt-5

              max-w-[640px]

              text-[15px]

              leading-7

              text-[var(--foreground-muted)]

              sm:text-[16px]

              md:text-[17px]

              lg:text-[18px]
            "
          >
            {subtitle}
          </p>
        </div>
      )}

      <div
        className={
          gridClassName ??
          `
            grid

            content-start

            gap-6

            sm:grid-cols-2

            lg:grid-cols-3

            2xl:grid-cols-4
          `
        }
      >
        {products.map((product) => (
          <StoreProductCard
            key={product.id}
            product={product}
            variant={variant}
            environment={environment}
          />
        ))}
      </div>
    </>
  );

  if (!showHeading) {
    return useContainer ? (
      <Container>
        {content}
      </Container>
    ) : (
      content
    );
  }

  const wrappedContent =
    useContainer ? (
      <Container>
        {content}
      </Container>
    ) : (
      content
    );

  return (
    <section
      className={
        sectionClassName ??
        sectionClasses
      }
      style={{
        background:
          "var(--store-products-bg)",
      }}
    >
      {wrappedContent}
    </section>
  );
}