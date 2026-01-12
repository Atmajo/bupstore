'use client';

import { withAuth } from '@/context/AuthContext';
import { useDomains } from '@/hooks/useDomains';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { ProgressBar } from '@/components/ProgressBar';
import Link from 'next/link';

function DashboardPage() {
  const { user } = useAuth();
  const { domains, isLoading } = useDomains();

  const totalDomains = domains.length;
  const totalCodes = domains.reduce((sum, d) => sum + d.remainingCodes, 0);
  const recentDomains = domains.slice(0, 4);

  return (
    <div className="bg-background-dark text-white min-h-screen font-display relative overflow-x-hidden">
      {/* Background Accents */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
          {/* Page Heading */}
          <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Welcome back, {user?.name || 'there'}
              </h1>
              <p className="text-[#9d9db9] text-base">
                Your digital vault is synchronized and encrypted with AES-256.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/vault/add"
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-all glow-blue"
              >
                <span className="material-symbols-outlined">add_circle</span>
                <span>Add New Code</span>
              </Link>
              <Link
                href="/vault/add"
                className="flex items-center gap-2 glass-panel hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl transition-all"
              >
                <span className="material-symbols-outlined">upload_file</span>
                <span>Bulk Import</span>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl">public</span>
              </div>
              <p className="text-[#9d9db9] text-sm font-medium uppercase tracking-wider mb-1">
                Total Domains
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black">{totalDomains}</p>
                <span className="text-emerald-400 text-sm font-bold">Active</span>
              </div>
              <ProgressBar value={totalDomains} max={15} height="sm" className="mt-4" />
            </div>

            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl">vpn_key</span>
              </div>
              <p className="text-[#9d9db9] text-sm font-medium uppercase tracking-wider mb-1">
                Total Codes
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black">{totalCodes}</p>
                <span className="text-emerald-400 text-sm font-bold">Secure</span>
              </div>
              <ProgressBar value={totalCodes} max={150} height="sm" className="mt-4" />
            </div>

            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group border-primary/30">
              <div className="absolute top-0 right-0 p-4 opacity-20 text-primary">
                <span className="material-symbols-outlined text-6xl">verified_user</span>
              </div>
              <p className="text-[#9d9db9] text-sm font-medium uppercase tracking-wider mb-1">
                Security Health
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black text-primary">Solid</p>
                <span className="text-[#9d9db9] text-sm font-bold">100% Secure</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-emerald-500 font-bold uppercase">
                  All backups encrypted
                </span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Domains Table */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold">Recent Domains</h2>
                <Link href="/vault" className="text-primary text-sm font-bold hover:underline">
                  View All
                </Link>
              </div>

              {isLoading ? (
                <div className="glass-panel rounded-2xl p-8 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-[#9d9db9]">Loading domains...</p>
                  </div>
                </div>
              ) : recentDomains.length > 0 ? (
                <div className="glass-panel rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="px-6 py-4 text-[#9d9db9] font-medium text-sm">Domain</th>
                        <th className="px-6 py-4 text-[#9d9db9] font-medium text-sm">Codes Left</th>
                        <th className="px-6 py-4 text-[#9d9db9] font-medium text-sm">Last Sync</th>
                        <th className="px-6 py-4 text-[#9d9db9] font-medium text-sm text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {recentDomains.map((domain, idx) => (
                        <tr key={domain.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">
                                {domain.name[0].toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold">{domain.name}</p>
                                <p className="text-xs text-[#9d9db9]">{domain.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                domain.remainingCodes > 5
                                  ? 'bg-emerald-500/10 text-emerald-400'
                                  : 'bg-amber-500/10 text-amber-400'
                              }`}
                            >
                              {domain.remainingCodes} Codes
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-[#9d9db9]">{domain.lastSync}</td>
                          <td className="px-6 py-4 text-right">
                            <Link href={`/vault/${domain.id}`}>
                              <button className="material-symbols-outlined text-[#9d9db9] hover:text-white transition-colors">
                                more_horiz
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="glass-panel rounded-2xl p-8 text-center">
                  <p className="text-[#9d9db9]">No domains found. Add your first backup code!</p>
                </div>
              )}
            </div>

            {/* Sidebar / Quick Actions */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold px-2 mb-4">Quick Insights</h2>
                <div className="glass-panel rounded-2xl p-6 flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined">sync</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Sync Status</p>
                      <p className="text-xs text-[#9d9db9] mt-1">
                        Cloud synchronization successful. All data encrypted.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold px-2 mb-4">Storage Usage</h2>
                <div className="glass-panel rounded-2xl p-6">
                  <ProgressBar
                    value={0.1}
                    max={1}
                    height="md"
                    showPercentage
                    label="Used Storage"
                  />
                  <p className="text-xs text-[#9d9db9] mt-2">0.1 GB of 1 GB used</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default withAuth(DashboardPage);
