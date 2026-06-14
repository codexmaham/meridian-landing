"use client";

const links = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Resources: ["Documentation", "API Reference", "Guides", "Community", "Support"],
  Legal: ["Privacy", "Terms", "Cookies", "Security", "DPA"],
};

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--color-border)", padding: "64px 0 32px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: 32, marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: "var(--color-text-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="2" y="2" width="4" height="4" fill="white" />
                  <rect x="8" y="2" width="4" height="4" fill="white" opacity="0.6" />
                  <rect x="2" y="8" width="4" height="4" fill="white" opacity="0.4" />
                  <rect x="8" y="8" width="4" height="4" fill="white" />
                </svg>
              </div>
              <span style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>Meridian</span>
            </a>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--color-text-muted)", maxWidth: 180, margin: "0 0 20px 0" }}>
              The operating system for modern teams.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ label: "X" },{ label: "Li" },{ label: "Gh" }].map((s) => (
                <a key={s.label} href="#" style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", border: "1px solid var(--color-border)", textDecoration: "none", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-surface)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <h4 style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-primary)", marginBottom: 16 }}>{cat}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" style={{ fontSize: 13, color: "var(--color-text-muted)", textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)"}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid var(--color-border)", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 12, color: "var(--color-text-muted)", margin: 0 }}>© 2026 Meridian, Inc. All rights reserved.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#22C55E", display: "inline-block" }} />
            <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>All systems operational</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; }
          footer .container > div:first-child > div:first-child { grid-column: span 2; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          footer .container > div:first-child { grid-template-columns: 1fr 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
