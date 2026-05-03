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
    title: "Rapid Portfolio Growth",
    description: "Built and deployed 15+ production-ready projects in less than 12 months after 9-year hiatus",
    icon: "rocket",
    metric: "15+ projects",
    date: "2025-2026"
  },
  {
    id: "2",
    title: "Modern Tech Stack Mastery",
    description: "Mastered 25+ modern technologies including Next.js, tRPC, Prisma, and Web3",
    icon: "code",
    metric: "25+ technologies"
  },
  {
    id: "3",
    title: "Production Scale Impact",
    description: "Systems handling 25,000+ entries, 50,000+ photos, and real-time operations",
    icon: "trending-up",
    metric: "75K+ records"
  },
  {
    id: "4",
    title: "AI-Augmented Development",
    description: "Early adopter of AI-assisted coding with Claude CLI, achieving 10x productivity gains",
    icon: "zap",
    metric: "10x faster"
  },
  {
    id: "5",
    title: "Full-Stack Versatility",
    description: "From e-commerce to trading bots, school systems to blockchain apps",
    icon: "layers",
    metric: "6 domains"
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
