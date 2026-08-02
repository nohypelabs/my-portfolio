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
  hidden: { x: -280 },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30, mass: 0.8 },
  },
  exit: {
    x: -280,
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 left-0 w-[260px] bg-background border-r-2 border-foreground flex flex-col z-50"
          >
            {/* Header */}
            <div className="h-[60px] flex items-center justify-between px-6 border-b-2 border-foreground bg-surface">
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-[20px] font-extrabold text-foreground tracking-tight"
                style={{ fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif", letterSpacing: '-0.04em' }}
              >nasaq<span className="text-accent-light">.id</span></motion.h1>
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                onClick={onClose}
                className="w-8 h-8 rounded-[4px] border-2 border-foreground bg-surface flex items-center justify-center text-foreground hover:bg-accent-bg shadow-[1.5px_1.5px_0px_#141414] transition-all"
              >
                <X className="w-4 h-4" strokeWidth={2.2} />
              </motion.button>
            </div>

            {/* Nav */}
            <motion.nav
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 overflow-y-auto py-5 px-4 space-y-3"
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
                      'w-full flex items-center gap-3 rounded-[4px] border-2 border-foreground transition-all text-left text-[12px] px-3.5 py-2.5 font-mono font-bold shadow-[2px_2px_0px_#141414] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3.5px_3.5px_0px_#141414]',
                      isActive
                        ? 'bg-foreground text-background'
                        : 'bg-surface text-foreground hover:bg-accent-bg'
                    )}
                  >
                    <Icon
                      className={clsx(
                        'w-4 h-4 flex-shrink-0',
                        isActive ? 'text-accent-light' : 'text-foreground'
                      )}
                      strokeWidth={2.2}
                    />
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
              className="border-t-2 border-foreground bg-surface py-4 px-6 font-mono text-[10px]"
            >
              <p className="text-neutral-500 font-bold">© {new Date().getFullYear()} nasaq.id</p>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
