"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export const LenisProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // Intensity of the smoothing (0 to 1)
        duration: 1.5, // Duration of the scroll momentum
        smoothWheel: true,
      }}
    >
      {children as any}
    </ReactLenis>
  );
};
