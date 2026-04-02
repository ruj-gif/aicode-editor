export default function Preview({ code }) {
  const srcDoc = `
    <html>
      <body>${code}</body>
    </html>
  `;

  return (
    <iframe
      srcDoc={srcDoc}
      title="preview"
      sandbox="allow-scripts"
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  );
}