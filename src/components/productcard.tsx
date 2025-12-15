"use client";
import { useState } from "react";
import { Star } from "lucide-react";

const ProductCard = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const products = [
    {
      id: 1,
      name: "Premium Basketball Shoes",
      price: 159.99,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      rating: 5,
      reviews: 124,
      badge: "NEW",
    },
    {
      id: 2,
      name: "Professional Soccer Ball",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400&h=400&fit=crop",
      rating: 5,
      reviews: 89,
    },
    {
      id: 3,
      name: "Performance Jersey",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4,
      reviews: 56,
      badge: "SALE",
    },
    {
      id: 4,
      name: "Training Equipment Set",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop",
      rating: 5,
      reviews: 203,
    },
    {
      id: 5,
      name: "Running Sneakers Pro",
      price: 139.99,
      image:
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop",
      rating: 4,
      reviews: 167,
      badge: "HOT",
    },
    {
      id: 6,
      name: "Gym Duffel Bag",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 5,
      reviews: 92,
    },
  ];

  return (
    <div className="bg-black">
      <section className="max-w-360 mx-auto px-4 xl:px-10 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center md:text-left">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-900 rounded-xl overflow-hidden group cursor-pointer transition-all transform hover:scale-105 hover:shadow-2xl"
              onMouseEnter={() => setIsHovered(product.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="relative h-64 overflow-hidden bg-gray-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isHovered === product.id ? "scale-110" : "scale-100"
                  }`}
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {product.badge}
                  </div>
                )}
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    isHovered === product.id ? "opacity-40" : "opacity-0"
                  }`}
                ></div>
              </div>

              <div className="p-4 flex flex-col justify-between h-40">
                <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < product.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600"
                      }
                    />
                  ))}
                  <span className="text-gray-400 text-sm ml-2">
                    ({product.reviews})
                  </span>
                </div>
                <p className="text-red-500 font-bold text-lg">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductCard;
