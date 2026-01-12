'use client';

import { useState } from 'react';
import { withAuth } from '@/context/AuthContext';
import { useDomains } from '@/hooks/useDomains';
import Navbar from '@/components/Navbar';
import DomainCard from '@/components/DomainCard';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

function VaultPage() {
  const { domains, isLoading } = useDomains();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDomains = domains.filter((domain) =>
    domain.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background-dark font-display min-h-screen text-white">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <Navbar />

        <main className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-10">
          <div className="flex flex-col max-w-[1024px] flex-1">
            {/* Page Heading */}
            <div className="flex flex-wrap items-end justify-between gap-4 p-4 mb-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                  Manage Backup Codes
                </h1>
                <div className="flex items-center gap-2">
                  <span className="flex size-2 rounded-full bg-green-500" />
                  <p className="text-[#9d9db9] text-base font-medium">
                    {domains.length} Securely Stored {domains.length === 1 ? 'Domain' : 'Domains'}
                  </p>
                </div>
              </div>
              <Link
                href="/vault/add"
                className="flex min-w-[140px] cursor-pointer items-center justify-center gap-2 rounded-lg h-12 px-6 bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Add New Domain</span>
              </Link>
            </div>

            {/* Search and Filters Section */}
            <div className="flex flex-col lg:flex-row gap-4 px-4 py-2 mb-8">
              <div className="flex-1">
                <SearchBar
                  placeholder="Search domains (e.g. Google, Discord)..."
                  onSearch={setSearchQuery}
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                <button className="flex h-14 shrink-0 items-center justify-center gap-x-2 rounded-xl glass-card px-5 hover:bg-white/10 transition-colors">
                  <span className="text-white text-sm font-semibold">All Domains</span>
                  <span className="material-symbols-outlined text-white text-lg">expand_more</span>
                </button>
                <button className="flex h-14 shrink-0 items-center justify-center gap-x-2 rounded-xl glass-card px-5 hover:bg-white/10 transition-colors">
                  <span className="text-white text-sm font-semibold">Recently Used</span>
                  <span className="material-symbols-outlined text-white text-lg">history</span>
                </button>
              </div>
            </div>

            {/* Domain Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-[#9d9db9]">Loading domains...</p>
                </div>
              </div>
            ) : filteredDomains.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {filteredDomains.map((domain) => (
                  <DomainCard key={domain.id} domain={domain} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="size-16 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-[#9d9db9]">
                    folder_off
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">
                    {searchQuery ? 'No domains found' : 'No domains yet'}
                  </h3>
                  <p className="text-[#9d9db9] mb-4">
                    {searchQuery
                      ? 'Try a different search term'
                      : 'Start by adding your first backup domain'}
                  </p>
                  {!searchQuery && (
                    <Link
                      href="/vault/add"
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-all"
                    >
                      <span className="material-symbols-outlined">add</span>
                      <span>Add Your First Domain</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default withAuth(VaultPage);
