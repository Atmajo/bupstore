import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CodeCard from '../components/CodeCard';
import { useCodes } from '../hooks/useCodes';

export default function VaultDomain() {
  const { domainId } = useParams<{ domainId: string }>();
  const { codes, isLoading } = useCodes(domainId);

  return (
    <div className="flex min-h-screen bg-background-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Backup Codes</h1>
            <p className="text-[#9d9db9]">View and manage your backup codes for this domain</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : codes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {codes.map((code) => (
                <CodeCard key={code.id} code={code} />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center">
              <p className="text-[#9d9db9]">No codes found for this domain</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
