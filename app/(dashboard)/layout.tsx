import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

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
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800/50 transition-all duration-300">
          <div className="flex items-center justify-end px-4 md:px-6 py-3">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 pb-24 lg:pb-6">
          {children}
        </div>
      </main>
    </div>
  );
}
