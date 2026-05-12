import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { PageTransition } from "@/components/PageTransition";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CommandPalette } from "@/components/CommandPalette";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingContact } from "@/components/FloatingContact";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <ScrollProgress />
      <CommandPalette />
      <CustomCursor />
      <NavBar />
      <PWAInstallPrompt />
      <FloatingContact />

      <main className="min-h-screen">
        <div className="p-6 pb-24 lg:pb-6">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
        <Footer />
      </main>
    </div>
  );
}
