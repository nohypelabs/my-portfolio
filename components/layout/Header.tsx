'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  Menu,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useSidebar } from '@/contexts/SidebarContext';
import { clsx } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface NavItem {
  label: string;
  path: string;
}

const primaryNav: NavItem[] = [
  { label: 'Layanan & Harga', path: '/services' },
  { label: 'Portfolio', path: '/projects' },
  { label: 'Tentang Founder', path: '/about' },
  { label: 'Hubungi Kami', path: '/contact' },
];

function isActive(pathname: string, path: string) {
  return pathname === path || (path !== '/' && pathname.startsWith(path));
}

export const Header = () => {
  const pathname = usePathname();
  const { openMobileSidebar } = useSidebar();

  // States for modern/complex dock interactions
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [timeStr, setTimeStr] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const handle = setTimeout(() => {
      setMounted(true);
    }, 0);

    const updateClock = () => {
      const date = new Date();
      setTimeStr(
        date.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => {
      clearTimeout(handle);
      clearInterval(timer);
    };
  }, []);

  return (
    <header className="sticky top-4 mx-4 md:mx-6 z-40 bg-background/95 backdrop-blur-md border-2 border-foreground shadow-[4px_4px_0px_#141414] rounded-[10px] transition-all duration-300">
      {/* Corner Coordinate Crosshairs (Design Details) */}
      <span className="absolute -top-1.5 -left-1.5 text-[10px] font-extrabold text-foreground pointer-events-none select-none">+</span>
      <span className="absolute -top-1.5 -right-1.5 text-[10px] font-extrabold text-foreground pointer-events-none select-none">+</span>
      <span className="absolute -bottom-1.5 -left-1.5 text-[10px] font-extrabold text-foreground pointer-events-none select-none">+</span>
      <span className="absolute -bottom-1.5 -right-1.5 text-[10px] font-extrabold text-foreground pointer-events-none select-none">+</span>

      <div className="flex items-center justify-between gap-4 h-[60px] px-4 lg:px-6 max-w-[1400px] mx-auto relative">
        {/* Left: Logo & Status Monitor */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Logo — ink sticker */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0 text-[18px] font-extrabold tracking-tight bg-foreground text-background px-2.5 py-1 rounded-[4px] border-2 border-foreground shadow-[3px_3px_0_0_var(--color-accent)] transition-all hover:shadow-[5px_5px_0_0_var(--color-accent)] hover:-translate-x-0.5 hover:-translate-y-0.5"
            style={{ letterSpacing: '-0.04em' }}
          >
            nasaq<span className="text-accent-light">.id</span>
          </Link>

          {/* Studio Monitor Panel (Technical Vibe, links to /live) */}
          <Link
            href="/live"
            className="hidden xl:flex items-center gap-2.5 px-2.5 py-1 border-2 border-foreground bg-surface rounded-[4px] shadow-[2px_2px_0px_#141414] text-[10px] font-bold font-mono hover:bg-accent-bg transition-colors"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-money animate-pulse border border-foreground" />
              SYS: ACTIVE
            </span>
            <span className="text-foreground/30">|</span>
            <span>
              JKT: {mounted ? timeStr : '--:--:--'}
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav with Sliding spring hover highlights */}
        <nav className="hidden lg:flex items-center gap-1.5 relative z-10">
          {primaryNav.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={clsx(
                'relative px-3.5 py-1.5 text-[13px] font-bold border-2 rounded-[4px] transition-all duration-200 z-10 select-none',
                isActive(pathname, item.path)
                  ? 'bg-foreground text-background border-foreground shadow-[2px_2px_0px_#141414]'
                  : 'border-transparent text-foreground hover:text-foreground'
              )}
              onMouseEnter={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              {/* Sliding Background highlight on hover */}
              {hoveredPath === item.path && !isActive(pathname, item.path) && (
                <motion.span
                  layoutId="nav-hover-highlight"
                  className="absolute inset-0 bg-accent-bg border-2 border-foreground rounded-[4px] z-[-1] shadow-[2px_2px_0px_#141414]"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right: CTA + mobile menu */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden sm:inline-flex btn-primary rounded-[4px] px-4 py-2 text-[13px] font-semibold shadow-[2px_2px_0px_#141414]"
          >
            Konsultasi
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>

          <button
            onClick={openMobileSidebar}
            className="lg:hidden neo-button w-9 h-9 rounded-[4px] flex items-center justify-center text-foreground"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </header>
  );
};
