"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { Star } from "lucide-react";
import Link from "next/link";

export default function SearchResultsClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const searchQuery = `*[_type == "product" && 
          (name match $pattern || 
           brand->title match $pattern || 
           variant match $pattern)
        ] | order(_score desc) [0...50] {
          _id,
          name,
          "slug": slug.current,
          price,
          discount,
          status,
          "images": images[].asset->url,
          brand->{ title }
        }`;

        const pattern = `*${query}*`;
        const res = await client.fetch(searchQuery, { pattern });
        setResults(res);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="bg-black text-white relative min-h-screen">
      {/* Hero */}
      <section className="xl:py-34 py-24 text-center max-w-360 px-4 xl:px-10 mx-auto">
        <h1 className="text-4xl font-extrabold mb-3">
          Search Results for <span className="text-red-600">"{query}"</span>
        </h1>
        <p className="text-gray-400">
          {loading
            ? "Searching..."
            : results.length
            ? `${results.length} products found`
            : "No matching products"}
        </p>
      </section>

      {/* Results */}
      <section className="px-4 xl:px-10 pb-20 max-w-360 mx-auto">
        {loading ? null : results.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((product) => (
              <Link key={product._id} href={`/product/${product.slug}`}>
                <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-red-600 transition">
                  <div className="h-64 bg-gray-800">
                    {product.images?.[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold mb-2">{product.name}</h3>
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-red-500 text-xl font-black">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-400 py-24">
              No products found.
            </p>
          )
        )}
      </section>
    </div>
  );
}
