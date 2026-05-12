"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, FileText, Mail, FolderOpen, Clock, Activity, Search } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { ongoingProjects } from "@/lib/data/ongoingProjects";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

interface CommandItem {
  id: string;
  label: string;
  href: string;
  icon: typeof Home;
  group: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

  const items = useMemo<CommandItem[]>(() => {
    const nav: CommandItem[] = [
      { id: "home", label: t.home, href: "/", icon: Home, group: "Navigation" },
      { id: "projects-page", label: t.projects, href: "/projects", icon: FolderOpen, group: "Navigation" },
      { id: "live", label: t.liveProductionData, href: "/live", icon: Activity, group: "Navigation" },
      { id: "cv", label: t.cv, href: "/cv", icon: FileText, group: "Navigation" },
      { id: "contact", label: t.contact, href: "/contact", icon: Mail, group: "Navigation" },
    ];

    const proj = projects.filter(p => p.status === "production").map(p => ({
      id: `p-${p.id}`,
      label: p.title,
      href: `/projects/${p.id}`,
      icon: FolderOpen,
      group: t.completedProjects,
    }));

    const ongoing = ongoingProjects.map(p => ({
      id: `o-${p.id}`,
      label: p.name,
      href: `/ongoing/${p.id}`,
      icon: Clock,
      group: t.ongoingProjects,
    }));

    return [...nav, ...proj, ...ongoing];
  }, [t]);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(item =>
      item.label.toLowerCase().includes(q) ||
      item.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  const go = useCallback((item: CommandItem) => {
    setOpen(false);
    setQuery("");
    router.push(item.href);
  }, [router]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected(i => (i + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected(i => (i - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter" && filtered[selected]) {
        go(filtered[selected]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selected, go]);

  useEffect(() => setSelected(0), [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={() => { setOpen(false); setQuery(""); }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[90vw] max-w-lg z-[101] bg-zinc-900 border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
              <Search className="w-5 h-5 text-zinc-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === "en" ? "Search pages, projects..." : "Cari halaman, proyek..."}
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-zinc-500"
                autoFocus
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-400 font-mono">
                ESC
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-zinc-500">
                  {language === "en" ? "No results found" : "Tidak ada hasil"}
                </p>
              )}
              {(() => {
                let lastGroup = "";
                return filtered.map((item, i) => {
                  const Icon = item.icon;
                  const showGroup = item.group !== lastGroup;
                  lastGroup = item.group;
                  return (
                    <div key={item.id}>
                      {showGroup && (
                        <p className="px-4 pt-3 pb-1 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                          {item.group}
                        </p>
                      )}
                      <button
                        onClick={() => go(item)}
                        onMouseEnter={() => setSelected(i)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          i === selected
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "text-zinc-300 hover:bg-zinc-800/50"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="text-sm truncate">{item.label}</span>
                      </button>
                    </div>
                  );
                });
              })()}
            </div>

            <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono">↵</kbd>
                  select
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono">esc</kbd>
                close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
