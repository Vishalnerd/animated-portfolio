// src/components/PencilCursor.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function PencilCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect actual touch devices (not just screen size)
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
  }, []);

  useGSAP(() => {
    if (isTouchDevice) return; // Don't run cursor logic on touch devices

    const moveCursor = (e: MouseEvent) => {
      // Move the pencil container
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);

      // Create a temporary "scribble" element
      const dot = document.createElement("div");
      dot.className =
        "fixed w-1 h-1 bg-[#1A1A1A] rounded-full pointer-events-none z-[9998]";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      dot.style.opacity = "1";
      document.body.appendChild(dot);

      // Fade it out and remove it
      gsap.to(dot, {
        opacity: 0,
        scale: 3,
        duration: 1,
        onComplete: () => dot.remove(),
      });
    };

    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isTouchDevice]);

  // Animation for "Writing" (tilting the pencil when clicking)
  useGSAP(() => {
    if (isTouchDevice) return; // Don't run cursor logic on touch devices

    if (isClicking) {
      gsap.to(".pencil-svg", {
        rotate: -15, // Tilt down to "write"
        scale: 0.9,
        duration: 0.1,
      });
    } else {
      gsap.to(".pencil-svg", {
        rotate: 0,
        scale: 1,
        duration: 0.2,
      });
    }
  }, [isClicking, isTouchDevice]);

  // Don't render cursor on touch devices
  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1 -translate-y-8"
    >
      <div className="pencil-svg w-10 h-10">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Pencil Body */}
          <path
            d="M30 5L35 10L15 30L10 35L5 30L10 25L30 5Z"
            fill="#FFD700" /* Pencil Yellow */
            stroke="#1A1A1A"
            strokeWidth="2"
          />
          {/* Pencil Tip (The Graphite) */}
          <path d="M5 30L10 35L2 38L5 30Z" fill="#1A1A1A" />
          {/* Eraser */}
          <path d="M30 5L35 10L38 7L33 2L30 5Z" fill="#FFB6C1" />
        </svg>
      </div>
    </div>
  );
}
