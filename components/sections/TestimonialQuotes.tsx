"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";

const featuredQuotes = testimonials.slice(0, 2);

export function TestimonialQuotes() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {featuredQuotes.map((t, i) => (
        <motion.figure
          key={t.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="relative rounded-[8px] border-2 border-foreground bg-surface p-6 shadow-[4px_4px_0px_#141414] md:p-8"
        >
          <Quote className="absolute right-5 top-5 h-8 w-8 text-accent/20" />
          <p className="text-lg font-bold leading-relaxed text-foreground md:text-xl">
            &ldquo;{t.content}&rdquo;
          </p>
          <figcaption className="mt-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-foreground bg-accent-bg text-[12px] font-bold text-accent">
              {t.name}
            </div>
            <div>
              <p className="text-[12px] font-semibold text-foreground">
                {t.name}
              </p>
              <p className="text-[11px] text-neutral-500">
                {t.role} — {t.company}
              </p>
            </div>
            {t.project && (
              <span className="ml-auto rounded-[4px] border-2 border-foreground bg-background px-2 py-0.5 font-mono text-[10px] font-bold shadow-[1px_1px_0px_#141414]">
                {t.project}
              </span>
            )}
          </figcaption>
        </motion.figure>
      ))}
    </section>
  );
}
