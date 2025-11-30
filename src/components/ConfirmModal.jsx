"use client";

import { AlertCircle } from "lucide-react";

/**
 * Confirmation modal component for destructive actions
 * @param {Object} props
 * @param {string} props.title - Modal title
 * @param {string} props.message - Confirmation message
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onConfirm - Callback on confirm
 * @param {Function} props.onCancel - Callback on cancel
 * @param {string} props.confirmText - Confirm button text
 * @param {boolean} props.isLoading - Loading state
 */
export function ConfirmModal({
  title,
  message,
  isOpen,
  onConfirm,
  onCancel,
  confirmText = "Delete",
  isLoading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1A1A1A] rounded-lg p-6 max-w-sm w-full mx-4 text-white">
        <div className="flex items-start gap-4 mb-4">
          <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-300 text-sm mt-1">{message}</p>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
