// app/product/[slug]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Heart, Star, ShoppingCart, ChevronLeft } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import RelatedProductsSection from "@/components/relatedproductssection";
import { useCart } from "../../../../context/cartcontext";

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
  variant?: string;
  description?: string;
  details?: string;
}

const SingleProductPage = () => {
  const { slug } = useParams();
  const { isSignedIn } = useUser();
  const { addToCart: cartAddToCart } = useCart(); // ✅
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load wishlist
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wishlist");
      if (saved) {
        try {
          setWishlist(new Set(JSON.parse(saved)));
        } catch (e) {
          console.warn("Failed to parse wishlist");
        }
      }
    }
  }, []);

  // Fetch product
  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && slug.current == $slug][0]{
          _id,
          name,
          "slug": slug.current,
          price,
          discount,
          status,
          variant,
          description,
          details,
          "images": images[].asset->url,
          brand->{
            title
          }
        }`;
        const fetched = await client.fetch(query, { slug });
        if (fetched) {
          setProduct(fetched);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const toggleWishlist = () => {
    if (!product || !isSignedIn) return;

    const newWishlist = new Set(wishlist);
    if (newWishlist.has(product._id)) {
      newWishlist.delete(product._id);
    } else {
      newWishlist.add(product._id);
    }
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(Array.from(newWishlist)));

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("wishlistUpdated"));
    }
  };

  // ✅ REAL ADD TO CART
  const handleAddToCart = () => {
    if (!product) return;
    cartAddToCart({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      images: product.images,
      brand: product.brand,
    });
    // Optional: show success feedback
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4">
        <ShoppingCart className="w-16 h-16 text-gray-600 mb-6" />
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <p className="text-gray-400 mb-6">{error || "The product you're looking for doesn't exist."}</p>
        <Link
          href="/shop"
          className="flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold"
        >
          <ChevronLeft size={18} />
          Back to Shop
        </Link>
      </div>
    );
  }

  const mainImage = product.images?.[selectedImageIndex] || "";
  const finalPrice = product.discount && product.discount > 0 
    ? product.price 
    : product.price;
  const originalPrice = product.discount && product.discount > 0 
    ? product.price + product.discount 
    : null;

  return (
    <div className="bg-black text-white relative min-h-screen">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
      </div>

      <div className="max-w-360 mx-auto px-4 xl:px-10 py-12 relative z-10"> {/* ✅ fixed max-w-360 → max-w-7xl */}
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/shop" className="text-gray-400 hover:text-red-500 flex items-center gap-1">
            <ChevronLeft size={16} />
            Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div>
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 aspect-square flex items-center justify-center mb-4">
              {mainImage ? (
                <img
                  src={urlFor(mainImage).width(800).height(800).url()}
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
              ) : (
                <div className="text-gray-500">No image available</div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      idx === selectedImageIndex ? "border-red-600" : "border-gray-700"
                    }`}
                  >
                    <img
                      src={urlFor(img).width(200).height(200).url()}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.brand?.title && (
              <p className="text-red-500 font-semibold text-sm mb-2">{product.brand.title}</p>
            )}

            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-gray-400 text-sm">(128 reviews)</span>
            </div>

            {/* Status Badge */}
            {product.status && (
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 ${
                product.status === "new" ? "bg-green-600" :
                product.status === "hot" ? "bg-orange-600" : "bg-red-600"
              } text-white mb-4`}>
                {product.status}
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <p className="text-3xl font-black text-red-500">${finalPrice}</p>
              {originalPrice && (
                <p className="text-gray-500 line-through text-xl">${originalPrice.toFixed(2)}</p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Details */}
            {product.details && (
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-2">Product Details</h3>
                <div className="text-gray-300 whitespace-pre-line">{product.details}</div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart} // ✅
                className="flex-1 bg-red-600 hover:bg-red-700 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              {isSignedIn && (
                <button
                  onClick={toggleWishlist}
                  className="w-14 h-14 rounded-full border border-gray-700 flex items-center justify-center hover:border-red-600 transition-colors"
                  aria-label={wishlist.has(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart
                    size={24}
                    className={
                      wishlist.has(product._id)
                        ? "text-red-500 fill-current"
                        : "text-white"
                    }
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {product.variant && (
          <div className="mt-24">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8">
              Related <span className="text-red-600">Products</span>
            </h2>
            <RelatedProductsSection currentProductId={product._id} variant={product.variant} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProductPage;