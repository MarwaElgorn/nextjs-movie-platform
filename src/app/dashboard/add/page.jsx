"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddMoviePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    year: "",
    poster: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/movies", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) router.push("/dashboard");
  };

  return (
    <main className="min-h-screen text-white p-10">
      <h1 className="text-2xl font-bold mb-6">Add Movie</h1>

      <form onSubmit={handleSubmit} className="grid gap-6 w-full max-w-lg">
        <input
          placeholder="Title"
          className="p-3 bg-[#1A1A1A] rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Year"
          className="p-3 bg-[#1A1A1A] rounded"
          onChange={(e) => setForm({ ...form, year: e.target.value })}
        />

        <input
          placeholder="Poster URL"
          className="p-3 bg-[#1A1A1A] rounded"
          onChange={(e) => setForm({ ...form, poster: e.target.value })}
        />

        <button
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 w-fit"
          type="submit"
        >
          Add
        </button>
      </form>
    </main>
  );
}
