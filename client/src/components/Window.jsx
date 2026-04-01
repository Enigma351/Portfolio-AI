import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function Window({ title, id, children }) {
  const windowRef = useRef(null);
  const dragControls = useDragControls();
  const closeApp = useStore(state => state.closeApp);
  const minimizeApp = useStore(state => state.minimizeApp);
  const maximizeApp = useStore(state => state.maximizeApp);
  const activeWindow = useStore(state => state.activeWindow);
  const maximizedWindows = useStore(state => state.maximizedWindows);
  const setActive = useStore(state => state.setActive);

  const isMobile = useStore(state => state.isMobile);
  const isActive = activeWindow === id;
  const isMaximized = maximizedWindows.includes(id) || isMobile;

  return (
    <motion.div
      ref={windowRef}
      drag={!isMobile}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: -20, perspective: 1000 }}
      animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 50, rotateX: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`absolute shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-xl border overflow-hidden backdrop-blur-xl transition-all duration-300 pointer-events-auto
        ${isActive ? 'z-50 ring-2 ring-neon-blue/30' : 'z-40 ring-1 ring-white/10'}
        bg-slate-950/40 border-white/10
      `}
      style={isMaximized ? {
        width: '100%',
        height: isMobile ? 'calc(100vh - 3rem)' : 'calc(100vh - 3rem)',
        top: 0,
        left: 0,
      } : {
        width: 'min(900px, 95vw)',
        height: 'min(600px, 75vh)',
      }}
      onPointerDown={() => setActive(id)}
    >
      {/* Title Bar - Drag Handle */}
      <div 
        className="h-10 border-b border-white/5 bg-white/5 flex items-center justify-between px-3 cursor-move rounded-t-xl select-none pointer-events-auto"
        onPointerDown={(e) => {
          setActive(id);
          dragControls.start(e);
        }} // Ensures grabbing title bar activates window and starts drag
      >
        <div className="flex items-center gap-4 md:gap-2 relative z-[60] pointer-events-auto">
          <div 
             onPointerDown={(e) => { e.stopPropagation(); closeApp(id); }} 
             className={`${isMobile ? 'w-10 h-10' : 'w-6 h-6 md:w-4 md:h-4'} flex items-center justify-center cursor-pointer group px-1`}
          >
             <div className={`${isMobile ? 'w-4 h-4' : 'w-3.5 h-3.5 md:w-4 md:h-4'} rounded-full bg-red-500 group-hover:bg-red-400 transition-colors shadow-sm`}></div>
          </div>
          <div 
             onPointerDown={(e) => { e.stopPropagation(); minimizeApp(id); }} 
             className={`${isMobile ? 'w-10 h-10' : 'w-6 h-6 md:w-4 md:h-4'} flex items-center justify-center cursor-pointer group px-1`}
          >
             <div className={`${isMobile ? 'w-4 h-4' : 'w-3.5 h-3.5 md:w-4 md:h-4'} rounded-full bg-yellow-500 group-hover:bg-yellow-400 transition-colors shadow-sm`}></div>
          </div>
          <div 
             onPointerDown={(e) => { e.stopPropagation(); maximizeApp(id); }} 
             className={`${isMobile ? 'w-10 h-10' : 'w-6 h-6 md:w-4 md:h-4'} flex items-center justify-center cursor-pointer group px-1`}
          >
             <div className={`${isMobile ? 'w-4 h-4' : 'w-3.5 h-3.5 md:w-4 md:h-4'} rounded-full bg-green-500 group-hover:bg-green-400 transition-colors shadow-sm`}></div>
          </div>
        </div>
        
        <div className={`text-[10px] md:text-xs font-black text-slate-300 tracking-widest uppercase ${isMobile ? 'truncate max-w-[120px]' : ''}`}>
          {title}
        </div>
        
        <div className="w-16"></div> {/* spacer for centering */}
      </div>

      {/* App Content */}
      <div 
        className="p-4 h-[calc(100%-2.5rem)] overflow-y-auto text-slate-200 pointer-events-auto"
        onPointerDown={(e) => {
          setActive(id);
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
