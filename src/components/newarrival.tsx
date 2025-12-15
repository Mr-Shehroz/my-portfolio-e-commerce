'use client';
import { useState } from 'react';
import { Star } from 'lucide-react';

const NewArrivals = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // Dummy products for New Arrivals
  const products = [
    {
      id: 1,
      name: "Elite Basketball Shoes",
      price: 179.99,
      image: "https://images.unsplash.com/photo-1596464716121-32c69b7a3c63?w=400&h=400&fit=crop",
      rating: 5,
      reviews: 84,
      badge: "NEW"
    },
    {
      id: 2,
      name: "Soccer Ball Pro",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1599058917213-701b65dbd362?w=400&h=400&fit=crop",
      rating: 4,
      reviews: 56
    },
    {
      id: 3,
      name: "Training Hoodie",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1594737625785-10a7aef6a1b5?w=400&h=400&fit=crop",
      rating: 5,
      reviews: 34,
      badge: "SALE"
    },
    {
      id: 4,
      name: "Running Sneakers Max",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1599058917213-701b65dbd362?w=400&h=400&fit=crop",
      rating: 4,
      reviews: 102,
      badge: "HOT"
    },
    {
      id: 5,
      name: "Gym Backpack",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1599058917213-701b65dbd362?w=400&h=400&fit=crop",
      rating: 5,
      reviews: 45
    },
    {
      id: 6,
      name: "Pro Weightlifting Gloves",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1599058917213-701b65dbd362?w=400&h=400&fit=crop",
      rating: 5,
      reviews: 60
    }
  ];

  return (
    <section className="bg-black py-16">
      <div className="max-w-360 mx-auto xl:px-10 px-4">
        <h2 className="text-white text-4xl font-bold text-center mb-12">NEW ARRIVALS</h2>

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
                    isHovered === product.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {product.badge}
                  </div>
                )}
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    isHovered === product.id ? 'opacity-40' : 'opacity-0'
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
                      className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}
                    />
                  ))}
                  <span className="text-gray-400 text-sm ml-2">({product.reviews})</span>
                </div>
                <p className="text-red-500 font-bold text-lg">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
