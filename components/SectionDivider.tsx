'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'tilt' | 'none';
  className?: string;
  flip?: boolean;
}

export function SectionDivider({ variant = 'wave', className = '', flip = false }: SectionDividerProps) {
  if (variant === 'none') return null;

  const paths: Record<string, string> = {
    wave: 'M0,64 C320,120 640,0 960,64 C1280,128 1600,0 1920,64 L1920,128 L0,128 Z',
    curve: 'M0,96 C480,0 1440,0 1920,96 L1920,128 L0,128 Z',
    tilt: 'M0,128 L1920,64 L1920,128 L0,128 Z',
  };

  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}>
      <motion.svg
        viewBox="0 0 1920 128"
        preserveAspectRatio="none"
        className="w-full h-8 md:h-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <path d={paths[variant]} fill="currentColor" className="text-[#f0ead6]" />
      </motion.svg>
    </div>
  );
}
