import React from 'react';

interface HolographicElementProps {
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}

const HolographicElement: React.FC<HolographicElementProps> = ({ size = 'md', delay = 0 }) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32', 
    lg: 'w-40 h-40'
  };

  return (
    <div className={`${sizeClasses[size]} absolute inset-0 m-auto`}>
      <div 
        className="w-full h-full rounded-full border border-cyan-400/20 animate-spin"
        style={{
          animationDuration: '20s',
          animationDelay: `${delay}s`,
          animationDirection: delay % 2 === 0 ? 'normal' : 'reverse'
        }}
      >
        {/* Segmented border effect */}
        <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
        <div className="absolute top-1/2 right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
        <div className="absolute bottom-0 left-1/2 w-2 h-2 -translate-x-1/2 translate-y-1/2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
        <div className="absolute top-1/2 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
      </div>
      
      {/* Inner rotating element */}
      <div 
        className="absolute inset-2 rounded-full border-2 border-dashed border-cyan-400/30 animate-spin"
        style={{
          animationDuration: '15s',
          animationDelay: `${delay + 1}s`,
          animationDirection: delay % 2 === 0 ? 'reverse' : 'normal'
        }}
      />
    </div>
  );
};

export default HolographicElement;