import { OngoingProject } from "../domain/entities/OngoingProject";

export const ongoingProjects: OngoingProject[] = [
  {
    id: "smart-grid-bot",
    name: "Smart Grid Trading Bot",
    description: "Advanced grid trading bot untuk crypto dengan dynamic grid spacing, auto-rebalancing, multi-pair support, dan Telegram Bot integration untuk monitoring & control real-time",
    status: "In Progress",
    startDate: "2025-03",
    estimatedCompletion: "2026-06",
    techStack: ["Python", "CCXT", "Binance API", "Pandas", "SQLite", "Telegram Bot API"],
    progress: 90,
    keyGoals: [
      "Dynamic grid spacing berdasarkan volatility",
      "Auto-rebalancing grid levels",
      "Multi-pair simultaneous trading",
      "Real-time P&L tracking via Telegram Bot",
      "Telegram Bot: start/stop, status, profit report, config management"
    ]
  },
  {
    id: "dlmm-agent",
    name: "DLMM Agent — Meteora LP Automation",
    description: "Autonomous agent untuk manage liquidity positions di Meteora DLMM pools pada Solana, otomatis rebalance & compound fees, dengan Telegram Bot untuk monitoring positions & alerts",
    status: "In Progress",
    startDate: "2025-04",
    estimatedCompletion: "2026-07",
    techStack: ["TypeScript", "Solana Web3.js", "@meteora-ag/dlmm", "Node.js", "Telegram Bot API"],
    progress: 90,
    keyGoals: [
      "Auto-create & manage DLMM positions",
      "Dynamic bin range adjustment",
      "Auto-compound fee earnings",
      "Impermanent loss monitoring & alerts via Telegram",
      "Telegram Bot: position status, P&L report, rebalance triggers"
    ]
  },
  {
    id: "eduvate",
    name: "Eduvate — School Management System",
    description: "Platform manajemen sekolah lengkap: student management, attendance tracking, grades, schedules, dan parent portal. Built with Next.js, tRPC, Prisma.",
    status: "In Progress",
    startDate: "2025-01",
    estimatedCompletion: "2026-06",
    techStack: ["Next.js 15", "tRPC", "Prisma", "PostgreSQL", "NextAuth v5"],
    progress: 70,
    demo: "https://eduvate-azure.vercel.app",
    keyGoals: [
      "Student information system (SIS)",
      "Attendance tracking dengan QR code",
      "Grade & report card management",
      "Parent portal untuk monitoring",
      "Admin dashboard dengan analytics"
    ]
  },
  {
    id: "wc-checks-v2-ddd",
    name: "WC Checks v2.0 (DDD Architecture)",
    description: "Major refactor dengan Domain-Driven Design, tRPC, dan Next.js 16 untuk better scalability",
    status: "In Progress",
    startDate: "2024-11",
    estimatedCompletion: "2026-08",
    techStack: ["Next.js 16", "tRPC", "Prisma", "PostgreSQL", "DDD Pattern"],
    progress: 65,
    keyGoals: [
      "Clean Architecture dengan DDD",
      "Type-safe API dengan tRPC",
      "Enhanced testing (Vitest, Playwright)",
      "Better separation of concerns",
      "Improved performance & maintainability"
    ]
  }
];

/**
 * Side projects — early stage, not shown on main portfolio.
 * Move to ongoingProjects when progress > 60%.
 */
export const sideProjects = [
  {
    id: "solana-alpha-scanner",
    name: "Solana Alpha Scanner",
    progress: 40,
    status: "In Progress",
  },
  {
    id: "loss-tracker-mvp",
    name: "Loss Tracker MVP",
    progress: 50,
    status: "In Progress",
  },
  {
    id: "forex-trading-bot",
    name: "Forex Trading Bot",
    progress: 20,
    status: "Planning",
  },
];
