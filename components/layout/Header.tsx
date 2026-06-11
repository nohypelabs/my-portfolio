'use client';

import { usePathname } from 'next/navigation';
import { Menu, Github, ExternalLink } from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';
import { clsx } from '@/lib/utils';

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard', subtitle: 'nasaq.id — Production-grade web & mobile systems' },
  '/services': { title: 'Layanan', subtitle: 'Solusi teknologi end-to-end untuk bisnis Anda' },
  '/process': { title: 'Proses Kerja', subtitle: 'Cara kami membangun sistem Anda' },
  '/pricing': { title: 'Harga', subtitle: 'Paket transpran tanpa hidden cost' },
  '/projects': { title: 'Projects', subtitle: 'Production systems & engineering work' },
  '/testimonials': { title: 'Testimoni', subtitle: 'Apa kata klien tentang kami' },
  '/faq': { title: 'FAQ', subtitle: 'Pertanyaan yang sering ditanyakan' },
  '/live': { title: 'Live', subtitle: 'Real-time metrics & activity' },
  '/blog': { title: 'Blog', subtitle: 'Thoughts on engineering & shipping' },
  '/about': { title: 'About Me', subtitle: 'Background, skills & experience' },
  '/contact': { title: 'Contact', subtitle: 'Let\'s build something together' },
  '/order': { title: 'Pesan Layanan', subtitle: 'Mulai project Anda' },
};

export const Header = () => {
  const pathname = usePathname();
  const { isCollapsed, openMobileSidebar } = useSidebar();

  // Find matching page meta (handle dynamic routes)
  const meta = pageMeta[pathname] || (() => {
    const match = Object.entries(pageMeta).find(([key]) =>
      key !== '/' && pathname.startsWith(key)
    );
    return match ? match[1] : { title: 'nasaq', subtitle: 'Enterprise Portfolio' };
  })();

  return (
    <header
      className={clsx(
        'bg-[#FAFAFA] border-b border-neutral-300 sticky top-0 z-30 transition-[padding-left] duration-200',
        isCollapsed ? 'lg:pl-[50px]' : 'lg:pl-[260px]'
      )}
    >
      <div className="flex items-center justify-between h-[59px] px-4 lg:px-8 max-w-[1440px] mx-auto">
        {/* Left: Mobile menu + Page info */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={openMobileSidebar}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-neutral-900 hover:bg-neutral-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Mobile logo — standalone text */}
          <div className="lg:hidden">
            <h1
              className="text-[18px] text-neutral-900"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 350, letterSpacing: '-0.03em' }}
            >nasaq</h1>
          </div>

          {/* Desktop page info */}
          <div className="hidden lg:block">
            <h1 className="text-[15px] font-medium text-neutral-900">{meta.title}</h1>
            <p className="text-[11px] text-neutral-500">{meta.subtitle}</p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/nohypelabs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-neutral-900 hover:bg-[#FAFAFA] hover:text-[#0D9488] transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </a>
          <a
            href="https://abdulgofur-builder.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-400 text-[12px] font-medium text-neutral-900 hover:bg-[#0D9488] hover:text-white hover:border-[#0D9488] transition-all"
          >
            <span>Hire Me</span>
            <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </header>
  );
};
