import React from 'react';

interface CircularProgressProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'cyan' | 'green' | 'blue';
}

const CircularProgress: React.FC<CircularProgressProps> = ({ 
  percentage, 
  size = 'md', 
  color = 'cyan' 
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const colorClasses = {
    cyan: 'stroke-cyan-400',
    green: 'stroke-green-400',
    blue: 'stroke-blue-400'
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          className="text-gray-700"
        />
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className={`${colorClasses[color]} transition-all duration-300 ease-out`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-xs font-mono font-bold ${colorClasses[color].replace('stroke', 'text')}`}>
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;