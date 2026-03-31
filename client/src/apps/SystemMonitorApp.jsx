import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Zap, 
  RefreshCcw, 
  Clock,
  Layout,
  Database,
  Trash,
  Play,
  Terminal as TerminalIcon
} from 'lucide-react';

export default function SystemMonitorApp() {
  const [uptime, setUptime] = useState(0);
  const [load, setLoad] = useState({ cpu: 45, gpu: 32, ram: 18 });
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [boosting, setBoosting] = useState({});
  
  const logs = useStore(state => state.sysLogs);
  const addLog = useStore(state => state.addSysLog);
  const clearLogs = useStore(state => state.clearSysLogs);
  const setLogs = useStore(state => state.setSysLogs);

  // Simulate uptime counter
  useEffect(() => {
    const timer = setInterval(() => setUptime(prev => prev + 1), 1000);
    const loadTimer = setInterval(() => {
      if (!isOptimizing) {
        setLoad({
          cpu: Math.floor(Math.random() * (95 - 40) + 40),
          gpu: Math.floor(Math.random() * (85 - 20) + 20),
          ram: Math.floor(Math.random() * (98 - 60) + 60)
        });
      }
    }, 3000);
    return () => {
      clearInterval(timer);
      clearInterval(loadTimer);
    };
  }, [isOptimizing]);

  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    addLog('$ sys --optimize... IN_PROGRESS');
    addLog('$ flushing --temp-cache... DONE');
    setTimeout(() => {
      setIsOptimizing(false);
      addLog('$ sys --optimize... COMPLETE (STABLE)');
    }, 3000);
  };

  const handleBoost = (id) => {
    setBoosting(prev => ({ ...prev, [id]: true }));
    addLog(`$ boost --module=${id}... DONE`);
    setTimeout(() => {
      setBoosting(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleRefreshLogs = () => {
    setLogs(['$ system --reboot...', '$ kernel --relink... DONE', '$ partha.os --status... READY']);
  };

  const stats = [
    { id: 'logic', label: 'Logic Engine', value: 'JavaScript / ES6+', status: 'Optimal', icon: <Cpu />, color: 'text-neon-blue', level: 92 },
    { id: 'ui', label: 'UI Renderer', value: 'React / Tailwind', status: 'High FPS', icon: <Layout />, color: 'text-neon-purple', level: 95 },
    { id: 'data', label: 'Data Stream', value: 'Node.js / Mongo', status: 'Stable', icon: <Database />, color: 'text-green-400', level: 88 },
    { id: 'network', label: 'Network Latency', value: 'REST / GraphQL', status: 'Optimal', icon: <Zap />, color: 'text-yellow-400', level: 75 }
  ];

  return (
    <div className="p-4 md:p-8 bg-slate-950/80 min-h-full font-mono text-xs overflow-x-hidden">
      
      {/* Top Bar Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-slate-400">
        <div className="border border-slate-800 p-4 rounded-lg bg-black/40 flex flex-col gap-2 relative overflow-hidden">
          <div className="flex items-center gap-2 text-neon-blue uppercase tracking-tighter font-black">
            <Clock size={16} /> System Uptime
          </div>
          <div className="text-2xl text-white font-black tracking-widest">{formatTime(uptime + 86400 * 455)}</div>
          <div className="text-[10px] opacity-50 uppercase tracking-tighter">Partha's Coding Career Duration</div>
        </div>

        <div className="border border-slate-800 p-4 rounded-lg bg-black/40 flex flex-col gap-2 cursor-pointer hover:bg-white/5 transition-colors group" onClick={() => handleRefreshLogs()}>
          <div className="flex items-center gap-2 text-neon-purple uppercase tracking-tighter font-black">
            <RefreshCcw size={16} className={`${isOptimizing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} /> Live Process Load
          </div>
          <div className="flex justify-between items-end gap-1 h-8">
            {[40, 70, 45, 90, 65, 80, 55, 75, 50, 85, 60].map((h, i) => (
              <motion.div 
                key={i} 
                animate={{ height: isOptimizing ? '100%' : `${Math.random() * 100}%` }}
                className="w-full bg-neon-purple/30 rounded-t-sm" 
              />
            ))}
          </div>
          <div className="text-[10px] opacity-50 uppercase tracking-tighter font-bold">Real-time Task Processing</div>
        </div>

        <div className="border border-slate-800 p-4 rounded-lg bg-black/40 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-green-400 uppercase tracking-tighter font-black">
             <HardDrive size={16} /> Stack Storage
          </div>
          <div className="h-4 w-full bg-slate-900 rounded-full mt-2 relative overflow-hidden border border-slate-800">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: '82%' }}
               className="absolute left-0 top-0 h-full bg-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
            />
          </div>
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-tighter mt-1">
            <span>USED: 82% (Full-Stack)</span>
            <span>FREE: 18%</span>
          </div>
        </div>
      </div>

      {/* Main Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            onClick={() => handleBoost(stat.id)}
            className={`border border-slate-800 p-6 rounded-xl bg-slate-900/40 relative group overflow-hidden cursor-pointer transition-all ${boosting[stat.id] ? 'ring-2 ring-white/20 scale-[1.02]' : 'hover:bg-white/5'}`}
          >
            <div className={`absolute top-0 right-0 p-8 opacity-5 -rotate-12 scale-150 transition-transform group-hover:scale-125 ${stat.color}`}>
              {stat.icon}
            </div>
            
            {boosting[stat.id] && (
              <div className="absolute top-0 left-0 w-full h-full bg-white/5 animate-pulse pointer-events-none"></div>
            )}

            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl bg-black/40 border border-slate-800 ${stat.color} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="uppercase text-slate-500 font-black tracking-widest leading-none">{stat.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full bg-slate-800 uppercase font-black tracking-tighter ${stat.color}`}>
                    {boosting[stat.id] ? 'BOOSTING' : stat.status}
                  </span>
                </div>
                <div className="text-lg text-white font-black tracking-tight">{stat.value}</div>
                
                {/* Animated bar using level */}
                <div className="h-1.5 w-full bg-slate-800 rounded-full mt-4 overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: boosting[stat.id] ? '100%' : `${stat.level}%` }}
                    transition={{ duration: boosting[stat.id] ? 0.3 : 1.5, ease: "easeOut" }}
                    className={`h-full rounded-full ${stat.color.replace('text', 'bg')} transition-colors duration-500`}
                  />
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-[shimmer_2s_infinite]"></div>
                </div>
                {boosting[stat.id] && (
                  <div className="text-[9px] text-white/50 uppercase tracking-tighter animate-pulse pt-1">Neural Core Overclocked +25%</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Functionality: Active Processes / Logs */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-blue-900/20 bg-blue-950/10 p-4 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <TerminalIcon size={12} className="text-blue-400" />
               <span className="text-blue-400 font-black tracking-widest uppercase text-[10px]">Active Kernel Processes</span>
            </div>
            <div className="flex items-center gap-4">
               <button onClick={handleRefreshLogs} className="text-blue-500 hover:text-blue-300 transition-colors uppercase text-[9px] font-bold flex items-center gap-1">
                 <RefreshCcw size={10} /> Refresh
               </button>
               <button onClick={handleClearLogs} className="text-red-500 hover:text-red-300 transition-colors uppercase text-[9px] font-bold flex items-center gap-1">
                 <Trash size={10} /> Clear
               </button>
            </div>
          </div>
          <div className="space-y-2 font-mono text-[10px] text-slate-400 max-h-32 overflow-y-auto pr-4 custom-scrollbar">
            <AnimatePresence initial={false}>
               {logs.map((log, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="flex justify-between border-b border-white/5 pb-1 last:border-0"
                 >
                   <span className="text-blue-300">{log.split('...')[0]}</span>
                   <span className={log.includes('SUCCESS') || log.includes('ACTIVE') || log.includes('READY') ? 'text-green-500' : 'text-yellow-500'}>
                     {log.split('...')[1] || 'PENDING'}
                   </span>
                 </motion.div>
               ))}
            </AnimatePresence>
            {logs.length === 0 && <div className="text-slate-600 italic py-2">No active logs...</div>}
          </div>
        </div>

        <div className="border border-slate-800 bg-slate-900/20 p-4 rounded-xl flex flex-col items-center justify-center gap-4 text-center group">
            <div className={`w-16 h-16 rounded-full border-4 ${isOptimizing ? 'border-green-400 border-t-transparent animate-spin' : 'border-neon-blue border-t-transparent'} flex items-center justify-center transition-colors duration-500`}>
               <Activity className={`${isOptimizing ? 'text-green-400' : 'text-neon-blue'} group-hover:scale-125 transition-transform`} size={24} />
            </div>
            <div className="space-y-1">
               <div className="text-white font-black uppercase text-sm">{isOptimizing ? 'Optimizing...' : 'Peak Efficiency'}</div>
               <div className="text-slate-500 uppercase text-[9px] font-bold">{isOptimizing ? 'Heuristic analysis in progress' : 'System ready for deployment'}</div>
            </div>
            {!isOptimizing && (
              <button 
                onClick={handleOptimize}
                className="mt-2 px-6 py-2 bg-neon-blue/10 border border-neon-blue/40 text-neon-blue rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-neon-blue hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center gap-2"
              >
                <Play size={10} fill="currentColor" /> Start Optimization
              </button>
            )}
        </div>
      </div>

      <div className="mt-8 p-4 border border-blue-900/20 bg-blue-950/20 rounded-lg text-blue-300 text-[10px] leading-relaxed uppercase tracking-tighter font-bold flex items-center gap-4">
        <Activity className="animate-pulse flex-shrink-0" />
        <div className="flex-1">
          PARTHA OS SYSTEM KERNEL v4.2.0: ALL FRONTEND MODULES INITIALIZED. BACKEND CLUSTERS STABLE. FULL STACK DEPLOYMENT CAPABLE.
        </div>
      </div>
    </div>
  );
}
