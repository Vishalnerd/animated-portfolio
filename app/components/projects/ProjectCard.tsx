"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SketchyBox } from "../ui/SketchyBox";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface ProjectProps {
  title: string;
  tags: string[];
  image: string;
  description: string;
  link?: string;
}

export default function ProjectCard({
  title,
  tags,
  image,
  description,
  link,
}: ProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Random tilt so every card looks hand-placed (limited range for stability)
    setRotation(Math.random() * 3 - 1.5);
  }, []);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      if (containerRef.current) {
        // Set initial state
        gsap.set(containerRef.current, {
          opacity: 0,
          y: 60,
          scale: 0.95,
        });

        // Scroll-triggered entrance animation
        gsap.to(containerRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none reset",
          },
        });

        // Only run floating animation on desktop to save mobile CPU
        if (!isMobile) {
          gsap.to(containerRef.current, {
            y: -8,
            rotation: "+=0.5",
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.2,
          });
        }
      }
    },
    { scope: containerRef, dependencies: [rotation] },
  );

  return (
    <div
      ref={containerRef}
      className="relative group w-full max-w-sm md:max-w-md mx-auto"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Tape Logic: Architectural Washi Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 md:w-32 h-8 md:h-10 bg-[#eef2ff]/50 backdrop-blur-sm -rotate-2 z-30 border-x border-white/30 shadow-sm pointer-events-none">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
      </div>

      <SketchyBox
        color="#1A1A1A"
        className="bg-white p-5 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,85,255,1)] md:hover:shadow-[16px_16px_0px_0px_rgba(0,85,255,1)] transition-all duration-300"
      >
        {/* Project Image "Draft" */}
        <div className="relative aspect-video mb-5 border-[1.5px] md:border-2 border-ink overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          />
          {/* Graphite texture overlay */}
          <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
        </div>

        {/* Header with Red Pen "Correction" */}
        <div className="relative mb-4">
          <h3 className="text-2xl md:text-3xl font-sketch text-ink relative inline-block">
            {title}
            <svg className="absolute -bottom-1.5 left-0 w-full h-2 overflow-visible pointer-events-none">
              <path
                d="M0 5 Q 50 0, 100 5 T 200 5"
                stroke="#0055FF"
                strokeWidth="2.5"
                fill="none"
                className="opacity-60"
              />
            </svg>
          </h3>
          <p className="font-mono text-[9px] md:text-[10px] text-red-500 absolute -top-3 -right-1 rotate-12 opacity-80">
            // LIVE_v.0{title.length}
          </p>
        </div>

        <p className="font-sketch text-base md:text-lg text-ink/80 leading-snug mb-5">
          {description}
        </p>

        {/* Tags: Hand-scribed metadata */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] md:text-[10px] px-2 py-0.5 border border-ink/10 rotate-[-1deg] bg-marker/5 group-hover:bg-blueprint/5 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-center pt-4 border-t border-dashed border-ink/20">
          <LinkButton href={link} />
          <span className="font-mono text-[9px] opacity-25 italic tracking-tighter">
            REV_02.11
          </span>
        </div>
      </SketchyBox>

      {/* Visual Cue: Hidden on mobile to avoid clutter */}
      <div className="absolute -left-14 top-1/2 -translate-y-1/2 hidden lg:block opacity-10 group-hover:opacity-60 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
        <svg width="50" height="30" viewBox="0 0 60 40">
          <path
            d="M5 20 L50 20 M40 10 L50 20 L40 30"
            stroke="#0055FF"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

function LinkButton({ href }: { href?: string }) {
  if (!href)
    return (
      <span className="text-[10px] font-mono opacity-20 italic">
        NDA Protected
      </span>
    );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 font-sketch text-blueprint hover:text-ink transition-colors group/btn"
    >
      <span className="underline decoration-wavy decoration-blueprint/40 group-hover/btn:decoration-ink/40">
        Launch Project
      </span>
      <ArrowUpRight
        size={16}
        className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300"
      />
    </a>
  );
}
