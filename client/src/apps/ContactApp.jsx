import React from 'react';
import { Mail, Phone, Link } from 'lucide-react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"/>
    <path d="M9 18c-4.5 1.5-5-2.5-7-3"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export default function ContactApp() {
  const contacts = [
    { 
      icon: <Mail />, 
      label: 'Email', 
      value: 'senpartho15@gmail.com', 
      href: 'mailto:senpartho15@gmail.com?subject=Opportunity&body=Hi Partha,' 
    },
    { 
      icon: <Phone />, 
      label: 'Phone', 
      value: '+91 9101535282',
      href: 'tel:+919101535282'
    },
    { 
      icon: <Link />, 
      label: 'LinkedIn', 
      value: 'linkedin.com/in/partha-sen', 
      href: 'https://www.linkedin.com/in/partha-sen-1793822b0/' 
    },
    { 
      icon: <GithubIcon />, 
      label: 'GitHub', 
      value: 'github.com/Enigma351', 
      href: 'https://github.com/Enigma351' 
    },
    { 
      icon: <InstagramIcon />, 
      label: 'Instagram', 
      value: '@partha.sen', 
      href: 'https://www.instagram.com/partho34/' 
    }
  ];

  return (
    <div className="flex flex-col bg-slate-900 p-6 md:p-8 items-center text-slate-200 min-h-full h-full w-full">
      
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-neon-blue to-neon-purple p-1 shadow-[0_0_20px_rgba(139,92,246,0.6)] mb-6 mt-4">
        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl font-black tracking-tighter">
          PS
        </div>
      </div>

      {/* Name */}
      <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-white tracking-widest uppercase mb-1">
        Partha Sen
      </h2>

      <p className="text-neon-purple font-mono font-semibold mb-8 text-sm text-center">
        Open to Opportunities
      </p>

      {/* Contacts */}
      <div className="w-full max-w-sm space-y-4">
        {contacts.map((c, i) => {
          const isExternal = c.href?.startsWith('http');
          const isLink = !!c.href;

          const Component = isLink ? 'a' : 'div';

          return (
            <Component
              key={i}
              href={c.href}
              {...(isExternal && {
                target: "_blank",
                rel: "noopener noreferrer"
              })}
              className="flex items-center gap-4 p-4 border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-neon-blue transition-all rounded-xl cursor-pointer group"
            >
              <div className="text-slate-400 group-hover:text-neon-blue transition-colors">
                {c.icon}
              </div>

              <div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  {c.label}
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  {c.value}
                </div>
              </div>
            </Component>
          );
        })}
      </div>
    </div>
  );
}