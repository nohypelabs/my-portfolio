"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/Marquee";

const clients = [
  { name: "J&T Express", initial: "J&T", color: "from-red-500 to-red-600" },
  { name: "Serat QC", initial: "SQ", color: "from-emerald-500 to-emerald-600" },
  { name: "WC Check", initial: "WC", color: "from-blue-500 to-blue-600" },
  { name: "LakuPOS", initial: "LP", color: "from-purple-500 to-purple-600" },
  { name: "Qohira", initial: "QH", color: "from-orange-500 to-orange-600" },
  { name: "nasaq.id", initial: "NQ", color: "from-[#c4956a] to-[#a67d55]" },
];

export function ClientLogos() {
  return (
    <section className="space-y-4">
      <p className="text-center text-[11px] text-neutral-400 tracking-wide uppercase font-medium">
        Dipercaya oleh bisnis nyata
      </p>

      <div className="neo-surface rounded-2xl py-5 overflow-hidden">
        <Marquee speed={20} pauseOnHover>
          {[...clients, ...clients].map((client, i) => (
            <motion.div
              key={`${client.name}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % clients.length) * 0.06 }}
              className="flex items-center gap-3 px-5 py-2.5 bg-white border border-neutral-200 rounded-xl hover:border-[#c4956a]/30 hover:shadow-sm transition-all group cursor-default"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${client.color} flex items-center justify-center text-[10px] font-bold text-white shadow-sm group-hover:scale-110 transition-transform`}>
                {client.initial}
              </div>
              <span className="text-[13px] font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors whitespace-nowrap">
                {client.name}
              </span>
            </motion.div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
