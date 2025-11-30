"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

/**
 * Add to Wishlist Button Component
 * Manages wishlist state with localStorage
 * Client component - requires localStorage and state management
 */
export default function AddToWishlistButton({
  id,
  title,
  posterPath,
  releaseDate,
}) {
  const [added, setAdded] = useState(false);

  // Check if movie exists in localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Use microtask to avoid React synchronous warnings
    Promise.resolve().then(() => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const exists = wishlist.some((movie) => movie.id === id);
      setAdded(exists);
    });
  }, [id]);

  // Toggle between adding and removing from wishlist
  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (added) {
      // Remove movie from wishlist
      const updated = wishlist.filter((movie) => movie.id !== id);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setAdded(false);
    } else {
      // Add movie to wishlist
      const newItem = {
        id,
        title,
        poster: posterPath
          ? `https://image.tmdb.org/t/p/w500${posterPath}`
          : "/placeholder.jpg",
        year: releaseDate?.slice(0, 4),
      };
      localStorage.setItem("wishlist", JSON.stringify([...wishlist, newItem]));
      setAdded(true);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`p-2 rounded-full transition ${
        added
          ? "bg-red-600/20 text-red-600 hover:bg-red-600/30"
          : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
      }`}
      title={added ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`w-5 h-5 ${added ? "fill-current" : ""}`} />
    </button>
  );
}
