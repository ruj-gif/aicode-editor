import { useState } from "react";
import axios from "axios";

export default function Chat({ setFiles }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/generate", { prompt });
      setFiles(res.data.files);
      setPrompt('');
    } catch (err) {
      console.error(err);
      alert("Backend error or no server running. Make sure backend is on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Chat Header */}
      <div style={{ padding: "16px", borderBottom: "1px solid var(--border-light)", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-blue)", boxShadow: "0 0 10px var(--accent-blue)" }}></div>
        <h2 style={{ fontSize: "14px", fontWeight: "600", margin: 0, color: "var(--text-active)" }}>AI Assistant</h2>
      </div>

      {/* Chat Messages Area (Placeholder for actual chat history if needed) */}
      <div style={{ flex: 1, padding: "16px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", fontSize: "13px", lineHeight: "1.5", color: "var(--text-muted)" }}>
          Hello! I'm your AI coding assistant. Describe the component or app you want to build, and I'll generate the code for you.
        </div>
      </div>

      {/* Input Area */}
      <div style={{ padding: "16px", background: "rgba(0,0,0,0.2)", borderTop: "1px solid var(--border-light)" }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to build..."
          style={{
            width: "100%",
            height: "80px",
            background: "rgba(255, 255, 255, 0.05)",
            color: "var(--text-active)",
            border: "1px solid var(--border-light)",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "13px",
            fontFamily: "var(--font-main)",
            outline: "none",
            resize: "none",
            transition: "all 0.2s ease",
            boxSizing: "border-box"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--accent-blue)";
            e.target.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.2)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border-light)";
            e.target.style.boxShadow = "none";
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleGenerate();
            }
          }}
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          style={{
            marginTop: "12px",
            width: "100%",
            padding: "10px",
            background: loading ? "rgba(255,255,255,0.1)" : "var(--accent-gradient)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontSize: "13px",
            fontWeight: "600",
            cursor: loading || !prompt.trim() ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            boxShadow: loading || !prompt.trim() ? "none" : "0 4px 12px var(--accent-glow)"
          }}
          onMouseEnter={(e) => {
            if (!loading && prompt.trim()) e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            if (!loading && prompt.trim()) e.target.style.transform = "translateY(0)";
          }}
        >
          {loading ? (
             <svg className="animate-spin" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.657-5.657l1.414-1.414M4.929 19.071l1.414-1.414m0-11.314L4.93 4.93m14.142 14.142l-1.414-1.414"></path>
             </svg>
          ) : (
            <>
              Generate 
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </>
          )}
        </button>
      </div>
{/* add keyframes inline or we can add to index.css */}
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}