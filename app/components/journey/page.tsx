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
    note: "Found my love for logic!",
    desc: "Built my first basic calculator at 14.",
  },
  {
    title: "Cracked JEE",
    Icon: Zap,
    color: "#FFD700",
    note: "18 hours/day grind!",
    desc: "Mastered the art of problem solving.",
  },
  {
    title: "Joined DTU",
    Icon: GraduationCap,
    color: "#0055FF",
    note: "DTU vibes.",
    desc: "Computer Science major, deep diving into systems.",
  },
  {
    title: "Startup Life",
    Icon: Rocket,
    color: "#1A1A1A",
    note: "Fast-paced impact.",
    desc: "Building scalable solutions in the real world.",
  },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const penTipRef = useRef<SVGCircleElement>(null);
  const finalMsgRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setSvgHeight(containerRef.current.offsetHeight);
      }
    };
    // Re-calculate on mount and resize for mobile address bar shifts
    setTimeout(updateHeight, 100);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Responsive Path: On mobile, the curve is less aggressive to prevent text overlap
  const pathD = useMemo(() => {
    if (svgHeight === 0) return "";
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const curveWidth = isMobile ? 150 : 300; // Narrower winding for mobile

    return `M 500 0 
            C ${500 + curveWidth} ${svgHeight * 0.2}, ${500 - curveWidth} ${svgHeight * 0.4}, 500 ${svgHeight * 0.5} 
            S ${500 + curveWidth} ${svgHeight * 0.8}, 500 ${svgHeight}`;
  }, [svgHeight]);

  useGSAP(
    () => {
      const path = pathRef.current;
      const penTip = penTipRef.current;
      if (!path || svgHeight === 0) return;

      const length = path.getTotalLength();
      const isMobile = window.innerWidth < 768;

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        visibility: "visible",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: isMobile ? 1 : 1.5, // Faster scrub on mobile for better responsiveness
          invalidateOnRefresh: true,
        },
      });

      tl.to(path, { strokeDashoffset: 0, ease: "none" });

      if (penTip) {
        tl.to(
          penTip,
          {
            motionPath: { path: path, align: path, alignOrigin: [0.5, 0.5] },
            ease: "none",
          },
          0,
        );
      }

      MILESTONES.forEach((_, i) => {
        gsap.from(`.milestone-${i}`, {
          x: i % 2 === 0 ? (isMobile ? -30 : -80) : isMobile ? 30 : 80,
          opacity: 0,
          rotate: i % 2 === 0 ? -3 : 3,
          duration: 1,
          scrollTrigger: {
            trigger: `.milestone-${i}`,
            start: "top 90%", // Trigger slightly later on mobile
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.from(".final-underline", {
        scaleX: 0,
        transformOrigin: "left",
        scrollTrigger: {
          trigger: finalMsgRef.current,
          start: "top 95%",
          scrub: true,
        },
      });
    },
    { scope: containerRef, dependencies: [svgHeight, pathD] },
  );

  return (
    <section
      ref={containerRef}
      className="py-12 md:py-40 relative w-full max-w-5xl mx-auto overflow-hidden px-4 md:px-6 min-h-[160vh] md:min-h-[250vh]"
    >
      <h2 className="text-4xl md:text-8xl font-sketch text-center mb-24 md:mb-60">
        The Journey
      </h2>

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
            <path
              d={pathD}
              stroke="#1A1A1A"
              strokeWidth="2"
              strokeDasharray="8,8"
              className="opacity-5"
            />
            <path
              ref={pathRef}
              d={pathD}
              stroke="#0055FF"
              strokeWidth={
                typeof window !== "undefined" && window.innerWidth < 768
                  ? "4"
                  : "6"
              }
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(0,85,255,0.4)]"
            />
            <circle
              ref={penTipRef}
              r={
                typeof window !== "undefined" && window.innerWidth < 768
                  ? "5"
                  : "8"
              }
              fill="#0055FF"
              className="drop-shadow-[0_0_10px_rgba(0,85,255,0.8)]"
            />
          </svg>
        </div>
      )}

      <div className="flex flex-col gap-24 md:gap-96 relative z-10">
        {MILESTONES.map((m, i) => (
          <div
            key={i}
            className={`milestone-${i} flex w-full ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div className="relative group w-full max-w-[280px] sm:max-w-md">
              {/* Note: Simplified positioning for mobile */}
              <div className="absolute -top-10 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                <p className="font-sketch text-blueprint text-xs md:text-xl whitespace-nowrap bg-[#FFF9C4] px-2 py-1 rotate-[-3deg] border border-ink shadow-md">
                  {m.note}
                </p>
              </div>

              <SketchyBox
                color={m.color}
                className="bg-white shadow-xl p-4 md:p-6"
              >
                <div className="flex items-center gap-3 md:gap-6 mb-3 md:mb-6">
                  <div className="p-2 md:p-4 bg-paper rounded-xl border-2 border-ink shadow-inner">
                    <m.Icon
                      size={20}
                      className="md:w-9 md:h-9"
                      style={{ color: m.color }}
                    />
                  </div>
                  <h4 className="text-xl md:text-4xl font-sketch leading-none">
                    {m.title}
                  </h4>
                </div>
                <p className="text-xs md:text-base font-mono text-ink/70 leading-relaxed border-l-2 md:border-l-4 border-ink/10 pl-3 md:pl-4">
                  {m.desc}
                </p>
              </SketchyBox>
            </div>
          </div>
        ))}

        <div
          ref={finalMsgRef}
          className="flex flex-col items-center mt-20 text-center pb-10"
        >
          <h3 className="text-2xl md:text-7xl font-sketch text-ink relative inline-block">
            ...not over yet
            <svg
              className="final-underline absolute -bottom-3 left-0 w-full h-4 overflow-visible"
              viewBox="0 0 200 20"
            >
              <path
                d="M0 10 Q 50 0, 100 10 T 200 10"
                stroke="#0055FF"
                strokeWidth="4"
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
