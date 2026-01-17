"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Avatar() {
  const container = useRef<HTMLDivElement>(null);

  // Create optimized setters for the pupils
  const { contextSafe } = useGSAP({ scope: container });

  const moveEyes = contextSafe((e: MouseEvent) => {
    if (!container.current) return;

    // Get the bounding box of the avatar to find its center
    const rect = container.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center (-1 to 1 range)
    const relX = (e.clientX - centerX) / (window.innerWidth / 2);
    const relY = (e.clientY - centerY) / (window.innerHeight / 2);

    // Move pupils within a limited range (e.g., 8px max movement)
    gsap.to(".pupil", {
      x: relX * 8,
      y: relY * 8,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto", // Prevents animation stutter
    });
  });

  useEffect(() => {
    window.addEventListener("mousemove", moveEyes);
    return () => window.removeEventListener("mousemove", moveEyes);
  }, [moveEyes]);

  useGSAP(
    () => {
      // Keep the "Line Boil" for the sketchy look
      gsap.to(".sketch-path", {
        x: "random(-0.5, 0.5)",
        y: "random(-0.5, 0.5)",
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });

      // Keep the random blink
      gsap
        .timeline({ repeat: -1, repeatDelay: 3 })
        .to(".eye-socket", {
          scaleY: 0.1,
          duration: 0.1,
          transformOrigin: "center",
        })
        .to(".eye-socket", { scaleY: 1, duration: 0.1 });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 relative"
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Face Outline */}
        <path
          className="sketch-path"
          d="M100 20C150 20 180 50 180 100C180 150 150 180 100 180C50 180 20 150 20 100C20 50 50 20 100 20Z"
          stroke="#1A1A1A"
          fill="white"
          strokeWidth="4"
        />

        {/* Eye Sockets (These blink) */}
        <g className="eye-socket">
          {/* Left Eye */}
          <circle
            cx="70"
            cy="85"
            r="15"
            fill="white"
            stroke="#1A1A1A"
            strokeWidth="2"
          />
          <circle className="pupil" cx="70" cy="85" r="6" fill="#1A1A1A" />

          {/* Right Eye */}
          <circle
            cx="130"
            cy="85"
            r="15"
            fill="white"
            stroke="#1A1A1A"
            strokeWidth="2"
          />
          <circle className="pupil" cx="130" cy="85" r="6" fill="#1A1A1A" />
        </g>

        {/* Sketchy Mouth */}
        <path
          className="sketch-path"
          d="M70 140 Q100 160 130 140"
          stroke="#1A1A1A"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
