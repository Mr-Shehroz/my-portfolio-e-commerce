import { client } from "@/sanity/lib/client";
import { brandsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import type { JSX } from "react";

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

const FeaturedBrands = async (): Promise<JSX.Element> => {
  const brands: Brand[] = await client.fetch(brandsQuery);

  return (
    <section className="bg-gray-900 py-12 md:py-16">
      <div className="max-w-360 mx-auto xl:px-10 px-4">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-10">
          FEATURED BRANDS
        </h2>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={`/brand/${brand.slug}`}
              className="group bg-black/40 hover:bg-black/70 border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center transition-all"
            >
              {/* Brand Image */}
              {brand.image ? (
                <img
                  src={urlFor(brand.image).width(300).height(200).url()}
                  alt={brand.title}
                  className="h-16 md:h-20 object-contain mb-3 grayscale group-hover:grayscale-0 transition-all"
                />
              ) : (
                <div className="h-16 md:h-20 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* Brand Name */}
              <h3 className="text-gray-300 group-hover:text-white text-sm md:text-base font-semibold tracking-wide text-center">
                {brand.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
