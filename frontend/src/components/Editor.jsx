import MonacoEditor from "@monaco-editor/react";

export default function Editor({ code, setCode }) {
  return (
    <MonacoEditor
      height="100vh"
      theme="vs-dark"
      language="html"
      value={code}
      onChange={(val) => setCode(val)}
    />
  );
}