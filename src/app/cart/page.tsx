// app/cart/page.tsx
"use client";

import { useState } from "react";
import { Heart, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../../../context/cartcontext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: cart }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (cartCount === 0) {
    return (
      <div className="bg-black text-white min-h-screen py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-gray-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">Looks like you haven`t added anything yet.</p>
          <Link
            href="/shop"
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold inline-block"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-12">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex gap-6"
                >
                  <div className="w-24 h-24 shrink-0">
                    {item.images?.[0] ? (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="bg-gray-800 w-full h-full rounded-lg flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        {item.brand && (
                          <p className="text-gray-400 text-sm">{item.brand.title}</p>
                        )}
                        <p className="text-red-500 font-bold mt-2">${item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-gray-400">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-800">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className={`w-full mt-8 py-4 rounded-lg font-bold text-lg transition-colors ${
                isLoading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isLoading ? "Processing..." : "Proceed to Checkout"}
            </button>
            
            <Link
              href="/shop"
              className="block text-center mt-4 text-gray-400 hover:text-red-500"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;