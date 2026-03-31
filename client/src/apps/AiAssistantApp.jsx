import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Trash2, 
  Command,
  Cpu,
  BrainCircuit,
  Info
} from 'lucide-react';
import { useStore } from '../store/useStore';

const SUGGESTED_QUERIES = [
  "What is your identity?",
  "Open Partha's project portfolio",
  "Explain his MERN stack proficiency",
  "How can I contact him?"
];

const getDynamicGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning. Neural Core Initialized.";
  if (hour < 17) return "Good Afternoon. Processing System Context.";
  return "Good Evening. Night Cycle Intelligence Active.";
};

export default function AiAssistantApp() {
  const openApp = useStore(state => state.openApp);
  const isMobile = useStore(state => state.isMobile);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      role: 'assistant', 
      text: `${getDynamicGreeting()} I am the Partha.OS Central Intelligence. Ask me about Partha's tech journey or use system commands like 'open projects' to navigate the kernel.`, 
      timestamp: new Date().toLocaleTimeString() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const setProjectDeepLink = useStore(state => state.setProjectDeepLink);

  /**
   * Generates a contextual response based on user input.
   * Handles app navigation and specific project deep-links.
   */
  const getNeuralResponse = (query) => {
    const q = query.toLowerCase();

    // Project deep linking (triggers navigation in Projects app)
    if (q.includes('moptro') || q.includes('ev dashboard')) {
      setProjectDeepLink(2);
      setTimeout(() => openApp('projects'), 800);
      return "Retrieving Moptro EV Dashboard telemetry... Initializing detail view in Projects module.";
    }
    if (q.includes('crm') || q.includes('haajri')) {
      setProjectDeepLink(1);
      setTimeout(() => openApp('projects'), 800);
      return "Accessing Haajri CRM system logs... Opening project specifications.";
    }
    if (q.includes('listify')) {
      setProjectDeepLink(3);
      setTimeout(() => openApp('projects'), 800);
      return "Synchronizing Listify App data... Launching project highlights.";
    }
    if (q.includes('hrm') || q.includes('document generator')) {
      setProjectDeepLink(7);
      setTimeout(() => openApp('projects'), 800);
      return "Generating HRM Documentation filler specs... Opening utility module.";
    }
    if (q.includes('todo note') || q.includes('todo app')) {
      setProjectDeepLink(4);
      setTimeout(() => openApp('projects'), 800);
      return "Loading full-stack Todo Note architecture... Redirecting to Projects app.";
    }

    // Navigation and app opening commands
    if (q.includes('open projects') || q.includes('show projects') || q.includes('portfolio')) {
      setTimeout(() => openApp('projects'), 1000);
      return "Executing Kernel request... Opening 'Projects' dashboard for review.";
    }
    if (q.includes('open skills') || q.includes('show skills') || q.includes('tech stack')) {
      setTimeout(() => openApp('skills'), 1000);
      return "Accessing skill telemetry... Opening 'Skills' module.";
    }
    if (q.includes('open contact') || q.includes('send message') || q.includes('contact')) {
      setTimeout(() => openApp('contact'), 1000);
      return "Establishing communication link... Opening 'Contact' terminal.";
    }
    if (q.includes('open resume') || q.includes('download cv') || q.includes('cv')) {
      setTimeout(() => openApp('resume'), 1000);
      return "Retrieving transcript... Launching Secure Resume Viewer.";
    }

    // Identity checks
    if (q.includes('who are you') || q.includes('identity') || q.includes('your name')) {
      return "I am the Partha.OS Neural Core, a digital twin developed by Partha to guide elite recruiters through his engineering repository. I have full access to his project data, skill metrics, and communication channels.";
    }

    // Technical background info
    if (q.includes('mern') || q.includes('stack')) {
      return "Partha specializes in full-stack MERN development (MongoDB, Express, React, Node.js). He focuses on building high-performance, scalable architectures with a focus on UI polish and clean state management.";
    }
    if (q.includes('experience') || q.includes('work')) {
      return "He has engineered several high-impact nodes: A MERN-based EV Dashboard, a full-featured CRM platform (haajri.in), and high-performance React portfolios. His work consistently achieves >90 scores in Lighthouse performance audits.";
    }
    if (q.includes('hello') || q.includes('hi ') || q.includes('hey')) {
        return `${getDynamicGreeting()} Ready to explore Partha's professional spectrum. How can I assist you?`;
    }

    return "Partha's profile indicates advanced proficiency in React.js, Tailwind CSS, and Node.js. Ask me to 'open projects' or ask about a specific project like 'Moptro' to see it in action.";
  };

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', text, timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Artificial delay to mimic thinking time
    setTimeout(() => {
      const response = getNeuralResponse(text);
      const botMsg = { 
        id: Date.now() + 1, 
        role: 'assistant', 
        text: response, 
        timestamp: new Date().toLocaleTimeString() 
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="flex h-full bg-slate-950/40 text-slate-200 font-sans overflow-hidden">
      {/* Search/Query Sidebar - Hidden on mobile */}
      {!isMobile && (
        <div className="w-64 border-r border-white/5 bg-black/40 p-5 flex flex-col gap-6 shrink-0">
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-neon-blue px-2">
                  <BrainCircuit size={18} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Core</span>
               </div>
               
               <div className="space-y-2">
                  <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest px-2 mb-2">Suggested Queries</div>
                  {SUGGESTED_QUERIES.map((q, i) => (
                    <button 
                      key={i}
                      onClick={() => handleSend(q)}
                      className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 text-[10px] text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all leading-tight"
                    >
                      {q}
                    </button>
                  ))}
               </div>
            </div>

            <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-900/20 space-y-3">
               <div className="flex items-center gap-2 text-neon-blue">
                  <Info size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Assistant Status</span>
               </div>
               <p className="text-[9px] text-slate-500 font-medium leading-relaxed uppercase tracking-tighter">
                  Model: Partha-G4-v2.0<br/>
                  Status: Operational<br/>
                  Context: Career Repository
               </p>
            </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Chat Header */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-black/20 shrink-0">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neon-blue/20 flex items-center justify-center text-neon-blue border border-neon-blue/20">
                 <Bot size={18} />
              </div>
              <div className="flex flex-col">
                 <span className="text-xs font-black text-white uppercase tracking-widest">Neural Assistant</span>
                 <div className="flex items-center gap-1.5 text-[8px] text-green-500 font-black uppercase">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    Syncing with Kernel
                 </div>
              </div>
           </div>
           
           <button onClick={() => setMessages([messages[0]])} className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-red-400 transition-colors">
              <Trash2 size={16} />
           </button>
        </div>

        {/* Messages Container */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border transition-all
                  ${msg.role === 'assistant' ? 'bg-black/40 border-white/10 text-neon-blue' : 'bg-neon-blue border-neon-blue/20 text-white'}
                `}>
                   {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                </div>

                <div className={`max-w-[85%] md:max-w-[70%] space-y-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                   <div className={`p-4 rounded-3xl text-sm font-medium leading-relaxed
                     ${msg.role === 'assistant' ? 'bg-white/5 text-slate-300 border border-white/5 rounded-tl-none' : 'bg-neon-blue/10 text-white border border-neon-blue/40 rounded-tr-none'}
                   `}>
                      {msg.text}
                   </div>
                   <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest px-2">{msg.timestamp}</div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-neon-blue shrink-0">
                   <Bot size={16} />
                </div>
                <div className="p-4 rounded-3xl bg-white/5 border border-white/5 rounded-tl-none flex items-center gap-2">
                   <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-neon-blue rounded-full" />
                   <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-neon-blue rounded-full" />
                   <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-neon-blue rounded-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Footer */}
        <div className="p-6 md:p-8 shrink-0 bg-gradient-to-t from-slate-950/80 to-transparent">
           <form 
             onSubmit={(e) => { e.preventDefault(); handleSend(); }}
             className="max-w-4xl mx-auto relative group"
           >
              <div className="absolute inset-0 bg-neon-blue/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              <input 
                type="text" 
                placeholder="Ask me something about Partha's tech journey..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-2xl pl-12 pr-12 py-5 text-sm focus:border-neon-blue focus:ring-4 focus:ring-neon-blue/10 outline-none transition-all placeholder:text-slate-600 font-medium relative z-10"
              />
              <Sparkles size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-neon-blue z-10" />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="absolute right-5 top-1/2 -translate-y-1/2 p-2 bg-neon-blue text-white rounded-lg shadow-lg shadow-neon-blue/20 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all z-10"
              >
                 <Send size={18} />
              </button>
           </form>
           <div className="mt-4 flex items-center justify-center gap-4 text-[9px] font-black text-slate-600 uppercase tracking-widest uppercase">
              <div className="flex items-center gap-1"><Command size={10} /> ENTER TO SEND</div>
              <span>|</span>
              <div>Powered by AI Fusion Core</div>
           </div>
        </div>

      </div>
    </div>
  );
}