"use client";

import { useEffect, useState } from "react";
import { Heart, ShoppingCart, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client"; // ✅ ADD THIS
import { allProductsQuery } from "@/sanity/lib/queries"; // ✅ ADD THIS

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number;
  images: string[]; // ✅ updated to string[]
  brand?: { title: string };
}

const WishlistPage = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH ALL PRODUCTS FROM SANITY
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products: Product[] = await client.fetch(allProductsQuery);
        setAllProducts(products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Load wishlist from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wishlist");
      setWishlistItems(saved ? JSON.parse(saved) : []);
    }
  }, []);

const removeFromWishlist = (id: string) => {
  const updated = wishlistItems.filter((itemId) => itemId !== id);
  setWishlistItems(updated);
  localStorage.setItem("wishlist", JSON.stringify(updated));

  // ✅ Notify the Header (and other components) that wishlist changed
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("wishlistUpdated"));
  }
};

  // ✅ Filter wishlist products using REAL product data
  const wishlistProducts = allProducts.filter((p) =>
    wishlistItems.includes(p._id)
  );

  if (!isLoaded) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4">
        <Heart className="w-16 h-16 text-red-600 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Sign in to view your wishlist</h1>
        <p className="text-gray-400 mb-8 text-center max-w-md">
          Your favorite products will be saved here. Log in to access your personalized wishlist.
        </p>
        <Link
          href="/sign-in"
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  // ✅ Show loading state while fetching
  if (loading && allProducts.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading your wishlist...
      </div>
    );
  }

  return (
    <div className="bg-black text-white relative">
      {/* Unified red radial glow — consistent with site */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
      </div>

      {/* Hero Banner */}
      <section className="relative py-32 md:py-40 w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/wishlist-banner.jpg')" }}
          />
          {/* ✅ Fix: Use proper gradient overlay (like your other pages) */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold z-10 tracking-tight">
          My <span className="text-red-600">Wishlist</span>
        </h1>
      </section>

      <div className="max-w-360 mx-auto py-12 px-4 xl:px-10 relative z-10">
        {isSignedIn && (
          <p className="text-gray-400 text-center mb-12 -mt-6">
            {wishlistProducts.length} item{wishlistProducts.length !== 1 ? "s" : ""} saved
          </p>
        )}

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-8">
              Start adding products you love — they`ll appear here for easy access.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition-colors"
            >
              <ShoppingCart size={18} />
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistProducts.map((product) => (
              <div
                key={product._id}
                className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-red-600/50 transition-all duration-300 group"
              >
                <div className="relative h-64">
                  {product.images?.[0] ? (
                    <img
                      src={urlFor(product.images[0]).width(500).height(500).url()}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}

                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                    aria-label="Remove from wishlist"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>

                <div className="p-6">
                  {product.brand?.title && (
                    <p className="text-gray-400 text-sm mb-1">{product.brand.title}</p>
                  )}
                  <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-2xl font-black text-red-500">${product.price}</p>
                    {product.discount && product.discount > 0 && (
                      <p className="text-gray-500 line-through text-sm">
                        ${(product.price + product.discount).toFixed(2)}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/product/${product.slug}`}
                    className="mt-4 block w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-bold text-center transition-colors"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;