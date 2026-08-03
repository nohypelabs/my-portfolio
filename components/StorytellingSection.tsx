"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEnergySaver } from "@/contexts/EnergySaverContext";

export interface StorySlide {
  id: string;
  label: string;
  image: string;
  caption: string;
  metric?: string;
}

interface StorytellingSectionProps {
  slides: StorySlide[];
  title: string;
  kicker: string;
}

/**
 * Narrative proof module — keywords in the lede unlock a before/after visual
 * panel beside the copy, mimicking the nohon storytelling idiom.
 */
export function StorytellingSection({ slides, title, kicker }: StorytellingSectionProps) {
  const { reduceMotion } = useEnergySaver();
  const [activeId, setActiveId] = useState(slides[0]?.id ?? "");

  const current = slides.find((s) => s.id === activeId) ?? slides[0];

  if (slides.length === 0) return null;

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-2">
        <p className="descriptor">{kicker}</p>
        <h2 className="mt-3 max-w-3xl text-2xl font-light leading-tight text-foreground md:text-4xl">
          {title}
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          {/* Narrative */}
          <div>
            <p className="text-lg font-light leading-[2] text-foreground/85 md:text-xl">
              Tiap sistem punya kisah yang dimulai dari masalah kecil yang
              menggerogoti waktu. Ceritanya dimulai dari{" "}
              {slides.map((slide, i) => (
                <span key={slide.id} className="inline">
                  {i === 0 ? "" : i === slides.length - 1 ? " dan " : ", "}
                  <button
                    type="button"
                    onClick={() => setActiveId(slide.id)}
                    onMouseEnter={() => setActiveId(slide.id)}
                    onFocus={() => setActiveId(slide.id)}
                    className={`inline-flex items-baseline gap-1 border-b-2 pb-0.5 transition-colors ${
                      activeId === slide.id
                        ? "border-foreground text-foreground"
                        : "border-foreground/25 text-foreground/70 hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {slide.label}
                  </button>
                </span>
              ))}
              {" "}— dan di setiap sudutnya kami ukur sebelum, setelah, serta apa yang berubah di lapangan.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {slides.map((slide) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveId(slide.id)}
                  onMouseEnter={() => setActiveId(slide.id)}
                  aria-pressed={activeId === slide.id}
                  className={`rounded-full soft-border px-3.5 py-1.5 font-mono text-[11px] font-semibold transition-all ${
                    activeId === slide.id
                      ? "bg-[var(--bg-btn-pm)] text-[var(--txt-btn-pm)]"
                      : "bg-[var(--bg-element-second)] text-foreground/75 hover:text-foreground"
                  }`}
                >
                  {slide.label}
                </button>
              ))}
            </div>
          </div>

          {/* Visual panel */}
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="glass rounded-3xl overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={current.image}
                    alt={current.caption}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-[15px] font-semibold text-foreground">{current.caption}</p>
                  {current.metric && (
                    <p className="mt-2 font-mono text-[12px] font-semibold text-foreground/80">
                      {current.metric}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}