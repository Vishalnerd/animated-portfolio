"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SketchyBox } from "../ui/SketchyBox";
import { ArrowUpRight } from "lucide-react";

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
    // Random tilt so every card looks hand-placed
    setRotation(Math.random() * 4 - 2);
  }, []);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;
      // Reduce or disable float animation on mobile for better performance
      if (!isMobile) {
        gsap.to(containerRef.current, {
          y: -10,
          rotation: "+=1",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative group w-full max-w-md mx-auto"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Messy Tape at Top */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-[#eef2ff]/40 backdrop-blur-md -rotate-2 z-30 border-x-2 border-white/20 shadow-sm">
        {/* Add a little "texture" to the tape */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
      </div>

      <SketchyBox
        color="#1A1A1A"
        className="bg-white p-4 md:p-6 lg:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,85,255,1)] md:hover:shadow-[16px_16px_0px_0px_rgba(0,85,255,1)] transition-all duration-300"
      >
        {/* Project Image "Draft" */}
        <div className="relative aspect-video mb-4 md:mb-6 border-2 border-ink overflow-hidden bg-gray-50">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          />
          {/* Graphite texture overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
        </div>

        {/* Project Header with Red Pen Correction */}
        <div className="relative mb-3 md:mb-4">
          <h3 className="text-2xl md:text-3xl font-sketch text-ink relative inline-block">
            {title}
            <svg className="absolute -bottom-2 left-0 w-full h-2 overflow-visible">
              <path
                d="M0 5 Q 50 0, 100 5 T 200 5"
                stroke="#0055FF"
                strokeWidth="3"
                fill="none"
                className="opacity-70"
              />
            </svg>
          </h3>
          <p className="font-mono text-[10px] text-red-500 absolute -top-4 -right-2 rotate-12">
            // LIVE_PROJ_00{title.length}
          </p>
        </div>

        <p className="font-sketch text-base md:text-lg text-ink/70 leading-snug mb-4 md:mb-6">
          {description}
        </p>

        {/* Stack Tags as "Post-it" Scribbles */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2 py-0.5 border border-ink/20 rotate-[-2deg] bg-marker/10 group-hover:bg-blueprint/10 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-ink/10">
          <LinkButton href={link} />
          <span className="font-mono text-[10px] opacity-30 italic">
            Revision 2.1
          </span>
        </div>
      </SketchyBox>

      {/* Hand-drawn arrow doodle pointing to the card */}
      <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden xl:block opacity-20 group-hover:opacity-100 transition-opacity">
        <svg width="60" height="40" viewBox="0 0 60 40">
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
  return (
    <a
      href={href}
      target="_blank"
      className="flex items-center gap-2 font-sketch text-blueprint hover:text-ink transition-colors group/btn"
    >
      <span className="underline decoration-wavy">Open Source</span>
      <ArrowUpRight
        size={18}
        className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
      />
    </a>
  );
}
