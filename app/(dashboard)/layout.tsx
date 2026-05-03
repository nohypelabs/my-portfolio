import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { TopBar } from "@/components/layout/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Sidebar />
      <BottomNav />
      <PWAInstallPrompt />

      {/* Main Content */}
      <main className="lg:ml-[var(--sidebar-width,280px)] min-h-screen transition-all duration-300">
        <TopBar />

        {/* Page Content */}
        <div className="p-6 pb-24 lg:pb-6">
          {children}
        </div>
      </main>
    </div>
  );
}
