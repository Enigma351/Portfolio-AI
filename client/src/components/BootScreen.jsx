import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';

export default function BootScreen() {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const setBooted = useStore(state => state.setBooted);
  const [complete, setComplete] = useState(false);

  const lines = [
    "Initializing System...",
    "Loading Developer Profile...",
    "AI Engine Activated...",
    "Welcome to PARTHA OS"
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setComplete(true);
        }, 500);
      }
    });

    textRefs.current.forEach((el, index) => {
      // Create typing or fast fade effect
      tl.fromTo(el, 
        { opacity: 0, x: -20 }, 
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      ).to(el, { opacity: index === lines.length - 1 ? 1 : 0.5, duration: 0.3 });
    });

    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (complete) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setBooted(true);
        }
      });
    }
  }, [complete, setBooted]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-[#0f0] font-mono"
    >
      <div className="flex flex-col gap-4 text-left p-8">
        {lines.map((line, i) => (
          <div 
            key={i} 
            ref={el => textRefs.current[i] = el}
            className={`text-xl md:text-3xl ${i === lines.length - 1 ? 'mt-8 text-white text-3xl md:text-5xl font-bold tracking-wider' : ''}`}
          >
            {line}
          </div>
        ))}
        {/* Terminal blinking cursor */}
        <div className="w-4 h-6 bg-[#0f0] animate-pulse mt-4"></div>
      </div>
    </div>
  );
}
