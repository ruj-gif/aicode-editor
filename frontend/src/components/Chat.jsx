import { useState } from "react";
import axios from "axios";

export default function Chat({ setCode, code }) {
  const [prompt, setPrompt] = useState("");

  return (
    <div style={{ padding: "10px" }}>
      <h2>💬 AI Chat</h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", height: "100px" }}
      />

      <button
        onClick={async () => {
          try {
            const res = await axios.post("http://localhost:5000/api/generate", {
              prompt,
              code,
            });

            setCode(res.data.code);
          } catch (err) {
            console.error(err);
            alert("Backend error");
          }
        }}
      >
        Generate
      </button>
    </div>
  );
}