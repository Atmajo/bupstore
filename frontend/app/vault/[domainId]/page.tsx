'use client';

import { useState } from 'react';
import { withAuth } from '@/context/AuthContext';
import { useCodes } from '@/hooks/useCodes';
import { useDomains } from '@/hooks/useDomains';
import Sidebar from '@/components/Sidebar';
import CodeCard from '@/components/CodeCard';
import Link from 'next/link';
import { useParams } from 'next/navigation';

function ViewCodesPage() {
  const params = useParams();
  const domainId = params?.domainId as string;
  const { domains } = useDomains();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCodes, setShowCodes] = useState(true);
  
  const domain = domains.find((d) => d.id === domainId);

  const { codes, isLoading: codesLoading, updateCodeStatus } = useCodes(domainId);
  
  const filteredCodes = codes.filter((code) =>
    code.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCodes = filteredCodes.filter((c) => c.status === 'active');
  const usedCodes = filteredCodes.filter((c) => c.status === 'used');

  const handleCopyCode = async (codeId: string) => {
    try {
      await updateCodeStatus(codeId, 'used');
    } catch (error) {
      console.error('Failed to update code status:', error);
    }
  };

  return (
    <div className="bg-background-dark text-white min-h-screen">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex flex-col overflow-y-auto relative">
          {/* Background Glows */}
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

          {/* Breadcrumbs */}
          <header className="px-8 py-6 flex flex-col gap-6 relative z-10">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/vault" className="text-slate-400 hover:text-primary transition-colors">
                Domains
              </Link>
              <span className="text-slate-400">/</span>
              <span className="text-white font-medium">{domain?.name || 'Loading...'}</span>
            </nav>

            {/* Page Heading */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className="size-16 rounded-2xl bg-white/5 glass-card flex items-center justify-center p-3">
                  {domain?.logo ? (
                    <img
                      className="w-full h-full object-contain"
                      alt={`${domain.name} logo`}
                      src={domain.logo}
                    />
                  ) : (
                    <span className="text-3xl font-bold text-primary">
                      {domain?.name[0] || '?'}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-3xl font-black tracking-tight">
                    {domain?.name || 'Domain'} Backup Codes
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {activeCodes.length} active codes available
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/vault/add"
                  className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Add More Codes
                </Link>
                <button className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-500/20 transition-colors">
                  Delete Domain
                </button>
              </div>
            </div>
          </header>

          {/* Toolbar */}
          <section className="px-8 mb-4 relative z-10">
            <div className="glass-card rounded-xl p-3 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    search
                  </span>
                  <input
                    className="bg-white/5 border-none rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:ring-1 focus:ring-primary ring-inset placeholder:text-slate-500"
                    placeholder="Filter codes..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="h-6 w-px bg-white/10 mx-2" />
                <button
                  onClick={() => setShowCodes(!showCodes)}
                  className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors group"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showCodes ? 'visibility_off' : 'visibility'}
                  </span>
                  <span>{showCodes ? 'Hide All' : 'Show All'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-300 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-xl">download</span>
                  <span>Export</span>
                </button>
                <button className="bg-primary flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all">
                  <span className="material-symbols-outlined text-xl">content_copy</span>
                  <span>Copy All</span>
                </button>
              </div>
            </div>
          </section>

          {/* Code Grid */}
          <section className="px-8 pb-12 relative z-10">
            {codesLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-[#9d9db9]">Loading codes...</p>
                </div>
              </div>
            ) : filteredCodes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredCodes.map((code) => (
                  <CodeCard 
                    key={code.id} 
                    code={code} 
                    onCopy={() => handleCopyCode(code.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="size-16 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-[#9d9db9]">key_off</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">No codes found</h3>
                  <p className="text-[#9d9db9] mb-4">
                    {searchQuery
                      ? 'Try a different search term'
                      : 'Add backup codes for this domain'}
                  </p>
                  {!searchQuery && (
                    <Link
                      href="/vault/add"
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-all"
                    >
                      <span className="material-symbols-outlined">add</span>
                      <span>Add Codes</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default withAuth(ViewCodesPage);
