'use client';

import { useRef, useState, useCallback } from 'react';

interface CursorSpotlightProps {
  backgroundContent?: React.ReactNode;
  imageUrl?: string;
  overlayColor?: string;
  radius?: number;
  children: React.ReactNode;
  className?: string;
}

export function CursorSpotlight({
  backgroundContent,
  imageUrl,
  overlayColor = '#FAFAFA',
  radius = 200,
  children,
  className = '',
}: CursorSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative overflow-hidden ${className}`}
      style={{ cursor: 'crosshair' }}
    >
      {/* Layer 1: Background image/content — always rendered, revealed by mask */}
      <div className="absolute inset-0">
        {backgroundContent ? (
          backgroundContent
        ) : imageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 20% 50%, rgba(13, 148, 136, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(13, 148, 136, 0.1) 0%, transparent 50%),
                linear-gradient(135deg, #f0fdfa 0%, #f8fafc 50%, #f0fdfa 100%)
              `,
            }}
          />
        )}
      </div>

      {/* Layer 2: Overlay — covers everything, cutout at cursor */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundColor: overlayColor,
          opacity: isHovering ? 1 : 1,
          WebkitMaskImage: isHovering
            ? `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, transparent 60%, black 100%)`
            : 'none',
          maskImage: isHovering
            ? `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, transparent 60%, black 100%)`
            : 'none',
        }}
      />

      {/* Layer 3: Soft glow ring */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle ${radius * 1.2}px at ${pos.x}px ${pos.y}px, rgba(13, 148, 136, 0.08) 40%, transparent 70%)`,
        }}
      />

      {/* Layer 4: Content on top */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
