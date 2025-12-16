"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, X, Heart } from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
      {/* Top Offer Bar */}
      <div className="bg-red-600 text-center py-2 text-xs font-semibold">
        GET A FREE SPORTS JERSEY WITH EVERY ORDER
      </div>

      {/* Main Header */}
      <div className="max-w-360 mx-auto px-4 xl:px-10 py-2">
        <div className="flex items-center justify-between py-4">
          
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-wide">
            SPORTS STORE
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-6 text-sm font-semibold">
            <Link href="/" className="hover:text-red-500 transition">
              Home
            </Link>
            <Link href="/about-us" className="hover:text-red-500 transition">
              About Us
            </Link>
            <Link href="/shop" className="hover:text-red-500 transition">
              Shop
            </Link>
            <Link href="/faqs" className="hover:text-red-500 transition">
              Faqs
            </Link>
          </div>

          {/* Icons / Actions */}
          <div className="flex items-center gap-4">
            <Link href="/wishlist">
              <Heart className="cursor-pointer hover:text-red-500 transition" />
            </Link>
            <Link href="/cart">
              <ShoppingCart className="cursor-pointer hover:text-red-500 transition" />
            </Link>

            {/* ✅ Clerk User Dropdown */}
            {isSignedIn ? (
              <div className="hidden lg:flex items-center">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                    },
                  }}
                />
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="hidden lg:block text-sm font-semibold border border-white px-4 py-1.5 rounded hover:bg-white hover:text-black transition"
              >
                LOGIN
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="hover:text-red-500 transition" /> : <Menu className="hover:text-red-500 transition" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 pb-4">
            <div className="flex flex-col gap-4 pt-4 text-sm font-semibold">

              {/* Sports Links */}
              <div className="flex flex-col gap-2 px-2">
                <h3 className="text-red-500 font-semibold uppercase tracking-wide text-xs mb-1">
                  Sports
                </h3>
                <Link href="/sports/cricket" className="py-2 px-2 hover:bg-white/10 rounded transition">
                  CRICKET
                </Link>
                <Link href="/sports/football" className="py-2 px-2 hover:bg-white/10 rounded transition">
                  FOOTBALL
                </Link>
                <Link href="/sports/basketball" className="py-2 px-2 hover:bg-white/10 rounded transition">
                  BASKETBALL
                </Link>
                <Link href="/sports/badminton" className="py-2 px-2 hover:bg-white/10 rounded transition">
                  BADMINTON
                </Link>
              </div>

              {/* Account Section */}
              <div className="flex flex-col gap-2 px-2 mt-2 border-t border-white/10 pt-2">
                <h3 className="text-red-500 font-semibold uppercase tracking-wide text-xs mb-1">
                  Account
                </h3>

                <Link href="/wishlist" className="py-2 px-2 hover:bg-white/10 rounded transition">
                  WISHLIST
                </Link>

                {isSignedIn ? (
                  <>
                    <Link href="/account" className="py-2 px-2 hover:bg-white/10 rounded transition">
                      MY ACCOUNT
                    </Link>
                    <Link href="/cart" className="py-2 px-2 hover:bg-white/10 rounded transition">
                      CART
                    </Link>
                  </>
                ) : (
                  <Link href="/sign-in" className="py-2 px-2 hover:bg-white/10 rounded transition">
                    LOGIN
                  </Link>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
