import React from 'react';
import { useStore } from '../store/useStore';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import { AnimatePresence, motion } from 'framer-motion';
import { Cpu, RefreshCcw } from 'lucide-react';

// Lazy Load Apps for high-performance code splitting
const AiAssistantApp = React.lazy(() => import('../apps/AiAssistantApp'));
const ProjectsApp = React.lazy(() => import('../apps/ProjectsApp'));
const ResumeApp = React.lazy(() => import('../apps/ResumeApp'));
const JdMatcherApp = React.lazy(() => import('../apps/JdMatcherApp'));
const ExperienceApp = React.lazy(() => import('../apps/ExperienceApp'));
const ContactApp = React.lazy(() => import('../apps/ContactApp'));
const SkillsApp = React.lazy(() => import('../apps/SkillsApp'));
const SystemMonitorApp = React.lazy(() => import('../apps/SystemMonitorApp'));
const FileExplorerApp = React.lazy(() => import('../apps/FileExplorerApp'));
const SettingsApp = React.lazy(() => import('../apps/SettingsApp'));
const EducationApp = React.lazy(() => import('../apps/EducationApp'));

// Load the 3D mascot separately to avoid blocking the main thread
const AiMascot = React.lazy(() => import('./AiMascot'));

const ModuleLoader = () => (
  <div className="flex flex-col items-center justify-center p-12 h-full text-center space-y-6">
    <div className="relative">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="w-16 h-16 rounded-full border-2 border-white/5 border-t-neon-blue"
      />
      <div className="absolute inset-0 flex items-center justify-center text-neon-blue">
        <Cpu size={24} className="animate-pulse" />
      </div>
    </div>
    <div className="space-y-1">
      <div className="text-[10px] font-black text-white uppercase tracking-[0.3em] font-sans">Loading Module</div>
      <div className="text-[8px] text-slate-500 font-black uppercase tracking-widest font-mono">Initializing content...</div>
    </div>
  </div>
);

export default function Desktop() {
  const isBooted = useStore(state => state.isBooted);
  const apps = useStore(state => state.apps);
  const openWindows = useStore(state => state.openWindows);
  const minimizedWindows = useStore(state => state.minimizedWindows);
  const activeWindow = useStore(state => state.activeWindow);
  const minimizeApp = useStore(state => state.minimizeApp);
  const openApp = useStore(state => state.openApp);

  const wallpaper = useStore(state => state.wallpaper);
  const showMascot = useStore(state => state.showMascot);
  const brightness = useStore(state => state.brightness);
  const uiScale = useStore(state => state.uiScale);
  const isMobile = useStore(state => state.isMobile);

  if (!isBooted) return null;

  // Render lazy app content inside Window with Suspense
  const renderAppContent = (appId) => {
    return (
      <React.Suspense fallback={<ModuleLoader />}>
        {(() => {
          switch(appId) {
            case 'ai-assistant': return <AiAssistantApp />;
            case 'projects': return <ProjectsApp />;
            case 'jd-matcher': return <JdMatcherApp />;
            case 'resume': return <ResumeApp />;
            case 'experience': return <ExperienceApp />;
            case 'contact': return <ContactApp />;
            case 'skills': return <SkillsApp />;
            case 'system-monitor': return <SystemMonitorApp />;
            case 'explorer': return <FileExplorerApp />;
            case 'settings': return <SettingsApp />;
            case 'education': return <EducationApp />;
            default: return <div className="p-8 text-center text-slate-400">Invalid Node Access</div>;
          }
        })()}
      </React.Suspense>
    );
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden text-white bg-slate-900 bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: wallpaper.startsWith('url') || wallpaper.startsWith('linear-gradient') ? wallpaper : `url(${wallpaper})` }}
    >
      {/* Dark semi-transparent overlay to ensure text/icons remain readable */}
      <div className="absolute inset-0 -z-20 bg-black/30 backdrop-blur-[2px]"></div>
      
      {/* Desktop Grid Icons - Scalable and Responsive */}
      <div 
        className="flex flex-col flex-wrap h-[calc(100vh-4rem)] p-4 md:p-8 gap-4 md:gap-8 content-start z-10 relative transition-transform duration-500 ease-in-out"
        style={{ 
          transform: `scale(${uiScale})`, 
          transformOrigin: 'top left',
          width: `${100 / uiScale}%`,
          height: `${100 / uiScale}%`
        }}
      >
        {apps.map(app => (
          <DesktopIcon key={app.id} app={app} />
        ))}
      </div>

      {/* Windows Layer - Scalable */}
      <div 
        className="absolute inset-0 pointer-events-none z-30 transition-transform duration-500 ease-in-out"
        style={{ 
          transform: `scale(${uiScale})`, 
          transformOrigin: 'top left',
          width: `${100 / uiScale}%`,
          height: `${100 / uiScale}%`
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
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
      </div>

      {/* AI Mascot - Positioned for side-interaction */}
      {showMascot && (
        <div className="absolute bottom-16 right-0 md:right-4 w-40 h-80 md:w-96 md:h-[400px] pointer-events-none z-20">
          <React.Suspense fallback={null}>
            <AiMascot />
          </React.Suspense>
        </div>
      )}

      {/* Screen Brightness Overlay */}
      <div 
        className="fixed inset-0 bg-black pointer-events-none z-[9999] transition-opacity duration-300" 
        style={{ opacity: 1 - brightness/100 }}
      ></div>

      {/* Taskbar */}
      <div className="absolute bottom-0 w-full h-12 bg-black/40 backdrop-blur-xl border-t border-white/5 flex items-center justify-between px-4 md:px-6 z-50">
        <div className="flex items-center gap-4 min-w-0">
          <div className="font-bold text-neon-blue tracking-tighter md:tracking-widest text-base md:text-lg hover:text-white transition-colors cursor-pointer mr-2 md:mr-8 shrink-0">
            {isMobile ? 'P.OS' : 'PARTHA OS'}
          </div>
          
          {/* Active app indicators */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {openWindows.map(id => {
              const app = apps.find(a => a.id === id);
              if (!app) return null;
              const isMinimized = minimizedWindows.includes(id);
              const isActive = activeWindow === id;
              
              return (
                <div 
                  key={id} 
                  onClick={() => isMinimized ? minimizeApp(id) : openApp(id)}
                  className={`px-2 md:px-3 py-1 cursor-pointer rounded text-[9px] md:text-xs font-semibold tracking-wider transition-all duration-300 border-b-2 shrink-0
                    ${isActive && !isMinimized ? 'border-neon-blue bg-white/10 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200'}
                    ${isMinimized ? 'opacity-50' : ''}
                  `}
                >
                   {/* Mobile: use short name, Desktop: full title */}
                  <span className="hidden sm:inline">{app.title}</span>
                  <span className="sm:hidden uppercase tracking-tighter">{app.title.substring(0, 4)}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex items-center text-[10px] md:text-xs text-slate-300 font-mono shrink-0 ml-2">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
