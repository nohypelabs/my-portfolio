"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.09,
        smoothWheel: !reduceMotion,
        syncTouch: false,
        touchMultiplier: 1.4,
      }}
    >
      {children}
    </ReactLenis>
  );
}