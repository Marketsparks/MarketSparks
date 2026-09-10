export interface FeaturedProductData {
  subtitle: string;

  title: string;

  price: string;

  discount?: string;

  description: string;

  button: {
    label: string;

    href: string;
  };

  image: {
    src: string;

    alt: string;
  };
}