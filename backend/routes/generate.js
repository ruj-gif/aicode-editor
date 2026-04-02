import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  console.log("📩 REQUEST RECEIVED");
  console.log("🔥 Prompt:", prompt);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "AI Code Editor"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content: `
You are an expert frontend developer.

STRICT RULES:
- Return ONLY valid HTML
- Use inline CSS ONLY
- Do NOT explain anything
- Do NOT include markdown
- Output should start directly with HTML

Example:
<div style="...">...</div>
`
          },
          {
            role: "user",
            content: prompt
          }
        ]
      }),
    });

    const data = await response.json();

    console.log("RAW RESPONSE:", data);

    let output =
      data?.choices?.[0]?.message?.content || "<h1>No response</h1>";

    // 🔥 Clean output
    output = output.replace(/```html/g, "").replace(/```/g, "");

    if (output.includes("<")) {
      output = output.substring(output.indexOf("<"));
    }

    console.log("✅ AI Response:", output);

    res.json({ code: output });

  } catch (err) {
    console.error("❌ FULL ERROR:", err);

    res.json({
      code: "<h1>AI failed ⚠️</h1><p>Try again</p>"
    });
  }
});

export default router;