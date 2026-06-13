'use client';

import { motion } from 'framer-motion';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-[#c4956a] via-[#e8c9a8] to-[#c4956a] bg-[length:200%_auto] ${className}`}
      animate={{
        backgroundPosition: ['0% center', '200% center'],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
}
