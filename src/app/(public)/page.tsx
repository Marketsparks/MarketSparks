import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import HomeStoreProducts from "@/components/home/HomeStoreProducts";
import Experience from "@/components/home/Experience";
import PricingPlans from "@/components/home/PricingPlans";
import Newsletter from "@/components/home/Newsletter";
import FAQ from "@/components/home/FAQ";
import Testimonials from "@/components/home/Testimonials";
import Blog from "@/components/home/Blog";

import NewsletterGate from "@/components/newsletter/NewsletterGate";

import {
  getPublishedProducts,
} from "@/lib/products/product.service";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  const products =
    await getPublishedProducts();

  const featuredProducts =
    products.filter(
      (product) =>
        product.featured &&
        product.status === "ACTIVE",
    );

  return (
    <>
      <NewsletterGate />

      <Hero />

      <FeaturedProduct />

      <HomeStoreProducts
        products={
          featuredProducts
        }
      />

      <Experience />

      <PricingPlans />

      <Newsletter />

      <FAQ />

      <Testimonials />

      <Blog />
    </>
  );
}