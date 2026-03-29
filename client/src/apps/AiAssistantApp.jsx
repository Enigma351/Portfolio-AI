import React, { useState, useRef, useEffect } from 'react';

// 🧠 LOCAL FALLBACK PROFILE
const LOCAL_PROFILE = {
  name: "Partha Sen",
  role: "Full Stack MERN Developer",
  skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "Tailwind"],
  experience:
    "Frontend Engineer at Vitorscape (improved performance by 30%) with strong MERN stack internship experience building scalable applications.",
};

// 🧠 MEMORY (for chatgpt-like behavior)
const conversationMemory = [];

export default function AiAssistantApp() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I am the Partha OS AI. Ask me why Partha is a great fit for your team.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🔥 CHATGPT-LIKE LOCAL AI ENGINE
  const getLocalReply = (question) => {
    const q = question.toLowerCase();

    // 🧠 store memory
    conversationMemory.push(q);

    const lastContext = conversationMemory[conversationMemory.length - 2];

    // 🤖 identity
    if (q.includes("who are you")) {
      return "I am the AI assistant built by Partha to guide you through his interactive portfolio and answer questions about his work, skills, and experience.";
    }

    // 💡 skills
    if (q.includes("skill") || q.includes("tech")) {
      return `Partha specializes in ${LOCAL_PROFILE.skills.join(
        ", "
      )}, with strong expertise in building scalable MERN stack applications, optimizing performance, and delivering production-ready solutions.`;
    }

    // 💼 experience
    if (q.includes("experience") || q.includes("work")) {
      return LOCAL_PROFILE.experience;
    }

    // 🚀 PROJECTS (SMART + DETAILED)
    if (q.includes("project")) {
      return `
Partha has built several production-ready applications:

• CRM (haajri.in): A full-stack system for attendance and client tracking with dynamic dashboards and REST API integration.

• Moptro EV Dashboard: A secure MERN-based analytics dashboard with JWT authentication and real-time data visualization.

• Listify App: A React + Firebase application with real-time updates and external API integrations.

• Todo Note App: A full-stack productivity tool with CRUD functionality and persistent storage.

These projects highlight his ability to design scalable systems and solve real-world problems.
`;
    }

    // 🎯 recruiter pitch (AUTO SELL)
    if (q.includes("why") || q.includes("hire") || q.includes("fit")) {
      return "Partha stands out due to his strong MERN stack expertise, hands-on experience building real-world applications, and ability to optimize performance. He consistently delivers scalable, user-focused solutions, making him a valuable addition to any team.";
    }

    // 📍 contact
    if (q.includes("contact")) {
      return "You can reach Partha at senpartho15@gmail.com. He is based in Bengaluru and is actively open to opportunities.";
    }

    // 🧠 FOLLOW-UP UNDERSTANDING
    if (lastContext) {
      if (lastContext.includes("project") && q.includes("tech")) {
        return "These projects were primarily built using the MERN stack, including React for frontend, Node.js and Express for backend, and MongoDB for database management, along with Firebase in some cases.";
      }

      if (lastContext.includes("experience") && q.includes("skill")) {
        return "Through his experience, Partha has developed strong skills in React, API integration, performance optimization, and scalable architecture design.";
      }
    }

    // 🤖 fallback (chatgpt-like)
    return "Partha is a passionate MERN stack developer who focuses on building scalable, high-performance applications with clean architecture and excellent user experience. Feel free to ask anything specific about his skills, projects, or experience.";
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const apiUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout for fallback

      const response = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].slice(-5),
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        const fallback = getLocalReply(input);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: fallback },
        ]);
      }
    } catch (error) {
      const fallback = getLocalReply(input);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fallback },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm
              ${
                msg.role === "user"
                  ? "bg-neon-blue text-white rounded-br-none"
                  : "bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-200 border border-slate-700 p-3 rounded-lg rounded-bl-none flex gap-1 items-center">
              <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-neon-purple rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="p-3 border-t border-slate-700 bg-slate-900/80 flex gap-2"
      >
        <input
          type="text"
          onPointerDown={(e) => e.stopPropagation()}
          className="flex-1 bg-black/50 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-blue pointer-events-auto"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          onPointerDown={(e) => e.stopPropagation()}
          disabled={loading || !input.trim()}
          className="bg-neon-blue hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold transition-colors disabled:opacity-50 pointer-events-auto"
        >
          Send
        </button>
      </form>
    </div>
  );
}