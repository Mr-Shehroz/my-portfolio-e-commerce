"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Heart, Search, Zap } from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isSignedIn } = useUser();

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  // Wishlist count logic (unchanged)
  const fetchWishlistCount = () => {
    if (typeof window === "undefined") return 0;
    const saved = localStorage.getItem("wishlist");
    if (!saved) return 0;
    try {
      const items = JSON.parse(saved);
      return Array.isArray(items) ? items.length : 0;
    } catch {
      return 0;
    }
  };

  useEffect(() => {
    setWishlistCount(fetchWishlistCount());
  }, [isSignedIn]);

  useEffect(() => {
    const handleWishlistUpdate = () => {
      setWishlistCount(fetchWishlistCount());
    };
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    return () => window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-gray-800">
      {/* Promo Bar */}
      <div className="bg-linear-to-r from-red-600 via-red-700 to-red-600 text-center py-2 text-xs md:text-sm font-bold tracking-wider text-white animate-pulse">
        ⚡ FREE SPORTS JERSEY WITH EVERY ORDER • LIMITED TIME ⚡
      </div>

      {/* Search Bar (Collapsible) */}
      {isSearchOpen && (
        <div className="bg-black/95 backdrop-blur-xl border-b border-gray-800 py-4 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 xl:px-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, brands, or categories..."
                  className="w-full bg-gray-900 text-white px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 pr-12"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </div>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-bold transition-colors whitespace-nowrap"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Nav */}
      <div className="max-w-360 mx-auto px-4 xl:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-linear-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-red-600/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-white">
              SPORTS<span className="text-red-600">HUB</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {["Home", "About Us", "Shop", "FAQs"].map((item) => (
              <Link
                key={item}
                href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "-")}`}
                className="text-base font-semibold text-gray-300 hover:text-red-500 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            {/* Search Icon */}
            <Search 
              className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors text-gray-300 hidden md:block" 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            />

            {/* Wishlist */}
            <Link href="/wishlist" aria-label="Wishlist" className="relative">
              <Heart className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors text-gray-300" />
              {isSignedIn && wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4.5 h-4.5 bg-red-600 rounded-full text-[10px] font-bold flex items-center justify-center text-white animate-ping-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative group" aria-label="Cart">
              <ShoppingCart className="w-5 h-5 group-hover:text-red-500 transition-colors text-gray-300" />
              <span className="absolute -top-2 -right-2 w-4.5 h-4.5 bg-red-600 rounded-full text-[10px] font-bold flex items-center justify-center text-white animate-ping-pulse">
                3
              </span>
            </Link>

            {/* Auth */}
            {isSignedIn ? (
              <div className="hidden lg:flex">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 ring-2 ring-red-600/30 hover:ring-red-500 transition-all",
                    },
                  }}
                />
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="hidden lg:block bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-1.5 rounded-lg text-sm font-bold transition-all transform hover:scale-[1.03] shadow-md shadow-red-600/20"
              >
                LOGIN
              </Link>
            )}

            <button
              className="lg:hidden text-gray-300 hover:text-red-500 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (unchanged) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-800 bg-black/95 backdrop-blur-lg">
          <div className="px-6 py-8 space-y-5">
            {["Home", "Shop", "Brands", "About"].map((item) => (
              <Link
                key={item}
                href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                className="block text-lg font-semibold text-gray-300 hover:text-red-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              href="/wishlist"
              className="block text-lg font-semibold text-gray-300 hover:text-red-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              WISHLIST
            </Link>
            {isSignedIn ? (
              <Link
                href="/account"
                className="block text-lg font-semibold text-gray-300 hover:text-red-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                MY ACCOUNT
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="block w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-5 py-3 rounded-lg font-bold text-center transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;