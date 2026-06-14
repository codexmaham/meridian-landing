"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  { num: "01", title: "Unified workspace", desc: "Everything your team needs in one place. Tasks, docs, goals, and conversations — no more context switching between a dozen tools.", visual: <WorkspaceVisual />, wide: true },
  { num: "02", title: "Real-time analytics", desc: "See how your team is performing with live dashboards that update as work happens.", visual: <AnalyticsVisual />, wide: false },
  { num: "03", title: "Smart automation", desc: "Build workflows that handle the repetitive stuff so your team can focus on what matters.", visual: <AutomationVisual />, wide: false },
  { num: "04", title: "Deep integrations", desc: "Connect to 200+ tools you already use. Meridian plays well with others.", visual: <IntegrationsVisual />, wide: true },
];

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="features" className="section-pad">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ maxWidth: 520, marginBottom: 64 }}
        >
          <p className="label-tag" style={{ marginBottom: 16 }}>Features</p>
          <h2 className="display-lg" style={{ marginBottom: 16 }}>Built for teams that refuse to slow down</h2>
          <p className="body-lg">Every feature in Meridian was designed with one goal: removing friction from your workflow.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ gridColumn: f.wide ? "span 2" : "span 1", borderRadius: 16, overflow: "hidden", border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)", display: "flex", flexDirection: "column", minHeight: 320, transition: "box-shadow 0.25s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 0 0 1.5px var(--color-text-primary)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "none"}
            >
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32, borderBottom: "1px solid var(--color-border)", minHeight: 200, overflow: "hidden" }}>
                {f.visual}
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--color-text-muted)", marginTop: 2, flexShrink: 0 }}>{f.num}</span>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 6 }}>{f.title}</h3>
                    <p className="body-sm">{f.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.7); } }
        @keyframes bar-grow { from { height:8px; } }
        @keyframes flow-pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @keyframes tag-float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }
        @keyframes card-slide-in { from { opacity:0; transform:translateX(-12px); } to { opacity:1; transform:translateX(0); } }
        @keyframes shimmer { 0% { transform:translateX(-100%); } 100% { transform:translateX(200%); } }

        @media (max-width: 767px) {
          #features .container > div { grid-template-columns: 1fr !important; }
          #features .container > div > div { grid-column: span 1 !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          #features .container > div { grid-template-columns: repeat(2, 1fr) !important; }
          #features .container > div > div[style*="span 2"] { grid-column: span 2 !important; }
        }
      `}</style>
    </section>
  );
}

function WorkspaceVisual() {
  const tasks = [
    { label: "Design System", status: "In review", color: "#C8622A", delay: "0s" },
    { label: "Auth Refactor", status: "In progress", color: "#1A5276", delay: "0.15s" },
    { label: "Q3 Roadmap", status: "Done", color: "#2D6A4F", delay: "0.3s" },
    { label: "API Docs", status: "Pending", color: "#7D3C98", delay: "0.45s" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, width: "100%", maxWidth: 340 }}>
      {tasks.map((t, i) => (
        <div
          key={i}
          style={{
            padding: 14, borderRadius: 12, backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)",
            animation: `card-slide-in 0.5s ease-out ${t.delay} both`,
            position: "relative", overflow: "hidden",
          }}
        >
          {/* shimmer effect */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)", animation: `shimmer ${3 + i * 0.7}s ease-in-out ${1 + i * 0.3}s infinite`, width: "60%", pointerEvents: "none" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: t.color, display: "inline-block", animation: `pulse-dot ${2 + i * 0.3}s ease-in-out infinite` }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: t.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.status}</span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-primary)", margin: 0 }}>{t.label}</p>
        </div>
      ))}
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [
    { h: 35, delay: "0s" }, { h: 60, delay: "0.08s" }, { h: 45, delay: "0.16s" },
    { h: 78, delay: "0.24s" }, { h: 55, delay: "0.32s" }, { h: 92, delay: "0.4s" },
    { h: 68, delay: "0.48s" }, { h: 84, delay: "0.56s" },
  ];
  return (
    <div style={{ width: "100%", maxWidth: 240, display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Trend line SVG */}
      <div style={{ position: "relative", width: "100%" }}>
        <svg viewBox="0 0 240 60" width="100%" height="60" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-border)" />
              <stop offset="100%" stopColor="var(--color-text-primary)" />
            </linearGradient>
          </defs>
          <polyline
            points="0,50 30,42 60,38 90,30 120,25 150,18 180,14 210,8 240,4"
            fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: 400, strokeDashoffset: 400, animation: "draw-line 1.5s ease-out 0.3s forwards" }}
          />
          <circle cx="240" cy="4" r="3.5" fill="var(--color-text-primary)" style={{ opacity: 0, animation: "fade-in 0.3s ease 1.6s forwards" }} />
        </svg>
      </div>
      {/* Animated bars */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 72 }}>
        {bars.map((b, i) => (
          <div
            key={i}
            style={{
              flex: 1, borderRadius: 4,
              backgroundColor: i === 5 ? "var(--color-text-primary)" : "var(--color-border)",
              height: `${b.h}%`,
              animation: `bar-grow 0.6s cubic-bezier(0.22,1,0.36,1) ${b.delay} both`,
              position: "relative", overflow: "hidden",
            }}
          >
            {i === 5 && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)" }} />}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>Weekly velocity</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#22C55E", display: "flex", alignItems: "center", gap: 3 }}>
          <span style={{ fontSize: 10 }}>↑</span> +24%
        </span>
      </div>
      <style>{`
        @keyframes draw-line { to { stroke-dashoffset: 0; } }
        @keyframes fade-in { to { opacity: 1; } }
      `}</style>
    </div>
  );
}

function AutomationVisual() {
  const nodes = [
    { icon: "◈", label: "Trigger", active: false, delay: "0s" },
    { icon: "◉", label: "Filter", active: true, delay: "0.3s" },
    { icon: "▣", label: "Action", active: false, delay: "0.6s" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", width: "100%", maxWidth: 220 }}>
      {nodes.map((node, i) => (
        <div key={i} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <div
            style={{
              width: "100%", padding: "10px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600,
              display: "flex", alignItems: "center", gap: 10,
              backgroundColor: node.active ? "var(--color-text-primary)" : "var(--color-bg)",
              color: node.active ? "#FAFAF8" : "var(--color-text-secondary)",
              border: `1px solid ${node.active ? "var(--color-text-primary)" : "var(--color-border)"}`,
              animation: `card-slide-in 0.4s ease-out ${node.delay} both`,
              position: "relative", overflow: "hidden",
            }}
          >
            {node.active && (
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)", animation: "shimmer 2s ease-in-out 1s infinite", width: "60%", pointerEvents: "none" }} />
            )}
            <span style={{ fontSize: 16 }}>{node.icon}</span>
            <span>{node.label}</span>
            {node.active && (
              <span style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", backgroundColor: "#22C55E", animation: "pulse-dot 1.5s ease-in-out infinite", display: "inline-block" }} />
            )}
          </div>
          {i < nodes.length - 1 && (
            <div style={{ width: 1, height: 20, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 1, height: "100%", backgroundColor: "var(--color-border)" }} />
              <div style={{
                position: "absolute", width: 6, height: 6, borderRadius: "50%",
                backgroundColor: "var(--color-text-primary)",
                animation: `flow-down 1.5s ease-in-out ${0.8 + i * 0.3}s infinite`,
              }} />
            </div>
          )}
        </div>
      ))}
      <style>{`
        @keyframes flow-down { 0% { top: 0; opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
      `}</style>
    </div>
  );
}


function IntegrationsVisual() {
  // All 8 icons placed statically on the top semicircle arc.
  // The entire group rotates CW; each icon counter-rotates to stay upright.
  const VW = 340, VH = 180;
  const CX = 170, CY = VH; // center at bottom edge so only top half is visible
  const R = 130;
  const DUR = 28; // seconds per full revolution
  const N = 8;

  const icons = [
    { label: "Slack", paths: [
      { d: "M8.5 15.5a2 2 0 1 1-2-2h2v2z", f: "#E01E5A" },
      { d: "M9.5 15.5a2 2 0 0 1 4 0v5a2 2 0 0 1-4 0v-5z", f: "#E01E5A" },
      { d: "M11.5 8.5a2 2 0 1 1 2-2v2h-2z", f: "#36C5F0" },
      { d: "M11.5 9.5a2 2 0 0 1 0 4H6.5a2 2 0 0 1 0-4h5z", f: "#36C5F0" },
      { d: "M18.5 11.5a2 2 0 1 1-2 2v-2h2z", f: "#2EB67D" },
      { d: "M17.5 11.5a2 2 0 0 1 0-4h5a2 2 0 0 1 0 4h-5z", f: "#2EB67D" },
      { d: "M15.5 17.5a2 2 0 0 1-4 0v-5a2 2 0 0 1 4 0v5z", f: "#ECB22E" },
    ]},
    { label: "GitHub", paths: [{ d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z", f: "#24292E" }]},
    { label: "Figma", paths: [
      { d: "M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z", f: "#0ACF83" },
      { d: "M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z", f: "#A259FF" },
      { d: "M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z", f: "#F24E1E" },
      { d: "M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z", f: "#FF7262" },
      { d: "M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z", f: "#1ABCFE" },
    ]},
    { label: "Linear", paths: [{ d: "M2.049 12.805A10.003 10.003 0 0 0 11.195 21.95l-9.146-9.146zM2 12c0-.428.026-.85.076-1.264L11.264 21.924A10.003 10.003 0 0 1 2 12zm.56-3.067L15.067 21.44a10.027 10.027 0 0 1-2.073.485L2.075 11.006a10.029 10.029 0 0 1 .485-2.073zM4.078 5.93 18.07 19.922a10.002 10.002 0 0 1-1.29.878L3.2 7.22a9.998 9.998 0 0 1 .878-1.29zm2.261-2.27L19.34 16.66a9.984 9.984 0 0 1-.91.97L5 6.9a9.984 9.984 0 0 1 .97-.91zM9 3.198l11.8 11.8a10.001 10.001 0 0 1-.487 2.074L7.125 3.686A10 10 0 0 1 9 3.198zm3.007-.122A9.999 9.999 0 0 1 22 12c0 .428-.026.85-.076 1.264L12.735 4.025c.091.01.181.02.272.051z", f: "#5E6AD2" }]},
    { label: "Notion", paths: [{ d: "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 2.099c-.42-.326-.981-.7-2.055-.607L3.01 2.445c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933z", f: "#191919" }]},
    { label: "Jira", paths: [
      { d: "M11.975 2.006 5.667 8.314l3.334 3.333 2.974-2.975 5.975 5.975L21.258 11.3z", f: "#2684FF", o: 0.7 },
      { d: "M11.975 8.642l-3.334 3.333L11.975 15.308l3.334-3.333z", f: "#0052CC" },
      { d: "M11.975 21.994l6.308-6.308-3.334-3.333-2.974 2.975-5.975-5.975L2.692 12.7z", f: "#2684FF", o: 0.7 },
    ]},
    { label: "Loom", paths: [
      { d: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z", f: "#625DF5", o: 0.3 },
      { d: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", f: "#625DF5" },
    ]},
    { label: "Zapier", paths: [{ d: "M14.5 2h-5L7 7H2l3.5 5L2 17h5l2.5 5h5l2.5-5H22l-3.5-5L22 7h-5z", f: "#FF4A00" }]},
  ];

  // Duplicate icons to 16 so exactly 8 fill the visible semicircle at all times
  const allIcons = [...icons, ...icons];
  const TOTAL = allIcons.length; // 16
  // Full circle path — center at bottom edge, only top half visible
  const circPath = `M ${CX+R},${CY} A ${R},${R} 0 1 0 ${CX-R},${CY} A ${R},${R} 0 1 0 ${CX+R},${CY}`;

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ display: "block", overflow: "hidden" }}>
      <defs>
        <path id="intOrbit" d={circPath} />
        <linearGradient id="intFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="white" stopOpacity="0" />
          <stop offset="10%"  stopColor="white" stopOpacity="1" />
          <stop offset="90%"  stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="intMask">
          <rect x="0" y="0" width={VW} height={VH} fill="url(#intFade)" />
        </mask>
      </defs>

      {/* Dashed arc guide */}
      <path d={`M ${CX - R},${CY} A ${R},${R} 0 1 1 ${CX + R},${CY}`}
        fill="none" stroke="#E5E3DC" strokeWidth="1" strokeDasharray="4 6" />

      <g mask="url(#intMask)">
        {allIcons.map((icon, i) => (
          <g key={i}>
            <animateMotion
              dur={`${DUR}s`}
              repeatCount="indefinite"
              begin={`${-(i / TOTAL) * DUR}s`}
              rotate="none"
            >
              <mpath href="#intOrbit" />
            </animateMotion>
            <g transform="translate(-12,-12)">
              <rect x="1" y="1" width="22" height="22" rx="7"
                fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.2" />
              <svg x="3" y="3" viewBox="0 0 24 24" width="18" height="18">
                {icon.paths.map((p, j) => <path key={j} d={p.d} fill={p.f} opacity={p.o ?? 1} />)}
              </svg>
              <text x="12" y="34" textAnchor="middle" fontSize="7" fontWeight="600"
                fill="#9E9C96" letterSpacing="0.04em">{icon.label}</text>
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
