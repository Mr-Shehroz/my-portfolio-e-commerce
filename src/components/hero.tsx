"use client";

import Link from "next/link";
import { ChevronRight, Play, TrendingUp } from "lucide-react";

const Hero = () => {
  const heroData = {
    title: "UNLEASH YOUR POTENTIAL",
    subtitle: "Championship-grade equipment for athletes who refuse to settle",
    cta: "Explore Collection",
    image: "/run.jpg",
  };

  return (
    <section className="relative h-screen mt-20 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroData.image} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-360 mx-auto px-4 xl:px-10 min-h-[93.5vh] flex items-center">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm border border-red-600/30 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold text-white">Trusted by 50K+ Athletes</span>
          </div>

          <h1 className="text-5xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight text-white">
            {heroData.title.split(" ").map((word, i) => (
              <span key={i} className={i === heroData.title.split(" ").length - 1 ? "text-red-600" : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
            {heroData.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="group bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              {heroData.cta}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronRight className="w-6 h-6 rotate-90" />
      </div>
    </section>
  );
};

export default Hero;