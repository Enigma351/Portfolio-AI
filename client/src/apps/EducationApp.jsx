import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  MapPin, 
  Award, 
  BookOpen, 
  ChevronRight,
  TrendingUp,
  Cpu,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Search,
  Zap
} from 'lucide-react';

const milestones = [
  {
    year: '2020 - 2024',
    title: 'Bachelor of Engineering',
    major: 'Information Science',
    institution: 'New Horizon College of Engineering',
    location: 'Bengaluru, India',
    status: 'Completed',
    gpa: '7.9/10',
    details: 'Focused on Cloud Architecture, Distributed Systems, and AI integration.',
    color: 'text-neon-blue'
  },
  {
    year: '2018 - 2020',
    title: 'Higher Secondary (12th)',
    major: 'Science Stream',
    institution: 'Lumding College',
    location: 'Assam, India',
    status: 'Completed',
    gpa: '84.2%',
    details: 'Core foundations in Physics, Chemistry, Mathematics, and Computer Science.',
    color: 'text-neon-purple'
  }
];

const specializedCoursework = [
  { 
    name: 'Data Structures & Algorithms', 
    skills: ['Binary Trees', 'HashMaps', 'Time Complexity', 'Graph Theory'],
    icon: <Cpu size={14} />
  },
  { 
    name: 'AI & Machine Learning', 
    skills: ['Neural Networks', 'Python', 'Regressions', 'Deep Learning'],
    icon: <Zap size={14} />
  },
  { 
    name: 'Operating Systems', 
    skills: ['Memory Mgmt', 'Concurrency', 'Scheduling', 'File Systems'],
    icon: <Search size={14} />
  },
  { 
    name: 'Database Management', 
    skills: ['SQL', 'Normalization', 'MongoDB', 'ACID Props'],
    icon: <ShieldCheck size={14} />
  }
];

export default function EducationApp() {
  const [activeCourse, setActiveCourse] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 2800);
  };

  return (
    <div className="flex flex-col bg-slate-950/40 text-slate-200 font-sans min-h-full overflow-hidden">
      {/* Immersive Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 md:p-10 border-b border-white/5 bg-gradient-to-br from-blue-900/10 to-transparent relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 relative z-10">
          <div className="relative">
             <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/5 border-2 border-white/10 flex items-center justify-center p-4 relative group hover:border-neon-blue transition-all duration-500">
                <GraduationCap className="w-12 h-12 md:w-16 md:h-16 text-neon-blue group-hover:scale-110 transition-transform" />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-neon-blue rounded-2xl flex items-center justify-center text-white shadow-xl shadow-neon-blue/20">
                  <Award size={20} />
                </div>
             </div>
             {/* Verification Badge */}
             {isVerified && (
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 className="absolute -top-3 -left-3 bg-green-500 rounded-full p-1.5 border-4 border-slate-950 shadow-lg text-white"
               >
                 <ShieldCheck size={18} />
               </motion.div>
             )}
          </div>

          <div className="text-center md:text-left space-y-3">
             <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-widest leading-tight">Academic Journey</h2>
             <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-md"><MapPin size={12} className="text-neon-blue" /> Bengaluru, India</div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-md"><BookOpen size={12} className="text-neon-purple" /> Information Science</div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-md"><CheckCircle2 size={12} className="text-green-500" /> VTU Accredited</div>
             </div>
             
             {/* Functional Verify Button */}
             <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-3">
                {!isVerified ? (
                  <button 
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="px-5 py-2 bg-neon-blue/20 hover:bg-neon-blue transition-all rounded-xl text-[10px] font-black uppercase tracking-widest text-neon-blue hover:text-white border border-neon-blue/40 relative overflow-hidden group"
                  >
                     {isVerifying ? (
                       <div className="flex items-center gap-2">
                         <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                         Authenticating Hash...
                       </div>
                     ) : (
                       'Verify Credential'
                     )}
                     {!isVerifying && <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>}
                  </button>
                ) : (
                  <div className="px-5 py-2 bg-green-500/10 border border-green-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest text-green-400 flex items-center gap-2">
                    <ShieldCheck size={14} /> ID: PAR-792-AUTH
                  </div>
                )}
                <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">CGPA: 7.9</div>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Main Grid Area */}
      <div className="flex-1 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 overflow-y-auto no-scrollbar pb-24">
        
        {/* Timeline Column */}
        <div className="space-y-8">
           <div className="flex items-center gap-3">
              <TrendingUp className="text-neon-blue" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Professional Pipeline</span>
           </div>

           <div className="relative pl-8 space-y-12">
              {/* Vertical Line */}
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-transparent opacity-20"></div>

              {milestones.map((m, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="relative group"
                >
                   {/* Timeline Node */}
                   <div className="absolute -left-[28px] top-4 w-4 h-4 bg-slate-950 border-2 border-current rounded-full z-10 transition-transform group-hover:scale-150" style={{ color: idx === 0 ? '#3b82f6' : '#a855f7' }}></div>
                   
                   <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-black/40 transition-all space-y-4">
                      <div className="flex justify-between items-start">
                         <div className={`text-[10px] font-bold uppercase tracking-widest ${m.color}`}>{m.year}</div>
                         <div className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded text-[8px] font-black uppercase tracking-widest">{m.status}</div>
                      </div>
                      <div className="space-y-1">
                         <h3 className="text-lg font-black text-white uppercase tracking-tight">{m.title}</h3>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{m.major} @ {m.institution}</p>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">"{m.details}"</p>
                      <div className="pt-4 flex items-center justify-between border-t border-white/5">
                         <div className="flex items-center gap-1.5">
                            <GraduationCap size={14} className="text-slate-600" />
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">GPA Achievement</span>
                         </div>
                         <span className="text-sm font-black text-white tracking-widest">{m.gpa}</span>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Specialized Modules Column */}
        <div className="space-y-8">
           <div className="flex items-center gap-3">
              <Cpu className="text-neon-purple" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Core Specialization</span>
           </div>

           <div className="grid grid-cols-1 gap-4">
              {specializedCoursework.map((course, idx) => (
                <motion.div 
                  key={idx}
                  onClick={() => setActiveCourse(activeCourse === idx ? null : idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer group hover:scale-[1.01] active:scale-[0.98]
                    ${activeCourse === idx ? 'bg-neon-purple/10 border-neon-purple/40 ring-4 ring-neon-purple/10' : 'bg-black/30 border-white/5 hover:border-white/10'}
                  `}
                >
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                         <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${activeCourse === idx ? 'text-neon-purple scale-110 shadow-lg' : 'text-slate-500 group-hover:text-slate-300'} transition-all`}>
                            {course.icon}
                         </div>
                         <span className={`text-[11px] font-black uppercase tracking-widest ${activeCourse === idx ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'} transition-colors`}>
                            {course.name}
                         </span>
                      </div>
                      <ChevronRight size={16} className={`text-slate-600 transition-transform ${activeCourse === idx ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                   </div>

                   <AnimatePresence>
                     {activeCourse === idx && (
                       <motion.div 
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         className="overflow-hidden"
                       >
                          <div className="pt-6 grid grid-cols-2 gap-2">
                             {course.skills.map((skill, sIdx) => (
                               <div key={sIdx} className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-lg flex items-center gap-2">
                                  <div className="w-1 h-1 bg-neon-purple rounded-full"></div>
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{skill}</span>
                               </div>
                             ))}
                          </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </motion.div>
              ))}
           </div>

           {/* Stats Footnote */}
           <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-transparent border border-indigo-900/20 space-y-4">
              <div className="flex items-center gap-3 text-neon-purple">
                 <ShieldCheck size={20} />
                 <h3 className="text-xs font-black uppercase tracking-widest">Honors Summary</h3>
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic uppercase tracking-tighter">
                Highly consistent performance throughout tech modules and data-oriented curriculum. Major focus on information integrity and distributed architecture.
              </p>
           </div>
        </div>

      </div>

      {/* Laser Scanning Animation Overlay */}
      <AnimatePresence>
        {isVerifying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none flex flex-col items-center justify-center bg-black/20 backdrop-blur-[2px]"
          >
             <div className="relative w-full max-w-lg px-20">
                <motion.div 
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1.4, repeat: 1, repeatType: "reverse", ease: "easeInOut" }}
                  className="absolute left-0 w-full h-[2px] bg-neon-blue shadow-[0_0_20px_#3b82f6] z-10"
                />
                <div className="text-center space-y-4 pt-10">
                   <div className="text-[10px] font-black text-neon-blue uppercase tracking-[0.5em] animate-pulse">Scanning Academic credentials</div>
                   <div className="text-[8px] font-mono text-slate-400 opacity-50 uppercase">Hash: 8f9e2b10a4c5d...</div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
