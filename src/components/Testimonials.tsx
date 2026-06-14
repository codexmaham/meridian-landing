"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "./AnimatedText";

const testimonials = [
  { quote: "We cut our weekly sync meetings from four to one. Meridian gives everyone the context they used to get from those meetings, automatically.", name: "Sarah Mitchell", role: "VP of Engineering", company: "Northstar AI", initials: "SM", color: "#C8622A" },
  { quote: "I've tried every productivity tool on the market. Meridian is the first one that actually changed how we work, not just where we work.", name: "Alex Park", role: "Co-founder & CEO", company: "Prism Labs", initials: "AP", color: "#1A5276" },
  { quote: "Our design-to-dev handoff went from a week of back-and-forth to same-day delivery. The Figma integration alone is worth the price.", name: "Maya Chen", role: "Head of Design", company: "Vertex Studio", initials: "MC", color: "#2D6A4F" },
  { quote: "We onboard new engineers in half the time now. The documentation stays in sync with the actual work instead of living in someone's Notion graveyard.", name: "Jordan Reed", role: "Engineering Manager", company: "Cascade Systems", initials: "JR", color: "#7D3C98" },
  { quote: "Switching to Meridian was the best decision we made in Q2. Our team actually looks forward to using it — that's never happened before.", name: "Priya Sharma", role: "COO", company: "Orbit Health", initials: "PS", color: "#B7791F" },
  { quote: "The automation builder is genuinely powerful. We built workflows in an afternoon that would have taken a developer a week to code.", name: "Tom Eriksen", role: "Product Director", company: "Solaris Group", initials: "TE", color: "#1A6B4A" },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-pad" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", maxWidth: 480, margin: "0 auto 64px" }}
        >
          <p className="label-tag" style={{ marginBottom: 16 }}>Testimonials</p>
          <AnimatedText as="h2" className="display-lg">Loved by teams that ship</AnimatedText>
        </motion.div>

        {/* 3-column masonry */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "start" }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{ padding: 24, borderRadius: 16, backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", gap: 16 }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: 2 }}>
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#F59E0B"><path d="M7 1l1.63 3.3 3.64.53-2.64 2.57.62 3.63L7 9.25l-3.25 1.78.62-3.63L1.73 4.83l3.64-.53L7 1z" /></svg>
                ))}
              </div>
              <p style={{ fontSize: 15, color: "var(--color-text-primary)", lineHeight: 1.65, margin: 0 }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 12, borderTop: "1px solid var(--color-border)", marginTop: "auto" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: t.color, color: "white", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{t.initials}</div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 2px 0" }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: "var(--color-text-muted)", margin: 0 }}>{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) { section[style*="--color-surface"] .container > div:last-child { grid-template-columns: 1fr !important; } }
        @media (min-width: 768px) and (max-width: 1023px) { section[style*="--color-surface"] .container > div:last-child { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}
