"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, User, FolderOpen, FileText, Mail } from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

const navItems = [
  { key: "home" as const, href: "/", icon: Home },
  { key: "about" as const, href: "/about", icon: User },
  { key: "cv" as const, href: "/cv", icon: FileText },
  { key: "contact" as const, href: "/contact", icon: Mail },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = translations[language];

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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-t border-zinc-200/50 dark:border-zinc-800/50">
        <div className="flex items-center justify-around px-2 py-1 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className="relative flex flex-col items-center gap-0.5 px-3 py-2 min-w-[4rem] rounded-2xl transition-colors"
              >
                {active && (
                  <motion.div
                    layoutId="bottomnav-active"
                    className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-2xl"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <div className="relative">
                  {active && (
                    <motion.div
                      layoutId="bottomnav-dot"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      active
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-zinc-400 dark:text-zinc-500"
                    }`}
                    strokeWidth={active ? 2.5 : 2}
                  />
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    active
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-zinc-400 dark:text-zinc-500"
                  }`}
                >
                  {labels[item.key]}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
