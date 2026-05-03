"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, User, FileText, Mail } from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useRef } from "react";

const navItems = [
  { key: "home" as const, href: "/", icon: Home },
  { key: "about" as const, href: "/about", icon: User },
  { key: "cv" as const, href: "/cv", icon: FileText },
  { key: "contact" as const, href: "/contact", icon: Mail },
] as const;

function DockItem({
  href,
  icon: Icon,
  label,
  active,
  mouseX,
  index,
  total,
}: {
  href: string;
  icon: typeof Home;
  label: string;
  active: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const el = ref.current;
    if (!el || val < 0) return 150;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return Math.abs(val - center);
  });

  const size = useSpring(
    useTransform(distance, [0, 100, 150], [52, 44, 40]),
    { stiffness: 400, damping: 25 }
  );

  const iconSize = useSpring(
    useTransform(distance, [0, 100, 150], [26, 22, 20]),
    { stiffness: 400, damping: 25 }
  );

  return (
    <Link ref={ref} href={href} className="relative flex flex-col items-center gap-0.5 touch-none">
      <motion.div
        className={`relative flex items-center justify-center rounded-2xl transition-colors ${
          active
            ? "bg-emerald-500/15"
            : "bg-transparent"
        }`}
        style={{ width: size, height: size }}
      >
        {active && (
          <motion.div
            layoutId="dock-glow"
            className="absolute inset-0 rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <motion.div style={{ width: iconSize, height: iconSize }} className="relative">
          <Icon
            className={`w-full h-full transition-colors ${
              active
                ? "text-emerald-500"
                : "text-zinc-400 dark:text-zinc-500"
            }`}
            strokeWidth={active ? 2.5 : 1.8}
          />
        </motion.div>
      </motion.div>
      <span
        className={`text-[9px] font-medium transition-colors ${
          active
            ? "text-emerald-500"
            : "text-zinc-400 dark:text-zinc-500"
        }`}
      >
        {label}
      </span>
      {active && (
        <motion.div
          layoutId="dock-dot"
          className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-emerald-500"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
    about: t.about,
    cv: "CV",
    contact: t.contact,
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(-1)}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        if (touch) mouseX.set(touch.clientX);
      }}
      onTouchEnd={() => mouseX.set(-1)}
    >
      <div className="bg-zinc-900/90 backdrop-blur-2xl border-t border-zinc-800/50 shadow-[0_-4px_30px_rgba(0,0,0,0.3)]">
        <div className="flex items-end justify-around px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {navItems.map((item, i) => (
            <DockItem
              key={item.key}
              href={item.href}
              icon={item.icon}
              label={labels[item.key]}
              active={isActive(item.href)}
              mouseX={mouseX}
              index={i}
              total={navItems.length}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
