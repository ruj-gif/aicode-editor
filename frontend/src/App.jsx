import { useState } from "react";
import Chat from "./components/Chat";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

export default function App() {
  const [files, setFiles] = useState({
    "index.html": "<h1>Hello</h1>",
    "style.css": "body { font-family: Arial; }",
    "script.js": "console.log('Hello');"
  });

  const [activeFile, setActiveFile] = useState("index.html");

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-icon active" title="Files">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
        </div>
        <div className="sidebar-icon" title="Chat">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        </div>
        <div className="sidebar-icon" title="Settings" style={{marginTop: "auto"}}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </div>
      </div>

      {/* Chat */}
      <div className="chat-panel">
        <Chat files={files} setFiles={setFiles} />
      </div>

      {/* Editor + Tabs */}
      <div className="editor-section">
        {/* File Tabs */}
        <div style={{ display: "flex", gap: "2px", background: "var(--bg-panel-solid)", padding: "8px 12px", borderBottom: "1px solid var(--border-light)" }}>
          {Object.keys(files).map((file) => (
            <div
              key={file}
              onClick={() => setActiveFile(file)}
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: activeFile === file ? "500" : "400",
                color: activeFile === file ? "var(--text-active)" : "var(--text-muted)",
                background: activeFile === file ? "rgba(255,255,255,0.06)" : "transparent",
                borderTop: activeFile === file ? "2px solid var(--accent-blue)" : "2px solid transparent",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
                transition: "all 0.2s ease"
              }}
            >
              {
                file.endsWith('.html') ? "🌐 " :
                file.endsWith('.css') ? "🎨 " : "📝 "
              }
              {file}
            </div>
          ))}
        </div>

        {/* Editor */}
        <div style={{ flex: 1, position: "relative" }}>
          <Editor files={files} setFiles={setFiles} activeFile={activeFile} />
        </div>
      </div>

      {/* Preview */}
      <div className="preview-panel">
        <div style={{ padding: "12px 16px", background: "var(--bg-panel-solid)", borderBottom: "1px solid var(--border-light)", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-muted)" }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          Live Preview
        </div>
        <Preview files={files} />
      </div>

    </div>
  );
}