'use client';

import { useState } from 'react';
import { withAuth } from '@/context/AuthContext';
import { apiClient } from '@/hooks/useApi';
import Navbar from '@/components/Navbar';
import FileUploadPanel from '@/components/FileUploadPanel';
import { useRouter } from 'next/navigation';

function AddCodesPage() {
  const [activeTab, setActiveTab] = useState<'manual' | 'upload'>('upload');
  const [domainName, setDomainName] = useState('');
  const [codes, setCodes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const codeArray = codes
        .split('\n')
        .map((c) => c.trim())
        .filter((c) => c.length > 0);

      await apiClient.post('/api/backup/add', {
        name: domainName,
        codes: codeArray,
      });

      setSuccess('Codes added successfully!');
      setTimeout(() => {
        router.push('/vault');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to add codes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File, extractedText?: string) => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      let text = extractedText;

      // If no extracted text provided (for .txt files), read the file
      if (!text) {
        text = await file.text();
      }

      // Extract codes from the text
      const codePattern = /(\d{4}\s*\d{4})/g;
      const matches = text.match(codePattern) || [];
      const extractedCodes = matches.map(code => code.replace(/\s+/g, ''));

      if (extractedCodes.length === 0) {
        throw new Error('No backup codes found in the file');
      }

      // Pre-fill codes from uploaded file
      setCodes(extractedCodes.join('\n'));
      
      // Switch to manual entry tab
      setActiveTab('manual');
      
      setSuccess(`File processed successfully! Found ${extractedCodes.length} backup codes. Please enter the domain name to save these codes.`);
    } catch (err: any) {
      setError(err.message || 'Failed to process file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background-dark font-display min-h-screen text-white">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <Navbar />

        <main className="px-4 md:px-40 flex flex-1 justify-center py-12">
          <div className="flex flex-col max-w-[960px] flex-1">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between gap-3 p-4 mb-6">
              <div className="flex min-w-72 flex-col gap-2">
                <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Add New Codes
                </p>
                <p className="text-[#9d9db9] text-base font-normal leading-normal">
                  Securely import your recovery keys to BupStore.
                </p>
              </div>
            </div>

            {/* Success/Error Messages */}
            {error && (
              <div className="mx-4 mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="mx-4 mb-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
                {success}
              </div>
            )}

            {/* Tabs */}
            <div className="pb-6">
              <div className="flex border-b border-[#3b3b54] px-4 gap-8">
                <button
                  onClick={() => setActiveTab('manual')}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-all ${
                    activeTab === 'manual'
                      ? 'border-b-primary text-white'
                      : 'border-b-transparent text-[#9d9db9] hover:text-white'
                  }`}
                >
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                    Manual Entry
                  </p>
                </button>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-all ${
                    activeTab === 'upload'
                      ? 'border-b-primary text-white'
                      : 'border-b-transparent text-[#9d9db9] hover:text-white'
                  }`}
                >
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                    File Upload
                  </p>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'upload' ? (
              <FileUploadPanel onUpload={handleFileUpload} />
            ) : (
              <div className="flex flex-col p-4">
                <form onSubmit={handleManualSubmit} className="glass-panel rounded-xl p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Domain Name</label>
                      <input
                        type="text"
                        value={domainName}
                        onChange={(e) => setDomainName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="e.g., Google, GitHub, Discord"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Backup Codes (one per line)
                      </label>
                      <textarea
                        value={codes}
                        onChange={(e) => setCodes(e.target.value)}
                        rows={10}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-mono text-sm"
                        placeholder="XXXX-XXXX-XXXX&#10;YYYY-YYYY-YYYY&#10;ZZZZ-ZZZZ-ZZZZ"
                        required
                      />
                      <p className="text-xs text-[#9d9db9] mt-2">
                        Enter each backup code on a new line
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Adding codes...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined">add</span>
                          <span>Add Codes</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Security Disclaimer */}
                <div className="flex justify-center items-center gap-2 mt-8 opacity-60">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <p className="text-[11px] uppercase tracking-widest text-[#9d9db9]">
                    All codes are encrypted before storage
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Floating Decorative Elements */}
        <div className="fixed -bottom-24 -left-24 size-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="fixed -top-24 -right-24 size-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      </div>
    </div>
  );
}

export default withAuth(AddCodesPage);
