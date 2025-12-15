"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Login = () => {
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔐 Email/Password Sign In
  const handleSignIn = async () => {
    if (!isLoaded) return;
    setError(null);
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      // Attempt to sign in
      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      // Check if sign-in was successful
      if (result.status === "complete") {
        // Set the active session
        await setActive({ session: result.createdSessionId });
        // Redirect to home page
        router.push("/");
      } else {
        // Handle other statuses (e.g., needs 2FA)
        console.log("Sign in status:", result.status);
        setError("Additional verification required.");
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      
      // Handle specific error cases
      const errorMessage = err.errors?.[0]?.longMessage || err.errors?.[0]?.message;
      
      if (errorMessage?.includes("password") || errorMessage?.includes("credentials")) {
        setError("❌ Invalid email or password. Please try again.");
      } else if (errorMessage?.includes("not found")) {
        setError("❌ No account found with this email.");
      } else {
        setError(errorMessage || "Sign in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleSignIn();
    }
  };

  // 🔐 OAuth Sign In
  const signInWithProvider = async (provider: "oauth_google" | "oauth_facebook") => {
    if (!isLoaded) return;
    setError(null);

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      console.error("OAuth error:", err);
      setError(err.errors?.[0]?.longMessage || "OAuth sign in failed.");
    }
  };

  return (
    <div className="min-h-[89vh] bg-black flex items-center justify-center p-4 relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&h=1080&fit=crop"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black opacity-90"></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-800">
          {/* Header */}
          <div className="bg-linear-to-r from-red-600 to-red-700 p-8 text-center rounded-t-2xl">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-red-100">Sign in to your account</p>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  onKeyPress={handleKeyPress}
                  className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 outline-none transition"
                  placeholder="your@email.com"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-gray-300 text-sm font-semibold">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  onKeyPress={handleKeyPress}
                  className="w-full bg-gray-800 text-white pl-12 pr-12 py-3 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 outline-none transition"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            {/* OAuth Buttons */}
            <button
              onClick={() => signInWithProvider("oauth_google")}
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign in with Google
            </button>

            <button
              onClick={() => signInWithProvider("oauth_facebook")}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign in with Facebook
            </button>

            {/* Signup */}
            <p className="text-center text-gray-400">
              Don't have an account?{" "}
              <a href="/sign-up" className="text-red-500 font-semibold hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;