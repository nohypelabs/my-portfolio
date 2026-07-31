'use client';

import { motion } from 'framer-motion';
import { Play, Monitor, Smartphone, Server, Shield } from 'lucide-react';
import { useState } from 'react';

const showcases = [
  {
    title: 'Dashboard Analytics',
    desc: 'Real-time monitoring dengan chart interaktif',
    icon: Monitor,
    color: 'bg-accent-light',
  },
  {
    title: 'Mobile-First Design',
    desc: 'Optimized untuk semua device',
    icon: Smartphone,
    color: 'bg-money',
  },
  {
    title: 'Backend Architecture',
    desc: 'Scalable API & database design',
    icon: Server,
    color: 'bg-splash',
  },
  {
    title: 'Security & Auth',
    desc: 'Role-based access & encryption',
    icon: Shield,
    color: 'bg-double',
  },
];

export function VideoShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-foreground">Bagaimana Kami Membangun</h2>
        <p className="text-[12px] text-neutral-500 mt-1">Behind the scene dari setiap project</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Video placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative bg-foreground rounded-[8px] overflow-hidden aspect-video group cursor-pointer"
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Center play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-accent-light border-2 border-foreground shadow-[6px_6px_0_0_var(--color-border)] flex items-center justify-center group-hover:bg-double transition-colors"
            >
              <Play className="w-6 h-6 text-foreground ml-1" fill="currentColor" />
            </motion.div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] text-white/60 font-medium">SHOWREEL 2024-2026</span>
            </div>
            <p className="text-[13px] text-white font-semibold mt-1">nasaq.id — Production Systems</p>
          </div>
        </motion.div>

        {/* Showcase cards */}
        <div className="grid grid-cols-2 gap-3">
          {showcases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setActiveIndex(i)}
              className={`neo-surface rounded-[8px] p-4 transition-all cursor-default group ${
                activeIndex === i
                  ? 'shadow-md'
                  : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-[8px] border-2 border-foreground ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-5 h-5 ${activeIndex === i ? 'text-foreground' : 'text-neutral-500'} transition-colors`} />
              </div>
              <h3 className="text-[12px] font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-[10px] text-neutral-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
