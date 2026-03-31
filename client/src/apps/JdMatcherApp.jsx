import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Zap, 
  Target, 
  ShieldCheck, 
  AlertCircle, 
  Cpu, 
  LineChart, 
  History,
  FileSearch,
  CheckCircle2,
  XCircle,
  Scan,
  RefreshCcw,
  Sparkles
} from 'lucide-react';

export default function JdMatcherApp() {
  const [jd, setJd] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [scanStep, setScanStep] = useState(0);

  const scanSteps = [
    "Initializing Neural Parser...",
    "Extracting technical keywords...",
    "Mapping repository experience...",
    "Calculating alignment coefficients...",
    "Synthesizing match report..."
  ];

  useEffect(() => {
    let timer;
    if (isScanning && scanStep < scanSteps.length) {
      timer = setTimeout(() => {
        setScanStep(prev => prev + 1);
      }, 600);
    } else if (isScanning && scanStep === scanSteps.length) {
      // Completed scanning
      setTimeout(() => {
        setResult(calculateMatch(jd));
        setIsScanning(false);
      }, 400);
    }
    return () => clearTimeout(timer);
  }, [isScanning, scanStep]);

  const [status, setStatus] = useState('idle'); // idle, scanning, success, error

  const calculateLocalMatch = (text) => {
    const raw = text.toLowerCase();
    const skills = [
      { name: 'React', found: raw.includes('react'), type: 'frontend' },
      { name: 'Node.js', found: raw.includes('node'), type: 'backend' },
      { name: 'JavaScript', found: raw.includes('javascript') || raw.includes('js'), type: 'language' },
      { name: 'MongoDB', found: raw.includes('mongodb') || raw.includes('nosql'), type: 'database' },
      { name: 'Redux', found: raw.includes('redux') || raw.includes('state'), type: 'frontend' },
      { name: 'REST API', found: raw.includes('api') || raw.includes('rest'), type: 'backend' }
    ];

    const matchCount = skills.filter(s => s.found).length;
    let score = 65 + (matchCount * 5) + Math.floor(Math.random() * 5);
    if (score > 98) score = 98;

    return {
      matchScore: score,
      missingSkills: skills.filter(s => !s.found).map(s => s.name),
      relevantProjects: ['CRM Dashboard', 'EV Analytics Hub'],
      isStrong: score > 80,
      timestamp: new Date().toLocaleTimeString(),
      isAiPowered: false
    };
  };

  const handleStartScan = async () => {
    if (!jd.trim()) return;
    setResult(null);
    setScanStep(0);
    setIsScanning(true);
    setStatus('scanning');

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/jd-match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: jd })
      });

      if (!response.ok) throw new Error('API Sync Failed');
      
      const data = await response.json();
      setResult({
        ...data,
        isStrong: data.matchScore > 80,
        timestamp: new Date().toLocaleTimeString(),
        isAiPowered: true
      });
    } catch (error) {
      console.warn("Using Local Analytical Fallback:", error);
      setResult(calculateLocalMatch(jd));
    } finally {
      // Allow animations to finish
      setTimeout(() => {
        setIsScanning(false);
        setStatus('success');
      }, 3000);
    }
  };

  const renderInput = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full space-y-6"
    >
      <div className="flex items-center justify-between px-2">
         <div className="space-y-1">
            <h3 className="text-xl font-black text-white uppercase tracking-tighter">JD Analysis Engine</h3>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Evaluate role alignment against Partha.OS core</p>
         </div>
         <div className="p-2.5 bg-neon-purple/20 text-neon-purple rounded-xl border border-neon-purple/20 animate-pulse">
            <Cpu size={20} />
         </div>
      </div>

      <div className="flex-1 relative group">
         <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent"></div>
         <textarea 
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste Job Description here... [e.g. Seeking a React Developer with Node.js experience...]"
            className="w-full h-full bg-black/40 border border-white/5 rounded-2xl p-6 text-sm text-slate-300 focus:border-neon-purple outline-none transition-all placeholder:text-slate-700 font-medium resize-none overflow-y-auto no-scrollbar scroll-smooth"
         />
         <div className="absolute bottom-4 right-6 text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div> Ready for Input
         </div>
      </div>

      <button 
        onClick={handleStartScan}
        disabled={!jd.trim() || isScanning}
        className="w-full py-5 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-lg shadow-neon-purple/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-20 disabled:scale-100 flex items-center justify-center gap-4 relative overflow-hidden group"
      >
         <Scan size={18} className="group-hover:rotate-90 transition-transform duration-500" />
         Execute Neural Match
         <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
      </button>
    </motion.div>
  );

  const renderScanner = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-12">
       <div className="relative w-64 h-64 flex items-center justify-center">
          <motion.div 
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 w-full h-[3px] bg-neon-purple shadow-[0_0_30px_#a855f7] z-30"
          />
          <div className="absolute inset-0 border-2 border-white/5 rounded-3xl overflow-hidden opacity-50 bg-slate-950/40 backdrop-blur-sm">
             <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-white/5"></div>
                ))}
             </div>
          </div>
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-48 h-48 bg-neon-purple/10 blur-[80px] rounded-full absolute"
          />
          <FileSearch size={84} className="text-neon-purple relative z-20 animate-pulse" />
       </div>

       <div className="text-center space-y-6">
          <div className="flex items-center gap-4 justify-center">
             <div className="flex gap-1.5">
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-neon-purple rounded-full" />
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-neon-purple rounded-full" />
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-neon-purple rounded-full" />
             </div>
             <div className="text-xs font-black text-white uppercase tracking-[0.4em]">Processing: {scanSteps[Math.min(scanStep, scanSteps.length - 1)]}</div>
          </div>
          <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mx-auto border border-white/5">
             <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(((scanStep + 1) / scanSteps.length) * 100, 100)}%` }}
                className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
             />
          </div>
       </div>
    </div>
  );

  const renderResult = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col h-full space-y-8 no-scrollbar overflow-y-auto px-2 pb-10"
    >
       <div className="flex items-start justify-between">
          <div className="space-y-1">
             <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Analysis Transcript</h3>
                {result.isAiPowered && (
                  <span className="px-2 py-0.5 bg-neon-purple/20 border border-neon-purple/30 rounded text-[8px] font-black text-neon-purple uppercase tracking-widest">AI Engine Alpha</span>
                )}
             </div>
             <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                <History size={12} /> Sync Time: {result.timestamp}
             </div>
          </div>
          <button 
            onClick={() => setResult(null)}
            className="p-3 bg-white/5 border border-white/5 rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all group"
          >
             <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-700" />
          </button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radial Progress Score */}
          <div className="p-10 rounded-3xl bg-black/40 border border-white/10 flex flex-col items-center justify-center space-y-8 relative overflow-hidden group">
             <div className="absolute inset-0 bg-neon-blue/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                   <circle cx="96" cy="96" r="86" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-white/5" />
                   <motion.circle 
                     cx="96" cy="96" r="86" fill="transparent" stroke="currentColor" strokeWidth="12" 
                     strokeDasharray="540"
                     initial={{ strokeDashoffset: 540 }}
                     animate={{ strokeDashoffset: 540 - (540 * result.matchScore) / 100 }}
                     transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                     className={result.isStrong ? "text-neon-blue" : "text-yellow-500"}
                   />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.5 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="text-5xl font-black text-white tracking-widest"
                   >
                     {result.matchScore}%
                   </motion.div>
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Accuracy Index</div>
                </div>
             </div>
             <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-lg
               ${result.isStrong ? "bg-neon-blue/20 border-neon-blue/30 text-neon-blue shadow-neon-blue/10" : "bg-yellow-500/20 border-yellow-500/30 text-yellow-500 shadow-yellow-500/10"}
             `}>
               {result.isStrong ? "Optimal Core Alignment" : "Partial System Match"}
             </div>
          </div>

          {/* Detailed Evidence Mapping */}
          <div className="space-y-6">
             <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                   <Target size={14} className="text-neon-purple" /> Mapping Artifacts
                </div>
                <div className="space-y-2">
                   <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 px-1">Detected Missing Nodes</div>
                   <div className="flex flex-wrap gap-2">
                      {result.missingSkills?.length > 0 ? result.missingSkills.map((s, i) => (
                        <div key={i} className="px-3 py-1.5 rounded-lg bg-red-400/10 border border-red-400/20 text-[9px] font-bold text-red-400 uppercase">
                           {s}
                        </div>
                      )) : <div className="text-[10px] text-green-500 font-black uppercase tracking-widest px-1">Clear Spectrum Alignment</div>}
                   </div>
                </div>
             </div>

             <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                   <Zap size={14} className="text-neon-blue" /> Relevant Repository Nodes
                </div>
                <div className="grid grid-cols-1 gap-2">
                   {result.relevantProjects?.map((p, i) => (
                     <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 hover:border-white/20 transition-all">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-tight group-hover:text-white transition-colors">{p}</span>
                        <CheckCircle2 size={14} className="text-neon-blue" />
                     </div>
                   ))}
                </div>
             </div>
          </div>
       </div>

       <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <Sparkles size={48} className="text-neon-purple" />
          </div>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
             <LineChart size={14} /> Neural Summary
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {result.isStrong 
              ? "Synthesis suggests high-impact performance. Core architectural patterns detected in the JD match perfectly with Partha's active repository state. Recommended for immediate system deployment."
              : "Synthesis indicates specialized alignment. While the core kernel is compatible, specific peripheral nodes (missing skills) were identified. High adaptability suggested for rapid optimization."}
          </p>
       </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950/40 p-6 md:p-10 font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {isScanning ? renderScanner() : (result ? renderResult() : renderInput())}
      </AnimatePresence>
    </div>
  );
}