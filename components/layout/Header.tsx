'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Github, Menu } from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';
import { clsx } from '@/lib/utils';

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Overview', subtitle: 'Website, company profile, dan sistem operasional untuk bisnis yang ingin naik kelas' },
  '/services': { title: 'Layanan', subtitle: 'Company profile, dashboard internal, dan build custom yang bisa langsung dipakai' },
  '/process': { title: 'Proses Kerja', subtitle: 'Bedah kebutuhan dulu, baru desain dan build' },
  '/pricing': { title: 'Harga', subtitle: 'Paket awal transparan, scope lanjutnya tetap fleksibel' },
  '/projects': { title: 'Case Studies', subtitle: 'Hasil build nyata dengan konteks bisnis yang jelas' },
  '/testimonials': { title: 'Review Klien', subtitle: 'Apa yang berubah setelah sistem dipakai tim mereka' },
  '/faq': { title: 'FAQ', subtitle: 'Pertanyaan yang sering ditanyakan' },
  '/live': { title: 'Live Proof', subtitle: 'Data dan aktivitas dari sistem yang benar-benar berjalan' },
  '/blog': { title: 'Blog', subtitle: 'Catatan shipping, engineering, dan product thinking' },
  '/about': { title: 'Founder', subtitle: 'Latar belakang, cara berpikir, dan kenapa nasaq.id dibangun' },
  '/cv': { title: 'Profil Studio', subtitle: 'Ringkasan positioning, cara kerja, dan kenapa client order ke nasaq.id' },
  '/contact': { title: 'Konsultasi', subtitle: 'Ceritakan kebutuhan Anda, kami bantu breakdown scope-nya' },
  '/order': { title: 'Brief Project', subtitle: 'Kirim kebutuhan awal untuk estimasi dan langkah berikutnya' },
  '/admin/dashboard': { title: 'Admin Dashboard', subtitle: 'Kelola konten nasaq.id' },
  '/admin/pricing': { title: 'Kelola Harga', subtitle: 'Edit paket dan harga' },
  '/admin/services': { title: 'Kelola Layanan', subtitle: 'Edit layanan yang ditawarkan' },
  '/admin/testimonials': { title: 'Kelola Testimoni', subtitle: 'Edit testimoni klien' },
  '/admin/faqs': { title: 'Kelola FAQ', subtitle: 'Edit pertanyaan umum' },
  '/admin/orders': { title: 'Kelola Pesanan', subtitle: 'Lihat dan kelola pesanan' },
  '/admin/login': { title: 'Admin Login', subtitle: 'Masuk ke panel admin' },
};

export const Header = () => {
  const pathname = usePathname();
  const { isCollapsed, openMobileSidebar } = useSidebar();

  // Find matching page meta (handle dynamic routes)
  const meta = pageMeta[pathname] || (() => {
    const match = Object.entries(pageMeta).find(([key]) =>
      key !== '/' && pathname.startsWith(key)
    );
    return match ? match[1] : { title: 'nasaq.id', subtitle: 'Founder-led digital product studio' };
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
              className="text-[20px] font-extrabold text-neutral-900 tracking-tight"
              style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif", letterSpacing: '-0.05em' }}
            >nasaq<span className="text-[#c4956a]">.id</span></h1>
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
            className="w-9 h-9 rounded-lg flex items-center justify-center text-neutral-900 hover:bg-[#FAFAFA] hover:text-[#c4956a] transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </a>
          <Link
            href="/order"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-400 text-[12px] font-medium text-neutral-900 hover:bg-[#c4956a] hover:text-white hover:border-[#c4956a] transition-all"
          >
            <span>Konsultasi</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </header>
  );
};
