"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function FoldTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topFoldRef = useRef<HTMLDivElement>(null);
  const bottomFoldRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      // 3D Folding Animation
      tl.to(
        topFoldRef.current,
        {
          rotateX: -90,
          y: 50,
          opacity: 0,
          transformOrigin: "bottom",
          ease: "none",
        },
        0,
      ).fromTo(
        bottomFoldRef.current,
        { rotateX: 90, y: -50, opacity: 0 },
        { rotateX: 0, y: 0, opacity: 1, transformOrigin: "top", ease: "none" },
        0,
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative py-40 perspective-1000">
      {/* THE "EXITING" CONTENT (Top Half of the fold) */}
      <div
        ref={topFoldRef}
        className="text-center py-20 border-b-2 border-dashed border-ink/20"
      >
        <h2 className="text-5xl font-sketch opacity-30 italic">
          End of the Drafts
        </h2>
        <p className="font-mono text-xs mt-4">FOLDING LOG...</p>
      </div>

      {/* THE "ENTERING" CONTENT (Bottom Half of the fold) */}
      <div ref={bottomFoldRef} className="text-center py-20">
        <h2 className="text-6xl font-sketch text-blueprint underline decoration-wavy">
          The Execution
        </h2>
        <p className="font-mono text-sm mt-4 opacity-40">
          UNFOLDING BLUEPRINTS
        </p>
      </div>
    </div>
  );
}
