'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Maximize2, MousePointer2, RefreshCw } from 'lucide-react';
import { useEnergySaver } from '@/contexts/EnergySaverContext';

export interface AndroidScreenVariant {
  label: string;
  src: string;
  poster?: string;
}

interface Android3DViewerProps {
  variants: AndroidScreenVariant[];
  className?: string;
}

function loadModelViewer(): Promise<boolean> {
  return import('@google/model-viewer').then(() => true).catch(() => false);
}

export default function Android3DViewer({ variants, className = '' }: Android3DViewerProps) {
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [active, setActive] = useState(0);
  const [rotateOn, setRotateOn] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<HTMLElement | null>(null);
  const { reduceMotion, runtimePaused } = useEnergySaver();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Reduce-motion means don't pay for WebGL at all — the static poster is
    // the whole experience. This is the toggle having a real render cost.
    // No setState here: `viewerActive` (derived below) treats reduceMotion
    // as "not ready", so the static branch renders without a state write.
    if (reduceMotion) {
      return;
    }

    const importWhenNear = () => {
      const gl =
        typeof document !== 'undefined'
          ? document.createElement('canvas').getContext('webgl2') ||
            document.createElement('canvas').getContext('webgl')
          : null;
      setWebgl(Boolean(gl));
      if (!gl) return;
      loadModelViewer().then((ok) => {
        if (ok) setReady(true);
      });
    };

    if (typeof IntersectionObserver === 'undefined') {
      importWhenNear();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          importWhenNear();
          io.disconnect();
        }
      },
      { rootMargin: '600px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  const current = variants[active];

  // Derived readiness: reduceMotion forces the static branch even if the
  // model viewer finished loading earlier (toggling energy saver mid-session
  // must not leave the WebGL surface mounted).
  const viewerActive = ready && !reduceMotion;
  const showStatic = webgl === false || !viewerActive;

  // Auto-rotate is suppressed while the tab is hidden or motion is reduced;
  // the CSS in globals.css also drops the element out of rendering entirely.
  const autoRotate = rotateOn && !reduceMotion && !runtimePaused;

  const selectVariant = (i: number) => {
    setRotateOn(true);
    setActive(i);
  };

  return (
    <div ref={containerRef} className={`overflow-hidden rounded-3xl border border-foreground/10 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-foreground/10 bg-foreground/[0.02]">
        <div className="flex items-center gap-2.5 font-mono text-[11px] text-foreground/60">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--bg-element-second)] soft-border">
            <Maximize2 className="h-3.5 w-3.5 text-foreground" strokeWidth={2.2} />
          </span>
          Panorama Interaktif 3D, putar & zoom dengan drag
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={
              showStatic
                ? 'Mode statis: render 3D tidak tersedia'
                : 'Aktifkan/matikan putar otomatis'
            }
            onClick={() => setRotateOn((r) => !r)}
            disabled={showStatic}
            className="inline-flex items-center gap-1.5 rounded-full soft-border bg-[var(--bg-element-second)] px-3 py-1.5 text-[10px] font-mono text-foreground/70 transition-colors hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-3 w-3 ${autoRotate ? 'text-money' : ''}`} strokeWidth={2.2} />
            auto-rotate
          </button>

          <span className="relative flex h-2.5 w-2.5" aria-hidden>
            {webgl !== false && viewerActive ? (
              <>
                <span className="absolute inline-flex h-full w-full rounded-full bg-money opacity-70 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-money" />
              </>
            ) : (
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-muted/50" />
            )}
          </span>
        </div>
      </div>

      <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-foreground/[0.04] to-transparent">
        {showStatic ? (
          <div className="relative h-full w-full">
            <Image
              src={current.poster ?? current.src.replace(/\.glb$/, '.jpg')}
              alt={`Screenshot ${current.label}`}
              width={1600}
              height={1000}
              className="h-full w-full object-cover"
              loading="lazy"
              priority={false}
            />
            {webgl === false && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full soft-border bg-[var(--bg-element)] px-3 py-1.5 text-[10px] font-mono text-foreground">
                WebGL tidak tersedia, menampilkan gambar statis
              </div>
            )}
            {reduceMotion && webgl !== false && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full soft-border bg-[var(--bg-element)] px-3 py-1.5 text-[10px] font-mono text-foreground">
                Mode hemat energi, 3D dimatikan
              </div>
            )}
          </div>
        ) : (
          <model-viewer
            ref={viewerRef}
            src={current.src}
            alt={`Phone UI ${current.label}`}
            camera-controls
            touch-action="pan-y"
            auto-rotate={autoRotate}
            rotation-per-second="18deg"
            exposure="1.05"
            shadow-intensity="1"
            shadow-softness="0.4"
            disable-zoom={false}
            field-of-view="28deg"
            camera-orbit="0deg 78deg 0.62m"
            reveal="auto"
            className="h-full w-full"
            style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
          />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border-hairline)] px-5 py-4">
        <span className="mr-1 flex items-center gap-1.5 font-mono text-[10px] text-foreground/60">
          <MousePointer2 className="h-3 w-3" strokeWidth={2.2} />
          Layar
        </span>
        {variants.map((v, i) => (
          <button
            key={v.src}
            type="button"
            aria-pressed={i === active}
            onClick={() => selectVariant(i)}
            className={`rounded-full soft-border px-3 py-1.5 text-[10px] font-mono transition-colors ${
              i === active
                ? 'bg-[var(--bg-btn-pm)] text-[var(--txt-btn-pm)]'
                : 'bg-[var(--bg-element-second)] text-foreground/70 hover:text-foreground'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}