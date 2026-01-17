"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SketchyBox } from "../ui/SketchyBox";
import Image from "next/image";

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
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Set random rotation on client side only
    setRotation(Math.random() * 6 - 3);
  }, []);

  const { contextSafe } = useGSAP({ scope: containerRef });

  // Better 3D Tilt Logic
  const onMouseMove = contextSafe((e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = (x / rect.width - 0.5) * 2; // -1 to 1
    const yPct = (y / rect.height - 0.5) * 2; // -1 to 1

    gsap.to(cardRef.current, {
      rotateY: xPct * 8, // More subtle, professional tilt
      rotateX: -yPct * 8,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power3.out",
    });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });
  });

  const CardContent = (
    <div className="relative p-2">
      <div className="absolute top-2 left-4 w-6 h-1 bg-gray-400 rotate-45 opacity-50 z-40 rounded-full shadow-[1px_1px_0px_rgba(0,0,0,0.1)]" />
      {/* Washi Tape - Randomized per card */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-8 bg-blueprint/20 backdrop-blur-sm -rotate-3 z-30 border border-blueprint/10"
        style={{
          transform: `translateX(-50%) rotate(${rotation}deg)`,
        }}
      />

      <SketchyBox
        color="#1A1A1A"
        className="bg-white shadow-lg group-hover:shadow-2xl transition-shadow duration-500 overflow-hidden"
      >
        {/* Project Image: Polaroid Optimization */}
        <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-gray-100 border-b-8 border-transparent group-hover:border-blueprint/5 transition-colors">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center grayscale brightness-95 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle Pencil Texture on Image */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
        </div>

        {/* Project Info */}
        <div className="space-y-3 px-1 pb-2">
          <div className="flex justify-between items-start">
            <h3 className="text-3xl font-sketch text-ink group-hover:text-blueprint transition-colors tracking-tight">
              {title}
            </h3>
          </div>

          <p className="font-mono text-xs md:text-sm text-ink/70 leading-relaxed italic">
            "{description}"
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono border border-ink/10 px-2 py-0.5 bg-paper/50 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* The "Paperclip" Decoration */}
        <div className="absolute top-10 right-2 w-6 h-12 border-2 border-ink/10 rounded-full opacity-20 rotate-12 -z-10" />
      </SketchyBox>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="perspective-1000" // Tailwind perspective class
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative group cursor-pointer will-change-transform"
      >
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {CardContent}
          </a>
        ) : (
          CardContent
        )}
      </div>
    </div>
  );
}
