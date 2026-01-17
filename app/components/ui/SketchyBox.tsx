"use client";
import { useEffect, useRef, useState } from "react";
import rough from "roughjs";

interface Props {
  children: React.ReactNode;
  className?: string;
  color?: string;
  fill?: string; // Optional background "shading"
}

export const SketchyBox = ({
  children,
  className,
  color = "#1A1A1A",
  fill,
}: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 1. Monitor size changes
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Draw the sketchy border
  useEffect(() => {
    if (svgRef.current && dimensions.width > 0) {
      const rc = rough.svg(svgRef.current);

      // Clear previous drawings efficiently
      svgRef.current.innerHTML = "";

      const node = rc.rectangle(
        2,
        2,
        dimensions.width + 44,
        dimensions.height + 44,
        {
          stroke: color,
          strokeWidth: 1.5,
          roughness: 2,
          bowing: 2,
          fill: fill,
          fillStyle: "zigzag", // Hand-drawn shading style
          fillWeight: 0.5,
          hachureGap: 6,
        },
      );

      svgRef.current.appendChild(node);
    }
  }, [color, fill, dimensions]);

  return (
    <div ref={containerRef} className={`relative p-4 md:p-6 ${className}`}>
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        style={{ transform: "translate(-22px, -22px)" }} // Centering adjustments
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
