"use client";

import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Search } from "lucide-react";

export function TopBar() {
  const { language } = useLanguage();
  const t = translations[language];

  const openCmdK = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  };

  return (
    <div className="sticky top-0 z-30 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800/50 transition-all duration-300">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        <div className="w-9 lg:hidden" />
        <p className="text-xs md:text-sm font-bold text-center flex-1 truncate">
          <span className="md:hidden">
            <span className="text-emerald-400">Full-stack Dev</span>
            <span className="text-zinc-500"> & </span>
            <span className="text-zinc-200">AI Engineer</span>
          </span>
          <span className="hidden md:inline">
            <span className="text-emerald-400">Full-stack Developer</span>
            <span className="text-zinc-500"> & </span>
            <span className="text-zinc-200">AI-Augmented Engineer</span>
          </span>
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={openCmdK}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-zinc-300 hover:border-zinc-600/50 transition-colors text-xs"
          >
            <Search className="w-3 h-3" />
            <span className="font-mono text-[10px]">⌘K</span>
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
