"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GraduationCap, Zap, BookOpen, Rocket } from "lucide-react";
import { SketchyBox } from "../ui/SketchyBox";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MILESTONES = [
  {
    title: "Schooling",
    Icon: BookOpen,
    color: "#1A1A1A",
    note: "Found my love for logic here!",
    desc: "Built my first basic calculator at 14.",
  },
  {
    title: "Cracked JEE",
    Icon: Zap,
    color: "#FFD700",
    note: "18 hours/day grind!",
    desc: "Mastered the art of consistency and problem solving.",
  },
  {
    title: "Joined DTU",
    Icon: GraduationCap,
    color: "#0055FF",
    note: "Delhi Tech University vibes.",
    desc: "Computer Science major, deep diving into systems.",
  },
  {
    title: "Startup Life",
    Icon: Rocket,
    color: "#1A1A1A",
    note: "Fast-paced & high impact.",
    desc: "Building scalable solutions in the real world.",
  },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const finalMsgRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  // Update SVG height on mount and resize
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setSvgHeight(containerRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path || svgHeight === 0) return;

      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      // 1. Line Drawing Animation
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // 2. Milestone Staggered Entrance
      MILESTONES.forEach((_, i) => {
        gsap.from(`.milestone-${i}`, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          scrollTrigger: {
            trigger: `.milestone-${i}`,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // 3. Underline animation for the final message
      gsap.from(".final-underline", {
        scaleX: 0,
        transformOrigin: "left",
        scrollTrigger: {
          trigger: finalMsgRef.current,
          start: "top 90%",
          scrub: true,
        },
      });
    },
    { scope: containerRef, dependencies: [svgHeight] },
  );

  // Improved Path: A winding vertical line that works across various heights
  const pathD = `M 500 0 
                C 800 ${svgHeight * 0.2}, 200 ${svgHeight * 0.4}, 500 ${svgHeight * 0.5} 
                S 800 ${svgHeight * 0.8}, 500 ${svgHeight}`;

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-40 relative w-full max-w-5xl mx-auto overflow-visible px-6 min-h-[200vh]"
    >
      <h2 className="text-5xl md:text-7xl font-sketch text-center mb-40">
        The Journey
      </h2>

      {/* SVG Background Layer */}
      {svgHeight > 0 && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 1000 ${svgHeight}`}
            fill="none"
            className="overflow-visible"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Faint Background Guide Line */}
            <path
              d={pathD}
              stroke="#1A1A1A"
              strokeWidth="2"
              strokeDasharray="12,12"
              className="opacity-5"
            />
            {/* Animated Blue Line */}
            <path
              ref={pathRef}
              d={pathD}
              stroke="#0055FF"
              strokeWidth="6"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(0,85,255,0.3)]"
            />
          </svg>
        </div>
      )}

      {/* Milestones Container */}
      <div className="flex flex-col gap-40 md:gap-72 relative">
        {MILESTONES.map((m, i) => (
          <div
            key={i}
            className={`milestone-${i} flex w-full ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div className="relative group max-w-md w-full">
              {/* Handwritten Note (Hover) */}
              <div className="absolute -top-14 left-0 md:-left-10 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 z-30">
                <p className="font-sketch text-blueprint text-sm md:text-lg whitespace-nowrap bg-marker/10 px-3 py-1 rotate-[-2deg] border-2 border-blueprint/20 rounded-lg">
                  {m.note}
                </p>
              </div>

              <SketchyBox
                color={m.color}
                className="bg-white shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-center gap-5 mb-4">
                  <div className="p-3 bg-paper rounded-xl border-2 border-ink">
                    <m.Icon size={32} style={{ color: m.color }} />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-sketch leading-none">
                    {m.title}
                  </h4>
                </div>
                <p className="text-sm font-mono text-ink/60 leading-relaxed">
                  {m.desc}
                </p>
              </SketchyBox>
            </div>
          </div>
        ))}

        {/* Final Message */}
        <div
          ref={finalMsgRef}
          className="flex flex-col items-center mt-20 text-center"
        >
          <h3 className="text-4xl md:text-5xl font-sketch text-ink relative">
            ...not over yet
            <svg
              className="final-underline absolute -bottom-4 left-0 w-full h-4 overflow-visible"
              viewBox="0 0 200 20"
            >
              <path
                d="M0 10 Q 50 0, 100 10 T 200 10"
                stroke="#0055FF"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </h3>
        </div>
      </div>
    </section>
  );
}
