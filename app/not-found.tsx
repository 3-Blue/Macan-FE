export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
          <div>
            <h1>404</h1>
            <p>Page not found.</p>
            <a href="/en">Back to homepage</a>
          </div>
        </div>
      </body>
    </html>
  );
}