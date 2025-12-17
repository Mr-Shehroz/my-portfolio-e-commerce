// app/category/[slug]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// Types
interface Brand {
  title: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number;
  images: any[];
  status?: "new" | "hot" | "sale";
  brand?: Brand;
}

interface Category {
  title: string;
  description?: string;
  image?: any;
}

const CategoryPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        // Fetch category info
        const categoryQuery = `*[_type == "category" && slug.current == $slug][0]{
          title,
          description,
          "image": image.asset->url
        }`;
        const categoryData = await client.fetch(categoryQuery, { slug });
        
        if (!categoryData) {
          setError("Category not found");
          setLoading(false);
          return;
        }

        setCategory(categoryData);

        // Fetch products in this category
        const productQuery = `*[_type == "product" && variant == $slug] | order(_createdAt desc){
          _id,
          name,
          "slug": slug.current,
          price,
          discount,
          status,
          "images": images[].asset->url,
          brand->{
            title
          }
        }`;
        const productData = await client.fetch(productQuery, { slug });
        setProducts(productData);
      } catch (err) {
        console.error(err);
        setError("Failed to load category");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading category...
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4">
        <ShoppingCart className="w-16 h-16 text-gray-600 mb-6" />
        <h1 className="text-2xl font-bold mb-2">Category Not Found</h1>
        <p className="text-gray-400 mb-6">{error || "The category you're looking for doesn't exist."}</p>
        <Link href="/shop" className="text-red-500 hover:text-red-400 font-semibold">
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white relative min-h-screen">
      {/* Background Glow — matches your design system */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
      </div>

      {/* Hero Banner */}
      <section className="relative py-32 md:py-40 w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {category.image ? (
            <img
              src={urlFor(category.image).width(1920).url()}
              alt={category.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-r from-red-900/20 to-black"></div>
          )}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {category.title}
          </h1>
          {category.description && (
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
              {category.description}
            </p>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 xl:px-10 relative z-10">
        <div className="max-w-360 mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-6" />
              <p className="text-gray-400 text-xl font-medium">
                No products available in {category.title} yet.
              </p>
              <p className="text-gray-500 mt-2">Check back soon!</p>
              <Link
                href="/shop"
                className="mt-6 inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">
                  {products.length} product{products.length !== 1 ? "s" : ""} found
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <Link key={product._id} href={`/product/${product.slug}`} className="group block">
                    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10">
                      <div className="relative h-64 overflow-hidden bg-gray-800">
                        {product.images?.[0] ? (
                          <img
                            src={urlFor(product.images[0]).width(500).height(500).url()}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
                        {product.status && (
                          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            product.status === "new" ? "bg-green-600" :
                            product.status === "hot" ? "bg-orange-600" : "bg-red-600"
                          } text-white`}>
                            {product.status}
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        {product.brand?.title && (
                          <p className="text-gray-400 text-sm mb-1">{product.brand.title}</p>
                        )}
                        <h3 className="font-bold text-white mb-2 group-hover:text-red-500 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-black text-red-500">${product.price}</p>
                          {product.discount && product.discount > 0 && (
                            <p className="text-gray-500 line-through text-sm">
                              ${(product.price + product.discount).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;