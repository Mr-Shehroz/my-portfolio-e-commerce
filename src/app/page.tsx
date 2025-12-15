import Categories from "@/components/categories";
import FeaturedBrands from "@/components/featuredbrands";
import Hero from "@/components/hero";
import NewArrivals from "@/components/newarrival";
import ProductCard from "@/components/productcard";
import Subscription from "@/components/subscription";
import Testimonials from "@/components/testimonial";

export default function Home() {
  return (
    <section>
      <Hero />
      <ProductCard />
      <NewArrivals />
      <FeaturedBrands />
      <Categories />
      <Subscription />
      <Testimonials />
    </section>
  );
}
