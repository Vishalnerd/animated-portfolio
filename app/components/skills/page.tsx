"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const SKILLS = [
  { name: "React", color: "#61DAFB", rotation: -5 },
  { name: "Next.js", color: "#1A1A1A", rotation: 3 },
  { name: "TypeScript", color: "#3178C6", rotation: -2 },
  { name: "Tailwind", color: "#38BDF8", rotation: 6 },
  { name: "GSAP", color: "#88CE02", rotation: -4 },
  { name: "Python", color: "#3776AB", rotation: 2 },
  { name: "SQL", color: "#CC342D", rotation: -3 },
  { name: "Data Structures", color: "#0055FF", rotation: 4 },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dotPositions, setDotPositions] = useState<
    Array<{ top: number; left: number }>
  >([]);

  useEffect(() => {
    // Generate random positions on client side only
    setDotPositions(
      [...Array(6)].map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
      })),
    );
  }, []);

  useGSAP(
    () => {
      // 1. Entrance Animation
      gsap.from(".skill-badge", {
        scale: 0,
        opacity: 0,
        y: 20,
        rotate: 15,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // 2. Global Floating Animation (Performance Optimized)
      // Instead of 8 separate loops, we use one animation with a stagger or small offsets
      gsap.to(".skill-badge", {
        y: "random(-8, 8)",
        x: "random(-4, 4)",
        rotation: "random(-6, 6)",
        duration: "random(2.5, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        // This ensures they don't all move in perfect sync
        delay: (i) => i * 0.2,
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 max-w-5xl mx-auto px-4 relative overflow-hidden"
    >
      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-sketch mb-12 md:mb-16 text-center">
          Tech Scribbles
        </h2>

        <div className="flex flex-wrap justify-center gap-y-10 gap-x-6 md:gap-x-10 lg:gap-x-14">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="skill-badge group relative"
              style={{ "--skill-color": skill.color } as any}
            >
              {/* Sticker Body */}
              <div
                className="relative px-5 md:px-8 py-3 md:py-4 bg-white border-2 border-ink 
                           shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] 
                           group-hover:shadow-[8px_8px_0px_0px_var(--skill-color)] 
                           group-hover:-translate-y-2 group-hover:-translate-x-1 
                           transition-all duration-300 ease-sketchy"
                style={{ transform: `rotate(${skill.rotation}deg)` }}
              >
                <span
                  className="font-mono font-bold text-base md:text-xl transition-colors duration-300"
                  style={{ color: skill.color }}
                >
                  {skill.name}
                </span>

                {/* Tape Effect (Physical Detail) */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-blueprint/20 -rotate-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Hover Doodle Annotation */}
              <div className="absolute -top-8 -right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:rotate-12">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
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

      {/* Decorative Pencil "Crumbs" / Dust */}
      {dotPositions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-ink/10 rounded-full"
          style={{
            top: `${pos.top}%`,
            left: `${pos.left}%`,
          }}
        />
      ))}
    </section>
  );
}
