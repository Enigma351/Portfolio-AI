import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  LineChart, 
  List, 
  CheckCircle2,
  Building2,
  Terminal,
  Zap
} from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'Front-End Developer',
    company: 'Vitorscape Technologies',
    location: 'Remote',
    year: '11/2024 - 11/2025',
    type: 'Full-time',
    tech: ['React.js', 'ES6', 'Tailwind CSS', 'REST APIs'],
    highlights: [
      'Developed and maintained dynamic web interfaces enhancing UI performance.',
      'Collaborated with designers and backend teams via GitHub for Agile delivery.',
      'Led the redesign of client dashboards boosting overall user engagement.',
      'Optimized data handling efficiency by 30% through reusable components.'
    ],
    desc: 'Worked as a core Frontend Engineer responsible for building and maintaining production-level user interfaces. Regularly optimized performance, debugged complex UI issues, and ensured cross-browser compatibility.'
  },
  {
    id: 2,
    role: 'Full Stack Web Developer Intern',
    company: 'Unified Mentor Pvt Ltd',
    location: 'Bengaluru, Karnataka',
    year: '04/2024 - 06/2024',
    type: 'Internship',
    tech: ['MERN Stack', 'Angular', 'Node.js', 'MongoDB'],
    highlights: [
      'Contributed to end-to-end development of MERN applications.',
      'Developed responsive UI components in React and Angular.',
      'Built and optimized RESTful APIs supporting 300+ mock users.',
      'Assisted in AWS deployments and CI/CD workflows using Git.'
    ],
    desc: 'Daily responsibilities included building UI components, developing RESTful APIs, and managing data via MongoDB. Gained hands-on experience in integrating authentication systems.'
  },
  {
    id: 3,
    role: 'MERN Stack Developer Intern',
    company: 'SkillDzire',
    location: 'Remote',
    year: '09/2023 - 11/2023',
    type: 'Internship',
    tech: ['React.js', 'Bootstrap', 'Node.js', 'Express'],
    highlights: [
      'Built responsive UIs using React.js and Bootstrap.',
      'Implemented REST APIs with Node.js and Express.',
      'Collaborated in Agile sprints and participated in code reviews.',
      'Gained strong foundations in full-stack application architecture.'
    ],
    desc: 'Focused on building interactive user interfaces and connecting them with backend services. Worked on debugging and improving code structure.'
  }
];

export default function ExperienceApp() {
  const [viewMode, setViewMode] = useState('timeline');

  const renderTimeline = () => (
    <div className="relative border-l-2 border-white/5 pl-8 ml-4 space-y-16">
      {experiences.map((exp, i) => (
        <motion.div 
          key={exp.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2 }}
          className="relative group"
        >
          {/* Timeline Dot */}
          <div className="absolute -left-[41px] top-1.5 w-6 h-6 bg-slate-950 border-2 border-neon-blue rounded-full group-hover:bg-neon-blue transition-all z-10 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
             <Briefcase size={12} className="text-neon-blue group-hover:text-white transition-colors" />
          </div>

          <div className="space-y-4">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                   <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-neon-blue transition-colors">{exp.role}</h3>
                   <div className="flex items-center gap-2 text-neon-purple font-bold text-xs uppercase tracking-widest mt-1">
                      <Building2 size={12} /> {exp.company}
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Calendar size={12} /> {exp.year}
                   </div>
                </div>
             </div>

             <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-black/40 transition-all flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                   <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic uppercase tracking-tighter">"{exp.desc}"</p>
                   <div className="flex flex-wrap gap-2">
                      {exp.tech.map(t => (
                        <span key={t} className="px-2 py-0.5 bg-black/40 text-slate-500 rounded text-[9px] font-black uppercase tracking-widest border border-white/5">{t}</span>
                      ))}
                   </div>
                </div>
                
                <div className="md:w-1/3 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Core Impact</div>
                   <div className="space-y-2">
                      {exp.highlights.slice(0, 2).map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2">
                           <Zap size={10} className="text-neon-blue mt-1 shrink-0" />
                           <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter leading-tight">{h}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderDetailedLog = () => (
    <div className="space-y-6">
       {experiences.map((exp, i) => (
         <motion.div 
           key={exp.id}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: i * 0.1 }}
           className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-black/60 transition-all space-y-6 group"
         >
            <div className="flex justify-between items-start">
               <div className="space-y-2">
                  <div className="flex items-center gap-3">
                     <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{exp.role}</h3>
                     <span className="px-2 py-0.5 bg-neon-blue/10 text-neon-blue rounded text-[9px] font-black uppercase tracking-[0.2em]">{exp.type}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                     <span className="text-neon-purple shadow-[0_0_10px_#a855f744]">{exp.company}</span>
                     <span>|</span>
                     <span className="flex items-center gap-1.5"><MapPin size={12} /> {exp.location}</span>
                  </div>
               </div>
               <div className="text-right hidden sm:block">
                  <div className="text-xl font-black text-white tracking-widest">{exp.year.split(' - ')[1]}</div>
                  <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">End Session</div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-neon-blue">
                     <Terminal size={14} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Technical Deliverables</span>
                  </div>
                  <div className="space-y-3">
                     {exp.highlights.map((h, hIdx) => (
                       <div key={hIdx} className="flex items-start gap-4 group/item">
                          <CheckCircle2 size={14} className="text-slate-700 group-hover/item:text-green-500 transition-colors mt-0.5" />
                          <span className="text-xs text-slate-400 group-hover/item:text-slate-200 transition-colors font-medium">{h}</span>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="space-y-4 bg-black/30 p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 text-neon-purple">
                     <LineChart size={14} />
                     <span className="text-[10px] font-black uppercase tracking-widest">OS Log Summary</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                     {exp.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                     {exp.tech.map(t => (
                       <span key={t} className="px-2 py-1 bg-white/5 rounded text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 border border-white/5 hover:border-neon-purple transition-all">{t}</span>
                     ))}
                  </div>
               </div>
            </div>
         </motion.div>
       ))}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950/40 overflow-hidden font-sans">
      {/* Header View Toggles */}
      <div className="flex items-center justify-between border-b border-white/5 bg-black/40 p-4 md:px-10 shrink-0">
         <div className="space-y-0.5">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">Experience Log</h2>
            <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Career Telemetry & Module History</p>
         </div>
         
         <div className="flex bg-black/60 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all
                ${viewMode === 'timeline' ? 'bg-white/5 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}
              `}
            >
               <LineChart size={14} /> Timeline
            </button>
            <button 
              onClick={() => setViewMode('log')}
              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all
                ${viewMode === 'log' ? 'bg-white/5 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}
              `}
            >
               <List size={14} /> Detailed Log
            </button>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto no-scrollbar pb-24">
         <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
               {viewMode === 'timeline' ? renderTimeline() : renderDetailedLog()}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}