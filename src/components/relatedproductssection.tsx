import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Add this BELOW the SingleProductPage component
const RelatedProductsSection = ({ currentProductId, variant }: { currentProductId: string; variant: string }) => {
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const query = `*[_type == "product" && variant == $variant && _id != $currentProductId] | order(_createdAt desc)[0...4]{
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
        const products = await client.fetch(query, { variant, currentProductId });
        setRelatedProducts(products);
      } catch (err) {
        console.error("Failed to fetch related products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [currentProductId, variant]);

  if (loading || relatedProducts.length === 0) {
    return null; // Don't render if no related products
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
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
                <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-bold ${
                  product.status === "new" ? "bg-green-600" :
                  product.status === "hot" ? "bg-orange-600" : "bg-red-600"
                } text-white`}>
                  {product.status}
                </div>
              )}
            </div>
            <div className="p-4">
              {product.brand?.title && (
                <p className="text-gray-400 text-sm mb-1">{product.brand.title}</p>
              )}
              <h3 className="font-bold text-white mb-2 group-hover:text-red-500 line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-xl font-black text-red-500">${product.price}</p>
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
  );
};

export default RelatedProductsSection;