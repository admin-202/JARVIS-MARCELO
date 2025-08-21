import React, { useEffect, useState } from 'react';
import { Activity, Cpu, Database, Globe, Monitor, Shield, Signal, Wifi } from 'lucide-react';
import StatusPanel from './components/StatusPanel';
import CircularProgress from './components/CircularProgress';
import SystemMetric from './components/SystemMetric';
import HolographicElement from './components/HolographicElement';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const metricsInterval = setInterval(() => {
      setCpuUsage(Math.random() * 100);
      setMemoryUsage(Math.random() * 100);
    }, 2000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1)_0%,transparent_50%)]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Top Status Bar */}
      <div className="relative z-10 flex justify-between items-center p-6 border-b border-cyan-500/20">
        <div className="flex items-center space-x-6">
          <div className="text-cyan-400 font-orbitron font-bold text-xl">
            James FazTudo
          </div>
          <div className="text-cyan-300 text-sm">
            {currentTime.toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-cyan-300">
          <div className="flex items-center space-x-2">
            <Signal className="w-4 h-4 text-green-400" />
            <span>ONLINE</span>
          </div>
          <div className="text-cyan-400 font-mono">
            {currentTime.toLocaleTimeString('pt-BR')}
          </div>
        </div>
      </div>

      {/* Main Content - Adjusted for fullscreen */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 flex-1 min-h-0 pt-8 lg:pt-16">
        {/* Left Panel */}
        <div className="lg:col-span-3 space-y-4 flex flex-col justify-center">
          <StatusPanel 
            title="Sistema"
            icon={<Monitor className="w-5 h-5" />}
            metrics={[
              { label: 'CPU', value: `${cpuUsage.toFixed(1)}%`, color: 'cyan' },
              { label: 'RAM', value: `${memoryUsage.toFixed(1)}%`, color: 'green' },
              { label: 'Rede', value: '1.2GB/s', color: 'blue' }
            ]}
          />
          <StatusPanel 
            title="Segurança"
            icon={<Shield className="w-5 h-5" />}
            metrics={[
              { label: 'Firewall', value: 'ATIVO', color: 'green' },
              { label: 'Intrusões', value: '0', color: 'cyan' },
              { label: 'Última varredura', value: '15min', color: 'blue' }
            ]}
          />
        </div>

        {/* Center - JARVIS Widget */}
        <div className="lg:col-span-6 flex items-center justify-center relative min-h-0 mt-4 lg:mt-8">
          <div className="relative">
            {/* Outer Rings */}
            <div className="absolute inset-0 -m-24 pointer-events-none">
              <HolographicElement size="lg" />
            </div>
            <div className="absolute inset-0 -m-16 pointer-events-none">
              <HolographicElement size="md" delay={1} />
            </div>
            <div className="absolute inset-0 -m-8 pointer-events-none">
              <HolographicElement size="sm" delay={2} />
            </div>
            
            {/* Central Widget Container */}
            <div className="relative z-10 w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-cyan-400/20 flex items-center justify-center shadow-2xl">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-400/30 flex items-center justify-center relative">
                {/* Breathing effect */}
                <div className="absolute inset-0 rounded-full bg-cyan-400/10 animate-ping pointer-events-none" />
                
                {/* Central Label */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
                  <div className="text-cyan-400 font-orbitron font-bold text-lg">
                    James
                  </div>
                  <div className="text-cyan-300/70 text-xs mt-1">
                    AI Voice Assistant
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-3 space-y-4 flex flex-col justify-center">
          <StatusPanel 
            title="Conectividade"
            icon={<Wifi className="w-5 h-5" />}
            metrics={[
              { label: 'Internet', value: 'CONECTADO', color: 'green' },
              { label: 'Servidores', value: '99.9%', color: 'cyan' },
              { label: 'Latência', value: '12ms', color: 'blue' }
            ]}
          />
          <StatusPanel 
            title="Base de Dados"
            icon={<Database className="w-5 h-5" />}
            metrics={[
              { label: 'Consultas', value: '1,247', color: 'cyan' },
              { label: 'Sincronização', value: 'OK', color: 'green' },
              { label: 'Backup', value: '2h atrás', color: 'blue' }
            ]}
          />
        </div>
      </div>

      {/* Bottom Metrics Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-cyan-500/20 p-3 bg-gray-900/80 backdrop-blur-sm">
        <div className="flex justify-center space-x-8">
          <SystemMetric 
            icon={<Activity className="w-4 h-4" />} 
            label="Atividade"
            value="Alta"
            color="green"
          />
          <SystemMetric 
            icon={<Cpu className="w-4 h-4" />} 
            label="Processamento"
            value={`${cpuUsage.toFixed(0)}%`}
            color="cyan"
          />
          <SystemMetric 
            icon={<Globe className="w-4 h-4" />} 
            label="Conexões"
            value="247"
            color="blue"
          />
        </div>
      </div>

    </div>
  );
}


export default App