
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  showPercentage?: boolean;
  className?: string;
  animate?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  showPercentage = true,
  className,
  animate = true
}) => {
  const [mounted, setMounted] = useState(false);
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine the color based on progress percentage
  const getColorClass = () => {
    if (percentage >= 100) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (percentage >= 75) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    if (percentage >= 50) return 'bg-gradient-to-r from-violet-500 to-blue-500';
    if (percentage >= 25) return 'bg-gradient-to-r from-fuchsia-500 to-violet-500';
    return 'bg-gradient-to-r from-pink-500 to-fuchsia-500';
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div 
          className={cn(
            "h-full transition-all rounded-full",
            getColorClass(),
            animate && mounted && "animate-progress"
          )}
          style={animate ? { '--progress': `CZK{percentage}%` } as React.CSSProperties : { width: `CZK{percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="flex justify-between mt-1 text-xs font-medium text-gray-500">
          <span>{percentage}% Complete</span>
          <span>{value} / {max}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
