"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

const words = ["workflows", "insights", "decisions", "velocity", "clarity"];

function AnimatedWord() {
  const containerRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let index = 0;
    const el = containerRef.current;
    if (!el) return;
    el.textContent = words[0];
    const interval = setInterval(() => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(-8px)";
      setTimeout(() => {
        index = (index + 1) % words.length;
        el.textContent = words[index];
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 280);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      ref={containerRef}
      style={{
        display: "inline-block",
        transition: "opacity 0.28s ease, transform 0.28s ease",
        color: "var(--color-text-primary)",
      }}
    />
  );
}

function MagneticBtn({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.28;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.28;
      gsap.to(el, { x, y, duration: 0.35, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.55)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);
  return <a ref={ref} href={href} className={className}>{children}</a>;
}

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } },
  item: { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: 120,
        paddingBottom: 80,
      }}
    >
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
        backgroundSize: "64px 64px", opacity: 0.4,
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 100%)",
      }} />

      <FloatingOrb x={-280} y={-100} size={320} delay={0} />
      <FloatingOrb x={260} y={80} size={240} delay={1.2} />
      <FloatingOrb x={-60} y={180} size={180} delay={2.4} />

      <motion.div
        style={{ y, opacity, position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 20px", maxWidth: 960, margin: "0 auto", width: "100%" }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 999, marginBottom: 32,
            backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#22C55E", display: "inline-block" }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)" }}>
            Now in public beta — join 12,000+ teams
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={stagger.container} initial="hidden" animate="show" style={{ marginBottom: 24 }}>
          <motion.h1
            variants={stagger.item}
            style={{ fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--color-text-primary)", margin: 0 }}
          >
            One platform
          </motion.h1>
          <motion.div
            variants={stagger.item}
            style={{ fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--color-text-muted)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12 }}
          >
            <span>for your</span>
            <AnimatedWord />
          </motion.div>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{ maxWidth: 480, marginBottom: 40, fontSize: "clamp(16px, 2vw, 19px)", color: "var(--color-text-secondary)", lineHeight: 1.65, margin: "0 0 40px 0" }}
        >
          Meridian unifies your team&apos;s scattered tools into one intelligent workspace. Less switching, more shipping.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 8 }}
        >
          <MagneticBtn href="#pricing" className="btn-primary">Start for free</MagneticBtn>
          <MagneticBtn href="#how-it-works" className="btn-ghost">
            See how it works
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </MagneticBtn>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.75 }}
          style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 12 }}
        >
          <div style={{ display: "flex" }}>
            {["#C8622A","#2D6A4F","#1A5276","#7D3C98","#5C5B57"].map((color, i) => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: color, color: "white", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: i > 0 ? -8 : 0, border: "2px solid var(--color-bg)", position: "relative", zIndex: 5 - i }}>
                {["S","M","A","R","T"][i]}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", margin: 0 }}>
            <strong style={{ color: "var(--color-text-secondary)", fontWeight: 600 }}>4.9/5</strong> from 2,400+ reviews
          </p>
        </motion.div>
      </motion.div>

      {/* Dashboard preview */}
      <motion.div
        initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8 }}
        style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 960, margin: "64px auto 0", padding: "0 20px" }}
      >
        <DashboardPreview />
      </motion.div>
    </section>
  );
}

function FloatingOrb({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.div
      style={{
        position: "absolute", borderRadius: "50%", pointerEvents: "none",
        width: size, height: size,
        left: `calc(50% + ${x}px)`, top: `calc(40% + ${y}px)`,
        transform: "translate(-50%, -50%)",
        backgroundColor: "var(--color-surface)", filter: "blur(60px)", opacity: 0.7,
      }}
      animate={{ y: [0, -20, 0], scale: [1, 1.04, 1] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function DashboardPreview() {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)", boxShadow: "0 24px 80px rgba(15,15,14,0.10), 0 4px 16px rgba(15,15,14,0.06)" }}>
      {/* Window chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg)" }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28C840" }} />
        <div style={{ flex: 1, margin: "0 16px", padding: "4px 12px", borderRadius: 6, fontSize: 11, textAlign: "center", backgroundColor: "var(--color-surface)", color: "var(--color-text-muted)" }}>
          app.meridian.io/workspace
        </div>
      </div>

      {/* App layout */}
      <div style={{ display: "flex", minHeight: 380 }}>
        {/* Sidebar */}
        <div style={{ width: 200, borderRight: "1px solid var(--color-border)", padding: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          {[{ label: "Overview", active: true, icon: "▣" },{ label: "Projects", active: false, icon: "◈" },{ label: "Analytics", active: false, icon: "◎" },{ label: "Team", active: false, icon: "◉" },{ label: "Integrations", active: false, icon: "◌" }].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500, backgroundColor: item.active ? "var(--color-border)" : "transparent", color: item.active ? "var(--color-text-primary)" : "var(--color-text-muted)" }}>
              <span>{item.icon}</span>{item.label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: 20, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, alignContent: "start" }}>
          {[{ label: "Active Projects", value: "24", change: "+3" },{ label: "Team Velocity", value: "94%", change: "+12%" },{ label: "Avg. Cycle Time", value: "2.4d", change: "-0.8d" }].map((stat) => (
            <div key={stat.label} style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}>
              <p style={{ fontSize: 11, color: "var(--color-text-muted)", margin: "0 0 4px 0" }}>{stat.label}</p>
              <p style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.03em", margin: "0 0 4px 0" }}>{stat.value}</p>
              <p style={{ fontSize: 11, color: "#22C55E", margin: 0 }}>{stat.change} this week</p>
            </div>
          ))}

          {/* Activity feed */}
          <div style={{ gridColumn: "span 2", padding: 16, borderRadius: 12, backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}>
            <p style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-muted)", margin: "0 0 12px 0" }}>Recent activity</p>
            {[{ user: "Sarah M.", action: "completed design review", time: "2m ago", color: "#C8622A" },{ user: "Alex P.", action: "merged pull request #218", time: "14m ago", color: "#1A5276" },{ user: "Ryan K.", action: "updated project roadmap", time: "1h ago", color: "#2D6A4F" },{ user: "Mia L.", action: "left 3 comments on spec", time: "2h ago", color: "#7D3C98" }].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "8px 0", borderTop: i > 0 ? "1px solid var(--color-border)" : "none" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: item.color, color: "white", fontSize: 10, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.user[0]}</div>
                <div>
                  <p style={{ fontSize: 12, color: "var(--color-text-primary)", margin: "0 0 2px 0" }}><strong style={{ fontWeight: 600 }}>{item.user}</strong> {item.action}</p>
                  <p style={{ fontSize: 11, color: "var(--color-text-muted)", margin: 0 }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress ring */}
          <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <svg viewBox="0 0 80 80" width="72" height="72">
              <circle cx="40" cy="40" r="30" fill="none" stroke="var(--color-border)" strokeWidth="8" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="var(--color-text-primary)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${0.78 * 2 * Math.PI * 30} ${2 * Math.PI * 30}`} transform="rotate(-90 40 40)" />
              <text x="40" y="44" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--color-text-primary)">78%</text>
            </svg>
            <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)", margin: 0 }}>Sprint complete</p>
          </div>
        </div>
      </div>
    </div>
  );
}
