import React, { useState } from 'react';

export default function JdMatcherApp() {
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // 🧠 SMART JD MATCHER (Professional + Favorable Tone)
  const getLocalJDMatch = (jdText) => {
    const text = jdText.toLowerCase();

    // 🔍 Skill detection
    const hasReact = text.includes("react");
    const hasNode = text.includes("node");
    const hasMongo = text.includes("mongodb");
    const hasApi = text.includes("api");
    const hasFrontend = text.includes("frontend") || text.includes("ui");
    const hasBackend = text.includes("backend");
    const hasFullstack = text.includes("full stack") || text.includes("mern");

    let score = 72;

    if (hasReact) score += 10;
    if (hasNode) score += 10;
    if (hasMongo) score += 8;
    if (hasApi) score += 5;
    if (hasFullstack) score += 10;

    if (score > 95) score = 92 + Math.floor(Math.random() * 4);

    const isMatch = score >= 75;

    // 💼 PROFESSIONAL + APPEALING EXPLANATION
    let explanation = "";

    if (isMatch) {
      explanation = `
Partha appears to be a strong match for this role.

His experience with the MERN stack, including React, Node.js, and MongoDB, aligns closely with the core technical requirements mentioned in the job description. He has hands-on experience building scalable, production-ready applications and working with APIs and modern frontend architectures.

Additionally, his background in performance optimization and real-world project development positions him well to contribute effectively from the outset.

Overall, he would be a valuable addition to the team.
`;
    } else {
      explanation = `
Partha shows promising alignment with this role.

While a few specific technologies or requirements may not yet be his primary focus, he has a strong foundation in modern web development and hands-on experience with the MERN stack. His ability to quickly adapt and build scalable applications makes him a candidate with strong potential.

With minimal upskilling in the required areas, he could transition into this role effectively and add meaningful value to the team.
`;
    }

    return {
      matchScore: score,
      isMatch,
      explanation
    };
  };

  const handleMatch = async (e) => {
    e?.preventDefault();
    if (!jd.trim()) return;
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch(`${apiUrl}/jd-match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: jd }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (data && data.matchScore !== undefined) {
        setResult(data);
      } else {
        setResult(getLocalJDMatch(jd));
      }
    } catch (error) {
      setResult(getLocalJDMatch(jd));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/50 rounded-lg p-4 border border-slate-700 overflow-y-auto">
      <h3 className="text-lg font-bold text-slate-100 mb-2">Job Description Matcher</h3>
      <p className="text-xs text-slate-400 mb-4">
        Paste a JD to evaluate how well Partha aligns with the role.
      </p>

      {!result ? (
        <>
          <textarea
            className="flex-1 w-full bg-black/50 border border-slate-600 rounded-lg p-3 text-sm text-slate-200 focus:border-neon-purple focus:outline-none resize-none mb-4 pointer-events-auto"
            placeholder="Paste job description here..."
            value={jd}
            onPointerDown={(e) => e.stopPropagation()}
            onChange={(e) => setJd(e.target.value)}
          ></textarea>

          <button
            onClick={handleMatch}
            onPointerDown={(e) => e.stopPropagation()}
            disabled={loading || !jd.trim()}
            className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex justify-center items-center h-12 pointer-events-auto cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : "Check Match"}
          </button>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center space-y-4">

          {/* MATCH RESULT */}
          <div
            className={`text-2xl font-bold ${
              result.isMatch ? "text-green-400" : "text-yellow-400"
            }`}
          >
            {result.isMatch ? "✅ Strong Match" : "⚠️ Potential Match"}
          </div>

          {/* SCORE */}
          <div className="text-4xl font-bold text-white">
            {result.matchScore}%
          </div>

          {/* EXPLANATION */}
          <p className="text-slate-300 text-sm whitespace-pre-line">
            {result.explanation}
          </p>

          <button
            onClick={() => setResult(null)}
            onPointerDown={(e) => e.stopPropagation()}
            className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 rounded transition-colors text-sm pointer-events-auto cursor-pointer"
          >
            Test Another JD
          </button>
        </div>
      )}
    </div>
  );
}