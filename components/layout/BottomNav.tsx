"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, FolderOpen, Clock, Mail } from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useRef } from "react";

const navItems = [
  { key: "home" as const, href: "/", icon: Home },
  { key: "projects" as const, href: "/projects", icon: FolderOpen },
  { key: "ongoing" as const, href: "/ongoing", icon: Clock },
  { key: "contact" as const, href: "/contact", icon: Mail },
] as const;

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
      <motion.div
        className="relative z-10"
        style={{ scale }}
      >
        <Icon
          className={`w-[22px] h-[22px] transition-colors duration-200 ${
            active ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-500"
          }`}
          strokeWidth={active ? 2.5 : 1.8}
        />
      </motion.div>
      <span
        className={`relative z-10 text-[10px] font-semibold tracking-wide transition-colors duration-200 ${
          active ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-500"
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

export function BottomNav() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = translations[language];
  const mouseX = useMotionValue(-1);

  const labels: Record<string, string> = {
    home: t.home,
    projects: language === "en" ? "Projects" : "Proyek",
    ongoing: language === "en" ? "Ongoing" : "Berjalan",
    contact: t.contact,
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
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
              active={isActive(item.href)}
              mouseX={mouseX}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
