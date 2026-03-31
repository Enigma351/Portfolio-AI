import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  FileText, 
  Eye, 
  Layers, 
  ShieldCheck, 
  Search, 
  ExternalLink,
  ChevronRight,
  Info,
  Calendar,
  Award,
  Globe
} from 'lucide-react';

export default function ResumeApp() {
  const [activeTab, setActiveTab] = useState('snapshot');
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadResume = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const pdfUrl = '/ParthaSenFinalResume2026 (1).pdf';
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Partha_Sen_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 2000);
  };

  const snapshotData = [
    { label: 'Role', value: 'Front-End Engineer', icon: <Globe size={14} /> },
    { label: 'Experience', value: '2+ Years Industry', icon: <Calendar size={14} /> },
    { label: 'Specialty', value: 'React / MERN Stack', icon: <Award size={14} /> },
    { label: 'Location', value: 'Bengaluru, India', icon: <ShieldCheck size={14} /> }
  ];

  const renderSnapshot = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {snapshotData.map((item, i) => (
         <motion.div 
           key={i}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: i * 0.1 }}
           className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-6 group hover:bg-black/40 transition-all"
         >
            <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center text-neon-blue group-hover:scale-110 transition-transform">
               {item.icon}
            </div>
            <div className="space-y-1">
               <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</div>
               <div className="text-sm font-bold text-white uppercase tracking-tight">{item.value}</div>
            </div>
         </motion.div>
       ))}
       
       <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-neon-purple/20 to-transparent border border-neon-purple/20 space-y-4">
          <div className="flex items-center gap-3 text-neon-purple">
             <Info size={20} />
             <h3 className="text-xs font-black uppercase tracking-widest tracking-[0.3em]">Neural Summary</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
            "High-performance developer specializing in building interactive, reactive applications using the MERN stack. Proficient in UI optimization, REST architectures, and scalable frontend design systems."
          </p>
       </div>
    </div>
  );

  const renderPdfViewer = () => (
    <div className="flex-1 rounded-2xl border border-white/10 bg-white overflow-y-auto no-scrollbar shadow-2xl relative group">
       <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
          <div className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl">
             <Search size={16} /> Interactive Reader Active
          </div>
       </div>
       
       {/* PDF Inner Mock */}
       <div className="p-10 text-slate-900 space-y-8 font-serif leading-relaxed text-sm">
          <div className="text-center border-b-2 border-slate-900 pb-4">
             <h1 className="text-4xl font-black uppercase tracking-tighter">Partha Sen</h1>
             <p className="text-xs font-bold text-slate-700 mt-2 uppercase tracking-widest">Front-End Developer | Bengaluru, India</p>
          </div>
          
          <div className="space-y-6">
             <section className="space-y-2">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-slate-300 pb-1">Professional Experience</h2>
                <div className="space-y-4">
                   <div>
                      <div className="flex justify-between font-bold text-xs uppercase">
                         <span>Vitorscape Technologies</span>
                         <span>2024 - 2025</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 italic">Front-End Developer (Remote)</p>
                   </div>
                   <div>
                      <div className="flex justify-between font-bold text-xs uppercase">
                         <span>Unified Mentor Pvt Ltd</span>
                         <span>2024</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 italic">Full Stack Intern (Bengaluru)</p>
                   </div>
                </div>
             </section>

             <section className="space-y-2">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-slate-300 pb-1">Core Stack</h2>
                <p className="text-[11px] text-slate-700 font-bold">JavaScript, React.js, Node.js, Express.js, MongoDB, Tailwind CSS, REST APIs</p>
             </section>
          </div>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950/40 font-sans overflow-hidden">
      {/* Dynamic Header */}
      <div className="h-16 border-b border-white/5 bg-black/40 flex items-center justify-between px-6 md:px-10 shrink-0">
         <div className="flex bg-black/60 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setActiveTab('snapshot')}
              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all
                ${activeTab === 'snapshot' ? 'bg-white/5 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}
              `}
            >
               <Layers size={14} /> Snapshot
            </button>
            <button 
              onClick={() => setActiveTab('pdf')}
              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all
                ${activeTab === 'pdf' ? 'bg-white/5 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}
              `}
            >
               <Eye size={14} /> Full Transcript
            </button>
         </div>

         <button 
           onClick={downloadResume}
           disabled={isDownloading}
           className="px-6 py-2.5 bg-neon-blue text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:shadow-[0_0_20px_#3b82f644] transition-all disabled:opacity-50"
         >
            {isDownloading ? (
               <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"></motion.div>
            ) : (
               <>DOWNLOAD CV <Download size={16} /></>
            )}
         </button>
      </div>

      {/* Content Engine */}
      <div className="flex-1 p-6 md:p-10 flex flex-col no-scrollbar overflow-y-auto pb-24">
         <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            <AnimatePresence mode="wait">
               {activeTab === 'snapshot' ? (
                 <motion.div 
                   key="snapshot"
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.02 }}
                   className="h-full"
                 >
                    {renderSnapshot()}
                 </motion.div>
               ) : (
                 <motion.div 
                   key="pdf"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="flex-1 flex flex-col"
                 >
                    {renderPdfViewer()}
                 </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
      
      {/* Meta Footer */}
      <div className="h-8 border-t border-white/5 bg-black/20 flex items-center justify-between px-10 text-[9px] text-slate-600 font-mono tracking-widest uppercase">
         <div className="flex items-center gap-4">
            <span>VERIFICATION ID: PAR-792-RES</span>
            <span>|</span>
            <span className="flex items-center gap-1"><ShieldCheck size={10} className="text-green-500" /> SECURE DOCUMENT</span>
         </div>
         <div className="hidden md:flex items-center gap-2">
            <span>System Node: 0x42f8e</span>
         </div>
      </div>

      {/* Download Animation Overlay */}
      <AnimatePresence>
        {isDownloading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center p-10 text-center space-y-8"
          >
             <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-24 h-24 rounded-full border-2 border-white/5 border-t-neon-blue"
                />
                <div className="absolute inset-0 flex items-center justify-center text-neon-blue">
                   <Download size={32} className="animate-bounce" />
                </div>
             </div>
             <div className="space-y-2">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Preparing Transcript</h3>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Accessing career kernel node...</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
