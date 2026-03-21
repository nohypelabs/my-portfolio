import { Project } from "../domain/entities/Project";

export const projects: Project[] = [
  {
    id: "wc-check",
    title: "WC Check",
    shortDescription: "Professional Toilet Monitoring System dengan QR code scanning dan analytics real-time",
    fullDescription: "Sistem monitoring kebersihan toilet berbasis web dengan QR code scanning dan analytics real-time untuk organisasi, perusahaan, dan institusi. Meningkatkan efisiensi inspeksi hingga 70% dan mengurangi paperwork manual.",
    category: "full-stack",
    techStack: [
      {
        category: "Frontend",
        technologies: ["Next.js 14", "React 18.2", "TypeScript 5.9", "Tailwind CSS", "Framer Motion"]
      },
      {
        category: "Backend & Database",
        technologies: ["Supabase", "PostgreSQL"]
      },
      {
        category: "Services & Tools",
        technologies: ["Cloudinary", "PWA", "QR Code Generator"]
      }
    ],
    highlights: [
      {
        title: "QR Code Scanning",
        description: "Auto-generated QR codes untuk setiap lokasi toilet",
        icon: "qr-code"
      },
      {
        title: "Real-time Analytics",
        description: "Dashboard dengan insights dan trends inspection",
        icon: "activity"
      },
      {
        title: "PWA Support",
        description: "Installable sebagai mobile app dengan offline capability",
        icon: "smartphone"
      }
    ],
    features: [
      "QR Code Scanning & Auto-generated QR codes",
      "Multi-component inspection checklist (11 komponen)",
      "Real-time dashboard dengan analytics",
      "Photo documentation dengan Cloudinary",
      "Role-based access control (Admin, User, Super Admin)",
      "Multi-level organization hierarchy (Org → Building → Location)",
      "PWA support - Installable sebagai mobile app",
      "Export data (CSV)",
      "Calendar view untuk inspection history"
    ],
    impact: {
      performance: "Meningkatkan efisiensi inspeksi hingga 70%",
      users: "Mengurangi paperwork dan manual tracking"
    },
    demo: "https://wc-checks.vercel.app",
    image: "/projects/wccheck-thumb.jpg",
    tags: ["Next.js", "TypeScript", "Supabase", "PWA", "QR Code"],
    year: "2024",
    status: "production"
  },
  {
    id: "ecommerce-manual",
    title: "E-Commerce Manual",
    shortDescription: "Modern E-Commerce Platform dengan Next.js 16 & Advanced Features",
    fullDescription: "Full-featured e-commerce platform dengan modern architecture, real-time inventory management, payment integration, dan admin dashboard yang powerful. Built untuk scale dan performa tinggi menggunakan latest Next.js 16.",
    category: "full-stack",
    techStack: [
      {
        category: "Frontend",
        technologies: ["Next.js 16", "React 19", "TypeScript 5.9", "Tailwind CSS"]
      },
      {
        category: "Backend & API",
        technologies: ["tRPC", "Prisma ORM", "PostgreSQL"]
      },
      {
        category: "Services & Integrations",
        technologies: ["Cloudinary", "Resend Email", "Web Push", "NextAuth v4"]
      }
    ],
    highlights: [
      {
        title: "Modern Architecture",
        description: "tRPC untuk type-safe API dengan full TypeScript",
        icon: "code"
      },
      {
        title: "Real-time Features",
        description: "Live inventory updates dan order tracking",
        icon: "activity"
      },
      {
        title: "Performance Optimized",
        description: "Bundle analyzer, image optimization, dan PWA ready",
        icon: "zap"
      }
    ],
    features: [
      "Product catalog dengan categories & filtering",
      "Shopping cart dengan real-time inventory check",
      "User authentication dengan NextAuth",
      "Admin dashboard untuk product & order management",
      "Order tracking system",
      "Payment integration ready",
      "Email notifications dengan Resend",
      "Push notifications support",
      "Image upload & optimization dengan Cloudinary",
      "Responsive design untuk semua device",
      "Bundle size optimization dengan analyzer"
    ],
    impact: {
      performance: "Optimized bundle size dan fast page loads",
      users: "Complete e-commerce solution dengan modern UX"
    },
    demo: "https://ecommerce-manual.vercel.app",
    image: "/projects/ecommerce-thumb.jpg",
    tags: ["Next.js 16", "tRPC", "Prisma", "PostgreSQL", "E-Commerce"],
    year: "2026",
    status: "production"
  },
  {
    id: "eduvate",
    title: "Eduvate - School Management System",
    shortDescription: "Comprehensive School Management System dengan Modern Tech Stack",
    fullDescription: "Platform manajemen sekolah lengkap yang mencakup student management, attendance tracking, grades, schedules, dan parent portal. Dibangun dengan Next.js 15 dan tRPC untuk performa optimal dan developer experience terbaik.",
    category: "full-stack",
    techStack: [
      {
        category: "Frontend",
        technologies: ["Next.js 15", "React 19", "TypeScript 5.7", "Tailwind CSS", "Radix UI"]
      },
      {
        category: "Backend & Database",
        technologies: ["tRPC", "Prisma ORM", "PostgreSQL", "NextAuth v5"]
      },
      {
        category: "Features & Tools",
        technologies: ["React Query", "Recharts", "QR Code", "CSV Import/Export", "PWA"]
      }
    ],
    highlights: [
      {
        title: "Complete School Features",
        description: "Student, Teacher, Parent, dan Admin management",
        icon: "school"
      },
      {
        title: "Advanced Analytics",
        description: "Dashboard dengan charts dan insights untuk decision making",
        icon: "bar-chart"
      },
      {
        title: "Modern Architecture",
        description: "Clean code dengan T3 Stack best practices",
        icon: "layers"
      }
    ],
    features: [
      "Student information system (SIS)",
      "Attendance tracking dengan QR code",
      "Grade & report card management",
      "Class scheduling system",
      "Teacher assignment & management",
      "Parent portal untuk monitoring",
      "Admin dashboard dengan analytics",
      "CSV data import/export",
      "Role-based access control",
      "Real-time notifications",
      "PWA support untuk mobile access",
      "Dark mode support"
    ],
    impact: {
      efficiency: "Streamlined school operations dan reduced paperwork",
      users: "All-in-one solution untuk student, teacher, parent & admin"
    },
    demo: "https://eduvate.vercel.app",
    image: "/projects/eduvate-thumb.jpg",
    tags: ["Next.js 15", "tRPC", "Prisma", "Education", "SaaS"],
    year: "2026",
    status: "production"
  },
  {
    id: "binance-algo-bot",
    title: "Binance Algorithmic Trading Bot",
    shortDescription: "Automated Trading Bot dengan AI-Powered Strategies & License System",
    fullDescription: "Professional algorithmic trading bot untuk Binance dengan multiple trading strategies, real-time market analysis, risk management, dan license-based tier system. Built dengan Python dan Streamlit untuk dashboard monitoring yang powerful.",
    category: "automation",
    techStack: [
      {
        category: "Core",
        technologies: ["Python 3.10", "Streamlit", "CCXT", "python-binance"]
      },
      {
        category: "Data & Analytics",
        technologies: ["Pandas", "NumPy", "Plotly", "TA-Lib"]
      },
      {
        category: "Infrastructure",
        technologies: ["SQLite", "Telegram Bot API", "Stripe Payment", "Flask API"]
      }
    ],
    highlights: [
      {
        title: "Multiple Strategies",
        description: "Grid, DCA, Scalping, dan custom algorithms",
        icon: "trending-up"
      },
      {
        title: "Risk Management",
        description: "Stop-loss, take-profit, dan position sizing otomatis",
        icon: "shield"
      },
      {
        title: "License System",
        description: "Tier-based licensing dengan Stripe integration",
        icon: "key"
      }
    ],
    features: [
      "Real-time market data & technical indicators",
      "Multiple trading strategies (Grid, DCA, Scalping)",
      "Automated risk management",
      "Backtesting dengan historical data",
      "Live performance dashboard dengan Streamlit",
      "Telegram notifications untuk trades",
      "License management system (Basic, Pro, Enterprise)",
      "Stripe payment integration",
      "Multi-exchange support via CCXT",
      "Position tracking & P&L calculation",
      "Trade history & analytics",
      "Configuration management via YAML"
    ],
    impact: {
      automation: "24/7 automated trading dengan risk management",
      users: "Monetization-ready dengan license tiers"
    },
    demo: "https://github.com/yourusername/binance-algo-bot",
    image: "/projects/trading-bot-thumb.jpg",
    tags: ["Python", "Trading Bot", "AI", "Binance", "Automation"],
    year: "2025-2026",
    status: "production"
  },
  {
    id: "selisih-berat",
    title: "Selisih Berat",
    shortDescription: "Logistics Weight Audit System for J&T Express dengan GPS watermarking",
    fullDescription: "Aplikasi audit dan tracking selisih berat untuk operasional logistik dengan real-time monitoring, barcode scanning, dan GPS watermarking. Streamlined logistics weight verification process dengan gamification untuk meningkatkan user engagement.",
    category: "full-stack",
    techStack: [
      {
        category: "Frontend",
        technologies: ["Next.js 14", "TypeScript 5.9", "Tailwind CSS"]
      },
      {
        category: "Backend & Services",
        technologies: ["Supabase", "Cloudinary"]
      },
      {
        category: "Features",
        technologies: ["Quagga2 (Barcode)", "GPS API", "PWA"]
      }
    ],
    highlights: [
      {
        title: "Barcode Scanner",
        description: "Scan No Resi JNT packages dengan Quagga2",
        icon: "scan"
      },
      {
        title: "GPS Watermark",
        description: "Photo dengan GPS coordinates, date, time, dan location",
        icon: "map-pin"
      },
      {
        title: "Gamification",
        description: "Leaderboard system (Beginner → Diamond levels)",
        icon: "trophy"
      }
    ],
    features: [
      "Barcode scanner untuk No Resi (JNT packages)",
      "Auto GPS capture & reverse geocoding",
      "GPS watermark on photos (Date, Time, Coordinates, Location)",
      "Real-time dashboard dengan statistik",
      "Gamified leaderboard system (Beginner → Diamond levels)",
      "User earnings calculation (500-1500 IDR per entry)",
      "Photo management dengan Cloudinary",
      "Export to Excel/CSV",
      "PWA support dengan offline capability",
      "Role-based access (Admin vs User)"
    ],
    impact: {
      dataVolume: "Production database: 25,000+ entries, 50,000+ photos",
      users: "Real-time operational insights untuk J&T Express"
    },
    demo: "https://selisih-berat.vercel.app",
    image: "/projects/selisih-thumb.jpg",
    tags: ["Next.js", "TypeScript", "Supabase", "GPS", "Barcode"],
    year: "2024",
    status: "production"
  }
];
