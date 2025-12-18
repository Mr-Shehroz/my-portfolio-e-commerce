"use client";

import { useState, useEffect } from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useCart } from "../../context/cartcontext";

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
  const { isSignedIn } = useUser();
  const { addToCart } = useCart(); // ✅
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wishlist");
      if (saved) {
        try {
          setWishlist(new Set(JSON.parse(saved)));
        } catch (e) {
          console.warn("Failed to parse wishlist from localStorage");
        }
      }
    }
  }, []);

  const toggleWishlist = (productId: string) => {
    if (!isSignedIn) return;
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(Array.from(newWishlist)));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("wishlistUpdated"));
    }
  };

  // ✅ Add to cart handler
  const handleAddToCart = (product: Product) => {
    addToCart({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      images: product.images,
      brand: product.brand,
    });
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.variant === selectedCategory);

  const categories = ["all", "cricket", "badminton", "basketball", "football", "other"];

  return (
    <div className="bg-black text-white relative">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
      </div>

      {/* Hero Banner */}
      <section className="relative py-32 md:py-40 w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url(/shop-banner.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold z-10 tracking-tight">
          SHOP
        </h1>
      </section>

      {/* Category Tabs */}
      <section className="py-10 px-4 xl:px-10">
        <div className="max-w-360 mx-auto"> {/* ✅ fixed max-w-360 → max-w-7xl */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30 border border-red-500"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 xl:px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-6" />
              <p className="text-gray-400 text-xl font-medium">No products found in this category.</p>
              <p className="text-gray-500 mt-2">Try selecting a different sport.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product.slug}`}
                  className="group block"
                >
                  <div
                    className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 
                              hover:border-red-600/50 transition-all duration-300 
                              cursor-pointer transform hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10"
                    onMouseEnter={() => setIsHovered(product._id)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <div className="relative h-64 overflow-hidden bg-gray-800">
                      {product.images?.[0] ? (
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

                      {/* Status Badge */}
                      {product.status && (
                        <div
                          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            product.status === "new"
                              ? "bg-green-600"
                              : product.status === "hot"
                              ? "bg-orange-600"
                              : "bg-red-600"
                          } text-white`}
                        >
                          {product.status}
                        </div>
                      )}

                      {/* Wishlist Heart */}
                      {isSignedIn && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product._id);
                          }}
                          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 
                                     flex items-center justify-center hover:bg-red-600 transition-colors"
                          aria-label={
                            wishlist.has(product._id)
                              ? "Remove from wishlist"
                              : "Add to wishlist"
                          }
                        >
                          <Heart
                            size={18}
                            className={
                              wishlist.has(product._id)
                                ? "text-red-500 fill-current"
                                : "text-white group-hover:text-red-500"
                            }
                          />
                        </button>
                      )}

                      {/* Hover Overlay — ✅ FIXED ADD TO CART */}
                      <div
                        className={`absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
                          isHovered === product._id ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div className="absolute bottom-4 left-4 right-4">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className="w-full bg-red-600 hover:bg-red-700 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-1.5 z-50"
                          >
                            <ShoppingCart size={14} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>

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
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-black text-red-500">
                          ${product.price}
                        </p>
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
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;