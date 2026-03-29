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

  const isActive = activeWindow === id;
  const isMaximized = maximizedWindows.includes(id);

  return (
    <motion.div
      ref={windowRef}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: -20, perspective: 1000 }}
      animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 50, rotateX: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`absolute shadow-2xl rounded-xl border overflow-hidden backdrop-blur-md transition-all duration-300
        ${isActive ? 'z-50 shadow-neon-blue' : 'z-40'}
        bg-black/60 border-slate-700
      `}
      style={isMaximized ? {
        width: '100vw',
        height: 'calc(100vh - 3rem)',
        top: 0,
        left: 0,
      } : {
        width: 'min(900px, 90vw)',
        height: 'min(600px, 80vh)',
      }}
      onPointerDown={() => setActive(id)}
    >
      {/* Title Bar - Drag Handle */}
      <div 
        className="h-10 border-b border-slate-700 bg-slate-900/80 flex items-center justify-between px-3 cursor-move rounded-t-xl select-none"
        onPointerDown={(e) => {
          setActive(id);
          dragControls.start(e);
        }} // Ensures grabbing title bar activates window and starts drag
      >
        <div className="flex items-center gap-2 relative z-50 pointer-events-auto">
          {/* Mac-like traffic lights or futuristic dots */}
          <div onPointerDown={(e) => { e.stopPropagation(); closeApp(id); }} className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer"></div>
          <div onPointerDown={(e) => { e.stopPropagation(); minimizeApp(id); }} className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer"></div>
          <div onPointerDown={(e) => { e.stopPropagation(); maximizeApp(id); }} className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer"></div>
        </div>
        
        <div className="text-xs font-semibold text-slate-300 tracking-wider">
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
