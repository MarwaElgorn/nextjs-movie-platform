"use client";

import { X } from "lucide-react";

export default function DeleteModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1A1A1A] w-full max-w-sm p-6 rounded-lg border border-gray-700 relative">

        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl mb-4 font-bold">Delete Movie</h2>
        <p className="mb-6 text-gray-300">
          Are you sure you want to delete this movie?
        </p>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2 bg-red-600 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
