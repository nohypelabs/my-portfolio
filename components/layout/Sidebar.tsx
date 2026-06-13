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
  ChevronsUpDown,
  ExternalLink,
  Building2,
} from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { clsx } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';

interface NavItem {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
  path: string;
}

const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard, path: '/' },
  { id: 'services', label: 'Layanan', icon: Briefcase, path: '/services' },
  { id: 'process', label: 'Proses Kerja', icon: Route, path: '/process' },
  { id: 'pricing', label: 'Harga', icon: DollarSign, path: '/pricing' },
  { id: 'projects', label: 'Case Studies', icon: FolderKanban, path: '/projects' },
  { id: 'testimonials', label: 'Review Klien', icon: MessageSquare, path: '/testimonials' },
  { id: 'faq', label: 'FAQ', icon: HelpCircle, path: '/faq' },
  { id: 'live', label: 'Live Proof', icon: Radio, path: '/live' },
  { id: 'blog', label: 'Insight', icon: BookOpen, path: '/blog' },
  { id: 'about', label: 'Founder', icon: User, path: '/about' },
  { id: 'contact', label: 'Konsultasi', icon: Mail, path: '/contact' },
];

// Pages shown in the chevron dropdown menu
const menuNavItems: NavItem[] = [
  { id: 'admin', label: 'Admin Panel', icon: Shield, path: '/admin/dashboard' },
  { id: 'cv', label: 'Profil Studio', icon: Building2, path: '/cv' },
];

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isCollapsed, toggleCollapsed } = useSidebar();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!showMenu) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowMenu(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showMenu]);

  const NavItem = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
    const Icon = item.icon;

    return (
      <button
        onClick={() => router.push(item.path)}
        className={clsx(
          'w-full flex items-center gap-2.5 rounded-xl transition-all duration-200 text-left text-[13px] relative group',
          isCollapsed ? 'px-0 py-[8px] justify-center' : 'px-3 py-[8px]',
          isActive
            ? 'bg-[#FAFAFA] text-[#a67d55] font-medium shadow-sm border border-neutral-200'
            : 'text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900 border border-transparent'
        )}
      >
        {isActive && !isCollapsed && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#c4956a] rounded-r-full" />
        )}
        <Icon
          className={clsx(
            'w-[18px] h-[18px] flex-shrink-0 transition-colors',
            isActive ? 'text-[#c4956a]' : 'text-neutral-400 group-hover:text-neutral-600'
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
          {!isCollapsed && (
            <h1
              className="text-[22px] font-extrabold text-neutral-900 tracking-tight"
              style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif", letterSpacing: '-0.05em' }}
            >nasaq<span className="text-[#c4956a]">.id</span></h1>
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

        {/* Bottom section — Profile + Options */}
        <div
          className={clsx(
            'border-t border-neutral-300 py-3 flex-shrink-0 relative',
            isCollapsed ? 'px-2' : 'px-3'
          )}
          ref={menuRef}
        >
          {/* Dropdown menu — pops upward */}
          {showMenu && (
            <div className="absolute bottom-full left-3 right-3 mb-1 z-50 bg-[#f7f3e8] border border-neutral-300 rounded-[12px] shadow-lg overflow-hidden">
              <div className="px-4 py-1.5">
                <span className="text-[10px] font-medium text-neutral-700 uppercase tracking-wider">Navigasi</span>
              </div>
              {menuNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setShowMenu(false);
                      router.push(item.path);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#2d2a26] hover:bg-neutral-50 transition-colors text-left"
                  >
                    <Icon className="w-4 h-4 text-[#2d2a26]" strokeWidth={1.5} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Profile row */}
          <div className={clsx(
            'flex items-center',
            isCollapsed ? 'flex-col gap-2' : 'gap-2.5'
          )}>
            {/* Profile area — clickable -> /about */}
            {isCollapsed ? (
              <button
                onClick={() => router.push('/about')}
                title="nasaq.id"
                className="rounded-lg hover:bg-neutral-200/40 transition-colors text-left w-full flex items-center justify-center py-1.5"
              >
                <div className="rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0 w-7 h-7">
                  <img
                    src="/picture/nasaq-id-photo.png"
                    alt="nasaq.id"
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const span = document.createElement('span');
                        span.className = 'text-[13px] font-semibold text-white';
                        span.textContent = 'A';
                        parent.appendChild(span);
                      }
                    }}
                  />
                </div>
              </button>
            ) : (
              <button
                onClick={() => router.push('/about')}
                className="rounded-lg hover:bg-neutral-200/40 transition-colors text-left flex items-center gap-2.5 flex-1 min-w-0 px-2 py-1.5 -ml-2"
              >
                <div className="rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0 w-9 h-9 overflow-hidden">
                  <img
                    src="/picture/nasaq-id-photo.png"
                    alt="nasaq.id"
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const span = document.createElement('span');
                        span.className = 'text-[13px] font-semibold text-white';
                        span.textContent = 'A';
                        parent.appendChild(span);
                      }
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#2d2a26] truncate leading-tight">nasaq.id</p>
                  <p className="text-[11px] text-neutral-500 truncate leading-tight">Founder-led digital studio</p>
                </div>
              </button>
            )}

            {/* Options chevron — only when not collapsed */}
            {!isCollapsed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu((prev) => !prev);
                }}
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-[#2d2a26] hover:bg-neutral-200/40 transition-colors"
                aria-label="Menu opsi"
              >
                <ChevronsUpDown className="w-4 h-4" strokeWidth={1} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
