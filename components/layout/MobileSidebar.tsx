'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  User,
  Mail,
  Radio,
  BookOpen,
  X,
  Briefcase,
  Route,
  DollarSign,
  MessageSquare,
  HelpCircle,
  Shield,
  Building2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from '@/lib/utils';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard, path: '/' },
  { id: 'services', label: 'Layanan', icon: Briefcase, path: '/services' },
  { id: 'process', label: 'Proses Kerja', icon: Route, path: '/process' },
  { id: 'pricing', label: 'Harga', icon: DollarSign, path: '/pricing' },
  { id: 'projects', label: 'Case Studies', icon: FolderKanban, path: '/projects' },
  { id: 'testimonials', label: 'Testimoni', icon: MessageSquare, path: '/testimonials' },
  { id: 'faq', label: 'FAQ', icon: HelpCircle, path: '/faq' },
  { id: 'live', label: 'Live Proof', icon: Radio, path: '/live' },
  { id: 'blog', label: 'Blog', icon: BookOpen, path: '/blog' },
  { id: 'about', label: 'Founder', icon: User, path: '/about' },
  { id: 'cv', label: 'Profil Studio', icon: Building2, path: '/cv' },
  { id: 'contact', label: 'Konsultasi', icon: Mail, path: '/contact' },
  { id: 'admin', label: 'Admin', icon: Shield, path: '/admin/dashboard' },
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
            className="fixed inset-y-0 left-0 w-[260px] bg-[#FAFAFA] border-r border-neutral-300 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="h-[60px] flex items-center justify-between px-6">
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-[22px] font-extrabold text-neutral-900 tracking-tight"
                style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif", letterSpacing: '-0.05em' }}
              >nasaq<span className="text-[#c4956a]">.id</span></motion.h1>
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                onClick={onClose}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-900 hover:bg-neutral-100 transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </motion.button>
            </div>

            {/* Nav */}
            <motion.nav
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5"
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
                      'w-full flex items-center gap-2.5 rounded-lg transition-colors text-left text-[13px] px-3 py-[7px]',
                      isActive
                        ? 'bg-[#FAFAFA] text-[#a67d55] font-medium'
                        : 'text-neutral-900 hover:bg-neutral-100'
                    )}
                  >
                    <Icon
                      className={clsx(
                        'w-[18px] h-[18px] flex-shrink-0',
                        isActive ? 'text-[#c4956a]' : 'text-neutral-900'
                      )}
                      strokeWidth={1.5}
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
              className="border-t border-neutral-300 py-4 px-4"
            >
              <p className="text-[11px] text-neutral-500">© {new Date().getFullYear()} nasaq</p>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
