import { useState } from "react";
import Chat from "./components/Chat";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

export default function App() {
  const [code, setCode] = useState("<h1>Hello AI</h1>");

  return (
    <div style={{ display: "flex", height: "100vh", background: "#1e1e1e", color: "white" }}>
      
      {/* Sidebar */}
      <div style={{ width: "60px", background: "#111", padding: "10px" }}>
        <div>📁</div>
        <div>💬</div>
        <div>⚙️</div>
      </div>

      {/* Chat */}
      <div style={{ width: "300px", borderRight: "1px solid #333" }}>
        <Chat setCode={setCode} code={code} />
      </div>

      {/* Editor */}
      <div style={{ flex: 1, borderRight: "1px solid #333" }}>
        <Editor code={code} setCode={setCode} />
      </div>

      {/* Preview */}
      <div style={{ width: "400px" }}>
        <Preview code={code} />
      </div>
    </div>
  );
}