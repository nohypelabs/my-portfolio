'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

interface CursorSpotlightProps {
  /** Background content (JSX element like a grid of images) */
  backgroundContent?: React.ReactNode;
  /** Background image URL (simple mode) */
  imageUrl?: string;
  /** Overlay color (the color that covers the image) */
  overlayColor?: string;
  /** Spotlight radius in pixels */
  radius?: number;
  /** Enable animated gradient background if no imageUrl/backgroundContent */
  enableGradient?: boolean;
  /** Children rendered on top */
  children: React.ReactNode;
  /** Additional className for the container */
  className?: string;
}

export function CursorSpotlight({
  backgroundContent,
  imageUrl,
  overlayColor = '#FAFAFA',
  radius = 180,
  enableGradient = true,
  children,
  className = '',
}: CursorSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -999, y: -999 });
  const [isHovering, setIsHovering] = useState(false);
  const [smoothPos, setSmoothPos] = useState({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);

  // Smooth cursor follow with requestAnimationFrame
  useEffect(() => {
    if (!isHovering) return;

    const animate = () => {
      setSmoothPos(prev => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [position, isHovering]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setSmoothPos({ x: -999, y: -999 });
    setPosition({ x: -999, y: -999 });
  }, []);

  const hasImage = !!imageUrl;
  const hasContent = !!backgroundContent;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Layer 1: Background content (mosaic/image/gradient) */}
      {(hasContent || hasImage || enableGradient) && (
        <div
          className="absolute inset-0 transition-opacity duration-500 ease-out"
          style={{ opacity: isHovering ? 1 : 0 }}
        >
          {hasContent ? (
            <div className="absolute inset-0">
              {backgroundContent}
            </div>
          ) : hasImage ? (
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
                  radial-gradient(ellipse at 50% 80%, rgba(13, 148, 136, 0.08) 0%, transparent 50%),
                  linear-gradient(135deg, #f0fdfa 0%, #f8fafc 50%, #f0fdfa 100%)
                `,
              }}
            />
          )}
        </div>
      )}

      {/* Layer 2: Animated dot pattern */}
      {isHovering && enableGradient && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle 1.5px at 20px 20px, rgba(13,148,136,0.4) 1px, transparent 1px),
              radial-gradient(circle 1.5px at 40px 40px, rgba(13,148,136,0.2) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            maskImage: `radial-gradient(circle ${radius}px at ${smoothPos.x}px ${smoothPos.y}px, black 0%, transparent 70%)`,
            WebkitMaskImage: `radial-gradient(circle ${radius}px at ${smoothPos.x}px ${smoothPos.y}px, black 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Layer 3: Main overlay with spotlight cutout */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: overlayColor,
          maskImage: isHovering
            ? `radial-gradient(circle ${radius}px at ${smoothPos.x}px ${smoothPos.y}px, transparent 0%, transparent 40%, black 100%)`
            : 'none',
          WebkitMaskImage: isHovering
            ? `radial-gradient(circle ${radius}px at ${smoothPos.x}px ${smoothPos.y}px, transparent 0%, transparent 40%, black 100%)`
            : 'none',
        }}
      />

      {/* Layer 4: Soft glow ring */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle ${radius * 1.3}px at ${smoothPos.x}px ${smoothPos.y}px, rgba(13, 148, 136, 0.06) 30%, transparent 70%)`,
          }}
        />
      )}

      {/* Layer 5: Content on top */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
