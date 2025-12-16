"use client";

import { FC, useState } from "react";
import ProductCard from "./productcard";

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

  const filteredProducts = products.filter((p) => p.variant === activeTab);

  return (
    <section className="bg-black py-12">
      <div className="max-w-360 mx-auto px-4 xl:px-10">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-8">
          Featured Products
        </h2>

        {/* Tabs */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
          {variants.map((variant) => (
            <button
              key={variant}
              onClick={() => setActiveTab(variant)}
              className={`px-6 py-2 whitespace-nowrap rounded-full font-semibold transition
                ${
                  activeTab === variant
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }
              `}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-400">No products found for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsByVariant;
