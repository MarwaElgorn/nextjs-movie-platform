"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

 
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(stored);
      } catch {
        setWishlist([]);
      }
    };


    loadWishlist();


    window.addEventListener("storage", loadWishlist);

 
    return () => window.removeEventListener("storage", loadWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <main className="bg-[#0D0D0D] text-white min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center">
          My Wishlist 
        </h1>

   
        {wishlist.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p>Your wishlist is empty.</p>
            <Link
              href="/movies"
              className="inline-block mt-6 bg-red-600 px-6 py-3 rounded-md hover:bg-red-700 transition"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {wishlist.map((movie) => (
              <div
                key={movie.id}
                className="bg-[#1A1A1A] rounded-lg overflow-hidden hover:bg-[#222] transition relative group"
              >
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  width={300}
                  height={400}
                  className="w-full h-72 object-cover"
                />

                <div className="p-3">
                  <h3 className="text-sm font-semibold">{movie.title}</h3>
                  <p className="text-gray-400 text-xs">
                    {movie.year || "N/A"}
                  </p>
                </div>

                <button
                  onClick={() => removeFromWishlist(movie.id)}
                  className="absolute top-2 right-2 bg-red-600 rounded-full p-2 text-xs hover:bg-red-700 transition opacity-0 group-hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
