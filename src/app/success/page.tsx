// app/success/page.tsx
"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Separate component that uses useSearchParams
const SuccessContent = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    // Optional: Save order to Sanity (you'd do this in a webhook)
    // For now, just show success
    setOrderNumber(`ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`);
  }, [sessionId]);

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center py-24">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        {orderNumber && (
          <p className="text-gray-400 mb-6">
            Your order <span className="text-red-500">#{orderNumber}</span> has been placed successfully.
          </p>
        )}
        <p className="text-gray-400 mb-8">
          You'll receive a confirmation email shortly with your order details.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold"
          >
            Continue Shopping
          </Link>
          <Link
            href="/account/orders"
            className="border border-gray-700 hover:border-red-600 px-6 py-3 rounded-lg font-bold"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main page component with Suspense boundary
const SuccessPage = () => {
  return (
    <Suspense fallback={
      <div className="bg-black text-white min-h-screen flex items-center justify-center py-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
};

export default SuccessPage;