"use client";

import { useState, useEffect, useCallback } from "react";
import { Icon } from "@/src/components/atoms";
import { useDebounce } from "@/src/hooks/useDebounce";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceDelay?: number;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder,
  debounceDelay = 300,
}: SearchBarProps) => {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, debounceDelay);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  const handleClear = useCallback(() => {
    setLocalValue("");
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Icon.Search size="md" color="text-gray-400" />
        </div>

        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder || "Search DApps..."}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />

        {localValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <Icon.Close size="md" color="text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
};
