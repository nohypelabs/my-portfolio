'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  User,
  Mail,
  Radio,
  BookOpen,
  PanelLeft,
  Briefcase,
  Route,
  DollarSign,
  MessageSquare,
  HelpCircle,
  Shield,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { clsx } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';

interface NavItem {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
  path: string;
}

const mainNavItems: NavItem[] = [
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

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isCollapsed, toggleCollapsed } = useSidebar();

  const NavItem = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
    const Icon = item.icon;

    return (
      <button
        onClick={() => router.push(item.path)}
        className={clsx(
          'w-full flex items-center gap-2.5 rounded-lg transition-colors text-left text-[13px]',
          isCollapsed ? 'px-0 py-[7px] justify-center' : 'px-3 py-[7px]',
          isActive
            ? 'bg-[#FAFAFA] text-[#0F766E] font-medium'
            : 'text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900'
        )}
      >
        <Icon
          className={clsx(
            'w-[18px] h-[18px] flex-shrink-0',
            isActive ? 'text-[#0D9488]' : 'text-neutral-900'
          )}
          strokeWidth={1.5}
        />
        {!isCollapsed && <span>{item.label}</span>}
      </button>
    );
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={clsx(
          'hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:bg-[#FAFAFA] lg:border-r lg:border-neutral-300 lg:z-40 transition-[width] duration-200',
          isCollapsed ? 'lg:w-[50px]' : 'lg:w-[260px]'
        )}
      >
        {/* Header — standalone logo */}
        <div
          className={clsx(
            'h-[60px] flex items-center flex-shrink-0',
            isCollapsed ? 'px-3 justify-center' : 'px-6 justify-between'
          )}
        >
          {/* Logo — standalone text "nasaq" */}
          {!isCollapsed && (
            <h1
              className="text-[20px] text-neutral-900"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 350, letterSpacing: '-0.03em' }}
            >nasaq</h1>
          )}
          <button
            onClick={toggleCollapsed}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-900 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={clsx(
            'flex-1 overflow-y-auto py-3 space-y-0.5',
            isCollapsed ? 'px-2 mt-3' : 'px-3'
          )}
        >
          {mainNavItems.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </nav>

        {/* Bottom section */}
        <div
          className={clsx(
            'border-t border-neutral-300 py-4 flex-shrink-0',
            isCollapsed ? 'px-2' : 'px-4'
          )}
        >
          {!isCollapsed ? (
            <div>
              <p className="text-[10px] text-neutral-400 leading-tight">Built with</p>
              <p className="text-[10px] text-[#0D9488] font-medium truncate">Next.js + Tailwind CSS</p>
            </div>
          ) : (
            <div className="w-6 h-6 mx-auto rounded-full bg-[#FAFAFA] border border-[#0D9488] flex items-center justify-center">
              <span className="text-[8px] text-[#0D9488] font-bold">N</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
