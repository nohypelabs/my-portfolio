"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/Marquee";
import Image from "next/image";

const clients = [
  { name: "J&T Express", initial: "J&T", logo: "/clients/jt.svg", color: "bg-double text-foreground" },
  { name: "PT Prenacons Internusa", initial: "PR", logo: "/clients/prenacons.png", color: "bg-accent-light text-foreground" },
  { name: "Serat QC", initial: "SQ", color: "bg-money text-foreground" },
  { name: "WC Check", initial: "WC", color: "bg-accent-light text-foreground" },
  { name: "LakuPOS", initial: "LP", color: "bg-splash text-background" },
  { name: "Qohira", initial: "QH", color: "bg-accent text-background" },
  { name: "nasaq.id", initial: "NQ", color: "bg-foreground text-background" },
];

export function ClientLogos() {
  return (
    <section className="space-y-4">
      <p className="text-center text-[11px] text-neutral-400 tracking-wide uppercase font-medium">
        Dipercaya oleh bisnis & mitra nyata
      </p>

      <div className="neo-surface rounded-[8px] py-5 overflow-hidden">
        <Marquee speed={20} pauseOnHover>
          {[...clients, ...clients].map((client, i) => (
            <motion.div
              key={`${client.name}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % clients.length) * 0.06 }}
              className="flex items-center gap-3 px-5 py-2.5 bg-white border-2 border-foreground rounded-[8px] hover:shadow-sm transition-all group cursor-default"
            >
              {client.logo ? (
                <div className="relative w-8 h-8 rounded-lg border-2 border-foreground bg-white flex items-center justify-center overflow-hidden p-1 select-none">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={32}
                    height={32}
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <div className={`w-8 h-8 rounded-lg ${client.color} border-2 border-foreground flex items-center justify-center text-[10px] font-bold`}>
                  {client.initial}
                </div>
              )}
              <span className="text-[13px] font-medium text-neutral-700 group-hover:text-foreground transition-colors whitespace-nowrap">
                {client.name}
              </span>
            </motion.div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
