// app/cart/page.tsx
"use client";

import { useState } from "react";
import { Heart, Trash2, Plus, Minus, AlertCircle } from "lucide-react";
import { useCart } from "../../../context/cartcontext";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    // Check if user is signed in
    if (!isSignedIn) {
      router.push("/sign-in?redirect_url=/cart");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: cart }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create checkout session");
      }

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(err.message || "Failed to start checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div className="bg-black text-white min-h-screen py-24">
        <div className="max-w-360 mx-auto px-4 xl:px-10 text-center">
          <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-gray-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
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
      <div className="max-w-360 mx-auto px-4 xl:px-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-12">Your Cart</h1>
        
        {/* Show error if checkout failed */}
        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-500 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-red-500 font-medium">Checkout Error</p>
              <p className="text-gray-400 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Sign in reminder if not signed in */}
        {!isSignedIn && (
          <div className="mb-6 bg-yellow-900/20 border border-yellow-500 rounded-lg p-4">
            <p className="text-yellow-500 font-medium">
              Please sign in to proceed with checkout
            </p>
          </div>
        )}
        
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
                        <p className="text-red-500 font-bold mt-2">${item.price.toFixed(2)}</p>
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
                        className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800"
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
              {isLoading ? "Processing..." : isSignedIn ? "Proceed to Checkout" : "Sign In to Checkout"}
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