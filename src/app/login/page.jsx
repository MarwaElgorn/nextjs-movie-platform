"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";

/**
 * Admin Login Page
 * Styled to match the project branding
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (email === "admin@movie.app" && password === "admin123") {
      setIsLoading(true);
      localStorage.setItem("adminSession", "true");
      setTimeout(() => {
        router.push("/");
      }, 500);
    } else {
      setError("Invalid credentials. Try: admin@movie.app / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-red-600 to-red-700 rounded-lg mb-4">
            <span className="font-bold text-white text-lg">SV</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400">Manage your movie collection</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-8 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@movie.app"
                className="w-full bg-[#0D0D0D] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0D0D0D] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition"
                required
              />
            </div>
          </div>

          {/* Demo Credentials Info */}
          <div className="p-3 bg-gray-900 border border-gray-800 rounded-lg">
            <p className="text-gray-400 text-xs leading-relaxed">
              <span className="font-semibold text-gray-300">Demo Account:</span>{" "}
              <br />
              Email: admin@movie.app <br />
              Password: admin123
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 duration-200"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* Back to Home Link */}
          <div className="text-center">
            <Link
              href="/"
              className="text-gray-400 hover:text-white text-sm transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
