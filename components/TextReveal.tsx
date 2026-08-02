"use client";

import { motion } from "framer-motion";
import { useEnergySaver } from "@/contexts/EnergySaverContext";

interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
}

/**
 * Word-mask reveal — the "swipe-up" ink reveal used across noho-style sites.
 * Honors the EnergySaverPanel reduce-motion flag.
 */
export function TextReveal({ text, className = "", once = true }: TextRevealProps) {
  const { reduceMotion } = useEnergySaver();

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={{ hidden: {}, visible: {} }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      transition={{ staggerChildren: 0.06, delayChildren: 0.05 }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
        <motion.span
          className="inline-block"
          variants={{
            hidden: { y: "115%" },
            visible: { y: 0 },
          }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
        </span>
      ))}
    </motion.span>
  );
}