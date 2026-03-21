import { OngoingProject } from "../domain/entities/OngoingProject";

export const ongoingProjects: OngoingProject[] = [
  {
    id: "agds-pos",
    name: "AGDS Corp POS",
    description: "Point of Sale & Warehouse Management System untuk compete dengan Moka POS, Pawoon, dan Majoo",
    status: "In Progress",
    startDate: "2024-10",
    estimatedCompletion: "2026-04",
    techStack: ["Next.js 16", "tRPC", "PostgreSQL", "Prisma", "Upstash Redis"],
    progress: 75,
    keyGoals: [
      "Multi-outlet management system",
      "Real-time inventory tracking",
      "Transaction void/cancel system",
      "End of day reports & analytics",
      "Superior performance (FCP <1.8s, LCP <2.5s)"
    ]
  },
  {
    id: "wc-checks-v2-ddd",
    name: "WC Checks v2.0 (DDD Architecture)",
    description: "Major refactor dengan Domain-Driven Design, tRPC, dan Next.js 16 untuk better scalability",
    status: "In Progress",
    startDate: "2024-11",
    estimatedCompletion: "2026-05",
    techStack: ["Next.js 16", "tRPC", "Prisma", "PostgreSQL", "DDD Pattern"],
    progress: 65,
    keyGoals: [
      "Clean Architecture dengan DDD",
      "Type-safe API dengan tRPC",
      "Enhanced testing (Vitest, Playwright)",
      "Better separation of concerns",
      "Improved performance & maintainability"
    ]
  },
  {
    id: "loss-tracker-mvp",
    name: "Loss Tracker MVP",
    description: "Inventory loss tracking system untuk retail & warehouse management",
    status: "In Progress",
    startDate: "2025-01",
    estimatedCompletion: "2026-04",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "TypeScript"],
    progress: 50,
    keyGoals: [
      "Real-time loss monitoring",
      "Category-based tracking",
      "Analytics & reporting dashboard",
      "Multi-location support",
      "Alert system untuk critical losses"
    ]
  },
  {
    id: "solana-alpha-scanner",
    name: "Solana Alpha Scanner",
    description: "Real-time Solana token scanner dengan risk analysis untuk finding alpha opportunities",
    status: "In Progress",
    startDate: "2025-01",
    estimatedCompletion: "2026-06",
    techStack: ["React Native", "Node.js", "Solana Web3.js", "PostgreSQL"],
    progress: 40,
    keyGoals: [
      "Real-time token scanning",
      "Risk analysis & scoring",
      "Holder concentration analysis",
      "Mobile app (Android)",
      "Solana DApp Store integration"
    ]
  },
  {
    id: "serat-qc",
    name: "Serat QC System",
    description: "Quality Control management system untuk manufacturing process monitoring",
    status: "In Progress",
    startDate: "2024-12",
    estimatedCompletion: "2026-05",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "TypeScript"],
    progress: 55,
    keyGoals: [
      "Multi-stage QC process",
      "Defect tracking & categorization",
      "Analytics & trend analysis",
      "Photo documentation",
      "Export & reporting features"
    ]
  },
  {
    id: "forex-trading-bot",
    name: "Forex Trading Bot",
    description: "Automated forex trading bot dengan multiple strategies & risk management",
    status: "Planning",
    startDate: "2025-01",
    estimatedCompletion: "2026-07",
    techStack: ["Python", "MetaTrader API", "Pandas", "TA-Lib"],
    progress: 20,
    keyGoals: [
      "Multiple forex pair support",
      "Automated strategy execution",
      "Risk management system",
      "Backtesting framework",
      "Performance monitoring dashboard"
    ]
  }
];
