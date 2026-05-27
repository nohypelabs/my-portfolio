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
    title: "Ship Fast, Ship Real",
    description: "4 production systems in 12 months — 250K+ records processed across logistics QC, POS, and e-commerce. Used daily by real clients.",
    icon: "rocket",
    metric: "4 shipped"
  },
  {
    id: "2",
    title: "Full-Stack, End to End",
    description: "From database design to deployment. Next.js, tRPC, PostgreSQL, Supabase — I own the entire stack, not just a layer.",
    icon: "code",
    metric: "6 core techs"
  },
  {
    id: "3",
    title: "AI-Augmented Builder",
    description: "Claude CLI as a force multiplier — not a crutch. AI handles boilerplate, I handle architecture and business logic.",
    icon: "zap",
    metric: "AI-powered"
  },
  {
    id: "4",
    title: "Battle-Tested Systems",
    description: "80K+ resi, 160K+ GPS photos, barcode scanning, multi-outlet POS — these aren't demos, they handle real operations daily.",
    icon: "trending-up",
    metric: "250K+ data"
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
    label: "Products Shipped",
    value: "4",
    description: "Production systems in active use by real clients",
    icon: "check-circle"
  },
  {
    label: "Active Projects",
    value: "4",
    description: "Ongoing development (65%+ progress)",
    icon: "code"
  },
  {
    label: "Core Technologies",
    value: "6",
    description: "Next.js, TypeScript, tRPC, PostgreSQL, Supabase, Python",
    icon: "layers"
  },
  {
    label: "Data Processed",
    value: "250K+",
    description: "Records across logistics QC, POS, and inspections",
    icon: "database"
  },
  {
    label: "Development Time",
    value: "<1 Year",
    description: "From comeback to 4 production systems",
    icon: "clock"
  },
  {
    label: "AI-Augmented",
    value: "Weeks",
    description: "Productivity via Claude CLI as force multiplier",
    icon: "zap"
  }
];
