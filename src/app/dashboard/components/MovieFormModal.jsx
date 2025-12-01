"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export default function MovieFormModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    title: "",
    year: "",
    poster: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        year: initialData.year || "",
        poster: initialData.poster || "",
      });
    } else {
      setForm({ title: "", year: "", poster: "" });
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1A1A1A] w-full max-w-lg rounded-lg p-6 relative shadow-xl border border-gray-700">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit Movie" : "Add Movie"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-300">Title</label>
            <input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full p-3 bg-[#2A2A2A] rounded outline-none border border-gray-700 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Year</label>
            <input
              value={form.year}
              onChange={(e) => handleChange("year", e.target.value)}
              className="w-full p-3 bg-[#2A2A2A] rounded outline-none border border-gray-700 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Poster URL</label>
            <input
              value={form.poster}
              onChange={(e) => handleChange("poster", e.target.value)}
              className="w-full p-3 bg-[#2A2A2A] rounded outline-none border border-gray-700 focus:border-red-500"
            />
          </div>

          {form.poster && (
            <div className="w-full h-60 relative border border-gray-700 rounded overflow-hidden">
              <Image src={form.poster} alt="Preview" fill className="object-cover" />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-700 text-white rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded">
              {initialData ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
