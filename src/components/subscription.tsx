"use client";

import { Award } from "lucide-react";

const Subscription = () => {
  return (
    <section className="py-20 bg-linear-to-br from-red-600 via-red-700 to-red-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10">
        <Award className="w-16 h-16 mx-auto mb-6" />
        <h2 className="text-4xl md:text-5xl font-black mb-4">JOIN THE WINNING TEAM</h2>
        <p className="text-xl mb-2 font-bold">GET 30% OFF YOUR FIRST ORDER</p>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Subscribe for exclusive deals, new product launches, and pro tips from champion athletes
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 rounded-xl bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 font-semibold"
          />
          <button className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 whitespace-nowrap">
            SUBSCRIBE NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
