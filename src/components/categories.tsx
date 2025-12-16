import { client } from "@/sanity/lib/client";
import { categoriesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import React from "react";

interface Category {
  _id: string;
  slug: string;
  image: object;
  title: string;
  range?: number;
}

const Categories = async (): Promise<React.JSX.Element> => {
  const categories: Category[] = await client.fetch(categoriesQuery);

  return (
    <section className="bg-black py-16">
      <div className="max-w-360 mx-auto xl:px-10 px-4">
        <h2 className="text-white text-4xl font-bold text-center mb-12">
          SHOP BY SPORT
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/sports/${cat.slug}`}
              className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
            >
              {/* Category Image */}
              <img
                src={urlFor(cat.image).width(600).height(600).url()}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                <h3 className="text-white text-2xl font-bold group-hover:text-red-500 transition-colors">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
