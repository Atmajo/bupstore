import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-background-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-[#9d9db9]">Manage your account and preferences</p>
          </div>

          <div className="glass-card rounded-2xl p-8 max-w-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Account Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#9d9db9] mb-2">Name</label>
                <input
                  type="text"
                  value={user?.name || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9d9db9] mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                  readOnly
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
