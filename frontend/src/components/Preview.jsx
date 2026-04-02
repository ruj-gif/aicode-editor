export default function Preview({ files }) {
  const html = files["index.html"] || "";
  const css = files["style.css"] || "";
  const js = files["script.js"] || "";

  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: system-ui, sans-serif;
            box-sizing: border-box;
          }

          ${css}
        </style>
      </head>
      <body>
        ${html}

        <script>
          document.addEventListener("DOMContentLoaded", () => {
            try {
              ${js}
            } catch (e) {
              console.error("JS Error:", e);
            }
          });
        </script>
      </body>
    </html>
  `;

  return (
    <div style={{ flex: 1, padding: '16px', background: 'var(--bg-main)' }}>
      <div style={{ 
        width: "100%", 
        height: "100%", 
        borderRadius: "10px", 
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
        background: "white"
      }}>
        <iframe
          srcDoc={srcDoc}
          sandbox="allow-scripts allow-forms allow-modals"
          referrerPolicy="no-referrer"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}