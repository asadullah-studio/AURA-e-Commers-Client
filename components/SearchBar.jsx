'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onClose, className = '' }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      if (onClose) onClose();
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative flex items-center w-full ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for t-shirts, panjabis, sarees..."
        className="w-full pl-10 pr-10 py-2 text-sm bg-neutral-100 border border-transparent rounded-full focus:bg-white focus:border-neutral-400 focus:outline-none transition-all placeholder:text-neutral-400"
      />
      <Search className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className="absolute right-3 p-1 text-neutral-400 hover:text-neutral-600"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  );
}
