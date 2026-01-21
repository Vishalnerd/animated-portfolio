"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function UnrollTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const projectListRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Check for touch capability to adjust scrub behavior
      const isTouch = ScrollTrigger.isTouch;
      const isMobile = window.innerWidth < 768;

      // 1. Calculate travel distance based on content height
      // We do this inside a refresh listener to handle mobile orientation changes
      const getScrollAmount = () => {
        if (!projectListRef.current) return 0;
        const totalHeight = projectListRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        return -(totalHeight - viewportHeight + (isMobile ? 80 : 150));
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // Shorter end distance on mobile to prevent "endless scrolling" feel
          end: isMobile ? "+=200%" : "+=350%",
          scrub: isTouch ? 0.6 : 1, // Snappier scrub for touch devices
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Crucial for mobile height recalculations
        },
      });

      // 1. The Curtain Slide
      tl.to(
        paperRef.current,
        {
          yPercent: -105,
          ease: "power1.inOut", // Slightly smoother entry than "none"
        },
        0,
      );

      // 2. The Project Scroll
      tl.to(
        projectListRef.current,
        {
          y: getScrollAmount,
          ease: "none",
        },
        0.2,
      ); // Small delay so the paper starts moving first

      // 3. Optimized Reveal
      // On mobile, we reduce the movement distance to save GPU cycles
      tl.from(
        ".project-reveal-item",
        {
          opacity: 0,
          y: isMobile ? 30 : 60,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          // Performance optimization: prevent animation if not in viewport
          lazy: true,
        },
        0.4,
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#121212] touch-none-action-pan-y"
    >
      {/* LAYER 1: WORKBENCH */}
      <div className="absolute inset-0 z-0 overflow-hidden pt-16 md:pt-32">
        {/* Simplified Background Grid for performance */}
        <div className="absolute inset-0 opacity-[0.03] md:opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:50px_50px]" />

        <div
          ref={projectListRef}
          className="max-w-5xl mx-auto px-4 md:px-6 relative z-10 will-change-transform"
        >
          <div className="text-center mb-10 md:mb-24">
            <h2 className="text-4xl md:text-9xl font-sketch text-white/5 uppercase tracking-tighter">
              The Execution
            </h2>
          </div>
          <div className="flex flex-col gap-16 md:gap-40 pb-20 md:pb-40">
            {children}
          </div>
        </div>
      </div>

      {/* LAYER 2: PAPER CURTAIN */}
      <div
        ref={paperRef}
        className="absolute inset-0 z-10 border-b-2 md:border-b-4 border-ink/10 shadow-2xl flex flex-col items-center justify-center bg-paper px-6 will-change-transform"
      >
        <div className="text-center space-y-4 md:space-y-8">
          <h2 className="text-4xl md:text-9xl font-sketch text-ink italic opacity-25">
            End of the Drafts.
          </h2>
          <div className="flex flex-col items-center gap-4">
            <p className="font-mono text-blueprint animate-pulse uppercase tracking-[0.2em] text-[10px] md:text-sm">
              Scroll to see projects
            </p>
            <div className="w-px h-16 md:h-32 bg-gradient-to-b from-blueprint to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
