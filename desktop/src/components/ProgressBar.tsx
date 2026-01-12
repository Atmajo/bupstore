import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  height?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  height = 'sm',
  showPercentage = false,
  label,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-bold text-primary">{percentage.toFixed(0)}%</span>
          )}
        </div>
      )}
      <div
        className={`w-full bg-white/5 rounded-full overflow-hidden ${heightClasses[height]}`}
      >
        <div
          className="bg-primary h-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
