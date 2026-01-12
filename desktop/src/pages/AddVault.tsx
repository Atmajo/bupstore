import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import FileUploadPanel from '../components/FileUploadPanel';
import { apiClient } from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';

export default function AddVault() {
  const navigate = useNavigate();

  const handleUpload = async (file: File) => {
    try {
      await apiClient.uploadFile('/api/backup/upload', file);
      navigate('/vault');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-background-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Add Backup Codes</h1>
            <p className="text-[#9d9db9]">Upload your backup codes file</p>
          </div>

          <FileUploadPanel onUpload={handleUpload} />
        </main>
      </div>
    </div>
  );
}
