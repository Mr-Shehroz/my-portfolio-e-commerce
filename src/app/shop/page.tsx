// app/shop/page.tsx (or pages/shop.tsx)
import Shop from "@/components/shop";
import { client } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";

interface Brand {
  title: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number;
  stock?: number;
  images: any[];
  status?: "new" | "hot" | "sale";
  brand?: Brand;
  _createdAt: string;
  variant?: "cricket" | "badminton" | "basketball" | "football" | "other";
}

export default async function ShopPage() {
  // Fetch products from Sanity
  const products: Product[] = await client.fetch(productsQuery);

  return <Shop products={products} />;
}
