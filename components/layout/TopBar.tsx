"use client";

import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function TopBar() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="sticky top-0 z-30 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800/50 transition-all duration-300">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        <div className="w-9 lg:hidden" />
        <p className="text-xs md:text-sm font-medium text-zinc-400 text-center flex-1 truncate">
          {t.heroRole}
        </p>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
