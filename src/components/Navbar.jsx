"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Search as SearchIcon, LogOut, User } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

/**
 * Navigation Bar Component
 * Features responsive design, mobile menu, search, and admin dashboard access
 * Client component due to mobile menu state and interactivity
 */
export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  // Check if user is admin after mount
  useEffect(() => {
    const checkAdmin = () => {
      const adminSession = localStorage.getItem("adminSession");
      if (adminSession === "true") {
        setIsAdmin(true);
      }
    };
    checkAdmin();
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/movies", label: "Movies & Shows" },
    { href: "/wishlist", label: "Wishlist" },
    ...(isAdmin ? [{ href: "/dashboard", label: "Dashboard" }] : []),
  ];

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        setSearchQuery("");
        setIsOpen(false);
      }
    },
    [searchQuery, router]
  );

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    setIsAdmin(false);
    setShowAdminMenu(false);
    router.push("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 hover:opacity-80 transition">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center font-bold text-white">
                SV
              </div>
              <span className="hidden sm:inline font-bold text-white text-lg">
                StreamVibe
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-[#1A1A1A]/50 backdrop-blur-sm rounded-full px-8 py-3 border border-gray-700/50">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <form
              onSubmit={handleSearch}
              className="p-2 hover:bg-white/10 rounded-full transition"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-transparent text-white text-sm placeholder-gray-400 w-24 focus:outline-none"
              />
              <button type="submit" className="ml-2">
                <SearchIcon className="w-5 h-5 text-gray-300 hover:text-white" />
              </button>
            </form>
            {!isAdmin && (
              <Link
                href="/login"
                className="px-4 py-2 text-white hover:bg-white/10 rounded-full transition text-sm font-medium"
              >
                Login
              </Link>
            )}
            {isAdmin && (
              <div className="relative">
                <button
                  onClick={() => setShowAdminMenu(!showAdminMenu)}
                  className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-full transition text-sm font-medium"
                >
                  <User className="w-4 h-4" />
                  <span>Admin</span>
                </button>
                {showAdminMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] border border-gray-700 rounded-lg shadow-lg z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-600/10 transition text-sm first:rounded-t-lg last:rounded-b-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
            <button className="p-2 hover:bg-white/10 rounded-full transition relative">
              <svg
                className="w-5 h-5 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-600/10 rounded-lg transition text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
