"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PageFlipWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topPageRef = useRef<HTMLDivElement>(null);
  const curlRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!topPageRef.current || !curlRef.current) return;

      // Timeline for the peel effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Peel the top page (Polygon points move to top-left)
      tl.to(
        topPageRef.current,
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 100%)",
          ease: "none",
        },
        0,
      );

      // 2. Sync the Curl Backside
      tl.fromTo(
        curlRef.current,
        {
          xPercent: 0,
          yPercent: 0,
          clipPath: "polygon(100% 100%, 100% 100%, 100% 100%)",
        },
        {
          xPercent: -100,
          yPercent: -100,
          clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
          ease: "none",
        },
        0,
      );

      // 3. Optional: Fade out the top page elements early for clarity
      tl.to(".peel-content", { opacity: 0, duration: 0.2 }, 0);
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-ink shadow-inner"
    >
      {/* REVEAL LAYER (Next Content) */}
      <div className="absolute inset-0 z-0 notebook-bg bg-paper">
        {/* We remove 'overflow-y-auto' here to let the main window handle scroll 
            after the pinning is finished for a smoother experience */}
        <div className="h-full w-full">{children}</div>
      </div>

      {/* PEELING PAGE */}
      <div
        ref={topPageRef}
        className="absolute inset-0 z-20 bg-paper border-r border-black/5"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        <div className="peel-content flex flex-col items-center justify-center h-full space-y-6 px-4">
          <h2 className="text-4xl md:text-6xl font-sketch text-ink">
            Chapter One: Complete.
          </h2>
          <div className="flex flex-col items-center gap-2">
            <p className="font-mono text-blueprint animate-bounce">
              Scroll to flip
            </p>
            <div className="w-px h-12 bg-blueprint/30" />
          </div>
        </div>
      </div>

      {/* THE 3D CURL */}
      <div
        ref={curlRef}
        className="absolute bottom-0 right-0 w-full h-full z-30 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0) 48%, #e5e5e1 50%, #ffffff 52%, #d1d1cc 100%)",
          filter: "drop-shadow(-15px 15px 20px rgba(0,0,0,0.15))",
        }}
      />
    </div>
  );
}
