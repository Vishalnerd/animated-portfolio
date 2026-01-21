"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: "React", color: "#61DAFB", rotation: -3 },
  { name: "Next.js", color: "#1A1A1A", rotation: 2 },
  { name: "TypeScript", color: "#3178C6", rotation: -1 },
  { name: "Tailwind", color: "#38BDF8", rotation: 3 },
  { name: "GSAP", color: "#88CE02", rotation: -2 },
  { name: "Python", color: "#3776AB", rotation: 2 },
  { name: "SQL", color: "#CC342D", rotation: -2 },
  { name: "DSA", color: "#0055FF", rotation: 3 },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dotPositions, setDotPositions] = useState<
    Array<{ top: number; left: number }>
  >([]);

  useEffect(() => {
    setDotPositions(
      [...Array(6)].map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
      })),
    );
  }, []);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      // 1. Entrance: Less aggressive 'back' ease on mobile for smoother entry
      gsap.from(".skill-badge", {
        scale: 0.8,
        opacity: 0,
        y: 20,
        stagger: isMobile ? 0.05 : 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });

      // 2. Optimized Floating Animation
      // On mobile, we reduce the movement range (y: 4 instead of 8) to save CPU
      gsap.to(".skill-badge", {
        y: isMobile ? "random(-4, 4)" : "random(-8, 8)",
        x: isMobile ? "random(-2, 2)" : "random(-4, 4)",
        rotation: isMobile ? "random(-2, 2)" : "random(-4, 4)",
        duration: isMobile ? 3 : "random(2.5, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: (i) => i * 0.1,
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-32 max-w-5xl mx-auto px-4 relative overflow-hidden"
    >
      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-sketch mb-10 md:mb-16 text-center">
          Tech Scribbles
        </h2>

        {/* MOBILE FIX: 
            Changed gap-x-6 to gap-x-3 on small screens so badges don't wrap too aggressively 
        */}
        <div className="flex flex-wrap justify-center gap-y-6 gap-x-3 md:gap-x-10 lg:gap-x-14">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="skill-badge group relative active:scale-95 transition-transform"
              style={{ "--skill-color": skill.color } as any}
            >
              <div
                className="relative px-4 md:px-8 py-2 md:py-4 bg-white border-[1.5px] md:border-2 border-ink 
                           shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] 
                           md:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]
                           group-hover:shadow-[6px_6px_0px_0px_var(--skill-color)] 
                           transition-all duration-300 will-change-transform"
                style={{ transform: `rotate(${skill.rotation}deg)` }}
              >
                <span
                  className="font-mono font-bold text-sm md:text-xl"
                  style={{ color: skill.color }}
                >
                  {skill.name}
                </span>

                {/* Tape Effect: Hidden on mobile to keep the UI clean */}
                <div className="hidden md:block absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-blueprint/20 -rotate-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Hover Doodle: Hidden on mobile (touch devices don't have hover) */}
              <div className="hidden md:block absolute -top-8 -right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <svg width="40" height="40" viewBox="0 0 50 50" fill="none">
                  <path
                    d="M10 40 Q 25 10 40 40"
                    stroke={skill.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Dots: Lower opacity on mobile to prevent visual noise */}
      <div className="absolute inset-0 pointer-events-none opacity-30 md:opacity-100">
        {dotPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-ink/10 rounded-full"
            style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
          />
        ))}
      </div>
    </section>
  );
}
