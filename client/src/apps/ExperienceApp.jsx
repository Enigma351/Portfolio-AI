import React from 'react';

export default function ExperienceApp() {
  const experiences = [
    {
      role: 'Front-End Developer',
      company: 'Vitorscape Technologies',
      year: '11/2024 - 11/2025',
      desc: 'Worked as a core Frontend Engineer responsible for building and maintaining production-level user interfaces using React.js, JavaScript (ES6), and Tailwind CSS. On a day-to-day basis, collaborated closely with designers and backend developers to translate business requirements into scalable UI components. Regularly optimized performance, debugged complex UI issues, and ensured cross-browser and cross-device compatibility. Played a key role in redesigning client dashboards and admin panels, improving usability and engagement. Frequently worked with REST APIs, handled dynamic data rendering, and contributed to code reviews and Agile sprint cycles.'
    },
    {
      role: 'Full Stack Web Developer Intern',
      company: 'Unified Mentor Pvt Ltd',
      year: '04/2024 - 06/2024',
      desc: 'Contributed to end-to-end development of web applications using the MERN stack, working across both frontend and backend layers. Daily responsibilities included building responsive UI components in React, developing RESTful APIs using Node.js and Express.js, and managing data using MongoDB. Actively participated in debugging, testing, and optimizing application performance. Collaborated with team members in Agile workflows, contributed to feature development, and assisted in deploying applications on AWS using Git and GitHub. Gained hands-on experience in integrating authentication systems and managing real-world application logic.'
    },
    {
      role: 'MERN Stack Developer Intern',
      company: 'SkillDzire',
      year: '09/2023 - 11/2023',
      desc: 'Focused on developing full-stack applications using the MERN stack, with an emphasis on building responsive and interactive user interfaces. Day-to-day tasks included creating reusable UI components, implementing REST APIs, and connecting frontend applications with backend services. Worked on debugging issues, improving code structure, and ensuring clean, maintainable code practices. Participated in Agile sprints, collaborated with peers on project development, and gained strong foundational experience in full-stack application architecture.'
    }
  ];

  return (
    <div className="flex flex-col bg-slate-900 p-4 md:p-8">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple mb-6 uppercase tracking-widest border-b border-slate-700 pb-2">
        Career Timeline
      </h2>
      <div className="relative border-l-2 border-neon-blue border-opacity-30 pl-6 ml-4 space-y-10">
        {experiences.map((exp, i) => (
          <div key={i} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[33px] top-1.5 w-4 h-4 bg-slate-900 border-2 border-neon-blue rounded-full group-hover:bg-neon-blue transition-colors shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
            
            <h3 className="text-xl font-bold text-slate-100 group-hover:text-neon-blue transition-colors">{exp.role}</h3>
            <div className="flex justify-between items-center text-sm mt-1 border-b border-slate-800 pb-2">
              <span className="text-neon-purple font-semibold">{exp.company}</span>
              <span className="text-slate-400 font-mono bg-black/50 px-2 py-0.5 rounded">{exp.year}</span>
            </div>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              {exp.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}