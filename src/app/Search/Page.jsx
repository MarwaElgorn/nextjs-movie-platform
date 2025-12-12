

"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { API_KEY, BASE_URL, IMG_PATH } from "@/lib/config";

/*
Simple Search page
- reads q from URL ?q=
- fetches TMDB search results
- shows minimal card: poster + title + year
- safe fallback for images
*/

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log("API_KEY FROM CONFIG:", API_KEY);
console.log("BASE_URL FROM CONFIG:", BASE_URL);
console.log("IMG_PATH FROM CONFIG:", IMG_PATH);


  const performSearch = useCallback(async (term) => {
    if (!term || !term.trim()) {
      setResults([]);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `${BASE_URL}/search/movie?query=${encodeURIComponent(
          term
        )}&api_key=${API_KEY}&language=en-US`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      const list = Array.isArray(data.results) ? data.results : [];
      const filtered = list.filter((m) => m.title).slice(0, 20);
      setResults(filtered);
    } catch (e) {
      console.error("Search error", e);
      setError("حدث خطأ حاول مرة تانية");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (q) performSearch(q);
    else {
      setResults([]);
      setError("");
    }
  }, [q, performSearch]);

  // optional small client-side search box on page
  const [local, setLocal] = useState(q);
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = (local || "").trim();
    if (!trimmed) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white pt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Search Movies</h1>

        <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
          <input
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Type movie name and press enter"
            className="flex-1 p-3 bg-[#1A1A1A] rounded"
          />
          <button className="bg-red-600 px-4 py-2 rounded">Search</button>
        </form>

        {loading && <p className="text-gray-400">Loading...</p>}

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {!q && !loading && (
          <p className="text-gray-400">
            Use the search box above or the navbar to search
          </p>
        )}

        {q && results.length === 0 && !loading && (
          <p className="text-gray-400">No results for "{q}"</p>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((m) => {
              const poster = m.poster_path
                ? `${IMG_PATH}${m.poster_path}`
                : null;
              const year = m.release_date ? m.release_date.slice(0, 4) : "N/A";
              const movieId = m.id;

              return (
                <Link
                  key={movieId}
                  href={`/movies/${movieId}`}
                  className="block bg-[#1A1A1A] rounded overflow-hidden hover:opacity-80 transition"
                >
                  <div className="w-full h-64 relative bg-gray-800">
                    {poster ? (
                      <Image
                        src={poster}
                        alt={m.title || "Movie"}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'%3E%3Crect fill='%23444' width='200' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <h3 className="text-sm font-semibold line-clamp-2 mb-1">
                      {m.title}
                    </h3>
                    <p className="text-gray-400 text-xs">{year}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
