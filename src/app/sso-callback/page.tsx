"use client";

import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();

  useEffect(() => {
    handleRedirectCallback({ redirectUrl: "/" });
  }, [handleRedirectCallback, router]);

  return (
    <div className="bg-black text-white relative min-h-screen flex items-center justify-center">
      {/* Unified red radial glow — matches all sections */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
      </div>

      {/* Content */}
      <div className="text-center z-10 px-4">
        <div className="w-16 h-16 bg-linear-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-600/30">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
          Welcome to <span className="text-red-600">SportsHub</span>
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Completing your secure sign-in...
        </p>
        <div className="mt-6 w-16 h-1 mx-auto bg-red-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}