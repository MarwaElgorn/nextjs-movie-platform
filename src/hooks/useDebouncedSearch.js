import { useEffect, useState } from "react";

/**
 * Custom hook for debounced search
 * @param {string} initialValue
 * @param {number} delay - Debounce delay in ms
 * @param {Function} onSearch - Callback when value changes
 */
export function useDebouncedSearch(initialValue = "", delay = 500, onSearch) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      onSearch?.(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, onSearch]);

  return { value, setValue, debouncedValue };
}
