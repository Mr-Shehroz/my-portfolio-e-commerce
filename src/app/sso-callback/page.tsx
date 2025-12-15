// app/sso-callback/page.tsx
"use client";

import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();

  useEffect(() => {
    handleRedirectCallback().then(() => {
      router.push("/");
    });
  }, []);

  return <div className="min-h-screen flex items-center justify-center">
    <p className="text-white">Completing sign in...</p>
  </div>;
}