'use client';

import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function SearchBar({ 
  placeholder = 'Search...', 
  onSearch,
  className = '' 
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`flex w-full items-stretch rounded-lg h-10 glass-panel ${className}`}>
      <div className="text-[#9d9db9] flex items-center justify-center pl-4">
        <span className="material-symbols-outlined text-xl">search</span>
      </div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="form-input w-full border-none bg-transparent focus:ring-0 text-white placeholder:text-[#9d9db9] pl-3 text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}
