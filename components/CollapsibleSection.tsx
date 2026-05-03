"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string | number;
  rightContent?: React.ReactNode;
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  badge,
  rightContent,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 mb-4 group"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {typeof title === "string" ? (
            <h2 className="text-2xl font-bold text-left">{title}</h2>
          ) : (
            title
          )}
          {badge !== undefined && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {rightContent}
          <div className="p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700/50 transition-colors">
            <motion.div
              animate={{ rotate: open ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </motion.div>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
