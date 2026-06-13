"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AvatarImageProps {
  className?: string;
  size?: number;
  priority?: boolean;
}

export function AvatarImage({ className = "", size = 40, priority = false }: AvatarImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Avatar */}
      <div
        className={`relative rounded-full overflow-hidden ring-2 ring-emerald-500/20 shrink-0 cursor-pointer hover:ring-emerald-500/40 transition-all ${className}`}
        style={{ width: size, height: size }}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src="/avatar.jpg"
          alt="nasaq.id"
          fill
          className="object-cover"
          sizes={`${size}px`}
          priority={priority}
        />
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#f7f3e8]/10 hover:bg-[#f7f3e8]/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative w-full max-w-2xl aspect-square rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/avatar.jpg"
                alt="nasaq.id - Full size"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
