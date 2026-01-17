"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export const LenisProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Intensity of the smoothing (0 to 1)
      duration: 1.5, // Duration of the scroll momentum
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
