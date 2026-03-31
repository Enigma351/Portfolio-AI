import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Monitor, 
  Bot, 
  Zap, 
  Check, 
  Trash,
  Sliders,
  ChevronRight,
  Sun,
  Maximize2,
  RefreshCcw
} from 'lucide-react';
import { useStore } from '../store/useStore';

const wallpaperBuckets = {
  Nature: [
    { id: 'mountain', name: 'Alpine Peak', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920', color: 'bg-blue-900' },
    { id: 'forest', name: 'Misty Woods', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1920', color: 'bg-green-900' },
    { id: 'lake', name: 'Still Water', url: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&q=80&w=1920', color: 'bg-cyan-900' }
  ],
  Mechanical: [
    { id: 'circuit', name: 'Core Logic', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920', color: 'bg-slate-900' },
    { id: 'hardware', name: 'Iron Grill', url: 'https://images.unsplash.com/photo-1555664424-778a1bc5e1b2?auto=format&fit=crop&q=80&w=1920', color: 'bg-gray-900' },
    { id: 'engine', name: 'Turbine Edge', url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1920', color: 'bg-zinc-900' }
  ],
  Classic: [
    { id: 'default', name: 'Cosmo Sky', url: '/wallpaper.png', color: 'bg-slate-900' },
    { id: 'neon', name: 'Cyber Neon', url: 'linear-gradient(135deg, #0f172a 0%, #3b82f6 100%)', color: 'bg-blue-600' },
    { id: 'sunset', name: 'Deep Purple', url: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 100%)', color: 'bg-purple-600' },
    { id: 'dark', name: 'Onyx Black', url: 'linear-gradient(135deg, #000000 0%, #111827 100%)', color: 'bg-black' }
  ]
};

export default function SettingsApp() {
  const [activeTab, setActiveTab] = useState('appearance');

  // Appearance & Theme
  const currentWallpaper = useStore(state => state.wallpaper);
  const setWallpaper = useStore(state => state.setWallpaper);
  const brightness = useStore(state => state.brightness);
  const setBrightness = useStore(state => state.setBrightness);
  const uiScale = useStore(state => state.uiScale);
  const setUiScale = useStore(state => state.setUiScale);

  // AI Mascot
  const showMascot = useStore(state => state.showMascot);
  const setShowMascot = useStore(state => state.setShowMascot);
  const mascotColor = useStore(state => state.mascotColor);
  const setMascotColor = useStore(state => state.setMascotColor);
  const neuralSpeed = useStore(state => state.neuralSpeed);
  const setNeuralSpeed = useStore(state => state.setNeuralSpeed);
  const isPettingEnabled = useStore(state => state.isPettingEnabled);
  const setIsPettingEnabled = useStore(state => state.setIsPettingEnabled);

  // Performance
  const performanceMode = useStore(state => state.performanceMode);
  const setPerformanceMode = useStore(state => state.setPerformanceMode);
  const addSysLog = useStore(state => state.addSysLog);
  const clearSysLogs = useStore(state => state.clearSysLogs);

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optStage, setOptStage] = useState('');
  const [isClearing, setIsClearing] = useState(false);

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: <Palette size={16} /> },
    { id: 'display', label: 'Display', icon: <Monitor size={16} /> },
    { id: 'mascot', label: 'AI Mascot', icon: <Bot size={16} /> },
    { id: 'performance', label: 'Performance', icon: <Zap size={16} /> }
  ];

  const renderAppearance = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {Object.entries(wallpaperBuckets).map(([category, items]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] px-1">{category} Themes</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((wp) => (
              <div 
                key={wp.id}
                onClick={() => setWallpaper(wp.url)}
                className={`relative aspect-video rounded-xl border-2 transition-all cursor-pointer group hover:scale-[1.02] active:scale-95 overflow-hidden ${currentWallpaper === wp.url ? 'border-neon-blue ring-4 ring-neon-blue/20' : 'border-white/5 hover:border-white/20'}`}
              >
                {/* Preview background */}
                <div 
                  className={`absolute inset-0 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 ${wp.color}`}
                  style={{ backgroundImage: wp.url.startsWith('http') || wp.url.startsWith('/') ? `url(${wp.url})` : wp.url, backgroundSize: 'cover' }}
                />
                
                {/* Overlay with name */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors flex items-center justify-center p-2">
                   <span className="text-[10px] font-black tracking-widest text-white uppercase drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                     {wp.name}
                   </span>
                </div>

                {currentWallpaper === wp.url && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-neon-blue rounded-full flex items-center justify-center text-white shadow-lg shadow-neon-blue/40">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderDisplay = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-6">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Sliders size={14} className="text-neon-blue" /> Display Configuration
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-3">
             <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-slate-500">
               <span>System Brightness</span>
               <span className="text-white">{brightness}%</span>
             </div>
             <div className="relative flex items-center group">
               <input 
                 type="range" 
                 min="10" 
                 max="100" 
                 value={brightness} 
                 onChange={(e) => setBrightness(parseInt(e.target.value))}
                 className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-neon-blue transition-all"
               />
               <div 
                 className="absolute left-0 top-0 h-1.5 bg-neon-blue rounded-full pointer-events-none shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                 style={{ width: `${brightness}%` }}
               ></div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-2 group cursor-pointer hover:border-neon-blue/20 transition-all border-l-2 border-l-neon-blue">
                <div className="text-[9px] font-black text-slate-400 uppercase">Resolution Mode</div>
                <div className="text-xs font-bold text-white flex items-center justify-between">
                   Ultra-HD (3840x2160)
                   <Check size={14} className="text-neon-blue" />
                </div>
             </div>
             <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-4 group transition-all">
                <div className="flex justify-between items-center">
                   <div className="text-[9px] font-black text-slate-500 uppercase">UI Scaling</div>
                   <div className="text-[9px] font-black text-neon-blue uppercase px-2 py-0.5 bg-neon-blue/10 rounded-full">
                      {uiScale === 0.85 ? 'Compact' : uiScale === 1.15 ? 'Large' : 'Standard'}
                   </div>
                </div>
                <div className="flex gap-2">
                   {[
                     { label: '85%', value: 0.85 },
                     { label: '100%', value: 1.0 },
                     { label: '115%', value: 1.15 }
                   ].map((option) => (
                     <button 
                       key={option.value}
                       onClick={() => setUiScale(option.value)}
                       className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all border
                         ${uiScale === option.value 
                           ? 'bg-neon-blue border-neon-blue text-white shadow-lg shadow-neon-blue/20' 
                           : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}
                       `}
                     >
                        {option.label}
                     </button>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMascot = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
           <div className="space-y-1">
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">Active Assistant: Bot-OS</h3>
              <p className="text-[10px] text-slate-500 font-medium">Neural visualization & interactive response system</p>
           </div>
           <div 
             onClick={() => setShowMascot(!showMascot)}
             className={`w-12 h-6 rounded-full relative transition-all duration-300 cursor-pointer ${showMascot ? 'bg-neon-blue shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-slate-800'}`}
           >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${showMascot ? 'left-7' : 'left-1'}`} />
           </div>
        </div>

        {/* Color Customization */}
        <div className="space-y-4">
           <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Neural Core Color</h3>
           <div className="flex gap-4">
              {[
                { name: 'Neon Blue', value: '#38bdf8' },
                { name: 'Cyber Green', value: '#4ade80' },
                { name: 'Pulse Red', value: '#f43f5e' },
                { name: 'Amber Glow', value: '#f59e0b' },
                { name: 'Deep Purple', value: '#a855f7' }
              ].map((color) => (
                <div 
                  key={color.value}
                  onClick={() => setMascotColor(color.value)}
                  className={`w-10 h-10 rounded-full cursor-pointer transition-all border-4 flex items-center justify-center
                    ${mascotColor === color.value ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105 opacity-60 hover:opacity-100'}
                  `}
                  style={{ backgroundColor: color.value, boxShadow: mascotColor === color.value ? `0 0 20px ${color.value}66` : 'none' }}
                >
                  {mascotColor === color.value && <Check size={16} className="text-white" strokeWidth={4} />}
                </div>
              ))}
           </div>
        </div>

        {/* Response Speed Slider */}
        <div className="space-y-4">
           <div className="flex justify-between items-center text-xs font-black text-slate-500 uppercase tracking-widest">
              <span>Neural Response Speed</span>
              <span className="text-neon-blue">
                {neuralSpeed < 0.05 ? 'Smooth' : neuralSpeed > 0.15 ? 'Extreme' : 'Standard'}
              </span>
           </div>
           <input 
             type="range" 
             min="0.02" 
             max="0.25" 
             step="0.01"
             value={neuralSpeed}
             onChange={(e) => setNeuralSpeed(parseFloat(e.target.value))}
             className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-neon-blue"
           />
        </div>

        {/* Behavior Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
           <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5 group hover:border-white/10 transition-all cursor-pointer" onClick={() => setIsPettingEnabled(!isPettingEnabled)}>
              <div className="flex items-center gap-3">
                 <Bot size={18} className={isPettingEnabled ? 'text-neon-blue' : 'text-slate-600'} />
                 <div>
                    <div className="text-[10px] font-bold text-white uppercase">Petting Reaction</div>
                    <div className="text-[8px] text-slate-500 uppercase font-bold tracking-tighter">Happy squint on hover</div>
                 </div>
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-all duration-300 ${isPettingEnabled ? 'bg-neon-blue' : 'bg-slate-800'}`}>
                 <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-300 ${isPettingEnabled ? 'left-4.5' : 'left-0.5'}`} />
              </div>
           </div>

           <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5 opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-3">
                 <Zap size={18} className="text-yellow-400" />
                 <div>
                    <div className="text-[10px] font-bold text-white uppercase">Neural Audio</div>
                    <div className="text-[8px] text-slate-500 uppercase font-bold tracking-tighter">Binaural OS feedback</div>
                 </div>
              </div>
              <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest bg-slate-900 px-2 py-1 rounded">Locked</div>
           </div>
        </div>
      </div>
    </div>
  );

  const handleOptimize = async () => {
    setIsOptimizing(true);
    const stages = ['Analyzing Neural Nodes...', 'Clearing Ghost Processes...', 'Optimizing UI Threads...', 'Node Synthesis Complete!'];
    for (const stage of stages) {
      setOptStage(stage);
      addSysLog(`$ sys --optimize --stage="${stage}"`);
      await new Promise(r => setTimeout(r, 800));
    }
    setIsOptimizing(false);
    setOptStage('');
  };

  const handleClearCache = () => {
    setIsClearing(true);
    addSysLog('$ cache --clear --all');
    setTimeout(() => {
      clearSysLogs();
      addSysLog('$ cache --status: EMPTY');
      setIsClearing(false);
    }, 1500);
  };

  const renderPerformance = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Performance Profiles */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-6">
         <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">System Profile</h3>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'power', name: 'Power Saver', speed: 0.04, color: 'bg-green-500/10 border-green-500/20 text-green-400' },
              { id: 'balanced', name: 'Balanced', speed: 0.08, color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
              { id: 'perf', name: 'Ultra Performance', speed: 0.18, color: 'bg-orange-500/10 border-orange-500/20 text-orange-400' }
            ].map(p => (
              <div 
                key={p.id}
                onClick={() => { setPerformanceMode(p.id); setNeuralSpeed(p.speed); }}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center gap-2 text-center
                  ${performanceMode === p.id ? `${p.color} border-current ring-4 ring-current/10` : 'bg-black/20 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300'}
                `}
              >
                 <Zap size={20} className={performanceMode === p.id ? 'animate-pulse' : ''} />
                 <span className="text-[10px] font-black uppercase tracking-widest">{p.name}</span>
              </div>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {/* Optimization Card */}
         <div className="p-6 rounded-2xl bg-blue-900/10 border border-blue-900/20 space-y-4 relative overflow-hidden group">
            <Maximize2 size={24} className="text-neon-blue mb-2 transition-transform group-hover:scale-110" />
            <div className="space-y-1">
               <h3 className="text-xs font-black text-white uppercase">Neural Optimization</h3>
               <p className="text-[9px] text-slate-500 uppercase font-black leading-relaxed">Allocate backend clusters for complex 3D rendering</p>
            </div>
            
            {isOptimizing ? (
              <div className="w-full py-4 space-y-2">
                 <div className="text-[10px] font-mono text-neon-blue animate-pulse">{optStage}</div>
                 <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-neon-blue"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3.2, ease: "linear" }}
                    />
                 </div>
              </div>
            ) : (
              <button 
                onClick={handleOptimize}
                className="w-full py-2 bg-neon-blue/10 hover:bg-neon-blue transition-all rounded-lg text-[9px] font-black uppercase tracking-widest text-neon-blue hover:text-white border border-neon-blue/40 active:scale-95"
              >
                Optimize Now
              </button>
            )}
         </div>

         {/* Cache Card */}
         <div className="p-6 rounded-2xl bg-red-900/10 border border-red-900/20 space-y-4 relative overflow-hidden group">
            <Trash size={24} className="text-red-500 mb-2 transition-transform group-hover:scale-110" />
            <div className="space-y-1">
               <h3 className="text-xs font-black text-white uppercase">Cache Cleanup</h3>
               <p className="text-[9px] text-slate-500 uppercase font-black leading-relaxed">Wipe temporary OS state and refresh session logs</p>
            </div>
            
            {isClearing ? (
               <div className="w-full py-2 flex items-center justify-center gap-3">
                  <RefreshCcw size={16} className="animate-spin text-red-500" />
                  <span className="text-[10px] font-mono text-red-500">Purging Session...</span>
               </div>
            ) : (
              <button 
                onClick={handleClearCache}
                className="w-full py-2 bg-red-500/20 hover:bg-red-500 transition-all rounded-lg text-[9px] font-black uppercase tracking-widest text-red-500 hover:text-white border border-red-500/40 active:scale-95"
              >
                Clear Cache
              </button>
            )}
         </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full bg-slate-950/40 text-slate-200 overflow-hidden font-sans">
      {/* Sidebar - Hidden on mobile, replaced by bottom nav or top tabs */}
      <div className="w-48 md:w-56 border-r border-white/5 bg-black/40 p-5 space-y-1 hidden md:block">
        <div className="mb-8 font-black text-[10px] text-slate-600 uppercase tracking-[0.3em] px-3">Categories</div>
        {tabs.map(tab => (
          <div 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer group
              ${activeTab === tab.id ? 'bg-neon-blue/10 text-neon-blue' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}
            `}
          >
            <span className={`${activeTab === tab.id ? 'text-neon-blue scale-110' : 'text-slate-600 group-hover:text-slate-400 group-hover:scale-110'} transition-all`}>
               {tab.icon}
            </span>
            {tab.label}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-900/20">
        {/* Mobile Sub-Header */}
        <div className="flex md:hidden border-b border-white/5 bg-black/40 p-2 overflow-x-auto no-scrollbar gap-2 shrink-0">
           {tabs.map(tab => (
             <div 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest shrink-0 transition-all
                  ${activeTab === tab.id ? 'bg-neon-blue text-white shadow-lg shadow-neon-blue/20' : 'bg-white/5 text-slate-500'}
                `}
             >
                {tab.label}
             </div>
           ))}
        </div>

        {/* Scrollable Area */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto no-scrollbar pb-20">
           <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                 <div className="space-y-1">
                    <h2 className="text-2xl font-black text-white uppercase tracking-widest">{activeTab}</h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">System / Settings / {activeTab}</p>
                 </div>
                 <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hidden sm:block">
                    {tabs.find(t => t.id === activeTab).icon}
                 </div>
              </div>

              {activeTab === 'appearance' && renderAppearance()}
              {activeTab === 'display' && renderDisplay()}
              {activeTab === 'mascot' && renderMascot()}
              {activeTab === 'performance' && renderPerformance()}
           </div>
        </div>

        {/* System Info Footnote - Fixed to bottom */}
        <div className="mt-auto p-4 bg-black/40 border-t border-white/5 shrink-0">
           <div className="max-w-4xl mx-auto flex items-center justify-between text-[9px] font-mono text-slate-600 uppercase tracking-widest">
              <span>Partha OS Build v4.2.0-STABLE</span>
              <span className="hidden sm:inline">User: senak.root</span>
              <span>Uptime: 100.0%</span>
           </div>
        </div>
      </div>
    </div>
  );
}
