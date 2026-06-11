'use client';

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileSidebarWrapper } from "@/components/layout/MobileSidebarWrapper";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { PageTransition } from "@/components/PageTransition";
import { clsx } from "@/lib/utils";

function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile sidebar (uses context) */}
      <MobileSidebarWrapper />

      {/* Main content area */}
      <MainContent>{children}</MainContent>
    </div>
  );
}

function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <>
      <Header />
      <main
        className={clsx(
          "pb-20 lg:pb-0 transition-[padding-left] duration-200",
          isCollapsed ? "lg:pl-[50px]" : "lg:pl-[260px]"
        )}
      >
        <div className="p-6 lg:p-8 max-w-[1440px] mx-auto">
          <PageTransition>{children}</PageTransition>
        </div>
      </main>
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardShell>{children}</DashboardShell>
    </SidebarProvider>
  );
}
