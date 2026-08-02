'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Maximize2, MousePointer2, RefreshCw } from 'lucide-react';

export interface AndroidScreenVariant {
  label: string;
  src: string;
  poster?: string;
}

interface Android3DViewerProps {
  variants: AndroidScreenVariant[];
  className?: string;
}

export default function Android3DViewer({ variants, className = '' }: Android3DViewerProps) {
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [active, setActive] = useState(0);
  const [rotateOn, setRotateOn] = useState(true);
  const viewerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let mounted = true;
    import('@google/model-viewer')
      .then(() => {
        const gl =
          typeof document !== 'undefined'
            ? document.createElement('canvas').getContext('webgl2') ||
              document.createElement('canvas').getContext('webgl')
            : null;
        if (mounted) {
          setReady(true);
          setWebgl(Boolean(gl));
        }
      })
      .catch(() => {
        if (mounted) setReady(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setRotateOn(true);
  }, [active]);

  const current = variants[active];

  return (
    <div className={`overflow-hidden rounded-3xl border border-foreground/10 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-foreground/10 bg-foreground/[0.02]">
        <div className="flex items-center gap-2.5 font-mono text-[11px] text-muted">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
            <Maximize2 className="h-3.5 w-3.5 text-accent" strokeWidth={2.2} />
          </span>
          Panorama Interaktif 3D — putar & zoom dengan drag
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={
              webgl === false || !ready
                ? 'Mode statis: render 3D tidak tersedia'
                : 'Aktifkan/matikan putar otomatis'
            }
            onClick={() => setRotateOn((r) => !r)}
            disabled={webgl === false || !ready}
            className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1.5 text-[10px] font-mono text-muted transition-colors hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-3 w-3 ${rotateOn ? 'text-accent' : ''}`} strokeWidth={2.2} />
            auto-rotate
          </button>

          <span className="relative flex h-2.5 w-2.5" aria-hidden>
            {webgl !== false && ready ? (
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
        {webgl === false || !ready ? (
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
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-accent/30 bg-background/80 px-3 py-1.5 text-[10px] font-mono text-accent backdrop-blur">
                WebGL tidak tersedia — menampilkan gambar statis
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
            auto-rotate={rotateOn}
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

      <div className="flex flex-wrap items-center gap-2 border-t border-foreground/10 px-5 py-4">
        <span className="mr-1 flex items-center gap-1.5 font-mono text-[10px] text-muted">
          <MousePointer2 className="h-3 w-3" strokeWidth={2.2} />
          Layar
        </span>
        {variants.map((v, i) => (
          <button
            key={v.src}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`rounded-full border px-3 py-1.5 text-[10px] font-mono transition-colors ${
              i === active
                ? 'border-accent/40 bg-accent/10 text-accent'
                : 'border-foreground/10 bg-foreground/[0.02] text-muted hover:text-foreground'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}