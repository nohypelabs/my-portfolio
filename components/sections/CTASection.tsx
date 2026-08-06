import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * The single call-to-action slab used across the site.
 *
 * One component, consistent dark-slab tokens (var(--bg-btn-big) /
 * var(--txt-btn-big)), so the four pages that used to copy-paste an identical
 * block now share one source of truth.
 *
 * `centered` renders the homepage funnel finale (punchy, centred). The default
 * is the two-column grid used by /services, /projects, and project detail —
 * callers wrap that one in <ScrollReveal> as before.
 */
interface CTASectionProps {
  title: string;
  body?: string;
  eyebrow?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Centred finale layout (homepage). Default: two-column grid slab. */
  centered?: boolean;
}

export function CTASection({
  title,
  body,
  eyebrow,
  ctaLabel = "Mulai Diskusi",
  ctaHref = "/contact",
  centered = false,
}: CTASectionProps) {
  // The button sits on the dark slab, so it pins to the light form surface and
  // the theme-correct text token (hardcoded #3c3c3c elsewhere was a drift).
  const button = (
    <Link
      href={ctaHref}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--bg-form-element)] px-6 py-3 text-sm font-semibold text-[var(--txt-form-element)] transition-transform hover:-translate-y-0.5"
    >
      {ctaLabel}
      <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
    </Link>
  );

  if (centered) {
    return (
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-2">
          <div className="rounded-3xl bg-[var(--bg-btn-big)] py-12 px-6 text-center text-[var(--txt-btn-big)] md:py-16">
            {eyebrow && (
              <p className="descriptor !text-current opacity-70">{eyebrow}</p>
            )}
            <h2 className="mx-auto mt-4 max-w-2xl text-[32px] font-light tracking-tight text-current md:text-5xl">
              {title}
            </h2>
            <div className="mt-8">{button}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="rounded-3xl bg-[var(--bg-btn-big)] text-[var(--txt-btn-big)] p-6 md:p-10">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-2">
          {eyebrow && (
            <p className="descriptor !text-current opacity-70">{eyebrow}</p>
          )}
          <h2 className="text-2xl font-light text-current md:text-3xl">{title}</h2>
          {body && (
            <p className="text-sm leading-relaxed text-current opacity-70">
              {body}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          {button}
        </div>
      </div>
    </div>
  );
}
