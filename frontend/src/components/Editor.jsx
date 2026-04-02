import MonacoEditor from "@monaco-editor/react";

export default function Editor({ files, setFiles, activeFile }) {
  return (
    <MonacoEditor
      height="100%"
      language={
        activeFile.endsWith(".html")
          ? "html"
          : activeFile.endsWith(".css")
          ? "css"
          : activeFile.endsWith(".js") || activeFile.endsWith(".jsx")
          ? "javascript"
          : "plaintext"
      }
      theme="vs-dark"
      value={files[activeFile] || ""}
      onChange={(val) => {
        setFiles({
          ...files,
          [activeFile]: val || ""
        });
      }}
      options={{
        fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace",
        fontSize: 14,
        minimap: { enabled: false },
        wordWrap: "on",
        scrollBeyondLastLine: false,
        padding: { top: 16 },
        lineHeight: 24,
        renderLineHighlight: "all",
      }}
      loading={<div style={{display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)'}}>Loading Editor...</div>}
    />
  );
}