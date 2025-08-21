import React from 'react';

interface SystemMetricProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'cyan' | 'green' | 'blue';
}

const SystemMetric: React.FC<SystemMetricProps> = ({ icon, label, value, color }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'cyan':
        return 'text-cyan-400 border-cyan-400/30';
      case 'green':
        return 'text-green-400 border-green-400/30';
      case 'blue':
        return 'text-blue-400 border-blue-400/30';
      default:
        return 'text-cyan-400 border-cyan-400/30';
    }
  };

  return (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border bg-slate-900/30 backdrop-blur-sm ${getColorClasses(color)}`}>
      <div className={getColorClasses(color).split(' ')[0]}>
        {icon}
      </div>
      <span className="text-gray-300 text-sm">{label}:</span>
      <span className={`text-sm font-mono font-semibold ${getColorClasses(color).split(' ')[0]}`}>
        {value}
      </span>
    </div>
  );
};

export default SystemMetric;