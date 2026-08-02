'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSidebar } from '@/contexts/SidebarContext';
import { clsx } from '@/lib/utils';
import { useState } from 'react';
import { EnergySaverPanel } from '@/components/layout/EnergySaverPanel';

interface NavItem {
  label: string;
  path: string;
}

const primaryNav: NavItem[] = [
  { label: 'Layanan & Harga', path: '/services' },
  { label: 'Portfolio', path: '/projects' },
  { label: 'Hubungi Kami', path: '/contact' },
];

function isActive(pathname: string, path: string) {
  return pathname === path || (path !== '/' && pathname.startsWith(path));
}

export const Header = () => {
  const pathname = usePathname();
  const { openMobileSidebar } = useSidebar();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <header className="sticky top-4 z-40 mx-4 md:mx-8">
      <div className="glass rounded-2xl">
        <div className="flex items-center justify-between gap-4 h-[62px] px-3.5 lg:px-5 max-w-[1400px] mx-auto">
          {/* Left: Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/"
              className="flex items-baseline gap-0.5 font-display text-[19px] font-bold tracking-tight text-foreground transition-colors hover:text-accent"
              style={{ letterSpacing: '-0.04em' }}
            >
              nasaq
              <span className="text-accent">.id</span>
            </Link>

            {/* Silent live link — production proof */}
            <Link
              href="/live"
              className="hidden xl:inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold text-muted transition-colors hover:text-accent"
              style={{ letterSpacing: '0.06em' }}
            >
              <Activity className="h-3 w-3 text-money" strokeWidth={2.4} />
              LIVE
            </Link>
          </div>

          {/* Center: Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 relative z-10">
            {primaryNav.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={clsx(
                  'relative px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 z-10 select-none',
                  isActive(pathname, item.path)
                    ? 'text-white'
                    : 'text-foreground/80 hover:text-foreground'
                )}
                onMouseEnter={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {hoveredPath === item.path && !isActive(pathname, item.path) && (
                  <motion.span
                    layoutId="nav-hover-highlight"
                    className="absolute inset-0 rounded-full bg-foreground/[0.06] z-[-1]"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                  />
                )}
                {isActive(pathname, item.path) && (
                  <motion.span
                    layoutId="nav-active-highlight"
                    className="absolute inset-0 rounded-full bg-accent z-[-1]"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right: Energy panel + CTA + mobile menu */}
          <div className="flex items-center gap-2">
            <EnergySaverPanel />

            <Link
              href="/contact"
              className="hidden md:inline-flex btn-primary px-4 py-2 text-[13px]"
            >
              Konsultasi
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>

            <button
              onClick={openMobileSidebar}
              className="lg:hidden neo-button w-10 h-10 rounded-xl flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};