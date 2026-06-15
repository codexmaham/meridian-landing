"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "./AnimatedText";

const stats = [
  { value: 12000, suffix: "+", label: "Teams worldwide", prefix: "" },
  { value: 2.4, suffix: "×", label: "Avg. velocity increase", prefix: "" },
  { value: 98, suffix: "%", label: "Customer retention rate", prefix: "" },
  { value: 4.9, suffix: "/5", label: "Average review score", prefix: "" },
];

/* Odometer-style digit roller — 10 digits (0-9), each 1em tall = 10em total.
   To show digit N, translate up by N×10% of the 10em column = N×1em. */
function OdometerDigit({ digit, delay }: { digit: string; delay: number }) {
  const targetIndex = /^\d$/.test(digit) ? Number(digit) : 0;

  return (
    <span style={{ display: "inline-block", overflow: "hidden", height: "1em", verticalAlign: "top" }}>
      <motion.span
        style={{ display: "flex", flexDirection: "column" }}
        initial={{ y: 0 }}
        animate={{ y: `-${targetIndex * 10}%` }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {["0","1","2","3","4","5","6","7","8","9"].map((d) => (
          <span key={d} style={{ display: "block", height: "1em", lineHeight: 1, flexShrink: 0 }}>{d}</span>
        ))}
      </motion.span>
      <span style={{ visibility: "hidden", height: "1em", display: "block" }}>{digit}</span>
    </span>
  );
}

function AnimatedNumber({ value, suffix, prefix, delay = 0 }: { value: number; suffix: string; prefix: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (inView && !triggered) setTriggered(true);
  }, [inView, triggered]);

  const formatted = Number.isInteger(value) ? value.toLocaleString() : value.toFixed(1);

  return (
    <div ref={ref} style={{ lineHeight: 1 }}>
      {prefix}
      {triggered ? (
        <span style={{ display: "inline-flex", alignItems: "baseline" }}>
          {formatted.split("").map((char, i) => {
            if (/\d/.test(char)) {
              return <OdometerDigit key={i} digit={char} delay={delay + i * 0.06} />;
            }
            return <span key={i}>{char}</span>;
          })}
          {suffix}
        </span>
      ) : (
        <span style={{ opacity: 0 }}>{formatted}{suffix}</span>
      )}
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-pad">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ borderRadius: 24, padding: "clamp(40px, 6vw, 72px) clamp(24px, 5vw, 56px)", backgroundColor: "var(--color-text-primary)", overflow: "hidden", position: "relative" }}
        >
          {/* Subtle grid pattern inside dark panel */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ textAlign: "center", marginBottom: 56, position: "relative" }}
          >
            <AnimatedText as="h2" style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 600, letterSpacing: "-0.03em", color: "#FAFAF8", margin: 0 }}>Numbers that speak for themselves</AnimatedText>
          </motion.div>

          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, position: "relative" }}>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                style={{ textAlign: "center", padding: "24px 0" }}
              >
                {/* Divider between stats */}
                {i > 0 && (
                  <div style={{ position: "absolute", left: 0, top: "10%", height: "80%", width: 1, backgroundColor: "rgba(255,255,255,0.08)" }} />
                )}
                <div style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, letterSpacing: "-0.04em", color: "#FAFAF8", marginBottom: 10 }}>
                  <AnimatedNumber value={s.value} suffix={s.suffix} prefix={s.prefix} delay={0.3 + i * 0.1} />
                </div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(250,250,248,0.45)", margin: 0, letterSpacing: "0.01em" }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  );
}
