"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FolderOpen,
  FolderClosed,
  ChevronRight,
  User,
  Mail,
  X,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { AvatarImage } from "@/components/AvatarImage";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { projects } from "@/lib/data/projects";
import { ongoingProjects } from "@/lib/data/ongoingProjects";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const [expandedItems, setExpandedItems] = useState<string[]>([t.completedProjects, t.ongoingProjects]);
  const pathname = usePathname();

  const completedProjectsChildren = projects
    .filter(p => p.status === 'production')
    .map(p => ({
      name: p.title,
      href: `/projects/${p.id}`
    }));

  const ongoingProjectsChildren = ongoingProjects
    .filter(p => (p.progress ?? 0) >= 65)
    .sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0))
    .map(p => ({
      name: p.name,
      href: `/ongoing/${p.id}`
    }));

  const sidebarItems = [
    { name: t.home, href: "/", icon: Home },
    { name: t.about, href: "/about", icon: User },
    {
      name: `${t.completedProjects} (${completedProjectsChildren.length})`,
      icon: FolderOpen,
      children: completedProjectsChildren
    },
    {
      name: `${t.ongoingProjects} (${ongoingProjectsChildren.length})`,
      icon: FolderClosed,
      children: ongoingProjectsChildren
    },
    { name: t.cv, href: "/cv", icon: FileText },
    { name: t.contact, href: "/contact", icon: Mail }
  ];

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      isOpen ? '280px' : '80px'
    );
  }, [isOpen]);

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

  const isActive = (href: string) => pathname === href;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <AvatarImage size={isOpen ? 42 : 36} priority />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-zinc-950" />
          </div>
          {isOpen && (
            <Link href="/" className="min-w-0 group">
              <h2 className="font-bold text-sm text-white truncate group-hover:text-emerald-400 transition-colors">Abdul Gofur</h2>
              <p className="text-[11px] text-zinc-500 truncate">{t.fullstackDev}</p>
            </Link>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
        {sidebarItems.map((item) => {
          if (item.children) {
            const isExpanded = expandedItems.includes(item.name);
            const Icon = item.icon;
            const hasActiveChild = item.children.some(c => isActive(c.href));

            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleExpanded(item.name)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                    hasActiveChild
                      ? "bg-emerald-500/5 text-emerald-400"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    hasActiveChild ? "bg-emerald-500/10" : "bg-white/5 group-hover:bg-white/10"
                  }`}>
                    <Icon className="w-4 h-4 flex-shrink-0" />
                  </div>
                  {isOpen && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium">{item.name}</span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                      </motion.div>
                    </>
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-5 mt-1 pl-4 border-l border-white/5 space-y-0.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`block px-3 py-1.5 rounded-lg text-[13px] transition-all duration-200 ${
                              isActive(child.href)
                                ? "bg-emerald-500/10 text-emerald-400 font-medium"
                                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className={`w-1 h-1 rounded-full ${
                                isActive(child.href) ? "bg-emerald-500" : "bg-zinc-700"
                              }`} />
                              <span className="truncate">{child.name}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                active
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-emerald-500 rounded-r-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <div className={`p-1.5 rounded-lg transition-colors ${
                active ? "bg-emerald-500/15" : "bg-white/5 group-hover:bg-white/10"
              }`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
              </div>
              {isOpen && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer - Toggle (Desktop only) */}
      {!isMobileOpen && (
        <div className="hidden lg:block p-3 border-t border-white/5">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all duration-200"
          >
            {isOpen ? (
              <>
                <PanelLeftClose className="w-4 h-4" />
                <span className="text-xs font-medium">{language === "en" ? "Collapse" : "Perkecil"}</span>
              </>
            ) : (
              <PanelLeftOpen className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-3 left-4 z-50 rounded-full ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/10 overflow-hidden w-9 h-9 transition-transform active:scale-90"
      >
        {isMobileOpen ? (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
            <X className="w-4 h-4 text-white" />
          </div>
        ) : (
          <Image
            src="/avatar.jpg"
            alt="Menu"
            width={36}
            height={36}
            className="w-full h-full object-cover"
          />
        )}
      </button>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 280 : 80 }}
        className="hidden lg:block fixed left-0 top-0 h-screen bg-zinc-950/95 backdrop-blur-xl border-r border-white/5 z-40"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-72 bg-zinc-950/95 backdrop-blur-xl border-r border-white/5 z-50"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
