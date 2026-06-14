"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Product", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
      >
        <div
          style={{
            maxWidth: scrolled ? "1080px" : "100%",
            margin: scrolled ? "12px auto" : "0",
            borderRadius: scrolled ? "14px" : "0",
            backgroundColor: scrolled ? "rgba(250,250,248,0.92)" : "transparent",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            border: scrolled ? "1px solid rgba(229,227,220,0.8)" : "none",
            boxShadow: scrolled ? "0 2px 20px rgba(15,15,14,0.06)" : "none",
            padding: scrolled ? "0 24px" : "0 40px",
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: scrolled ? "52px" : "72px",
              transition: "height 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Logo */}
            <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: "var(--color-text-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="2" y="2" width="4" height="4" fill="white" />
                  <rect x="8" y="2" width="4" height="4" fill="white" opacity="0.6" />
                  <rect x="2" y="8" width="4" height="4" fill="white" opacity="0.4" />
                  <rect x="8" y="8" width="4" height="4" fill="white" />
                </svg>
              </div>
              <span style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>
                Meridian
              </span>
            </a>

            {/* Desktop nav */}
            <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden-mobile">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    position: "relative",
                    padding: "6px 12px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 450,
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                    transition: "color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-surface)"; (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)"; }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="hidden-mobile">
              <a href="#" style={{ padding: "8px 14px", fontSize: 14, color: "var(--color-text-secondary)", textDecoration: "none", borderRadius: 8 }}>
                Sign in
              </a>
              <a
                href="#pricing"
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  backgroundColor: "var(--color-text-primary)",
                  color: "#FAFAF8",
                  textDecoration: "none",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
              >
                Get started
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ display: "none", flexDirection: "column", gap: 6, padding: 8, background: "none", border: "none", cursor: "pointer" }}
              className="show-mobile"
              aria-label="Toggle menu"
            >
              <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }} style={{ display: "block", width: 20, height: 1, backgroundColor: "var(--color-text-primary)", transformOrigin: "center" }} />
              <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} style={{ display: "block", width: 20, height: 1, backgroundColor: "var(--color-text-primary)" }} />
              <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} style={{ display: "block", width: 20, height: 1, backgroundColor: "var(--color-text-primary)", transformOrigin: "center" }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 72,
              left: 16,
              right: 16,
              zIndex: 40,
              borderRadius: 16,
              padding: 16,
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 8px 40px rgba(15,15,14,0.12)",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  style={{ padding: "12px 16px", borderRadius: 12, fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)", textDecoration: "none" }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--color-border)", display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="#pricing" onClick={() => setMobileOpen(false)} style={{ padding: "12px 16px", textAlign: "center", borderRadius: 12, fontSize: 14, fontWeight: 600, backgroundColor: "var(--color-text-primary)", color: "#FAFAF8", textDecoration: "none" }}>
                Get started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </>
  );
}
