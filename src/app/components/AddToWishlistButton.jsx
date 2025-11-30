"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export default function AddToWishlistButton({
  id,
  title,
  posterPath,
  releaseDate,
}) {
  const [added, setAdded] = useState(false);

  // ✅ تحقق هل الفيلم موجود بالفعل في localStorage
useEffect(() => {
  if (typeof window === "undefined") return;

  // نحط العملية دي في microtask (عشان React ما تعتبرهاش synchronous)
  Promise.resolve().then(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.some((movie) => movie.id === id);
    setAdded(exists);
  });
}, [id]);

  // ✅ توجل بين الإضافة والحذف
  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (added) {
      // حذف الفيلم من القائمة
      const updated = wishlist.filter((movie) => movie.id !== id);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setAdded(false);
    } else {
      // إضافة الفيلم إلى القائمة
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
      className={`group relative flex items-center gap-2 px-8 py-3 rounded-md font-semibold transition-all duration-300 ${
        added
          ? "bg-red-600 text-white hover:bg-red-700"
          : "bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
      }`}
    >
      <Heart
        size={18}
        className={`transition-transform duration-300 ${
          added
            ? "fill-current text-white scale-110"
            : "text-gray-400 group-hover:text-white"
        }`}
      />
      <span className="tracking-wide text-sm md:text-base">
        {added ? "Remove from Wishlist" : "Add to Wishlist"}
      </span>
    </button>
  );
}
