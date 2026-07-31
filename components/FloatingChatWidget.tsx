'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Send } from 'lucide-react';
import Link from 'next/link';

const WHATSAPP_NUMBER = '6281221575053';
const DEFAULT_MESSAGE = 'Halo, saya tertarik dengan jasa pembuatan sistem web. Bisa konsultasi?';

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mb-3 neo-surface rounded-[8px] shadow-2xl overflow-hidden w-72"
          >
            {/* Header */}
            <div className="bg-accent-light border-b-2 border-foreground p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border-2 border-foreground bg-surface flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">nasaq.id</p>
                    <p className="text-[10px] text-foreground/70">Biasanya online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full border-2 border-foreground bg-surface hover:bg-double flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-foreground" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <div className="bg-surface border-2 border-foreground rounded-[8px] rounded-tl-sm p-3">
                <p className="text-[12px] text-neutral-700 leading-relaxed">
                  Halo! Butuh bantuan bikin sistem web atau app? Konsultasi gratis, langsung chat aja!
                </p>
              </div>

              {/* Quick actions */}
              <div className="space-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 bg-money hover:bg-double text-foreground border-2 border-foreground rounded-[8px] transition-colors group"
                >
                  <Phone className="w-4 h-4" />
                  <div className="flex-1 text-left">
                    <p className="text-[12px] font-semibold">Chat WhatsApp</p>
                    <p className="text-[10px] text-foreground/70">Respon cepat</p>
                  </div>
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 w-full px-4 py-3 bg-surface hover:bg-double text-foreground border-2 border-foreground rounded-[8px] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-accent" />
                  <div className="flex-1 text-left">
                    <p className="text-[12px] font-semibold">Form Kontak</p>
                    <p className="text-[10px] text-neutral-500">Email response</p>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-accent-light text-foreground border-2 border-foreground shadow-lg flex items-center justify-center hover:bg-double hover:shadow-xl transition-all"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-accent-light animate-ping opacity-20" />
        )}
      </motion.button>
    </div>
  );
}
