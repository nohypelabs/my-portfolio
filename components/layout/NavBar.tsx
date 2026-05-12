"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, FolderOpen, FileText, Mail, Search, Activity, Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { AvatarImage } from "@/components/AvatarImage";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useState, useRef } from "react";

const navItems = [
  { key: "home" as const, href: "/", icon: Home },
  { key: "projects" as const, href: "/projects", icon: FolderOpen },
  { key: "cv" as const, href: "/cv", icon: FileText },
  { key: "contact" as const, href: "/contact", icon: Mail },
  { key: "live" as const, href: "/live", icon: Activity },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

/* ── Desktop nav link ── */
function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
      }`}
    >
      {active && (
        <motion.div
          layoutId="navlink-bg"
          className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-lg"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </Link>
  );
}

/* ── Mobile dock item ── */
function DockItem({
  href,
  icon: Icon,
  label,
  active,
  mouseX,
}: {
  href: string;
  icon: typeof Home;
  label: string;
  active: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const el = ref.current;
    if (!el || val < 0) return 150;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return Math.abs(val - center);
  });

  const scale = useSpring(
    useTransform(distance, [0, 80, 150], [1.3, 1.05, 1]),
    { stiffness: 400, damping: 25 }
  );

  return (
    <Link
      ref={ref}
      href={href}
      className="relative flex-1 flex flex-col items-center justify-center gap-1 py-2.5 rounded-2xl transition-all duration-200 active:scale-90 touch-none"
    >
      {active && (
        <motion.div
          layoutId="bottomnav-bg"
          className="absolute inset-1 rounded-xl bg-emerald-500/10 border border-emerald-500/15"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <motion.div className="relative z-10" style={{ scale }}>
        <Icon
          className={`w-[22px] h-[22px] transition-colors duration-200 ${
            active
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-zinc-400 dark:text-zinc-500"
          }`}
          strokeWidth={active ? 2.5 : 1.8}
        />
      </motion.div>
      <span
        className={`relative z-10 text-[10px] font-semibold tracking-wide transition-colors duration-200 ${
          active
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-zinc-400 dark:text-zinc-500"
        }`}
      >
        {label}
      </span>
      {active && (
        <motion.div
          layoutId="bottomnav-dot"
          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_6px_theme(colors.emerald.500)]"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
}

export function NavBar() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = translations[language];
  const [mobileOpen, setMobileOpen] = useState(false);
  const mouseX = useMotionValue(-1);

  const labels: Record<string, string> = {
    home: t.home,
    projects: t.projects,
    cv: t.cv,
    contact: t.contact,
    live: t.live,
  };

  return (
    <>
      {/* ── Desktop Top Bar ── */}
      <header className="sticky top-0 z-40 hidden lg:block bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-white/5">
        <div className="max-w-5xl mx-auto flex items-center justify-between h-14 px-6">
          {/* Left: Avatar + Name */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <AvatarImage size={32} priority />
            <div>
              <h1 className="text-sm font-bold text-zinc-900 dark:text-white leading-none">
                Abdul Gofur
              </h1>
              <p className="text-[11px] text-zinc-500 leading-none mt-0.5">
                {t.fullstackDev}
              </p>
            </div>
          </Link>

          {/* Center: Nav Links */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={labels[item.key]}
                active={isActive(pathname, item.href)}
              />
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                window.dispatchEvent(
                  new KeyboardEvent("keydown", {
                    key: "k",
                    metaKey: true,
                    ctrlKey: true,
                  })
                );
              }}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors"
            >
              <Search className="w-3 h-3" />
              <kbd className="font-mono">⌘K</kbd>
            </button>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── Mobile Top Bar ── */}
      <header className="sticky top-0 z-40 lg:hidden bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-white/5">
        <div className="flex items-center justify-between h-12 px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <AvatarImage size={28} priority />
            <h1 className="text-sm font-bold text-zinc-900 dark:text-white">
              Abdul Gofur
            </h1>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-zinc-200 dark:border-white/5 px-4 pb-3"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    active
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{labels[item.key]}</span>
                </Link>
              );
            })}
          </motion.nav>
        )}
      </header>

      {/* ── Mobile Bottom Dock ── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(-1)}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          if (touch) mouseX.set(touch.clientX);
        }}
        onTouchEnd={() => mouseX.set(-1)}
      >
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 dark:from-black/80 to-transparent pointer-events-none" />
        <div className="relative flex justify-center px-6 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-around w-[85%] max-w-sm bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl rounded-[1.75rem] shadow-2xl shadow-zinc-300/50 dark:shadow-black/30 border border-zinc-200 dark:border-white/[0.06] px-1.5 py-0.5 pointer-events-auto">
            {navItems.map((item) => (
              <DockItem
                key={item.key}
                href={item.href}
                icon={item.icon}
                label={labels[item.key]}
                active={isActive(pathname, item.href)}
                mouseX={mouseX}
              />
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
