"use client";

import { useRef, useEffect, useState, useMemo } from "react";
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
  const penTipRef = useRef<SVGCircleElement>(null);
  const finalMsgRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  // 1. Update height with a small delay to ensure DOM is settled
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setSvgHeight(containerRef.current.offsetHeight);
      }
    };
    // Initial call
    setTimeout(updateHeight, 100);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // 2. Memoize path to prevent jittery recalculations during scroll
  const pathD = useMemo(() => {
    if (svgHeight === 0) return "";
    return `M 500 0 
            C 800 ${svgHeight * 0.2}, 200 ${svgHeight * 0.4}, 500 ${svgHeight * 0.5} 
            S 800 ${svgHeight * 0.8}, 500 ${svgHeight}`;
  }, [svgHeight]);

  useGSAP(
    () => {
      const path = pathRef.current;
      const penTip = penTipRef.current;
      if (!path || svgHeight === 0) return;

      const length = path.getTotalLength();

      // Set initial state
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        visibility: "visible",
      });

      // 1. Smooth Drawing Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1.5, // Increased scrub for "ink weight" feel
          invalidateOnRefresh: true,
        },
      });

      tl.to(path, {
        strokeDashoffset: 0,
        ease: "none",
      });

      // Move the pen tip along the path
      if (penTip) {
        tl.to(
          penTip,
          {
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5],
            },
            ease: "none",
          },
          0,
        ); // Start at the same time as the line
      }

      // 2. Milestone Staggered Entrance
      MILESTONES.forEach((_, i) => {
        gsap.from(`.milestone-${i}`, {
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0,
          rotate: i % 2 === 0 ? -5 : 5,
          duration: 1.2,
          scrollTrigger: {
            trigger: `.milestone-${i}`,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // 3. Final Underline
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
    { scope: containerRef, dependencies: [svgHeight, pathD] },
  );

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-40 relative w-full max-w-5xl mx-auto overflow-visible px-4 md:px-6 min-h-[180vh] md:min-h-[250vh]"
    >
      <h2 className="text-4xl md:text-5xl lg:text-8xl font-sketch text-center mb-32 md:mb-60">
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
            preserveAspectRatio="none"
          >
            {/* Guide Line */}
            <path
              d={pathD}
              stroke="#1A1A1A"
              strokeWidth="2"
              strokeDasharray="12,12"
              className="opacity-5"
            />
            {/* Animated Blue Ink Line */}
            <path
              ref={pathRef}
              d={pathD}
              stroke="#0055FF"
              strokeWidth="6"
              strokeLinecap="round"
              style={{
                willChange: "stroke-dashoffset",
                transform: "translateZ(0)",
              }}
              className="drop-shadow-[0_0_12px_rgba(0,85,255,0.4)]"
            />
            {/* Floating Pen Tip */}
            <circle
              ref={penTipRef}
              r="8"
              fill="#0055FF"
              className="drop-shadow-[0_0_15px_rgba(0,85,255,0.8)]"
            />
          </svg>
        </div>
      )}

      {/* Milestones Container */}
      <div className="flex flex-col gap-32 md:gap-60 lg:gap-96 relative z-10">
        {MILESTONES.map((m, i) => (
          <div
            key={i}
            className={`milestone-${i} flex w-full ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div className="relative group max-w-md w-full">
              <div className="absolute -top-12 md:-top-16 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 z-30">
                <p className="font-sketch text-blueprint text-sm md:text-lg lg:text-xl whitespace-nowrap bg-[#FFF9C4] px-3 py-1.5 md:px-4 md:py-2 rotate-[-3deg] border-2 border-ink shadow-lg">
                  {m.note}
                </p>
              </div>

              <SketchyBox
                color={m.color}
                className="bg-white shadow-2xl hover:translate-y-[-5px] transition-all duration-300 p-4 md:p-6"
              >
                <div className="flex items-center gap-3 md:gap-6 mb-4 md:mb-6">
                  <div className="p-2 md:p-4 bg-paper rounded-xl md:rounded-2xl border-2 border-ink shadow-inner">
                    <m.Icon
                      size={28}
                      className="md:w-9 md:h-9"
                      style={{ color: m.color }}
                    />
                  </div>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-sketch leading-none">
                    {m.title}
                  </h4>
                </div>
                <p className="text-sm md:text-base font-mono text-ink/70 leading-relaxed border-l-4 border-ink/10 pl-3 md:pl-4">
                  {m.desc}
                </p>
              </SketchyBox>
            </div>
          </div>
        ))}

        {/* Final Message */}
        <div
          ref={finalMsgRef}
          className="flex flex-col items-center mt-20 md:mt-40 text-center pb-10 md:pb-20"
        >
          <h3 className="text-3xl md:text-5xl lg:text-7xl font-sketch text-ink relative inline-block px-4">
            ...not over yet
            <svg
              className="final-underline absolute -bottom-4 md:-bottom-6 left-0 w-full h-4 md:h-6 overflow-visible"
              viewBox="0 0 200 20"
            >
              <path
                d="M0 10 Q 50 0, 100 10 T 200 10"
                stroke="#0055FF"
                strokeWidth="6"
                className="md:stroke-[8]"
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
