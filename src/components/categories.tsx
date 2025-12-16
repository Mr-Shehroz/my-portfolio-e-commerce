import { client } from "@/sanity/lib/client";
import { categoriesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Category {
  _id: string;
  slug: string;
  image: object;
  title: string;
}

const Categories = async () => {
  const categories: Category[] = await client.fetch(categoriesQuery);

  const categoryIcons: { [key: string]: string } = {
    cricket: "🏏",
    football: "⚽",
    basketball: "🏀",
    badminton: "🏸",
  };

  const categoryGradients: { [key: string]: string } = {
    cricket: "from-red-600 to-orange-600",
    football: "from-orange-500 to-red-600",
    basketball: "from-red-600 to-pink-600",
    badminton: "from-pink-500 to-red-600",
  };

  return (
    <section className="py-20 bg-linear-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Unified subtle radial glow (same as other sections) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
      </div>

      <div className="max-w-360 mx-auto px-4 xl:px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            SHOP BY <span className="text-red-500">SPORT</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Find gear tailored to your game — engineered for performance, built for victory.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => {
            const slug = cat.slug.toLowerCase();
            const gradient = categoryGradients[slug] || "from-red-600 to-red-700";
            const icon = categoryIcons[slug] || "⚽";

            return (
              <Link
                key={cat._id}
                href={`/sports/${cat.slug}`}
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer
                          transform transition-all duration-300 hover:-translate-y-1
                          shadow-lg hover:shadow-xl hover:shadow-red-500/10
                          border border-gray-800 hover:border-red-500/50"
              >
                {/* Background Image */}
                <img
                  src={urlFor(cat.image).width(600).height(600).url()}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-85 group-hover:opacity-95 transition-opacity duration-300`}
                />

                {/* Darkening Layer for Text Readability */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-7xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {icon}
                  </div>
                  <h3 className="text-2xl font-extrabold text-white drop-shadow-lg">
                    {cat.title}
                  </h3>
                  <ChevronRight className="w-6 h-6 mt-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;