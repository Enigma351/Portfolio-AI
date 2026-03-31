import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useStore } from '../store/useStore';
import * as Icons from 'lucide-react';

export default function DesktopIcon({ app }) {
  const openApp = useStore(state => state.openApp);
  const ref = useRef(null);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Map arbitrary app icons
  const idToIcon = {
    'projects': Icons.FolderRoot,
    'ai-assistant': Icons.Bot,
    'jd-matcher': Icons.Target,
    'experience': Icons.BarChart3,
    'resume': Icons.FileText,
    'contact': Icons.Mail
  };
  
  const IconComponent = idToIcon[app.id] || Icons.Box;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.15, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => openApp(app.id)}
      style={{
        perspective: 1000,
        rotateX,
        rotateY
      }}
      className="flex flex-col items-center justify-center p-2 md:p-4 w-20 h-24 md:w-28 md:h-32 cursor-pointer group"
    >
      <div 
        className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] group-hover:border-neon-blue transition-all duration-300 relative shadow-inner"
        style={{ transformStyle: "preserve-3d" }}
      >
        <span style={{ transform: "translateZ(30px)" }}>
           <IconComponent className="text-white w-6 h-6 md:w-8 md:h-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
        </span>
        {app.unread > 0 && (
          <div 
             className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] w-6 h-6 flex items-center justify-center rounded-full font-bold shadow-[0_0_10px_rgba(239,68,68,0.8)]"
             style={{ transform: "translateZ(40px)" }}
          >
            {app.unread}
          </div>
        )}
      </div>
      <span 
        className="text-[10px] md:text-sm text-slate-100 font-semibold mt-2 md:mt-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide group-hover:text-neon-blue transition-colors text-center truncate w-full"
        style={{ transform: "translateZ(20px)" }}
      >
        {app.title}
      </span>
    </motion.div>
  );
}
