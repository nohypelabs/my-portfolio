'use client';

import { Header } from "@/components/layout/Header";
import { MobileSidebarWrapper } from "@/components/layout/MobileSidebarWrapper";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { PageTransition } from "@/components/PageTransition";
import { Footer } from "@/components/layout/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // SidebarProvider must be outside SmoothScrollProvider: the scroll provider
    // reads sidebar state to stop Lenis while the drawer is open.
    <SidebarProvider>
      <SmoothScrollProvider>
        <div className="min-h-screen bg-background">
          <a href="#main" className="skip-link">
            Lewati ke konten utama
          </a>

          {/* Top navigation bar */}
          <Header />

          {/* Mobile slide-over menu */}
          <MobileSidebarWrapper />

          <main id="main">
            <div className="p-6 lg:p-8 max-w-[1440px] mx-auto">
              <PageTransition>{children}</PageTransition>
            </div>
          </main>

          <Footer />
        </div>
      </SmoothScrollProvider>
    </SidebarProvider>
  );
}
