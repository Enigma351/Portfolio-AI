import { create } from 'zustand';

export const useStore = create((set) => ({
  isBooted: false,
  setBooted: (status) => set({ isBooted: status }),
  
  apps: [
    { id: 'projects', title: 'Projects', unread: 0 },
    { id: 'ai-assistant', title: 'AI Assistant', unread: 1 },
    { id: 'jd-matcher', title: 'JD Matcher', unread: 0 },
    { id: 'experience', title: 'Experience', unread: 0 },
    { id: 'resume', title: 'Resume', unread: 0 },
    { id: 'contact', title: 'Contact Me', unread: 1 }
  ],
  
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
}));
