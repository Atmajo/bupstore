import React from 'react';

interface ProgressBarProps {
  value: number; // Current value
  max?: number; // Maximum value (defaults to 100)
  height?: 'sm' | 'md' | 'lg'; // Bar height
  showPercentage?: boolean; // Show percentage text
  label?: string; // Optional label
  className?: string; // Additional classes for container
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  height = 'sm',
  showPercentage = false,
  label,
  className = '',
}) => {
  // Calculate percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Height classes
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
