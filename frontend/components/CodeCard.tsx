'use client';

import { useState } from 'react';
import { Code } from '@/hooks/useCodes';

interface CodeCardProps {
  code: Code;
  onCopy?: () => void;
}

export default function CodeCard({ code, onCopy }: CodeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.code);
      setCopied(true);
      if (onCopy) onCopy();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isUsed = code.status === 'used';

  return (
    <div
      className={`glass-card rounded-xl p-5 group transition-all flex flex-col gap-4 ${
        isUsed ? 'opacity-60 border-dashed' : 'hover:border-primary/50'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
          Slot {code.slot.toString().padStart(2, '0')}
        </span>
        <span
          className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isUsed
              ? 'bg-slate-500/10 text-slate-500'
              : 'bg-green-500/10 text-green-500'
          }`}
        >
          {!isUsed && <span className="size-1 bg-green-500 rounded-full" />}
          {isUsed ? 'USED' : 'ACTIVE'}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <div
          className={`text-xl font-mono tracking-widest font-bold ${
            isUsed ? 'line-through text-slate-600' : 'code-blur cursor-help'
          }`}
        >
          {code.code}
        </div>
        <p className="text-[10px] text-slate-500">
          {isUsed ? `Used on ${formatDate(code.usedAt)}` : 'Hover to reveal code'}
        </p>
      </div>

      <div className="flex gap-2 pt-2 border-t border-white/5">
        {!isUsed ? (
          <>
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary text-xs font-bold transition-all"
            >
              <span className="material-symbols-outlined text-sm">
                {copied ? 'check' : 'content_copy'}
              </span>
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-all">
              <span className="material-symbols-outlined text-sm">history</span>
            </button>
          </>
        ) : (
          <button
            disabled
            className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg bg-white/5 text-xs font-bold cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">block</span>
            Unavailable
          </button>
        )}
      </div>
    </div>
  );
}
