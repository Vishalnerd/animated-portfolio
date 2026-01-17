"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Github, Linkedin, Mail } from "lucide-react";

const SOCIALS = [
  {
    icon: Github,
    href: "https://github.com/Vishalnerd",
    color: "#1A1A1A",
    label: "Code",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/vishal-tanwar-a7076a286/",
    color: "#0077B5",
    label: "Work",
  },

  {
    icon: Mail,
    href: "mailto:vishaltanwar275@gmail.com",
    color: "#FF4500",
    label: "Email",
  },
];

export default function SocialDoodles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Floating animation for the stickers
      gsap.to(".sticker", {
        y: "random(-5, 5)",
        rotation: "random(-3, 3)",
        duration: "random(1.5, 3)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 left-4 md:bottom-8 md:left-8 flex flex-col gap-3 md:gap-6 z-50"
    >
      {SOCIALS.map((social, i) => (
        <a
          key={i}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="sticker group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 transition-transform hover:scale-110 active:scale-95"
        >
          {/* Sketchy Circle Border */}
          <svg className="absolute inset-0 w-full h-full -rotate-12 group-hover:rotate-0 transition-transform">
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              stroke={social.color}
              strokeWidth="2"
              fill="white"
              strokeDasharray="60 10 40 10" // Makes the border look "drawn"
              className="opacity-80 shadow-sm"
            />
          </svg>

          {/* Social Icon */}
          <social.icon
            size={18}
            className="md:w-5 md:h-5 relative z-10 transition-colors"
            style={{ color: social.color }}
          />

          {/* Label Tooltip (Handwritten style) */}
          <span
            className="absolute left-12 md:left-14 opacity-0 group-hover:opacity-100 font-sketch text-sm md:text-lg whitespace-nowrap transition-opacity pointer-events-none"
            style={{ color: social.color }}
          >
            {social.label}!
          </span>
        </a>
      ))}
    </div>
  );
}

// Inside ProjectCard.tsx or as a standalone doodle
export function VerifiedStamp() {
  return (
    <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 rotate-12 pointer-events-none">
      <div className="relative w-12 h-12 md:w-16 md:h-16 border-2 border-red-500 rounded-full flex items-center justify-center opacity-40">
        <span className="font-sketch text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-tighter text-center leading-tight">
          Shipped
          <br />
          2026
        </span>
        {/* Subtle cross-hatching to look like ink */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,red_2px,red_3px)] opacity-10 rounded-full" />
      </div>
    </div>
  );
}
