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
    description: "7 production systems in 12 months — 250K+ records processed across logistics QC, POS, e-commerce, and Web3. Used daily by real clients.",
    icon: "rocket",
    metric: "7 shipped"
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
    title: "Rapid Shipper",
    description: "From idea to production in weeks, not months. Domain-driven architecture, clean code, and real-world testing — shipped fast without cutting corners.",
    icon: "zap",
    metric: "Weeks to ship"
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
    description: "From e-commerce to logistics QC, POS systems to fleet tracking, trading dashboards to encrypted auctions",
    icon: "layers",
    metric: "7 domains"
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
    value: "7",
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
    description: "From comeback to 7 production systems",
    icon: "clock"
  },
  {
    label: "Ship Speed",
    value: "Weeks",
    description: "From idea to production — fast iteration, real feedback",
    icon: "zap"
  }
];
