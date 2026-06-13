'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WordRotateProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function WordRotate({ words, interval = 3000, className = '' }: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  useEffect(() => {
    if (!measureRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const max = Math.max(...words.map((w) => {
        const el = document.createElement('span');
        el.style.visibility = 'hidden';
        el.style.position = 'absolute';
        el.style.whiteSpace = 'nowrap';
        el.style.fontSize = 'inherit';
        el.style.fontWeight = 'inherit';
        el.style.fontFamily = 'inherit';
        el.textContent = w;
        document.body.appendChild(el);
        const w2 = el.offsetWidth;
        document.body.removeChild(el);
        return w2;
      }));
      setWidth(max);
    });
    observer.observe(measureRef.current);
    return () => observer.disconnect();
  }, [words]);

  return (
    <span
      ref={measureRef}
      className={`inline-block relative ${className}`}
      style={{ minWidth: width || 120 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="block whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
