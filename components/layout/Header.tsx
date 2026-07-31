'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  Building2,
  ChevronDown,
  Menu,
  MessageSquare,
  Radio,
  Shield,
  User,
} from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';
import { clsx } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface NavItem {
  label: string;
  path: string;
}

const primaryNav: NavItem[] = [
  { label: 'Beranda', path: '/' },
  { label: 'Layanan', path: '/services' },
  { label: 'Proses', path: '/process' },
  { label: 'Harga', path: '/pricing' },
  { label: 'Case Studies', path: '/projects' },
  { label: 'FAQ', path: '/faq' },
];

const moreNav: (NavItem & { icon: typeof User })[] = [
  { label: 'Review Klien', path: '/testimonials', icon: MessageSquare },
  { label: 'Live Proof', path: '/live', icon: Radio },
  { label: 'Insight', path: '/blog', icon: BookOpen },
  { label: 'Founder', path: '/about', icon: User },
  { label: 'Profil Studio', path: '/cv', icon: Building2 },
  { label: 'Admin Panel', path: '/admin/dashboard', icon: Shield },
];

function isActive(pathname: string, path: string) {
  return pathname === path || (path !== '/' && pathname.startsWith(path));
}

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { openMobileSidebar } = useSidebar();

  const [showMore, setShowMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowMore(false);
  }, [pathname]);

  useEffect(() => {
    if (!showMore) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMore(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowMore(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showMore]);

  return (
    <header className="sticky top-0 z-40 bg-surface border-b-2 border-foreground">
      <div className="flex items-center justify-between gap-4 h-[64px] px-4 lg:px-8 max-w-[1440px] mx-auto">
        {/* Logo — ink sticker */}
        <Link
          href="/"
          className="flex items-center flex-shrink-0 text-[18px] font-extrabold tracking-tight bg-foreground text-background px-2.5 py-1 rounded-[6px] border-2 border-foreground shadow-[3px_3px_0_0_var(--color-accent)] transition-all hover:shadow-[5px_5px_0_0_var(--color-accent)] hover:-translate-x-0.5 hover:-translate-y-0.5"
          style={{ letterSpacing: '-0.04em' }}
        >
          nasaq<span className="text-accent-light">.id</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {primaryNav.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={clsx(
                'px-3 py-1.5 rounded-[8px] text-[13px] font-semibold border-2 transition-all',
                isActive(pathname, item.path)
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-transparent text-foreground hover:bg-accent-bg hover:border-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* Lainnya dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setShowMore((prev) => !prev)}
              className={clsx(
                'flex items-center gap-1 px-3 py-1.5 rounded-[8px] text-[13px] font-semibold border-2 transition-all',
                showMore
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-transparent text-foreground hover:bg-accent-bg hover:border-foreground'
              )}
              aria-expanded={showMore}
            >
              <span>Lainnya</span>
              <ChevronDown
                className={clsx('w-3.5 h-3.5 transition-transform', showMore && 'rotate-180')}
                strokeWidth={2}
              />
            </button>

            {showMore && (
              <div className="neo-surface absolute right-0 top-full mt-2 w-52 rounded-[8px] overflow-hidden z-50">
                {moreNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => router.push(item.path)}
                      className={clsx(
                        'w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-left transition-colors hover:bg-accent-bg',
                        isActive(pathname, item.path) ? 'text-accent-dark font-semibold' : 'text-foreground'
                      )}
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right: CTA + mobile menu */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden sm:inline-flex btn-primary rounded-[8px] px-4 py-2 text-[13px] font-semibold"
          >
            Konsultasi
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>

          <button
            onClick={openMobileSidebar}
            className="lg:hidden neo-button w-9 h-9 rounded-[8px] flex items-center justify-center text-foreground"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </header>
  );
};
