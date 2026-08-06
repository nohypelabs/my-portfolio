"use client";

import { useRef, useState } from "react";
import { useEnergySaver } from "@/contexts/EnergySaverContext";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** Spotlight color (rgba). Defaults to a warm foreground tint. */
  color?: string;
  /** Spotlight size in px. */
  size?: number;
}

/**
 * Cursor-following spotlight border (Bento 2.0 idiom).
 *
 * A radial gradient is painted at the cursor position and masked to the
 * card's border ring, so the border "lights up" as the pointer moves across
 * the card. Under reduce-motion the overlay stays off entirely.
 */
export function SpotlightCard({
  children,
  className = "",
  color = "rgba(255, 196, 87, 0.35)",
  size = 320,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useEnergySaver();
  const [pos, setPos] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    setPos((p) => ({ ...p, visible: false }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {/* Border spotlight — masked to the ring so only the edge glows. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: pos.visible && !reduceMotion ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 70%)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
          borderRadius: "inherit",
        }}
      />
    </div>
  );
}
