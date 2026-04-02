import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  console.log("📩 REQUEST RECEIVED");
  console.log("🔥 Prompt:", prompt);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "AI Code Editor"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
You are an expert frontend developer.

Return ONLY valid JSON with EXACT keys:
- "index.html"
- "style.css"
- "script.js"

STRICT RULES:
- NO explanation
- NO markdown
- NO extra text
- Escape quotes properly using \\\\"

Example:
{
  "index.html": "<div class=\\"box\\">Hello</div>",
  "style.css": "body { background: red; }",
  "script.js": "console.log('hi');"
}
`
          },
          {
            role: "user",
            content: prompt
          }
        ]
      }),
    });

    clearTimeout(timeout);

    const data = await response.json();

    console.log("RAW RESPONSE:", data);

    let output = data?.choices?.[0]?.message?.content || "";

    // 🔥 Clean markdown
    output = output.replace(/```json/g, "").replace(/```/g, "").trim();

    // 🔥 Extract JSON
    const jsonMatch = output.match(/\{[\s\S]*\}/);

    let files;

    if (jsonMatch) {
      let jsonString = jsonMatch[0];

      // 🔥 Clean JSON safely
      jsonString = jsonString
        .replace(/\n/g, " ")
        .replace(/\r/g, "")
        .replace(/\t/g, "")
        .replace(/,\s*}/g, "}")
        .replace(/,\s*]/g, "]");

      try {
        files = JSON.parse(jsonString);
      } catch (e) {
        console.error("❌ JSON parse error:", e);
      }
    }

    // 🔥 Validate structure
    if (
      !files ||
      !files["index.html"] ||
      !files["style.css"] ||
      !files["script.js"]
    ) {
      console.warn("⚠️ Invalid AI response structure");

      files = {
        "index.html": "<h1>Fallback UI</h1>",
        "style.css": "body { font-family: Arial; text-align: center; }",
        "script.js": "console.log('Fallback');"
      };
    }

    console.log("✅ FINAL FILES:", files);

    res.json({ files });

  } catch (err) {
    console.error("❌ FULL ERROR:", err);

    res.json({
      files: {
        "index.html": "<h1>AI failed ⚠️</h1>",
        "style.css": "",
        "script.js": ""
      }
    });
  }
});

export default router;