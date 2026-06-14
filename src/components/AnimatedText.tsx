"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Tag = "h1" | "h2" | "h3" | "h4" | "p";

interface Props {
  children: string;
  as?: Tag;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  /** If true, trigger immediately (no scroll) */
  immediate?: boolean;
}

export default function AnimatedText({ children, as: Tag = "h2", className, style, delay = 0, immediate = false }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Wrap each word in a clip container
    const words = children.split(" ");
    el.innerHTML = words
      .map(
        (w) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;line-height:1.15"><span class="at-word" style="display:inline-block;will-change:transform">${w}</span></span>`
      )
      .join(" ");

    const wordEls = el.querySelectorAll<HTMLElement>(".at-word");

    const anim = gsap.fromTo(
      wordEls,
      { y: "108%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.85,
        stagger: 0.065,
        ease: "power3.out",
        delay,
        scrollTrigger: immediate
          ? undefined
          : {
              trigger: el,
              start: "top 88%",
            },
      }
    );

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [children, delay, immediate]);

  // @ts-expect-error dynamic tag
  return <Tag ref={ref} className={className} style={style} />;
}
