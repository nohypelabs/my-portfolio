import Link from "next/link";

const footerLinks = [
  { label: "Layanan & Harga", path: "/services" },
  { label: "Portfolio", path: "/projects" },
  { label: "Hubungi Kami", path: "/contact" },
  { label: "Live Metrics", path: "/live" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-foreground/10 mt-12">
      <div className="p-6 lg:p-8 max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-baseline gap-0.5 font-display text-lg font-bold tracking-tight text-foreground transition-colors hover:text-accent"
              style={{ letterSpacing: '-0.04em' }}
            >
              nasaq<span className="text-accent">.id</span>
            </Link>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              Website &amp; Android app development untuk operasional nyata —
              company profile, dashboard internal, dan sistem custom.
            </p>
          </div>

          <nav className="flex flex-col gap-2.5">
            {footerLinks.map((l) => (
              <Link
                key={l.path}
                href={l.path}
                className="text-[13px] font-medium text-foreground/70 transition-colors hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-foreground/10 pt-6 font-mono text-[11px] text-muted md:flex-row md:items-center md:justify-between">
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
  );
};