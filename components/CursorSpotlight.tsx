'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

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
  const [isHovering, setIsHovering] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [, forceUpdate] = useState(0);

  // Smooth animation loop
  useEffect(() => {
    if (!isHovering) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const animate = () => {
      const dx = posRef.current.x - smoothRef.current.x;
      const dy = posRef.current.y - smoothRef.current.y;

      // Only update if there's meaningful movement
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        smoothRef.current = {
          x: smoothRef.current.x + dx * 0.12,
          y: smoothRef.current.y + dy * 0.12,
        };
        forceUpdate(n => n + 1);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isHovering]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    posRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Initialize both positions to cursor — no jump
    posRef.current = { x, y };
    smoothRef.current = { x, y };
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const { x, y } = smoothRef.current;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ cursor: 'crosshair' }}
    >
      {/* Layer 1: Background — always present, revealed by mask */}
      <div className="absolute inset-0">
        {backgroundContent ? (
          backgroundContent
        ) : imageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 30% 20%, rgba(13, 148, 136, 0.12) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(13, 148, 136, 0.08) 0%, transparent 50%),
                linear-gradient(135deg, #f0fdfa 0%, #f8fafc 50%, #ecfdf5 100%)
              `,
            }}
          />
        )}
      </div>

      {/* Layer 2: Subtle noise/grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 3: Main overlay — cuts out at cursor position */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: overlayColor,
          WebkitMaskImage: isHovering
            ? `radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent 55%, rgba(0,0,0,0.3) 70%, black 85%)`
            : 'none',
          maskImage: isHovering
            ? `radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent 55%, rgba(0,0,0,0.3) 70%, black 85%)`
            : 'none',
        }}
      />

      {/* Layer 4: Inner glow — teal light at cursor */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isHovering ? 0.15 : 0,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(circle ${radius * 0.6}px at ${x}px ${y}px, rgba(13, 148, 136, 0.4) 0%, transparent 70%)`,
        }}
      />

      {/* Layer 5: Outer ring glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(circle ${radius * 1.1}px at ${x}px ${y}px, transparent 50%, rgba(13, 148, 136, 0.04) 60%, transparent 70%)`,
        }}
      />

      {/* Layer 6: Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
