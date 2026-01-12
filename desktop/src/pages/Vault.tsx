import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DomainCard from '../components/DomainCard';
import { useDomains } from '../hooks/useDomains';
import { Link } from 'react-router-dom';

export default function Vault() {
  const { domains, isLoading } = useDomains();

  return (
    <div className="flex min-h-screen bg-background-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Your Vault</h1>
            <p className="text-[#9d9db9]">Manage all your backup codes and domains</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : domains.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {domains.map((domain) => (
                <DomainCard key={domain.id} domain={domain} />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center">
              <span className="material-symbols-outlined text-6xl text-primary/50 mb-4">inbox</span>
              <h3 className="text-xl font-bold text-white mb-2">No domains yet</h3>
              <p className="text-[#9d9db9] mb-6">Start by adding your first backup codes</p>
              <Link
                to="/vault/add"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-all"
              >
                <span className="material-symbols-outlined">add</span>
                <span>Add New Code</span>
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
