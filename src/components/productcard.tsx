import { urlFor } from "@/sanity/lib/image";
import { FC } from "react";
import { Star } from "lucide-react";

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
  variant: string;
}

interface Props {
  product: Product;
}

const badgeColor = {
  new: "bg-green-600",
  hot: "bg-red-600",
  sale: "bg-yellow-500 text-black",
};

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden group transition hover:scale-105">
      <div className="relative h-64 bg-gray-800 overflow-hidden">
        {product.images[0] ? (
          <img
            src={urlFor(product.images[0]).width(500).height(500).url()}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        {product.status && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full ${
              badgeColor[product.status]
            }`}
          >
            {product.status.toUpperCase()}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold line-clamp-2 group-hover:text-red-500">
          {product.name}
        </h3>
        {product.brand?.title && (
          <p className="text-gray-400 text-sm mt-1">{product.brand.title}</p>
        )}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <div className="mt-3">
          {product.discount ? (
            <>
              <span className="text-gray-400 line-through mr-2">${product.price}</span>
              <span className="text-red-500 font-bold">
                ${product.price - product.discount}
              </span>
            </>
          ) : (
            <span className="text-red-500 font-bold">${product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
