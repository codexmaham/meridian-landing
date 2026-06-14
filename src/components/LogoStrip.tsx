"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const logos = ["Acme Corp", "Vertex", "Prism AI", "Northstar", "Solaris", "Halo Labs", "Orbit", "Cascade", "Luminary", "Apex IO"];

export default function LogoStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "64px 0", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", overflow: "hidden" }}>
      <motion.p
        initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 32 }}
      >
        Trusted by world-class teams
      </motion.p>

      <div style={{ position: "relative", display: "flex", overflow: "hidden", maskImage: "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)" }}>
        <motion.div
          style={{ display: "flex", alignItems: "center", gap: 0 }}
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...logos, ...logos].map((name, i) => (
            <div key={i} style={{ flexShrink: 0, padding: "0 32px", height: 36, display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-muted)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
                {name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
