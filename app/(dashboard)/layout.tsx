'use client';

import { Header } from "@/components/layout/Header";
import { MobileSidebarWrapper } from "@/components/layout/MobileSidebarWrapper";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { ScrollProvider } from "@/contexts/ScrollProvider";
import { PageTransition } from "@/components/PageTransition";
import { Footer } from "@/components/layout/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-background">
          {/* Top navigation bar */}
          <Header />

          {/* Mobile slide-over menu */}
          <MobileSidebarWrapper />

          <main>
            <div className="p-6 lg:p-8 max-w-[1440px] mx-auto">
              <PageTransition>{children}</PageTransition>
            </div>
          </main>

          <Footer />
        </div>
      </SidebarProvider>
    </ScrollProvider>
  );
}
