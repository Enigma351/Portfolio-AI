import React from 'react';
import { Folder, FileCode2, ExternalLink } from 'lucide-react';

const projects = [
  { id: 1, name: 'CRM (haajri.in)', tech: 'React, REST APIs, JSON', link: 'https://haajri.in/', desc: 'Full-stack CRM platform for attendance & client tracking; built dynamic React dashboards and REST APIs.' },
  { id: 2, name: 'Moptro EV Dashboard', tech: 'MERN Stack, JWT', link: 'https://moptro-dashboard-k0hr5zfaw-parthas-projects-78f9d95a.vercel.app', repo: 'https://github.com/Enigma351/moptro-dashboard', desc: 'Full-stack dashboard application built using React, Node.js, Express, and MongoDB with JWT.' },
  { id: 3, name: 'Listify App', tech: 'React, Firebase', link: 'https://listify-app-8nvd.vercel.app/', repo: 'https://github.com/Enigma351/Listify-App', desc: 'React + Firebase to-do app with real-time news integration.' },
  { id: 4, name: 'Todo Note App', tech: 'MERN Stack', link: 'https://todo-note-app-1.onrender.com/', repo: 'https://github.com/Enigma351/Todo-Note-App', desc: 'Full-stack todo and note-taking application deployed on Render.' },
  { id: 5, name: 'Activity Listing Page', tech: 'React', link: 'https://github.com/Enigma351/Activity-Listing-Page', desc: 'Interactive activity listing page.' },
  { id: 6, name: 'Scratch Starter Project', tech: 'React', link: 'https://scratch-starter-project-dusky.vercel.app/', repo: 'https://github.com/Enigma351/scratch-starter-project', desc: 'A starter project built with React and deployed on Vercel.' },
  { id: 7, name: 'HRM Document Generator', tech: 'React', link: 'https://github.com/Enigma351/HRM-Document-Filler', desc: 'Smart React app for HR teams to auto-generate professional employee documents.' },
  { id: 8, name: 'Real Estate Landing Page', tech: 'React', link: 'https://github.com/Enigma351/Real-State-landing-page', desc: 'Interactive real estate landing page interface.' }
];

export default function ProjectsApp() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {projects.map((p) => (
        <div 
          key={p.id} 
          onClick={() => window.open(p.link, '_blank')}
          title={p.desc}
          className="relative z-10 pointer-events-auto flex flex-col items-center justify-start p-4 hover:bg-white/10 rounded-xl cursor-pointer group transition-colors text-center h-full border border-transparent hover:border-slate-700 backdrop-blur-sm"
        >
          <Folder className="w-14 h-14 text-neon-blue group-hover:scale-110 transition-transform mb-3" strokeWidth={1}/>
          
          <span className="text-xs text-slate-300 font-medium line-clamp-2 leading-relaxed tracking-wide">
            {p.name}
          </span>

          <div className="flex flex-col items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity gap-1 z-10">
            <span className="text-[10px] text-neon-blue font-medium bg-blue-900/30 px-2 py-0.5 rounded-full flex items-center gap-1 border border-neon-blue/20">
              <ExternalLink size={10} /> {p.repo ? 'Live App' : 'Open Link'}
            </span>

            {p.repo && (
              <span 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(p.repo, '_blank');
                }}
                className="text-[9px] text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors border border-slate-600/50 cursor-pointer"
              >
                <FileCode2 size={10} /> Source Code
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}