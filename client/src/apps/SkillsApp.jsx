import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Globe, 
  Server, 
  Database, 
  Cpu, 
  Terminal,
  Layers,
  Container,
  Zap,
  ShieldCheck,
  Layout,
  Cloud
} from 'lucide-react';

const skillCategories = {
  frontend: {
    title: 'Frontend Synthesis',
    icon: <Globe className="text-neon-blue" />,
    skills: [
      { name: 'React.js', level: 95, note: 'Hook-based architecture & state mgmt' },
      { name: 'Next.js', level: 85, note: 'SSR, SSG & Edge computing' },
      { name: 'JavaScript', level: 90, note: 'ES6+ Functional programming' },
      { name: 'Tailwind CSS', level: 95, note: 'Responsive & utility-first design' },
      { name: 'Framer Motion', level: 80, note: 'Declarative animations & gestures' }
    ]
  },
  backend: {
    title: 'Backend Architecture',
    icon: <Server className="text-neon-purple" />,
    skills: [
      { name: 'Node.js', level: 88, note: 'Event-driven, non-blocking I/O' },
      { name: 'Express.js', level: 90, note: 'RESTful API construction' },
      { name: 'MongoDB', level: 90, note: 'NoSQL schema design & indexing' },
      { name: 'Firebase', level: 80, note: 'Real-time DB & Authentication' },
      { name: 'Python', level: 75, note: 'Automation & data processing' }
    ]
  },
  infra: {
    title: 'DevOps & Tooling',
    icon: <Database className="text-green-400" />,
    skills: [
      { name: 'Git / GitHub', level: 92, note: 'Version control & collaboration' },
      { name: 'Docker', level: 70, note: 'Containerization & orchestration' },
      { name: 'Postman', level: 95, note: 'API testing & documentation' },
      { name: 'REST APIs', level: 95, note: 'Integration & architecture' },
      { name: 'JWT Auth', level: 85, note: 'Security & identity management' }
    ]
  }
};

export default function SkillsApp() {
  const [activeTab, setActiveTab] = useState('frontend');

  const tabs = [
    { id: 'frontend', label: 'Frontend', icon: <Layout className="text-neon-blue" /> },
    { id: 'backend', label: 'Backend', icon: <Server className="text-neon-purple" /> },
    { id: 'infra', label: 'Infrastructure', icon: <Cpu className="text-green-400" /> }
  ];

  const currentCategory = skillCategories[activeTab];

  return (
    <div className="flex flex-col h-full bg-slate-950/40 font-sans overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-white/5 bg-black/40 p-1 md:p-2 shrink-0 overflow-x-auto no-scrollbar">
         {tabs.map(tab => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all shrink-0
               ${activeTab === tab.id ? 'bg-white/5 border border-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}
             `}
           >
              <span className={activeTab === tab.id ? 'scale-110' : ''}>{tab.icon}</span>
              {tab.label}
           </button>
         ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto no-scrollbar pb-24">
         <AnimatePresence mode="wait">
            <motion.div 
               key={activeTab}
               initial={{ opacity: 0, x: 10 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -10 }}
               className="max-w-4xl mx-auto space-y-12"
            >
               {/* Category Title Header */}
               <div className="space-y-2 border-l-4 border-current pl-6 py-2" style={{ color: activeTab === 'frontend' ? '#3b82f6' : activeTab === 'backend' ? '#a855f7' : '#22c55e' }}>
                  <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">{currentCategory.title}</h2>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Core system modules and mastery index</p>
               </div>

               {/* Skill Progress Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {currentCategory.skills.map((skill, idx) => (
                    <motion.div 
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="space-y-4 group"
                    >
                       <div className="flex justify-between items-end">
                          <div className="space-y-1">
                             <div className="text-xs font-black text-white uppercase tracking-tight group-hover:text-neon-blue transition-colors">{skill.name}</div>
                             <div className="text-[9px] text-slate-600 font-bold uppercase tracking-tighter">{skill.note}</div>
                          </div>
                          <div className="text-lg font-black text-white tracking-widest">{skill.level}%</div>
                       </div>
                       
                       <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5 relative group-hover:border-white/10 transition-colors">
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${skill.level}%` }}
                             transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 + idx * 0.1 }}
                             className={`h-full relative overflow-hidden
                                ${activeTab === 'frontend' ? 'bg-neon-blue' : activeTab === 'backend' ? 'bg-neon-purple' : 'bg-green-500'}
                             `}
                          >
                             <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-30deg] animate-[shimmer_2s_infinite]"></div>
                          </motion.div>
                       </div>
                    </motion.div>
                  ))}
               </div>

               <div className="pt-12 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: <Zap size={18} />, label: 'Agile Workflow' },
                    { icon: <ShieldCheck size={18} />, label: 'Enterprise Security' },
                    { icon: <Cloud size={18} />, label: 'Serverless Deploy' },
                    { icon: <Terminal size={18} />, label: 'System Automation' }
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center gap-3 text-center hover:bg-white/5 transition-all cursor-default">
                       <div className="text-slate-600 group-hover:text-white transition-colors">{item.icon}</div>
                       <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{item.label}</span>
                    </div>
                  ))}
               </div>
            </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
}
