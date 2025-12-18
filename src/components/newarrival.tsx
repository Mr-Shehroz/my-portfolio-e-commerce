"use client";

import { useState, useEffect } from "react";
import { Star, ShoppingCart, ChevronRight, Heart } from "lucide-react";
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
}

interface Props {
  products: Product[];
}

const NewArrivals: React.FC<Props> = ({ products }) => {
  const { isSignedIn } = useUser();
  const { addToCart } = useCart(); // ✅
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  // Load wishlist from localStorage
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

  // Filter and sort new arrivals
  const newProducts = products.filter((p) => p.status === "new");
  const sortedProducts = [...newProducts].sort(
    (a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
  );
  const newArrivals = sortedProducts.slice(0, 8);

  return (
    <section className="py-20 bg-linear-to-br from-black via-gray-900 to-black relative overflow-hidden"> {/* ✅ fixed */}
      {/* Subtle red radial glow — matches all sections */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
      </div>

      <div className="max-w-360 mx-auto px-4 xl:px-10 relative z-10"> {/* ✅ fixed */}
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 tracking-tight">
              NEW <span className="text-red-500">ARRIVALS</span>
            </h2>
            <p className="text-gray-400">Latest gear for peak performance</p>
          </div>
          <Link
            href="/shop"
            className="mt-4 md:mt-0 flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold transition-colors group"
          >
            View All
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product.slug}`}
                className="group block"
              >
                <div
                  className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10"
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

                    {/* Status Badge */}
                    {product.status && (
                      <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase animate-pulse">
                        {product.status}
                      </div>
                    )}

                    {/* Wishlist Heart (only if signed in) */}
                    {isSignedIn && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(product._id);
                        }}
                        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center hover:bg-red-600 transition-colors"
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

                    {/* Hover Overlay — ✅ REAL ADD TO CART */}
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
                          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={16} />
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
                    <h3 className="font-bold text-lg mb-2 group-hover:text-red-500 transition-colors line-clamp-2 leading-tight text-white">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-red-600 text-red-600" />
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
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
              <ShoppingCart size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-400 text-xl font-medium">No new arrivals yet.</p>
            <p className="text-gray-500 mt-2">Check back soon for the latest gear!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;