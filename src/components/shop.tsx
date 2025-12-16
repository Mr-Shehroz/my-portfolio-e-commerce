"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

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
  _createdAt: string;
  variant?: "cricket" | "badminton" | "basketball" | "football" | "other";
}

interface Props {
  products?: Product[];
}

const Shop: React.FC<Props> = ({ products = [] }) => {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter products by selected category (variant)
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.variant === selectedCategory);

  const categories = ["all", "cricket", "badminton", "basketball", "football", "other"];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Page Header */}
      <section className="relative h-64 w-full bg-[url(/shop-banner.jpg)] bg-center bg-cover flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="text-5xl font-bold text-white z-10">Shop</h1>
      </section>

      {/* Categories Tabs */}
      <section className="py-8 px-4 xl:px-10 max-w-360 mx-auto flex flex-wrap gap-4 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              selectedCategory === cat
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-400">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-gray-900 rounded-xl overflow-hidden group cursor-pointer transition-all transform hover:scale-105 hover:shadow-2xl"
                onMouseEnter={() => setIsHovered(product._id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <div className="relative h-64 overflow-hidden bg-gray-800">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={urlFor(product.images[0]).width(500).height(500).url()}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isHovered === product._id ? "scale-110" : "scale-100"
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}

                  {product.status && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {product.status.toUpperCase()}
                    </div>
                  )}

                  <div
                    className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                      isHovered === product._id ? "opacity-40" : "opacity-0"
                    }`}
                  ></div>
                </div>

                <div className="p-4 flex flex-col justify-between h-40">
                  <h3 className="text-white font-semibold mb-1 line-clamp-2 group-hover:text-red-500 transition-colors">
                    {product.name}
                  </h3>

                  {product.brand?.title ? (
                    <p className="text-gray-400 text-sm">{product.brand.title}</p>
                  ) : (
                    <p className="text-gray-500 text-sm">No Brand</p>
                  )}

                  <div className="flex items-center gap-1 mt-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
                      />
                    ))}
                  </div>

                  <p className="text-red-500 font-bold text-lg">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Shop;
