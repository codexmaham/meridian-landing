"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import AnimatedText from "./AnimatedText";

const steps = [
  { num: "01", title: "Connect your tools", description: "Link your existing stack in under five minutes. Meridian syncs data from Slack, GitHub, Figma, Jira, and 200+ other tools automatically.", detail: "Zero configuration, instant sync" },
  { num: "02", title: "Set up your workspace", description: "Customize your team's workflow with templates built for product, engineering, design, and ops teams. Adapt them or start fresh.", detail: "30+ workflow templates included" },
  { num: "03", title: "Invite your team", description: "Bring in your whole organization. Set roles, permissions, and notifications so everyone gets exactly what they need.", detail: "Unlimited members on every plan" },
  { num: "04", title: "Ship faster together", description: "With everything in sync, your team moves faster. Less status meetings, fewer dropped balls, more time building.", detail: "Average 2.4x velocity increase" },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section ref={ref} id="how-it-works" className="section-pad" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", maxWidth: 520, margin: "0 auto 64px" }}
        >
          <p className="label-tag" style={{ marginBottom: 16 }}>How it works</p>
          <AnimatedText as="h2" className="display-lg">From setup to shipping in an afternoon</AnimatedText>
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
          {/* Step list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {steps.map((step, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setActive(i)}
                style={{
                  textAlign: "left", padding: 20, borderRadius: 16,
                  border: `1px solid ${active === i ? "var(--color-text-primary)" : "var(--color-border)"}`,
                  backgroundColor: active === i ? "var(--color-bg)" : "transparent",
                  cursor: "pointer", transition: "all 0.25s",
                  background: active === i ? "var(--color-bg)" : "transparent",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: active === i ? "var(--color-text-primary)" : "var(--color-text-muted)", marginTop: 2, flexShrink: 0 }}>{step.num}</span>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: active === i ? 8 : 0, color: active === i ? "var(--color-text-primary)" : "var(--color-text-secondary)", transition: "all 0.2s" }}>
                      {step.title}
                    </h3>
                    <AnimatePresence>
                      {active === i && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                          <p className="body-sm" style={{ marginBottom: 12 }}>{step.description}</p>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 500, backgroundColor: "var(--color-surface)", color: "var(--color-text-muted)", border: "1px solid var(--color-border)" }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#22C55E", display: "inline-block" }} />
                            {step.detail}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Visual panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ position: "sticky", top: 96, borderRadius: 16, overflow: "hidden", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)", minHeight: 360 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, minHeight: 360 }}
              >
                <StepVisual step={active} />
                <div style={{ textAlign: "center" }}>
                  <h4 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8 }}>{steps[active].title}</h4>
                  <p style={{ fontSize: 13, color: "var(--color-text-muted)", maxWidth: 260, margin: "0 auto" }}>{steps[active].detail}</p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {steps.map((_, i) => (
                    <button key={i} onClick={() => setActive(i)} style={{ borderRadius: 999, border: "none", cursor: "pointer", height: 6, width: active === i ? 20 : 6, backgroundColor: active === i ? "var(--color-text-primary)" : "var(--color-border)", transition: "all 0.3s" }} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          #how-it-works .container > div:last-child { grid-template-columns: 1fr !important; }
          #how-it-works .container > div:last-child > div:last-child { position: static !important; display: none; }
        }
      `}</style>
    </section>
  );
}

function StepVisual({ step }: { step: number }) {
  if (step === 0) return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
      {["Slack","GitHub","Figma","Notion","Linear","Jira"].map((n,i) => (
        <div key={i} style={{ padding: "8px 10px", borderRadius: 8, textAlign: "center", fontSize: 11, fontWeight: 500, backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
          {n}<div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#22C55E", margin: "4px auto 0" }} />
        </div>
      ))}
    </div>
  );
  if (step === 1) return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 260 }}>
      {["Product roadmap","Engineering sprints","Design reviews"].map((n,i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 12, backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
            {["◈","▣","◉"][i]}
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>{n}</span>
        </div>
      ))}
    </div>
  );
  if (step === 2) return (
    <div style={{ display: "flex" }}>
      {[{ i: "SM", c: "#C8622A" },{ i: "AP", c: "#1A5276" },{ i: "RK", c: "#2D6A4F" },{ i: "ML", c: "#7D3C98" },{ i: "+8", c: "#5C5B57" }].map((u, idx) => (
        <div key={idx} style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: u.c, color: "white", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid var(--color-bg)", marginLeft: idx > 0 ? -12 : 0, zIndex: 5 - idx, position: "relative" }}>{u.i}</div>
      ))}
    </div>
  );
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.05em", color: "var(--color-text-primary)", lineHeight: 1 }}>2.4×</div>
      <div style={{ marginTop: 8, display: "inline-block", padding: "4px 12px", borderRadius: 999, backgroundColor: "rgba(34,197,94,0.12)", color: "#16A34A", fontWeight: 600, fontSize: 12 }}>Velocity increase</div>
    </div>
  );
}
