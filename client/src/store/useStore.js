import { create } from 'zustand';

export const useStore = create((set) => ({
  isBooted: false,
  setBooted: (status) => set({ isBooted: status }),
  
  apps: [
    { id: 'projects', title: 'Projects', unread: 0 },
    { id: 'ai-assistant', title: 'AI Assistant', unread: 1 },
    { id: 'jd-matcher', title: 'JD Matcher', unread: 0 },
    { id: 'skills', title: 'Skills Dashboard', unread: 0 },
    { id: 'system-monitor', title: 'System Monitor', unread: 0 },
    { id: 'explorer', title: 'File Explorer', unread: 0 },
    { id: 'education', title: 'Education', unread: 0 },
    { id: 'experience', title: 'Experience', unread: 0 },
    { id: 'resume', title: 'Resume', unread: 0 },
    { id: 'contact', title: 'Contact Me', unread: 1 },
    { id: 'settings', title: 'Settings', unread: 0 }
  ],
  
  wallpaper: '/wallpaper.png',
  setWallpaper: (wp) => set({ wallpaper: wp }),

  showMascot: true,
  setShowMascot: (status) => set({ showMascot: status }),

  brightness: 100,
  setBrightness: (val) => set({ brightness: val }),

  uiScale: 1,
  setUiScale: (val) => set({ uiScale: val }),

  mascotColor: '#38bdf8', // Default neon blue
  setMascotColor: (color) => set({ mascotColor: color }),

  neuralSpeed: 0.08, // Standard smoothing
  setNeuralSpeed: (speed) => set({ neuralSpeed: speed }),

  isPettingEnabled: true,
  setIsPettingEnabled: (status) => set({ isPettingEnabled: status }),

  performanceMode: 'balanced',
  setPerformanceMode: (mode) => set({ performanceMode: mode }),

  sysLogs: [
    '$ partha.os --init-frontend... SUCCESS',
    '$ node backend/server.js... LISTENING (50% LOAD)',
    '$ query graphql --schema-v4... QUEUED',
    '$ monitor-ai --bot-assistant... ACTIVE'
  ],
  setSysLogs: (logs) => set({ sysLogs: logs }),
  addSysLog: (log) => set((state) => ({ sysLogs: [...state.sysLogs, log] })),
  clearSysLogs: () => set({ sysLogs: [] }),

  openWindows: [],
  activeWindow: null,
  minimizedWindows: [],
  maximizedWindows: [],
  
  openApp: (appId) => set((state) => {
    // If already open, just make it active
    if (state.openWindows.includes(appId)) {
      return { activeWindow: appId };
    }
    return {
      openWindows: [...state.openWindows, appId],
      activeWindow: appId
    };
  }),
  
  closeApp: (appId) => set((state) => ({
    openWindows: state.openWindows.filter(id => id !== appId),
    minimizedWindows: state.minimizedWindows.filter(id => id !== appId),
    maximizedWindows: state.maximizedWindows.filter(id => id !== appId),
    activeWindow: state.activeWindow === appId 
      ? state.openWindows[state.openWindows.length - 2] || null 
      : state.activeWindow
  })),

  minimizeApp: (appId) => set((state) => {
    if (state.minimizedWindows.includes(appId)) {
      return { 
        minimizedWindows: state.minimizedWindows.filter(id => id !== appId),
        activeWindow: appId
      };
    }
    return {
      minimizedWindows: [...state.minimizedWindows, appId],
      activeWindow: state.activeWindow === appId 
        ? state.openWindows.find(id => id !== appId && !state.minimizedWindows.includes(id)) || null 
        : state.activeWindow
    };
  }),

  maximizeApp: (appId) => set((state) => ({
    maximizedWindows: state.maximizedWindows.includes(appId)
      ? state.maximizedWindows.filter(id => id !== appId)
      : [...state.maximizedWindows, appId]
  })),
  
  setActive: (appId) => set({ activeWindow: appId }),

  // Bridge for opening specific projects from other apps (like AI Assistant)
  projectDeepLink: null,
  setProjectDeepLink: (projectId) => set({ projectDeepLink: projectId }),

  // Mobile detection and responsive layout state
  isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  checkScreenSize: () => set({ isMobile: window.innerWidth < 768 }),
}));

// Default scale: 0.85 for mobile, 1.0 for desktop
const initialScale = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.85 : 1.0;
useStore.setState({ uiScale: initialScale });

// Sync responsiveness with browser window resizing
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    useStore.getState().checkScreenSize();
  });
}
