"use client";

import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return;
    }

    // Check if prompt was dismissed before
    const dismissed = localStorage.getItem("pwa-prompt-dismissed");
    if (dismissed) {
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show prompt after 3 seconds
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // For iOS, show manual prompt after 3 seconds
    if (iOS) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt && !isIOS) {
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("PWA installed");
      }

      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-prompt-dismissed", "true");
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 print:hidden"
      >
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-2xl p-6 text-white">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl shrink-0">
              <Download className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Install Portfolio App</h3>

              {isIOS ? (
                <div className="space-y-2 text-sm opacity-95">
                  <p>Install this app on your iPhone:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Tap the Share button <span className="inline-block">⎘</span></li>
                    <li>Scroll and tap "Add to Home Screen"</li>
                    <li>Tap "Add" to confirm</li>
                  </ol>
                </div>
              ) : (
                <p className="text-sm opacity-95 mb-3">
                  Install this app for quick access and offline viewing!
                </p>
              )}

              {!isIOS && deferredPrompt && (
                <button
                  onClick={handleInstallClick}
                  className="mt-3 px-4 py-2 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-neutral-100 transition-colors text-sm"
                >
                  Install Now
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
