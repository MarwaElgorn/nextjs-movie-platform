"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditMoviePage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    year: "",
    poster: "",
  });

  useEffect(() => {
    const loadMovie = async () => {
      const res = await fetch(`/api/admin/movies/${id}`);
      const movie = await res.json();
      setForm({
        title: movie.title || "",
        year: movie.year || "",
        poster: movie.poster || "",
      });
    };

    loadMovie();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/api/admin/movies/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen text-white p-10">
      <h1 className="text-2xl font-bold mb-6">Edit Movie</h1>

      <form onSubmit={handleSubmit} className="grid gap-6 w-full max-w-lg">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="p-3 bg-[#1A1A1A] rounded"
        />

        <input
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          className="p-3 bg-[#1A1A1A] rounded"
        />

        <input
          value={form.poster}
          onChange={(e) => setForm({ ...form, poster: e.target.value })}
          className="p-3 bg-[#1A1A1A] rounded"
        />

        <button
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 w-fit"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}
