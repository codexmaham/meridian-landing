"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    // Show cursors
    gsap.set([dot, ring], { opacity: 0 });

    let visible = false;

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        visible = true;
      }
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "none" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.45, ease: "power2.out" });
    };

    const onEnterLink = () => {
      gsap.to(ring, { scale: 1.7, borderColor: "var(--color-accent-warm)", duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, borderColor: "var(--color-text-primary)", duration: 0.35, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.25 });
    };

    const bindHovers = () => {
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };

    window.addEventListener("mousemove", onMove);
    bindHovers();

    const observer = new MutationObserver(bindHovers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
