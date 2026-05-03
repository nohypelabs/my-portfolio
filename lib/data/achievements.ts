export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  metric?: string;
  date?: string;
}

export const achievements: Achievement[] = [
  {
    id: "1",
    title: "4 Production Systems",
    description: "Built and deployed 4 production apps in under 12 months — used daily by real clients in logistics and retail",
    icon: "rocket",
    metric: "4 shipped",
    date: "2025-2026"
  },
  {
    id: "2",
    title: "Core Tech Stack",
    description: "Next.js, TypeScript, tRPC, PostgreSQL, Supabase, Python — the stack I build and ship with every day",
    icon: "code",
    metric: "6 core techs"
  },
  {
    id: "3",
    title: "Production Scale Impact",
    description: "Serat QC alone processes 80K+ resi and 160K+ GPS-watermarked photos. Total across all systems: 250K+ records",
    icon: "trending-up",
    metric: "250K+ records"
  },
  {
    id: "4",
    title: "AI-Augmented Development",
    description: "Early adopter of AI-assisted coding with Claude CLI — shipped 4 production systems in under a year",
    icon: "zap",
    metric: "AI-powered"
  },
  {
    id: "5",
    title: "Full-Stack Versatility",
    description: "From e-commerce to logistics QC, POS systems to toilet monitoring",
    icon: "layers",
    metric: "4 domains"
  },
  {
    id: "6",
    title: "Quality & Testing",
    description: "Implemented comprehensive testing with Vitest, Playwright, and Testing Library",
    icon: "check-circle",
    metric: "100% tested"
  },
  {
    id: "7",
    title: "Performance Optimization",
    description: "Achieved FCP <1.8s, LCP <2.5s with bundle optimization and PWA implementation",
    icon: "activity",
    metric: "<2.5s LCP"
  },
  {
    id: "8",
    title: "Clean Architecture",
    description: "Applied Domain-Driven Design, SOLID principles, and modern design patterns",
    icon: "book-open",
    metric: "DDD + SOLID"
  }
];

export interface Metric {
  label: string;
  value: string;
  description: string;
  icon: string;
}

export const metrics: Metric[] = [
  {
    label: "Projects Completed",
    value: "5",
    description: "Production-ready applications deployed",
    icon: "check-circle"
  },
  {
    label: "Projects In Progress",
    value: "6",
    description: "Active development (20-75% complete)",
    icon: "code"
  },
  {
    label: "Technologies",
    value: "25+",
    description: "Modern tech stack mastered",
    icon: "layers"
  },
  {
    label: "Code Quality",
    value: "A+",
    description: "Clean code, testing, DDD patterns",
    icon: "award"
  },
  {
    label: "Development Time",
    value: "<1 Year",
    description: "From comeback to production",
    icon: "clock"
  },
  {
    label: "Productivity Gain",
    value: "10x",
    description: "AI-augmented development",
    icon: "zap"
  }
];
