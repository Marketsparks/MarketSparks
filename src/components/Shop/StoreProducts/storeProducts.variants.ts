import type {
  StoreProductVariant,
} from "./storeProducts.types";

export type StoreProductVariantStyles = {
  imageAspectRatio: string;

  imageSizes: string;

  contentPadding: string;

  title: string;

  titleMarginTop: string;

  ratingMarginTop: string;

  price: string;

  oldPrice: string;

  review: string;

  badge: {
    minWidth: number;

    height: number;

    fontSize: number;

    top: number;

    right: number;
  };

  actions: {
    buttonSize: number;

    iconSize: number;

    right: number;
  };
};

export const STORE_PRODUCT_VARIANTS: Record<
  StoreProductVariant,
  StoreProductVariantStyles
> = {
  default: {
    imageAspectRatio: "5 / 6",

    imageSizes:
      "(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw",

    contentPadding:
      "px-5 pt-2 pb-2",

    title:
      "text-[16px] lg:text-[17px]",

    titleMarginTop: "mt-1",

    ratingMarginTop: "mt-5",

    price: "text-[17px]",

    oldPrice: "text-[14px]",

    review: "text-[14px]",

    badge: {
      minWidth: 40,

      height: 26,

      fontSize: 12,

      top: 16,

      right: 16,
    },

    actions: {
      buttonSize: 42,

      iconSize: 20,

      right: 16,
    },
  },

compact: {
  imageAspectRatio: "4 / 5",

  imageSizes:
    "(max-width:768px) 48vw, (max-width:1200px) 28vw, 18vw",

  contentPadding:
    "px-3 pt-3.5 pb-3",

  title:
    "text-[11px] lg:text-[12px] font-semibold leading-[1.3]",

  titleMarginTop: "mt-0.5",

  ratingMarginTop: "mt-0",

  price: "text-[12px]",

  oldPrice: "text-[10px]",

  review: "text-[10px]",

  badge: {
    minWidth: 30,

    height: 20,

    fontSize: 10,

    top: 10,

    right: 10,
  },

  actions: {
    buttonSize: 32,

    iconSize: 16,

    right: 10,
  },
},
};