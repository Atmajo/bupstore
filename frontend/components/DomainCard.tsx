'use client';

import Link from 'next/link';
import { Domain } from '@/hooks/useDomains';

interface DomainCardProps {
  domain: Domain;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function DomainCard({ domain, onEdit, onDelete }: DomainCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-primary/20 border-primary/30 text-primary';
      case 'low':
        return 'bg-orange-500/20 border-orange-500/30 text-orange-500';
      default:
        return 'bg-white/10 border-white/20 text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'low':
        return 'Low Count';
      default:
        return 'Safe';
    }
  };

  return (
    <div className="glass-card rounded-xl p-5 group hover:border-primary/50 transition-all flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
          {domain.logo ? (
            <img
              src={domain.logo}
              alt={`${domain.name} logo`}
              className="size-10 object-contain"
            />
          ) : (
            <span className="text-2xl font-bold text-primary">
              {domain.name[0]?.toUpperCase()}
            </span>
          )}
        </div>
        <div className={`px-3 py-1 rounded-full border ${getStatusColor(domain.status)}`}>
          <span className="text-[10px] font-black uppercase tracking-widest">
            {getStatusLabel(domain.status)}
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-white text-xl font-bold mb-1">{domain.name}</h3>
        <p className={`text-sm font-medium ${domain.status === 'low' ? 'text-orange-400' : 'text-[#9d9db9]'}`}>
          {domain.remainingCodes} backup codes remaining
        </p>
        {domain.lastSync && (
          <p className="text-[#9d9db9]/60 text-xs mt-1">
            Last synced {domain.lastSync}
          </p>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        <Link
          href={`/vault/${domain.id}`}
          className="flex-1 bg-primary text-white text-xs font-bold py-2.5 rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">visibility</span>
          View
        </Link>
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors border border-white/10"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="px-3 bg-white/5 text-red-400 rounded-lg hover:bg-red-400/10 transition-colors border border-white/10"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        )}
      </div>
    </div>
  );
}
