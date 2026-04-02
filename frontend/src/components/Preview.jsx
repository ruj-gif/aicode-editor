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
            font-family: system-ui, sans-serif;
          }
          ${css}
        </style>
      </head>
      <body>
        ${html}

        <script>
          try {
            ${js}
          } catch (e) {
            console.error(e);
          }
        </script>
      </body>
    </html>
  `;

  return (
    <div style={{ flex: 1, padding: '16px', background: 'var(--bg-main)'}}>
      <div style={{ 
        width: "100%", 
        height: "100%", 
        borderRadius: "8px", 
        overflow: "hidden",
        border: "1px solid var(--border-light)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        background: "white" 
      }}>
        <iframe
          srcDoc={srcDoc}
          title="preview"
          sandbox="allow-scripts"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            background: "white"
          }}
        />
      </div>
    </div>
  );
}