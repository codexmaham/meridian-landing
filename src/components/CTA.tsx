"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="about" className="section-pad">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ position: "relative", overflow: "hidden", borderRadius: 24, padding: "80px 48px", textAlign: "center", backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          {/* Grid overlay */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)", backgroundSize: "48px 48px", opacity: 0.5 }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.1 }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, marginBottom: 32, backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#22C55E", display: "inline-block" }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)" }}>Join 12,000+ teams already on Meridian</span>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }} style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 600, letterSpacing: "-0.04em", maxWidth: 560, margin: "0 auto 20px" }}>
              Your team deserves better tools
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }} style={{ fontSize: 18, color: "var(--color-text-secondary)", maxWidth: 400, margin: "0 auto 40px", lineHeight: 1.6 }}>
              Start your free trial today. No credit card. No commitment. Just a better way to work.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 }} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <a href="#pricing" className="btn-primary" style={{ padding: "14px 32px", fontSize: 16 }}>Start for free</a>
              <a href="#" className="btn-ghost" style={{ fontSize: 15 }}>
                Schedule a demo
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 24, marginTop: 40 }}>
              {[{ icon: "🔒", text: "SOC 2 Type II" },{ icon: "🛡️", text: "GDPR compliant" },{ icon: "⚡", text: "99.9% uptime SLA" }].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{b.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-muted)" }}>{b.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
