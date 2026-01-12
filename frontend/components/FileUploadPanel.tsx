'use client';

import { useState, useRef } from 'react';

interface FileUploadPanelProps {
  onFileSelect?: (file: File) => void;
  onUpload?: (file: File) => Promise<void>;
  acceptedTypes?: string[];
}

export default function FileUploadPanel({
  onFileSelect,
  onUpload,
  acceptedTypes = ['.txt', '.pdf'],
}: FileUploadPanelProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setSelectedFile(file);
    if (onFileSelect) {
      onFileSelect(file);
    }

    if (onUpload) {
      setUploading(true);
      setProgress(0);

      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      try {
        await onUpload(file);
        setProgress(100);
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        clearInterval(interval);
        setTimeout(() => {
          setUploading(false);
          setProgress(0);
        }, 1000);
      }
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col p-4">
      <div
        className={`flex flex-col items-center gap-8 rounded-xl border-2 border-dashed px-6 py-16 glass-panel transition-all cursor-pointer group ${
          dragActive ? 'border-primary bg-primary/5' : 'border-primary/40 hover:border-primary'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={acceptedTypes.join(',')}
          onChange={handleChange}
        />

        <div className="flex flex-col items-center gap-4">
          <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl">cloud_upload</span>
          </div>
          <div className="flex max-w-[480px] flex-col items-center gap-2">
            <p className="text-white text-xl font-bold leading-tight tracking-[-0.015em] text-center">
              Drag and drop your backup file here
            </p>
            <p className="text-[#9d9db9] text-sm font-normal leading-normal text-center">
              Upload exported codes from Google, GitHub, or Discord.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick();
          }}
        >
          <span className="truncate">Select File</span>
        </button>
      </div>

      {/* File Format Support Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-1 gap-4 rounded-xl border border-[#3b3b54] glass-card p-5 items-center hover:bg-white/5 transition-colors">
          <div className="size-10 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center">
            <span className="material-symbols-outlined">description</span>
          </div>
          <div>
            <h2 className="text-white text-base font-bold leading-tight">Text File (.txt)</h2>
            <p className="text-[#9d9db9] text-xs">Plain text recovery lists</p>
          </div>
        </div>

        <div className="flex flex-1 gap-4 rounded-xl border border-[#3b3b54] glass-card p-5 items-center hover:bg-white/5 transition-colors">
          <div className="size-10 rounded-lg bg-red-500/20 text-red-500 flex items-center justify-center">
            <span className="material-symbols-outlined">picture_as_pdf</span>
          </div>
          <div>
            <h2 className="text-white text-base font-bold leading-tight">PDF Document (.pdf)</h2>
            <p className="text-[#9d9db9] text-xs">Official backup documents</p>
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {uploading && selectedFile && (
        <div className="mt-6 p-6 rounded-xl border border-[#3b3b54] glass-card">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">data_object</span>
              <span className="text-sm font-medium text-white">{selectedFile.name}</span>
            </div>
            <span className="text-xs font-bold text-primary">{progress}%</span>
          </div>
          <div className="w-full bg-[#282839] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xs text-[#9d9db9]">
              {progress < 100 ? 'Scanning for 2FA patterns...' : 'Upload complete!'}
            </p>
          </div>
        </div>
      )}

      {/* Security Disclaimer */}
      <div className="flex justify-center items-center gap-2 mt-8 opacity-60">
        <span className="material-symbols-outlined text-sm">lock</span>
        <p className="text-[11px] uppercase tracking-widest text-[#9d9db9]">
          Files are processed locally and never stored in plain text
        </p>
      </div>
    </div>
  );
}
