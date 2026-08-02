import Link from "next/link";

const footerLinks = [
  { label: "Layanan & Harga", path: "/services" },
  { label: "Portfolio", path: "/projects" },
  { label: "Hubungi Kami", path: "/contact" },
  { label: "Live Metrics", path: "/live" },
];

export const Footer = () => {
  return (
    <footer className="border-t-2 border-foreground">
      <div className="p-6 lg:p-8 max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center text-lg font-extrabold tracking-tight bg-foreground text-background px-2.5 py-1 rounded-[4px] shadow-[3px_3px_0_0_var(--color-accent)]"
            >
              nasaq<span className="text-accent-light">.id</span>
            </Link>
            <p className="mt-3 text-[12px] leading-relaxed text-neutral-500">
              Website &amp; Android app development untuk operasional nyata —
              company profile, dashboard internal, dan sistem custom.
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            {footerLinks.map((l) => (
              <Link
                key={l.path}
                href={l.path}
                className="font-mono text-[12px] font-bold text-foreground hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t-2 border-foreground pt-5 font-mono text-[11px] text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} nasaq.id — dibuat oleh founder Abdul
            Gofur.
          </p>
          <p className="uppercase tracking-[0.18em]">baik &amp; jalan aja nggak cukup — harus dipakai admin.</p>
        </div>
      </div>
    </footer>
  );
};