import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  ChevronRight, 
  HardDrive, 
  Monitor, 
  User, 
  Code2, 
  FileText,
  Clock,
  LayoutGrid,
  Search,
  List,
  Menu,
  Cloud,
  Layers,
  Network
} from 'lucide-react';
import { useStore } from '../store/useStore';

export default function FileExplorerApp() {
  const openApp = useStore(state => state.openApp);
  const [activeTab, setActiveTab] = useState('disk');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarTabs = [
    { id: 'disk', label: 'Local Disk (C:)', icon: <HardDrive size={16} />, path: 'System_Core' },
    { id: 'profile', label: 'Profile', icon: <User size={16} />, path: 'Users > Partha' },
    { id: 'cloud', label: 'Cloud Drive', icon: <Cloud size={16} />, path: 'Backups' },
    { id: 'network', label: 'Network', icon: <Network size={16} />, path: 'Nodes' }
  ];

  const fileBuckets = {
    disk: [
      { id: 'skills', appId: 'skills', name: 'Skills.lib', icon: <LayoutGrid className="text-neon-blue" />, type: 'Library', size: '256 KB', date: '2024-03-25' },
      { id: 'projects', appId: 'projects', name: 'Projects.bin', icon: <Code2 className="text-neon-purple" />, type: 'Executable', size: '1.2 MB', date: '2024-03-28' },
      { id: 'system', appId: 'system-monitor', name: 'Kernel.sys', icon: <Layers className="text-slate-500" />, type: 'System', size: '840 KB', date: '2024-03-31' }
    ],
    profile: [
      { id: 'resume', appId: 'resume', name: 'Resume_2024.pdf', icon: <FileText className="text-red-400" />, type: 'PDF', size: '420 KB', date: '2024-03-31' },
      { id: 'education', appId: 'education', name: 'Education.src', icon: <Monitor className="text-yellow-400" />, type: 'Source', size: '56 KB', date: '2024-03-30' },
      { id: 'contact', appId: 'contact', name: 'Leads.log', icon: <FileText className="text-green-400" />, type: 'Document', size: '12 KB', date: '2024-03-29' }
    ],
    cloud: [
      { id: 'vitorscape', appId: 'projects', name: 'Vitorscape_Backup.zip', icon: <Folder className="text-blue-400" />, type: 'Archive', size: '150 MB', date: '2024-03-20' },
      { id: 'hrm', appId: 'projects', name: 'HRM_Docs.db', icon: <Layers className="text-indigo-400" />, type: 'Database', size: '4 MB', date: '2024-03-22' }
    ],
    network: [
      { id: 'api_node', appId: 'system-monitor', name: 'API_Node_Main', icon: <Network className="text-green-500" />, type: 'Connection', size: '0 KB', date: 'Live' },
      { id: 'db_node', appId: 'system-monitor', name: 'DB_Cluster_01', icon: <Layers className="text-yellow-500" />, type: 'Cluster', size: '0 KB', date: 'Syncing' }
    ]
  };

  const currentFiles = useMemo(() => {
    const files = fileBuckets[activeTab] || [];
    if (!searchQuery) return files;
    return files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [activeTab, searchQuery]);

  const activePath = sidebarTabs.find(t => t.id === activeTab)?.path;

  return (
    <div className="flex h-full bg-slate-950/40 text-slate-300 font-sans overflow-hidden">
      {/* Dynamic Sidebar */}
      <div className={`
        fixed md:relative z-20 h-full w-56 border-r border-white/5 bg-black/40 backdrop-blur-xl transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-5 flex flex-col h-full space-y-1">
           <div className="mb-8 font-black text-[10px] text-slate-600 uppercase tracking-[0.3em] px-3">Storage Nodes</div>
           {sidebarTabs.map(tab => (
             <div 
               key={tab.id}
               onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
               className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer group
                 ${activeTab === tab.id ? 'bg-neon-blue/10 text-neon-blue' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}
               `}
             >
                <span className={`${activeTab === tab.id ? 'text-neon-blue scale-110 shadow-[0_0_10px_#3b82f644]' : 'text-slate-600 group-hover:text-slate-400'} transition-all`}>
                   {tab.icon}
                </span>
                {tab.label}
             </div>
           ))}
           
           <div className="mt-auto p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-500">
                 <span>Disk Health</span>
                 <span className="text-green-500">98%</span>
              </div>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-green-500 w-[98%] shadow-[0_0_10px_#22c55e]"></div>
              </div>
           </div>
        </div>
      </div>

      {/* Main OS content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header - Navigation & View Tools */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 bg-black/20 shrink-0">
          <div className="flex items-center gap-3 md:gap-4 flex-1">
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 hover:bg-white/5 rounded-lg text-slate-400">
               <Menu size={18} />
             </button>
             <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 overflow-hidden">
                <HardDrive size={12} className="hidden sm:block" />
                <ChevronRight size={12} className="shrink-0" />
                <span className="whitespace-nowrap uppercase tracking-widest">{activePath}</span>
             </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
             {/* Functional Search Bar */}
             <div className="relative group hidden sm:block">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-neon-blue transition-colors" />
                <input 
                  type="text" 
                  placeholder="Scan nodes..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/40 border border-white/5 rounded-full pl-9 pr-4 py-1.5 text-xs focus:border-neon-blue outline-none w-48 md:w-64 transition-all focus:ring-4 focus:ring-neon-blue/10"
                />
             </div>

             {/* View Mode Toggles */}
             <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <List size={16} />
                </button>
             </div>
          </div>
        </div>

        {/* File Viewing Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div 
                key={`${activeTab}-grid`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-10"
              >
                {currentFiles.map((file) => (
                  <div 
                    key={file.id}
                    onClick={() => openApp(file.appId || file.id)}
                    className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/5 cursor-pointer transition-all group"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-black/40 rounded-2xl border border-white/5 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all relative">
                      <div className="scale-150 group-hover:scale-175 transition-transform">
                        {file.icon}
                      </div>
                      <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-neon-blue rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></div>
                    </div>
                    <div className="text-center">
                      <div className="text-[11px] font-black text-white group-hover:text-neon-blue tracking-tight transition-colors uppercase">{file.name}</div>
                      <div className="text-[8px] text-slate-600 font-black mt-1 uppercase tracking-widest">{file.type}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key={`${activeTab}-list`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-white/5 bg-black/20 overflow-hidden"
              >
                 <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5">
                       <tr className="text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Type</th>
                          <th className="px-6 py-4">Size</th>
                          <th className="px-6 py-4 hidden sm:table-cell">Modified</th>
                       </tr>
                    </thead>
                    <tbody>
                       {currentFiles.map((file) => (
                         <tr 
                           key={file.id} 
                           onClick={() => openApp(file.appId || file.id)}
                           className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                         >
                            <td className="px-6 py-4 flex items-center gap-3 text-xs font-bold text-white group-hover:text-neon-blue">
                               <span className="scale-75">{file.icon}</span>
                               {file.name}
                            </td>
                            <td className="px-6 py-4 text-[10px] text-slate-500 font-black uppercase tracking-tighter">{file.type}</td>
                            <td className="px-6 py-4 text-[10px] text-slate-500 font-mono tracking-widest">{file.size}</td>
                            <td className="px-6 py-4 text-[10px] text-slate-500 hidden sm:table-cell">{file.date}</td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </motion.div>
            )}
          </AnimatePresence>
          
          {currentFiles.length === 0 && (
            <div className="h-64 flex flex-col items-center justify-center text-slate-600 italic space-y-4">
               <Search size={48} className="opacity-10" />
               <p className="text-xs uppercase font-black tracking-widest">No nodes found in directory.</p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="h-8 border-t border-white/5 bg-black/20 flex items-center justify-between px-6 text-[9px] text-slate-600 font-mono tracking-[0.2em] uppercase">
          <div className="flex gap-4">
             <span>{currentFiles.length} items found</span>
             <span className="hidden sm:inline">|</span>
             <span className="hidden sm:inline">Active Sector: {activeTab}</span>
          </div>
          <div className="flex gap-2 items-center">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
             <span>System Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
