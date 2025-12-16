import Hero from "@/components/hero";
import NewArrivals from "@/components/newarrival";
import FeaturedBrands from "@/components/featuredbrands";
import Categories from "@/components/categories";
import Subscription from "@/components/subscription";
import Testimonials from "@/components/testimonial";
import ProductsByVariant from "@/components/productsbyvariant";

import { client } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";

export default async function Home() {
  const products = await client.fetch(productsQuery);

  return (
    <section>
      <Hero />
      <ProductsByVariant products={products} />
      <NewArrivals products={products} />
      <FeaturedBrands />
      <Categories />
      <Subscription />
      <Testimonials />
    </section>
  );
}
