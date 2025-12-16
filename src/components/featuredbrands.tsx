import { client } from "@/sanity/lib/client";
import { brandsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image"; // Note: ensure this is `urlFor` if that's your export name
import Link from "next/link";

interface Brand {
  _id: string;
  title: string;
  slug: string;
  image?: {
    asset: {
      _ref: string;
      _type: string;
    };
    _type: string;
  };
}

const FeaturedBrands = async () => {
  const brands: Brand[] = await client.fetch(brandsQuery);

  return (
    <section className="py-20 bg-linear-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Subtle background pattern – same as other sections */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
      </div>

      <div className="max-w-360 mx-auto px-4 xl:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            FEATURED <span className="text-red-500">BRANDS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Trusted by champions worldwide — premium quality, unmatched
            performance.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.length > 0 ? (
            brands.map((brand) => (
              <Link
                key={brand._id}
                href={`/brand/${brand.slug}`}
                className="group aspect-square bg-gray-900 rounded-2xl flex items-center justify-center p-6 
                          border border-gray-800 hover:border-red-500/50 
                          transition-all duration-300 
                          transform hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10
                          backdrop-blur-sm"
              >
                {brand.image ? (
                  <img
                    src={urlFor(brand.image).width(200).height(200).url()}
                    alt={brand.title}
                    className="max-w-full max-h-full object-contain 
                              grayscale opacity-80 
                              group-hover:grayscale-0 group-hover:opacity-100 
                              transition-all duration-300"
                  />
                ) : (
                  <span
                    className="font-bold text-gray-300 text-center text-sm md:text-base 
                                  group-hover:text-white transition-colors"
                  >
                    {brand.title}
                  </span>
                )}
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">
                No brands available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
