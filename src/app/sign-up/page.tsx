"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useSignUp } from "@clerk/nextjs";

const Signup = () => {
  const { signUp, isLoaded } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  // ✅ Email/Password Sign Up with Proper Verification
  const handleSignup = async () => {
    setError(null);
    if (!isLoaded) return;

    if (!formData.email || !formData.password || !formData.fullName) {
      setError("All fields are required.");
      return;
    }

    try {
      // Split full name properly
      const [firstName, ...lastNameParts] = formData.fullName.trim().split(" ");
      
      // 1️⃣ Create user with email & password
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName,
        lastName: lastNameParts.join(" ") || "",
      });

      // 2️⃣ Send verification email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      
      // 3️⃣ Show verification UI
      setPendingVerification(true);
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.errors?.[0]?.longMessage || "Signup failed. Try again.");
    }
  };

  // ✅ Verify Email Code
  const handleVerifyEmail = async () => {
    if (!isLoaded) return;
    setError(null);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        // Redirect to home or dashboard
        window.location.href = "/";
      } else {
        setError("Verification incomplete. Please try again.");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.errors?.[0]?.longMessage || "Invalid verification code.");
    }
  };

  // ✅ OAuth Signup with Error Handling
  const signUpWithProvider = async (provider: "oauth_google" | "oauth_facebook") => {
    if (!isLoaded) return;
    setError(null);

    try {
      await signUp.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      console.error("OAuth error:", err);
      setError(err.errors?.[0]?.longMessage || "OAuth signup failed.");
    }
  };

  // ✅ Email Verification UI
  if (pendingVerification) {
    return (
      <div className="min-h-[89vh] bg-black flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Verify Your Email</h2>
          <p className="text-gray-400 mb-6">
            We sent a verification code to <span className="text-red-500">{formData.email}</span>
          </p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 mb-4"
          />

          <button
            onClick={handleVerifyEmail}
            className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all"
          >
            Verify Email
          </button>
        </div>
      </div>
    );
  }

  // ✅ Main Signup Form
  return (
    <div className="min-h-[110vh] bg-black flex items-center justify-center p-4 relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&h=1080&fit=crop"
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
            <h1 className="text-3xl font-bold text-white mb-2">Join Us Today</h1>
            <p className="text-red-100">Create your account and start shopping</p>
          </div>

          {/* Form */}
          <div className="p-8 space-y-5">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Full Name */}
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-gray-800 text-white pl-12 pr-12 py-3 rounded-lg border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Create Account */}
            <button
              onClick={handleSignup}
              className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            {/* OAuth Buttons */}
            <button
              onClick={() => signUpWithProvider("oauth_google")}
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
            >
              Sign up with Google
            </button>

            <button
              onClick={() => signUpWithProvider("oauth_facebook")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Sign up with Facebook
            </button>

            {/* Switch to Login */}
            <p className="text-center text-gray-400">
              Already have an account?{" "}
              <a href="/sign-in" className="text-red-500 font-semibold hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;