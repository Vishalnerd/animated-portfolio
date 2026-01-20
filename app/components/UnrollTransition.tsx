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
      const isMobile = window.innerWidth < 768;
      const scrollDistance = isMobile ? "+=250%" : "+=400%";
      const scrubValue = isMobile ? 0.5 : 1; // Faster scrub on mobile for smoother feel

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: scrollDistance,
          scrub: scrubValue,
          pin: true,
          pinSpacing: true,
        },
      });

      // 1. The Paper Slides Up COMPLETELY (Flat reveal)
      tl.to(
        paperRef.current,
        {
          yPercent: -105,
          ease: "none",
          duration: 1,
        },
        0,
      );

      // 2. The Projects Scroll Up
      tl.to(
        projectListRef.current,
        {
          y: (index, target) => {
            const totalHeight = target.offsetHeight;
            const viewportHeight = window.innerHeight;
            const padding = isMobile ? 100 : 200;
            return -(totalHeight - viewportHeight + padding);
          },
          ease: "none",
          duration: 2,
        },
        0.5,
      );

      // 3. Staggered reveal for cards - simplified for mobile
      tl.from(
        ".project-reveal-item",
        {
          opacity: 0,
          y: isMobile ? 50 : 100,
          stagger: isMobile ? 0.2 : 0.3,
          duration: isMobile ? 0.5 : 0.8,
          ease: "power2.out",
        },
        0.6,
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden notebook-bg"
    >
      {/* LAYER 1: THE WORKBENCH (Fixed Background) */}
      <div className="absolute inset-0 z-0 overflow-hidden pt-20 md:pt-32">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:50px_50px]" />

        {/* Project List: Animated via GSAP y-transform */}
        <div
          ref={projectListRef}
          className="max-w-5xl mx-auto px-4 md:px-6 relative z-10 will-change-transform"
        >
          <div className="text-center mb-12 md:mb-24">
            <h2 className="text-4xl md:text-6xl lg:text-9xl font-sketch text-white/10 uppercase tracking-tighter">
              The Execution
            </h2>
          </div>
          <div className="flex flex-col gap-20 md:gap-40 pb-20 md:pb-40">
            {children}
          </div>
        </div>
      </div>

      {/* LAYER 2: THE PAPER SHEET (The Curtain) */}
      <div
        ref={paperRef}
        className="absolute top-0 left-0 w-full h-full z-10 border-b-4 border-ink/10 shadow-2xl flex flex-col items-center justify-center overflow-hidden bg-paper px-4"
      >
        <div className="text-center space-y-6 md:space-y-8">
          <h2 className="text-4xl md:text-6xl lg:text-9xl font-sketch text-ink italic opacity-30">
            End of the Drafts.
          </h2>
          <div className="flex flex-col items-center gap-4 md:gap-6">
            <p className="font-mono text-blueprint animate-pulse uppercase tracking-[0.2em] md:tracking-[0.4em] text-xs md:text-sm">
              Scroll to see projects
            </p>
            <div className="w-px h-20 md:h-32 bg-gradient-to-b from-blueprint to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
