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
} from 'lucide-react';
import { clsx } from '@/lib/utils';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'services', label: 'Layanan', icon: Briefcase, path: '/services' },
  { id: 'process', label: 'Proses Kerja', icon: Route, path: '/process' },
  { id: 'pricing', label: 'Harga', icon: DollarSign, path: '/pricing' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, path: '/projects' },
  { id: 'testimonials', label: 'Testimoni', icon: MessageSquare, path: '/testimonials' },
  { id: 'faq', label: 'FAQ', icon: HelpCircle, path: '/faq' },
  { id: 'live', label: 'Live', icon: Radio, path: '/live' },
  { id: 'blog', label: 'Blog', icon: BookOpen, path: '/blog' },
  { id: 'about', label: 'About Me', icon: User, path: '/about' },
  { id: 'contact', label: 'Contact', icon: Mail, path: '/contact' },
  { id: 'admin', label: 'Admin', icon: Shield, path: '/admin/dashboard' },
];

export const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div className="fixed inset-y-0 left-0 w-[260px] bg-[#FAFAFA] border-r border-neutral-300 flex flex-col">
        {/* Header — standalone text "nasaq" */}
        <div className="h-[60px] flex items-center justify-between px-6">
          <h1
            className="text-[20px] text-neutral-900"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 350, letterSpacing: '-0.03em' }}
          >nasaq</h1>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {navItems.map(item => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                  onClose();
                }}
                className={clsx(
                  'w-full flex items-center gap-2.5 rounded-lg transition-colors text-left text-[13px] px-3 py-[7px]',
                  isActive
                    ? 'bg-[#FAFAFA] text-[#0F766E] font-medium'
                    : 'text-neutral-900 hover:bg-neutral-100'
                )}
              >
                <Icon
                  className={clsx(
                    'w-[18px] h-[18px] flex-shrink-0',
                    isActive ? 'text-[#0D9488]' : 'text-neutral-900'
                  )}
                  strokeWidth={1.5}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-neutral-300 py-4 px-4">
          <p className="text-[11px] text-neutral-500">© 2025 nasaq</p>
        </div>
      </div>
    </div>
  );
};
