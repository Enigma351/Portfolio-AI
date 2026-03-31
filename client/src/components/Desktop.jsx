import React from 'react';
import { useStore } from '../store/useStore';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import { AnimatePresence } from 'framer-motion';

// App content placeholders
import AiAssistantApp from '../apps/AiAssistantApp';
import ProjectsApp from '../apps/ProjectsApp';
import ResumeApp from '../apps/ResumeApp';
import JdMatcherApp from '../apps/JdMatcherApp';
import ExperienceApp from '../apps/ExperienceApp';
import ContactApp from '../apps/ContactApp';
import AiMascot from './AiMascot';

export default function Desktop() {
  const isBooted = useStore(state => state.isBooted);
  const apps = useStore(state => state.apps);
  const openWindows = useStore(state => state.openWindows);
  const minimizedWindows = useStore(state => state.minimizedWindows);
  const activeWindow = useStore(state => state.activeWindow);
  const minimizeApp = useStore(state => state.minimizeApp);
  const openApp = useStore(state => state.openApp);

  if (!isBooted) return null;

  // Render correct app component inside Window
  const renderAppContent = (appId) => {
    switch(appId) {
      case 'ai-assistant': return <AiAssistantApp />;
      case 'projects': return <ProjectsApp />;
      case 'jd-matcher': return <JdMatcherApp />;
      case 'resume': return <ResumeApp />;
      case 'experience': return <ExperienceApp />;
      case 'contact': return <ContactApp />;
      default: return <div className="p-8 text-center text-slate-400">Loading modules...</div>;
    }
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden text-white bg-slate-900 bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: 'url(/wallpaper.png)' }}
    >
      {/* Dark semi-transparent overlay to ensure text/icons remain readable */}
      <div className="absolute inset-0 -z-20 bg-black/30 backdrop-blur-[2px]"></div>
      
      {/* Desktop Grid Icons */}
      <div className="flex flex-col flex-wrap h-[calc(100vh-4rem)] p-2 md:p-4 gap-1 md:gap-2 content-start z-10 relative">
        {apps.map(app => (
          <DesktopIcon key={app.id} app={app} />
        ))}
      </div>

      {/* Windows Layer */}
      <div className="absolute inset-0 pointer-events-none z-30 pointer-events-auto">
        <AnimatePresence>
          {openWindows.filter(id => !minimizedWindows.includes(id)).map(appId => {
            const app = apps.find(a => a.id === appId);
            if (!app) return null;
            return (
              <Window key={appId} id={appId} title={app.title}>
                {renderAppContent(appId)}
              </Window>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Cyber-Orb AI Mascot - Responsive Sizing - Fixed Clipping & Overlap */}
      <div className="absolute bottom-16 right-0 md:right-4 w-40 h-80 md:w-96 md:h-[400px] pointer-events-none z-20">
        <AiMascot />
      </div>

      {/* Taskbar */}
      <div className="absolute bottom-0 w-full h-12 bg-black/40 backdrop-blur-xl border-t border-white/5 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <div className="font-bold text-neon-blue tracking-widest text-lg hover:text-white transition-colors cursor-pointer mr-8">
            PARTHA OS
          </div>
          
          {/* Active / Minimized Apps */}
          <div className="flex items-center gap-2">
            {openWindows.map(id => {
              const app = apps.find(a => a.id === id);
              if (!app) return null;
              const isMinimized = minimizedWindows.includes(id);
              const isActive = activeWindow === id;
              
              return (
                <div 
                  key={id} 
                  onClick={() => isMinimized ? minimizeApp(id) : openApp(id)}
                  className={`px-2 md:px-3 py-1 cursor-pointer rounded text-[10px] md:text-xs font-semibold tracking-wider transition-all duration-300 border-b-2
                    ${isActive && !isMinimized ? 'border-neon-blue bg-white/10 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200'}
                    ${isMinimized ? 'opacity-50' : ''}
                  `}
                >
                  <span className="hidden md:inline">{app.title}</span>
                  <span className="md:hidden capitalize">{app.id.split('-')[0]}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex items-center text-xs text-slate-300 font-mono">
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
