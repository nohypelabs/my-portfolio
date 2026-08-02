'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  X,
  Briefcase,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from '@/lib/utils';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard, path: '/' },
  { id: 'services', label: 'Layanan & Harga', icon: Briefcase, path: '/services' },
  { id: 'projects', label: 'Portfolio & Proyek', icon: FolderKanban, path: '/projects' },
  { id: 'contact', label: 'Hubungi Kami', icon: Mail, path: '/contact' },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { x: -320 },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30, mass: 0.8 },
  },
  exit: {
    x: -320,
    transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] as const },
  },
};

const navContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.15 },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: 'easeOut' as const },
  },
};

export const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 left-0 w-[280px] glass flex flex-col z-50 border-r"
          >
            {/* Header */}
            <div className="h-[62px] flex items-center justify-between px-6 border-b">
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="font-display text-[20px] font-bold tracking-tight text-foreground"
                style={{ letterSpacing: '-0.04em' }}
              >
                nasaq<span className="text-accent">.id</span>
              </motion.h1>
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:border-accent hover:bg-accent-bg"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" strokeWidth={2.2} />
              </motion.button>
            </div>

            {/* Nav */}
            <motion.nav
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 overflow-y-auto py-5 px-4 space-y-2"
            >
              {navItems.map(item => {
                const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    variants={navItemVariants}
                    onClick={() => {
                      router.push(item.path);
                      onClose();
                    }}
                    className={clsx(
                      'w-full flex items-center gap-3 rounded-xl border transition-all text-left text-[13px] px-4 py-3 font-medium',
                      isActive
                        ? 'bg-accent text-white border-accent'
                        : 'bg-transparent border-transparent text-foreground/80 hover:bg-foreground/[0.05] hover:border-foreground/10'
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={2.2} />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </motion.nav>

            {/* Bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="border-t py-4 px-6 font-mono text-[10px] text-muted"
            >
              <p className="font-semibold">© {new Date().getFullYear()} nasaq.id</p>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};