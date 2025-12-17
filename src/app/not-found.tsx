// app/not-found.tsx
"use client";

import Link from "next/link";
import { ShoppingCart, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-black text-white relative min-h-screen flex items-center justify-center">
      {/* Unified red radial glow — matches all pages */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
      </div>

      <div className="text-center z-10 px-4 max-w-md">
        <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-800">
          <ShoppingCart className="w-12 h-12 text-red-600" />
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-10 leading-relaxed">
          Oops! The page you're looking for might have been removed, renamed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-bold transition-colors border border-gray-700"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}