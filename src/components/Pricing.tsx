"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import AnimatedText from "./AnimatedText";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function TiltCard({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      gsap.to(el, { rotateY: x * 6, rotateX: -y * 6, transformPerspective: 900, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return <div ref={ref} style={{ ...style, transformStyle: "preserve-3d" }} className={className}>{children}</div>;
}

const plans = [
  { name: "Starter", monthly: 0, annual: 0, desc: "For small teams just getting started.", features: ["Up to 5 members","3 active projects","Basic analytics","7-day history","Community support"], cta: "Start for free", featured: false },
  { name: "Pro", monthly: 24, annual: 18, desc: "For growing teams that need more power.", features: ["Unlimited members","Unlimited projects","Advanced analytics","90-day history","Automation builder","Priority support","Custom integrations"], cta: "Start free trial", featured: true },
  { name: "Enterprise", monthly: null, annual: null, desc: "For large orgs with custom requirements.", features: ["Everything in Pro","SSO & SCIM","Audit logs","Custom contracts","Dedicated CSM","SLA guarantees","On-premise option"], cta: "Contact sales", featured: false },
];

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [annual, setAnnual] = useState(true);

  return (
    <section ref={ref} id="pricing" className="section-pad">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: "center", maxWidth: 480, margin: "0 auto 48px" }}>
          <p className="label-tag" style={{ marginBottom: 16 }}>Pricing</p>
          <AnimatedText as="h2" className="display-lg" style={{ marginBottom: 16 }}>Simple, honest pricing</AnimatedText>
          <p className="body-lg">No hidden fees. Cancel anytime.</p>
        </motion.div>

        {/* Toggle */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 48 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: annual ? "var(--color-text-muted)" : "var(--color-text-primary)" }}>Monthly</span>
          <button onClick={() => setAnnual(!annual)} style={{ position: "relative", width: 44, height: 24, borderRadius: 999, border: "none", cursor: "pointer", backgroundColor: annual ? "var(--color-text-primary)" : "var(--color-border)", transition: "background 0.3s", padding: 0 }}>
            <span style={{ position: "absolute", top: 4, left: 4, width: 16, height: 16, borderRadius: "50%", backgroundColor: "#FAFAF8", transform: annual ? "translateX(20px)" : "translateX(0)", transition: "transform 0.3s", display: "block" }} />
          </button>
          <span style={{ fontSize: 14, fontWeight: 500, color: annual ? "var(--color-text-primary)" : "var(--color-text-muted)" }}>Annual</span>
          <AnimatePresence>
            {annual && (
              <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999, backgroundColor: "rgba(34,197,94,0.12)", color: "#16A34A" }}>
                Save 25%
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "start" }}>
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
            <TiltCard
              style={{
                position: "relative", borderRadius: 16, padding: 28,
                border: `1px solid ${plan.featured ? "var(--color-text-primary)" : "var(--color-border)"}`,
                backgroundColor: plan.featured ? "var(--color-text-primary)" : "var(--color-bg)",
                display: "flex", flexDirection: "column",
              }}
            >
              {plan.featured && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, backgroundColor: "#FAFAF8", color: "var(--color-text-primary)", border: "1px solid var(--color-border)", whiteSpace: "nowrap" }}>
                  Most popular
                </div>
              )}

              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 6px 0", color: plan.featured ? "#FAFAF8" : "var(--color-text-primary)" }}>{plan.name}</h3>
                <p style={{ fontSize: 13, color: plan.featured ? "rgba(250,250,248,0.6)" : "var(--color-text-muted)", margin: 0 }}>{plan.desc}</p>
              </div>

              <div style={{ marginBottom: 24 }}>
                {plan.monthly !== null ? (
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                    <AnimatePresence mode="wait">
                      <motion.span key={annual ? "a" : "m"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} style={{ fontSize: 42, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: plan.featured ? "#FAFAF8" : "var(--color-text-primary)" }}>
                        {plan.monthly === 0 ? "Free" : `$${annual ? plan.annual : plan.monthly}`}
                      </motion.span>
                    </AnimatePresence>
                    {plan.monthly > 0 && <span style={{ fontSize: 13, color: plan.featured ? "rgba(250,250,248,0.5)" : "var(--color-text-muted)", marginBottom: 4 }}>/mo</span>}
                  </div>
                ) : (
                  <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.04em", color: "var(--color-text-primary)" }}>Custom</span>
                )}
              </div>

              <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32, flex: 1, listStyle: "none", padding: 0, margin: "0 0 32px 0" }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                      <circle cx="7" cy="7" r="6" fill={plan.featured ? "rgba(250,250,248,0.2)" : "var(--color-text-primary)"} />
                      <path d="M4.5 7l2 2 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ color: plan.featured ? "rgba(250,250,248,0.8)" : "var(--color-text-secondary)" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a href="#" style={{ display: "block", padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 600, textAlign: "center", textDecoration: "none", transition: "opacity 0.15s", backgroundColor: plan.featured ? "#FAFAF8" : "var(--color-text-primary)", color: plan.featured ? "var(--color-text-primary)" : "#FAFAF8" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
              >
                {plan.cta}
              </a>
            </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} style={{ textAlign: "center", fontSize: 13, color: "var(--color-text-muted)", marginTop: 32 }}>
          All plans include 14-day free trial · No credit card required · SOC 2 Type II certified
        </motion.p>
      </div>

      <style>{`
        @media (max-width: 767px) { #pricing .container > div:nth-child(3) { grid-template-columns: 1fr !important; } }
        @media (min-width: 768px) and (max-width: 1023px) { #pricing .container > div:nth-child(3) { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
