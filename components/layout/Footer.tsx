import Link from "next/link";

const footerLinks = [
  { label: "Layanan & Harga", path: "/services" },
  { label: "Portfolio", path: "/projects" },
  { label: "Hubungi Kami", path: "/contact" },
  { label: "Live Metrics", path: "/#live-data" },
];

/**
 * Footer reveal mask (noho §1.5.4): the mask is a fixed-height viewport and the
 * footer is absolutely positioned inside it, so the footer appears to be
 * uncovered as you scroll rather than scrolling up into view.
 *
 * The mask collapses to normal flow under reduce-motion / prefers-reduced-motion
 * (see .footer-reveal-mask overrides in globals.css) so nothing is ever clipped.
 */
export const Footer = () => {
  return (
    <div className="footer-reveal-mask mt-12 h-[420px] md:h-[380px]">
      <footer className="bg-[var(--bg-element)] border-t border-[var(--border-hairline)]">
        <div className="p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <Link
                href="/"
                className="inline-flex items-baseline gap-0.5 font-display text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-70"
                style={{ letterSpacing: "-0.04em" }}
              >
                nasaq<span className="opacity-60">.id</span>
              </Link>
              <p className="mt-3 text-[13px] leading-relaxed text-foreground/70">
                Website &amp; Android app development untuk operasional nyata —
                company profile, dashboard internal, dan sistem custom.
              </p>
            </div>

            <nav className="flex flex-col gap-2.5">
              {footerLinks.map((l) => (
                <Link
                  key={l.path}
                  href={l.path}
                  className="text-[13px] font-medium text-foreground/70 transition-opacity hover:opacity-100 hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-[var(--border-hairline)] pt-6 font-mono text-[11px] text-foreground/60 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} nasaq.id — dibuat oleh founder Abdul
              Gofur.
            </p>
            <p className="font-semibold tracking-[0.12em] text-foreground/60">
              baik &amp; jalan aja nggak cukup — harus dipakai admin.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
