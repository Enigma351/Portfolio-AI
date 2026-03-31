import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  FileCode2, 
  ExternalLink, 
  ChevronLeft, 
  Globe, 
  Layout, 
  Cpu, 
  Smartphone, 
  CheckCircle2 
} from 'lucide-react';
import { useStore } from '../store/useStore';

const Github = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"/>
    <path d="M9 18c-4.5 1.5-5-2.5-7-3"/>
  </svg>
);

const projects = [
  { id: 1, category: 'web', name: 'CRM (haajri.in)', tech: ['React', 'REST APIs', 'JSON'], link: 'https://haajri.in/', desc: 'Full-stack CRM platform for attendance & client tracking; built dynamic React dashboards and REST APIs.', longDesc: 'A comprehensive Customer Relationship Management tool designed for real-time attendance tracking and client management. Features high-performance data processing and seamless API integration.' },
  { id: 2, category: 'web', name: 'Moptro EV Dashboard', tech: ['MERN Stack', 'JWT', 'Vercel'], link: 'https://moptro-dashboard-k0hr5zfaw-parthas-projects-78f9d95a.vercel.app', repo: 'https://github.com/Enigma351/moptro-dashboard', desc: 'Full-stack dashboard application built using React, Node.js, Express, and MongoDB with JWT.', longDesc: 'An advanced monitoring dashboard for Electric Vehicles, featuring secure authentication via JWT and real-time data visualization of vehicle telemetry.' },
  { id: 3, category: 'web', name: 'Listify App', tech: ['React', 'Firebase', 'Vite'], link: 'https://listify-app-8nvd.vercel.app/', repo: 'https://github.com/Enigma351/Listify-App', desc: 'React + Firebase to-do app with real-time news integration.', longDesc: 'A productivity-focused task manager that synchronizes data via Firebase and provides integrated news feeds for a centralized workflow.' },
  { id: 4, category: 'web', name: 'Todo Note App', tech: ['Nodejs', 'Express', 'Render'], link: 'https://todo-note-app-1.onrender.com/', repo: 'https://github.com/Enigma351/Todo-Note-App', desc: 'Full-stack todo and note-taking application deployed on Render.', longDesc: 'Scalable backend architecture supporting multiple users with persistent storage and optimized query handling.' },
  { id: 5, category: 'util', name: 'Activity Listing Page', tech: ['React', 'Tailwind'], link: 'https://github.com/Enigma351/Activity-Listing-Page', desc: 'Interactive activity listing page.', longDesc: 'High-performance UI component for listing complex data sets with smooth filtering and sorting capabilities.' },
  { id: 6, category: 'web', name: 'Scratch Starter Project', tech: ['React', 'Vercel'], link: 'https://scratch-starter-project-dusky.vercel.app/', repo: 'https://github.com/Enigma351/scratch-starter-project', desc: 'A starter project built with React and deployed on Vercel.', longDesc: 'A boilerplate template for modern React applications, pre-configured with industry-best practices and deployment pipelines.' },
  { id: 7, category: 'util', name: 'HRM Document Generator', tech: ['React', 'PDF-Lib'], link: 'https://github.com/Enigma351/HRM-Document-Filler', desc: 'Smart React app for HR teams to auto-generate professional employee documents.', longDesc: 'Automated document generation tool that transforms form data into formatted professional PDFs instantly.' },
  { id: 8, category: 'web', name: 'Real Estate Landing Page', tech: ['HTML', 'CSS', 'JS'], link: 'https://github.com/Enigma351/Real-State-landing-page', desc: 'Interactive real estate landing page interface.', longDesc: 'A premium, SEO-optimized landing page designed for conversion, featuring responsive layouts and smooth scroll animations.' }
];

export default function ProjectsApp() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const projectDeepLink = useStore(state => state.projectDeepLink);
  const setProjectDeepLink = useStore(state => state.setProjectDeepLink);

  React.useEffect(() => {
    if (projectDeepLink) {
      const p = projects.find(proj => proj.id === projectDeepLink);
      if (p) {
        setSelectedProject(p);
        // Clear deep link to allow future clicks
        setProjectDeepLink(null);
      }
    }
  }, [projectDeepLink, setProjectDeepLink]);

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  const tabs = [
    { id: 'all', label: 'All Modules', icon: <Folder size={14} /> },
    { id: 'web', label: 'Web Systems', icon: <Globe size={14} /> },
    { id: 'util', label: 'Utilities', icon: <Cpu size={14} /> }
  ];

  const isMobile = useStore(state => state.isMobile);

  /**
   * Helper to check if a URL points to GitHub.
   * Used to adjust button labels (Demo vs Repo).
   */
  const isGithubLink = (url) => url?.includes('github.com');

  /**
   * Main project detail view with description and action links.
   */
  const renderProjectDetail = (p) => {
    const hasLiveDemo = p.link && !isGithubLink(p.link);
    
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="h-full flex flex-col p-4 md:p-6 space-y-6 md:space-y-8 overflow-y-auto no-scrollbar"
      >
        <button 
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-2 text-[10px] font-black text-neon-blue uppercase tracking-widest hover:translate-x-[-4px] transition-transform w-fit py-2"
        >
          <ChevronLeft size={16} /> Back to Grid
        </button>

        <div className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} gap-6 md:gap-8`}>
           {/* Visual preview or icon */}
           <div className={`w-full ${isMobile ? 'aspect-video' : 'md:w-1/3 aspect-square'} bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center p-6 md:p-8 group relative overflow-hidden shrink-0`}>
              <Folder className={`${isMobile ? 'w-16 h-16' : 'w-24 h-24'} text-neon-blue group-hover:scale-110 transition-transform`} />
              <div className="absolute inset-0 bg-neon-blue/5 animate-pulse"></div>
           </div>

           {/* Technical specs and description */}
           <div className="flex-1 space-y-4 md:space-y-6">
              <div className="space-y-2">
                 <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">{p.name}</h2>
                 <div className="flex flex-wrap gap-2">
                    {p.tech.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-white/5 text-slate-400 rounded text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-white/5">{t}</span>
                    ))}
                 </div>
              </div>

              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium italic">"{p.longDesc}"</p>

              <div className="flex flex-wrap gap-3 md:gap-4 pt-4">
                 {hasLiveDemo ? (
                   <button 
                     onClick={() => window.open(p.link, '_blank')}
                     className="flex-1 min-w-[140px] py-4 bg-neon-blue text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all active:scale-95"
                   >
                     <ExternalLink size={16} /> Launch Demo
                   </button>
                 ) : (
                    <button 
                      onClick={() => window.open(p.repo || p.link, '_blank')}
                      className="flex-1 min-w-[140px] py-4 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95"
                    >
                      <Github size={16} /> View Source
                    </button>
                 )}
                 
                 {hasLiveDemo && p.repo && (
                   <button 
                     onClick={() => window.open(p.repo, '_blank')}
                     className="flex-1 min-w-[140px] py-4 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95"
                   >
                     <Github size={16} /> Source Code
                   </button>
                 )}
              </div>
           </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex h-full bg-slate-950/40 overflow-hidden font-sans">
      {/* Sidebar for Filtering */}
      <div className="w-44 border-r border-white/5 bg-black/40 p-4 shrink-0 hidden md:flex flex-col gap-1">
         <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-6 px-3">Categories</div>
         {tabs.map(tab => (
           <div 
             key={tab.id}
             onClick={() => { setActiveTab(tab.id); setSelectedProject(null); }}
             className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer group
               ${activeTab === tab.id ? 'bg-neon-blue/10 text-neon-blue' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}
             `}
           >
              {tab.icon} {tab.label}
           </div>
         ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {selectedProject ? renderProjectDetail(selectedProject) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-8 h-full overflow-y-auto no-scrollbar"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((p, idx) => (
                  <motion.div 
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedProject(p)}
                    className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-neon-blue/40 hover:bg-black/40 transition-all cursor-pointer group relative overflow-hidden"
                  >
                     <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                     <div className="flex justify-between items-start relative z-10">
                        <Folder className="w-10 h-10 text-neon-blue group-hover:scale-110 transition-transform" />
                        <CheckCircle2 size={16} className="text-slate-700 group-hover:text-neon-blue transition-colors" />
                     </div>
                     <div className="mt-4 space-y-1 relative z-10">
                        <h3 className="text-xs font-black text-white uppercase tracking-tight line-clamp-1">{p.name}</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter line-clamp-2">{p.desc}</p>
                     </div>
                     <div className="mt-4 flex flex-wrap gap-1 relative z-10">
                        {p.tech.slice(0, 2).map(t => (
                          <span key={t} className="px-2 py-0.5 bg-black/40 text-[8px] font-black text-slate-400 uppercase tracking-widest rounded border border-white/5">{t}</span>
                        ))}
                     </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}