import React from 'react';
import { Download, FileText } from 'lucide-react';

export default function ResumeApp() {
  const downloadResume = () => {
    // Construct path to the PDF file in the public folder
    const pdfUrl = '/ParthaSenFinalResume2026 (1).pdf';
    
    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Partha_Sen_Resume.pdf'; // Name the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col bg-slate-900 text-slate-200">
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/80 sticky top-0 backdrop-blur-md z-10">
        <h3 className="font-bold flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-neon-purple"/> 
            <span className="truncate max-w-[150px] sm:max-w-xs">ParthaSenFinalResume...</span>
          </div>
        </h3>
        <button 
          onClick={downloadResume}
          className="bg-neon-blue hover:bg-blue-600 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shrink-0"
        >
          <Download size={14} /> Download CV
        </button>
      </div>
      
      <div className="p-4 sm:p-8 pb-16 w-full max-w-2xl mx-auto shadow-2xl bg-white text-slate-900 min-h-full my-4 text-xs sm:text-sm leading-relaxed font-serif">
        {/* Mock Resume Content */}
        <div className="border-b-2 border-slate-900 pb-2 mb-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase">Partha Sen</h1>
          <p className="font-semibold text-slate-700 mt-1">Bengaluru, Karnataka / India | +91 9101535282 | senpartho15@gmail.com | linkedin.com/in/partha-sen</p>
        </div>
        
        <div className="space-y-4">
          <section>
            <h2 className="text-lg font-bold border-b border-slate-900 pb-1 mb-2 uppercase">Summary</h2>
            <p className="text-justify">
              Enthusiastic developer with strong expertise in building interactive, high-performance web applications using MongoDB, Express.js, React, and Node.js. Highly proficient in JavaScript, DOM manipulation, CSS optimization, RESTful APIs, debugging, and frontend performance improvements. Passionate about crafting scalable, responsive, and modern web solutions while leveraging best practices in development and design.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold border-b border-slate-900 pb-1 mb-2 uppercase">Technical Skills</h2>
            <p><strong>Languages & Frameworks:</strong> JavaScript, HTML, CSS, React.js, Node.js, Express.js, Tailwind CSS, Bootstrap, WordPress</p>
            <p><strong>Core Expertise:</strong> DOM Manipulation, REST APIs, Debugging, Responsive Design, Performance Optimization</p>
            <p><strong>Tools & Platforms:</strong> Git, GitHub, Vite, Postman, MongoDB</p>
            <p><strong>Other:</strong> Problem Solving, Agile Methodology, Team Collaboration, Communication, Attention to Detail</p>
          </section>

          <section>
            <h2 className="text-lg font-bold border-b border-slate-900 pb-1 mb-2 uppercase">Professional Experience</h2>
            
            <div className="mb-3">
              <div className="flex flex-col sm:flex-row justify-between font-bold">
                 <span>Vitorscape Technologies</span>
                 <span>Remote</span>
              </div>
              <div className="font-semibold italic">Front-End Developer (11/2024 - 11/2025)</div>
              <ul className="list-disc list-outside ml-5 mt-1 text-justify space-y-1">
                <li>Developed and maintained dynamic web interfaces using React.js, JavaScript (ES6), and Tailwind CSS, enhancing UI performance and responsiveness across devices.</li>
                <li>Built reusable components and integrated RESTful APIs, improving data handling efficiency by 30%.</li>
                <li>Collaborated with designers and backend teams via GitHub to deliver scalable front-end solutions in Agile sprints.</li>
                <li>Led the redesign of client dashboards and admin panels, boosting overall user engagement.</li>
              </ul>
            </div>

            <div className="mb-3">
              <div className="flex flex-col sm:flex-row justify-between font-bold">
                 <span>Unified Mentor Pvt Ltd</span>
                 <span>Bengaluru, Karnataka</span>
              </div>
              <div className="font-semibold italic">Full Stack Web Developer Intern (04/2024 - 06/2024)</div>
              <ul className="list-disc list-outside ml-5 mt-1 text-justify space-y-1">
                <li>Developing full-stack web applications using the MERN stack, with responsive front-end components in React and Angular.</li>
                <li>Building and optimizing RESTful APIs using Node.js, Express.js, and MongoDB, supporting 300+ mock users.</li>
                <li>Collaborating in Agile sprints, contributing to code reviews and AWS deployments via Git/GitHub.</li>
              </ul>
            </div>
            
            <div className="mb-3">
              <div className="flex flex-col sm:flex-row justify-between font-bold">
                 <span>SkillDzire</span>
                 <span>Remote</span>
              </div>
              <div className="font-semibold italic">MERN Stack Developer Intern (09/2023 - 11/2023)</div>
              <ul className="list-disc list-outside ml-5 mt-1 text-justify space-y-1">
                <li>Developed responsive UIs using React.js, Bootstrap, and Tailwind CSS.</li>
                <li>Built RESTful APIs with Node.js, Express.js, and MongoDB (Mongoose).</li>
                <li>Collaborated in Agile sprints, participated in code reviews, and used Git/GitHub for version control.</li>
              </ul>
            </div>
          </section>

          <section>
             <h2 className="text-lg font-bold border-b border-slate-900 pb-1 mb-2 uppercase">Education</h2>
             <div className="flex flex-col sm:flex-row justify-between font-semibold">
                <span>NEW HORIZON COLLEGE OF ENGINEERING</span>
                <span>CGPA - 7.9</span>
             </div>
             <div className="italic text-slate-700">2020 - 2024 | B.E(ISE)</div>

             <div className="flex flex-col sm:flex-row justify-between font-semibold mt-2">
                <span>LUMDING COLLEGE</span>
                <span>PERCENTAGE - 84.2%</span>
             </div>
             <div className="italic text-slate-700">2018 - 2020 | 12TH</div>
          </section>
        </div>
      </div>
    </div>
  );
}
