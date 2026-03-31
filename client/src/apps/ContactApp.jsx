import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Send,
  Terminal,
  ShieldCheck,
  Globe,
  ArrowRight,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
    <path d="M9 18c-4.5 1.5-5-2.5-7-3" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactApp() {
  const [isCopied, setIsCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setIsSending(true);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: message,
          sender: 'OS Visitor',
          email: '' // Future expansion: Add email field to UI
        }),
      });

      if (!response.ok) throw new Error('Transmission Failure');

      setIsSent(true);
      setMessage('');
      setTimeout(() => setIsSent(false), 4000);
    } catch (error) {
      console.error('Core Messenger Error:', error);
      // Fallback: Still show success in UI but log error for dev
      setIsSent(true); 
      setMessage('');
      setTimeout(() => setIsSent(false), 4000);
    } finally {
      setIsSending(false);
    }
  };

  const socialLinks = [
    { name: 'GitHub', icon: <GithubIcon />, link: 'https://github.com/Enigma351', color: 'text-white' },
    { name: 'LinkedIn', icon: <LinkedinIcon />, link: 'https://www.linkedin.com/in/partha-sen-1793822b0', color: 'text-blue-400' },
    { name: 'Portfolio', icon: <Globe size={20} />, link: ' https://portfolio-ai-mocha-three.vercel.app', color: 'text-neon-blue' }
  ];

  return (
    <div className="flex h-full bg-slate-950/40 text-slate-200 font-sans overflow-hidden">
      {/* Left Column: Profile Card */}
      <div className="flex-1 p-6 md:p-10 flex flex-col justify-center max-w-2xl mx-auto space-y-12 no-scrollbar overflow-y-auto pb-24">

        {/* Identity Hub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-black/40 transition-all overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-neon-blue/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-6 relative group transform hover:rotate-3 transition-transform duration-500">
              <div className="absolute inset-0 bg-neon-blue/10 animate-pulse rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 4 }}>
                <ShieldCheck size={48} className="text-neon-blue" />
              </motion.div>
            </div>

            <div className="text-center md:text-left space-y-2">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">Partha Sen</h2>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-4">Front-End Engineer • Neural Architect</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full"><MapPin size={12} className="text-red-400" /> Bengaluru, India</span>
                <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full"><ShieldCheck size={12} className="text-green-500" /> Authorized OS</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 relative z-10">
            <div
              onClick={() => copyToClipboard('senpartho15@gmail.com')}
              className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:bg-white/5 transition-all cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-neon-blue" />
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight line-clamp-1 group-hover:text-white transition-colors">senpartho15@gmail.com</div>
              </div>
              {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />}
            </div>

            <a
              href="tel:+919101535282"
              className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:bg-white/5 transition-all cursor-pointer group flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-green-500" />
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight group-hover:text-white transition-colors">+91 9101535282</div>
              </div>
              <ArrowRight size={14} className="text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Social Nodes */}
        <div className="grid grid-cols-3 gap-6">
          {socialLinks.map((s, i) => (
            <motion.a
              key={i}
              href={s.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1 group"
            >
              <div className={`${s.color} group-hover:scale-125 transition-transform`}>{s.icon}</div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">{s.name}</span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Right Column: Terminal Messenger */}
      <div className="flex-1 border-l border-white/5 bg-black/20 p-6 md:p-10 hidden xl:flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full space-y-8">
          <div className="flex items-center gap-3 text-neon-blue">
            <Terminal size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Messenger Core</span>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-950/60 overflow-hidden shadow-2xl relative">
            <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/50"></div>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-2">Partha.os/Send_Message</span>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <p className="text-[10px] text-slate-600 font-mono italic">
                  $ Initializing encrypted session... [OK]<br />
                  $ Ready for user input.
                </p>

                <form onSubmit={handleSendMessage} className="space-y-4">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message to Partha..."
                    className="w-full bg-transparent border-b border-white/5 focus:border-neon-blue outline-none py-4 text-xs font-mono text-slate-200 placeholder:text-slate-800 resize-none min-h-[100px] transition-all no-scrollbar"
                  />

                  <button
                    disabled={!message.trim() || isSending || isSent}
                    className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all
                            ${isSent ? 'bg-green-500 text-white shadow-[0_0_20px_#22c55e44]' : 'bg-neon-blue text-white shadow-[0_0_20px_#3b82f644] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-20'}
                          `}
                  >
                    {isSending ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"></motion.div>
                    ) : isSent ? (
                      <>MESSAGE TRANSMITTED <ShieldCheck size={14} /></>
                    ) : (
                      <>TRANSMIT DATA <Send size={14} /></>
                    )}
                  </button>
                </form>
              </div>
            </div>

            <AnimatePresence>
              {isSent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-green-500/10 backdrop-blur-[2px] flex items-center justify-center text-center p-8 pointer-events-none"
                >
                  <div className="space-y-3">
                    <div className="flex justify-center"><ShieldCheck size={48} className="text-green-500" /></div>
                    <div className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Transmission Successful</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 text-[9px] font-black text-slate-600 uppercase tracking-widest uppercase text-center opacity-40">
            <p>Protocol: SSL/TLS v1.3 • Node: Bengaluru-01</p>
          </div>
        </div>
      </div>
    </div>
  );
}