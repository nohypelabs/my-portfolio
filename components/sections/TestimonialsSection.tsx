"use client";

import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import { useRef, useState } from "react";

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 360;
    el.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
  };

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Apa Kata Klien</h2>
          <p className="text-[12px] text-neutral-500 mt-1">Feedback dari pengguna sistem kami</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-9 h-9 border-2 border-foreground bg-surface text-foreground shadow-[2px_2px_0px_#141414] hover:bg-accent-bg hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#141414] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all disabled:opacity-40 disabled:pointer-events-none disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none flex items-center justify-center rounded-[6px]"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-9 h-9 border-2 border-foreground bg-surface text-foreground shadow-[2px_2px_0px_#141414] hover:bg-accent-bg hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#141414] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all disabled:opacity-40 disabled:pointer-events-none disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none flex items-center justify-center rounded-[6px]"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-2 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex-shrink-0 w-[320px] md:w-[360px] snap-start"
          >
            <div className="neo-surface rounded-[8px] p-6 h-full hover:shadow-md transition-all relative overflow-hidden group">
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />

              <Quote className="w-8 h-8 text-accent/10 absolute top-4 right-4" />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[13px] text-neutral-600 leading-relaxed mb-5 line-clamp-4">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-9 h-9 rounded-full bg-accent-bg border-2 border-foreground flex items-center justify-center text-[12px] font-bold text-accent">
                  {t.name}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-foreground">{t.name}</p>
                  <p className="text-[10px] text-neutral-500 truncate">{t.role}</p>
                </div>
                {t.project && (
                  <span className="text-[10px] font-bold text-foreground bg-accent-bg border-2 border-foreground px-2 py-0.5 rounded-[4px] font-mono shadow-[1px_1px_0px_#141414] flex-shrink-0">
                    {t.project}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
