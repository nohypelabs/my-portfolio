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
    useTransform(distance, [0, 80, 150], [1.25, 1.05, 1]),
    { stiffness: 400, damping: 25 }
  );

  return (
    <Link
      ref={ref}
      href={href}
      className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl transition-all duration-200 active:scale-95 touch-none"
    >
      <motion.div
        className="relative"
        style={{ scale }}
      >
        <Icon
          className={`w-6 h-6 transition-colors ${
            active
              ? "text-emerald-500"
              : "text-zinc-500"
          }`}
          strokeWidth={active ? 2.5 : 2}
        />
        {active && (
          <motion.div
            layoutId="floating-dot"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.div>
      <span
        className={`text-[11px] font-medium transition-colors ${
          active
            ? "text-emerald-500"
            : "text-zinc-500"
        }`}
      >
        {label}
      </span>
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
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(-1)}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        if (touch) mouseX.set(touch.clientX);
      }}
      onTouchEnd={() => mouseX.set(-1)}
    >
      <div className="flex justify-center px-6 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-around w-[85%] max-w-sm bg-zinc-900/80 backdrop-blur-2xl rounded-[2rem] shadow-2xl shadow-black/20 border border-zinc-700/30 px-2 py-0.5 pointer-events-auto">
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
