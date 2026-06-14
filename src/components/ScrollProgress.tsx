"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "2px",
        width: "100%",
        background: "var(--color-text-primary)",
        transformOrigin: "left center",
        transform: "scaleX(0)",
        zIndex: 9997,
        pointerEvents: "none",
      }}
    />
  );
}
