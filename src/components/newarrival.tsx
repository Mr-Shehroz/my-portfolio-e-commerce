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
}

interface Props {
  products: Product[];
}

const NewArrivals: React.FC<Props> = ({ products }) => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // Filter only products with status "new"
  const newProducts = products.filter((p) => p.status === "new");

  // Sort by newest first
  const sortedProducts = newProducts.sort(
    (a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
  );

  // Take first 8 products
  const newArrivals = sortedProducts.slice(0, 8);

  return (
    <section className="bg-black py-16">
      <div className="max-w-360 mx-auto xl:px-10 px-4">
        <h2 className="text-white text-4xl font-bold text-center mb-12">NEW ARRIVALS</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="bg-gray-900 rounded-xl overflow-hidden group cursor-pointer transition-all transform hover:scale-105 hover:shadow-2xl"
              onMouseEnter={() => setIsHovered(product._id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="relative h-64 overflow-hidden bg-gray-800">
                {product.images[0] ? (
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

                {product.brand?.title && (
                  <p className="text-gray-400 text-sm">{product.brand.title}</p>
                )}

                {/* Created At (optional) */}
                {product._createdAt && (
                  <p className="text-gray-500 text-xs">
                    Added on:{" "}
                    {new Date(product._createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
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
      </div>
    </section>
  );
};

export default NewArrivals;
