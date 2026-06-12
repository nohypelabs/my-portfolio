"use client";

import { motion } from "framer-motion";

const clients = [
  { name: "J&T Express", initial: "J&T" },
  { name: "Serat QC", initial: "SQ" },
  { name: "WC Check", initial: "WC" },
  { name: "LakuPOS", initial: "LP" },
  { name: "Qohira", initial: "QH" },
  { name: "nasaq.id", initial: "NQ" },
];

export function ClientLogos() {
  return (
    <section>
      <p className="text-center text-[11px] text-neutral-400 mb-4 tracking-wide uppercase font-medium">
        Dipercaya oleh bisnis nyata
      </p>
      <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
        {clients.map((client, i) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#FAFAFA] border border-neutral-200 rounded-lg hover:border-[#0D9488]/30 transition-all group"
          >
            <div className="w-7 h-7 rounded-md bg-[#0D9488]/10 flex items-center justify-center text-[10px] font-bold text-[#0D9488] group-hover:bg-[#0D9488]/15 transition-colors">
              {client.initial}
            </div>
            <span className="text-[12px] font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">
              {client.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
