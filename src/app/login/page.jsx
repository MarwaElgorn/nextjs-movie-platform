"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "admin123") {
      document.cookie = "adminSession=true; path=/;";
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0D0D0D] text-white">
      <div className="bg-[#1A1A1A] p-8 rounded-lg border border-gray-700 w-full max-w-sm">
        <h1 className="text-xl mb-4">Admin Login</h1>

        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-[#0D0D0D] border border-gray-700 rounded mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-red-600 rounded hover:bg-red-700"
        >
          Login
        </button>
      </div>
    </main>
  );
}
