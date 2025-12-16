"use client";

import { FC, useState } from "react";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";
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
  variant: string;
}

interface Props {
  products: Product[];
}

const variants = ["cricket", "badminton", "basketball", "football", "other"];

const ProductsByVariant: FC<Props> = ({ products }) => {
  const [activeTab, setActiveTab] = useState<string>(variants[0]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => p.variant === activeTab);

  return (
    <section className="py-20 bg-linear-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
      </div>

      <div className="max-w-360 mx-auto px-4 xl:px-10 relative z-10">
        {/* Section Header with Modern Styling */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
            FEATURED <span className="text-red-500">PRODUCTS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover our handpicked selection of championship-grade equipment
            designed for athletes who refuse to settle.
          </p>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {variants.map((variant) => (
            <button
              key={variant}
              onClick={() => setActiveTab(variant)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === variant
                  ? "bg-red-600 text-white shadow-xl shadow-red-600/30 border-2 border-red-500"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
              }`}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.length ? (
            filteredProducts.slice(0, 8).map((product) => (
              <div
                key={product._id}
                className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10"
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Image Container */}
                <div className="relative h-64 overflow-hidden bg-gray-800">
                  {product.images[0] ? (
                    <img
                      src={urlFor(product.images[0])
                        .width(500)
                        .height(500)
                        .url()}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        hoveredProduct === product._id
                          ? "scale-110"
                          : "scale-100"
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}

                  {/* Status Badge */}
                  {product.status && (
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        product.status === "new"
                          ? "bg-green-600"
                          : product.status === "hot"
                            ? "bg-orange-600"
                            : "bg-red-600"
                      } text-white animate-pulse`}
                    >
                      {product.status}
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
                      hoveredProduct === product._id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <div className="absolute bottom-4 left-4 right-4">
                      <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 group-hover:scale-105">
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {product.brand?.title && (
                    <p className="text-gray-400 text-sm mb-1 font-medium">
                      {product.brand.title}
                    </p>
                  )}
                  <h3 className="font-bold text-lg mb-2 group-hover:text-red-500 transition-colors line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-red-600 text-red-600"
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-black text-red-500">
                      ${product.price}
                    </p>
                    {product.discount > 0 && (
                      <p className="text-gray-500 line-through text-sm">
                        ${(product.price + product.discount).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
                <ShoppingCart size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-xl font-medium">
                No products found for this category.
              </p>
              <p className="text-gray-500 mt-2">
                Try selecting a different sport or check back later!
              </p>
            </div>
          )}
        </div>

        {/* View All Button */}
        {filteredProducts.length > 0 && (
          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105">
              View All {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
              Products
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsByVariant;
