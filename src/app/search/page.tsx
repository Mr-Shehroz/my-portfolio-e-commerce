// app/search/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { Star } from "lucide-react";
import Link from "next/link";

function SearchResultsContent() {
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
        // Updated query to also search variant (category) and improve match
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
          brand->{
            title
          }
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
      {/* Background Glow — matches your design system */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
      </div>

      {/* Hero Banner */}
      <section className="relative py-24 md:py-32 w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-linear-to-b from-black/70 via-black/80 to-black"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Search Results for <span className="text-red-600">"{query}"</span>
          </h1>
          <p className="text-gray-400 text-lg">
            {loading
              ? "Searching..."
              : results.length > 0
              ? `${results.length} product${results.length !== 1 ? "s" : ""} found`
              : "No matching products"}
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-4 xl:px-10 relative z-10">
        <div className="max-w-360 mx-auto">
          {loading ? null : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {results.map((product) => (
                <Link key={product._id} href={`/product/${product.slug}`} className="group block">
                  <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10">
                    <div className="relative h-64 overflow-hidden bg-gray-800">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                      {product.status && (
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          product.status === "new" ? "bg-green-600" :
                          product.status === "hot" ? "bg-orange-600" : "bg-red-600"
                        } text-white`}>
                          {product.status}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      {product.brand?.title && (
                        <p className="text-gray-400 text-sm mb-1">{product.brand.title}</p>
                      )}
                      <h3 className="font-bold text-white mb-2 group-hover:text-red-500 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-black text-red-500">${product.price}</p>
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
            <div className="text-center py-24 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">No results found</h2>
              <p className="text-gray-400 mb-8">
                Try adjusting your search or browse our categories below.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Cricket", "Football", "Basketball", "Badminton"].map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${cat.toLowerCase()}`}
                    className="px-4 py-2 bg-gray-800 hover:bg-red-600 rounded-full text-sm font-medium transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading search results...</p>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}