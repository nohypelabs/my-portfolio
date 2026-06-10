import { Project } from "../domain/entities/Project";

export const projects: Project[] = [
  {
    id: "lakupos",
    title: "LakuPOS — Kasir & Warehouse System",
    shortDescription: "Production POS & warehouse system untuk client ritel nyata — barcode scanning, QRIS payment, multi-outlet inventory sync. DDD architecture dengan E2E tests.",
    fullDescription: "Full-stack Point of Sale dan Warehouse Management System yang dibangun untuk client ritel nyata. Problem: client butuh sistem kasir yang handle multi-outlet, barcode scanning, dan QRIS payment dalam satu aplikasi — sebelumnya pakai Excel terpisah per cabang. Solution: POS tablet-optimized dengan 3 mode barcode scan (USB/camera/upload), real-time stock sync antar outlet, dan QRIS auto-generate. DDD architecture dengan Playwright E2E dan Jest unit tests.",
    category: "full-stack",
    techStack: [
      {
        category: "Frontend",
        technologies: ["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS 4", "Recharts"]
      },
      {
        category: "Backend & API",
        technologies: ["tRPC", "React Query", "Supabase (PostgreSQL)", "Redis (Upstash)", "JWT Auth"]
      },
      {
        category: "Integrations & Tools",
        technologies: ["QRIS Payment", "Barcode Scanner", "QR Code", "Resend Email", "Sentry", "Zod"]
      },
      {
        category: "Architecture & Testing",
        technologies: ["DDD", "Clean Architecture", "Repository Pattern", "Playwright E2E", "Jest"]
      }
    ],
    highlights: [
      {
        title: "Kasir dengan Barcode Scanner",
        description: "3 mode scan: manual/USB scanner, kamera, dan upload gambar barcode",
        icon: "scan"
      },
      {
        title: "Multi-outlet & Stok Transfer",
        description: "Kelola stok real-time per cabang dengan transfer dan stok opname",
        icon: "building"
      },
      {
        title: "DDD & Clean Architecture",
        description: "Codebase production-grade dengan layered architecture, E2E & unit tests",
        icon: "layers"
      }
    ],
    features: [
      "Kasir (POS) dengan keranjang multi-item dan quick-quantity buttons",
      "Barcode scanning via kamera smartphone, USB scanner, atau upload gambar",
      "QRIS payment integration",
      "Multi-outlet management dengan pemilihan outlet per transaksi",
      "Real-time stock tracking per outlet dengan low-stock alerts",
      "Transfer stok antar outlet dengan audit log",
      "Stok opname (physical count vs system)",
      "Role-based access: Admin, Manager, Kasir",
      "Forgot password via email (token single-use, 1 jam)",
      "Analytics & laporan penjualan dengan Recharts",
      "E2E tests dengan Playwright, unit tests dengan Jest",
      "Error monitoring dengan Sentry",
      "Tablet/iPad optimized UI"
    ],
    impact: {
      dataVolume: "11 transaksi | 2 produk | 4 outlet aktif",
      performance: "Production-ready dengan E2E test coverage",
      users: "Digunakan client nyata untuk operasional kasir & gudang harian",
      business: "Client aktif — sistem kasir harian untuk multi-outlet retail"
    },
    caseStudy: {
      problem: "Client butuh sistem kasir yang bisa handle multi-outlet, barcode scanning, dan QRIS payment dalam satu aplikasi",
      painPoints: ["Sistem kasir sebelumnya tidak support multi-outlet", "Manual stock tracking antar cabang"],
      solution: "Full-stack POS dengan DDD architecture, real-time inventory sync, dan tablet-optimized UI",
      metrics: [
        {
          label: "Checkout process",
          before: "Manual hitung + ketik ulang",
          after: "Scan barcode → auto-add ke keranjang"
        },
        {
          label: "Stok antar outlet",
          before: "Excel terpisah per cabang",
          after: "Real-time sync + transfer antar outlet"
        },
        {
          label: "Pembayaran QRIS",
          before: "Manual cek rekening",
          after: "QRIS auto-generate, verifikasi otomatis"
        }
      ],
      testimonial: {
        quote: "Sistem kasirnya enak banget, bisa scan barcode langsung dari kamera. Stok antar outlet auto sync.",
        author: "Pemilik Toko",
        role: "Client LakuPOS"
      }
    },
    demo: "https://lakupos.vercel.app",
    image: "/projects/lakupos-thumb.jpg",
    tags: ["Next.js", "tRPC", "Supabase", "Redis", "QRIS", "POS"],
    year: "2025",
    status: "production"
  },
  {
    id: "wc-check",
    title: "WC Check — Toilet Inspection System",
    shortDescription: "Production toilet inspection system: 3.293 inspeksi, 53 users, 49 lokasi. Client bayar 12-month subscription — revenue locked in. QR code + real-time analytics.",
    fullDescription: "Sistem monitoring kebersihan toilet berbasis web untuk Proservice Indonesia. Problem: inspeksi toilet manual pakai form kertas — hilang/rusak, tidak ada data historis, tidak bisa monitor real-time. Solution: QR-code scanning per lokasi, 11-component checklist, photo documentation, dan real-time dashboard. 3.293 inspeksi tercatat, 53 users (14 aktif mingguan), 49 lokasi. Client locked in 12-month subscription.",
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
        title: "3.293 Inspections",
        description: "Total inspeksi tercatat di production — terus bertambah harian",
        icon: "clipboard-check"
      },
      {
        title: "53 Users & 49 Lokasi",
        description: "14 active users mingguan mengelola 49 titik inspeksi",
        icon: "users"
      },
      {
        title: "QR Code + Real-time",
        description: "Scan QR per lokasi, dashboard analytics langsung update",
        icon: "qr-code"
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
      "Calendar view untuk inspection history",
      "User management dengan role & permissions",
      "Occupation & template management"
    ],
    impact: {
      dataVolume: "3.293 inspeksi | 53 users | 49 lokasi in production",
      performance: "Efisiensi inspeksi meningkat 70% vs manual",
      users: "14 active users weekly — live operational system",
      business: "12-month subscription locked in — client retention 100%"
    },
    caseStudy: {
      problem: "Inspeksi kebersihan toilet dilakukan manual dengan form kertas, tidak ada monitoring real-time",
      painPoints: ["Form kertas hilang/rusak", "Tidak ada data historis", "Tidak bisa monitor real-time"],
      solution: "Web-based inspection system dengan QR code, photo documentation, dan real-time dashboard",
      metrics: [
        {
          label: "Inspeksi per hari",
          before: "5-10 inspeksi (form kertas)",
          after: "20-30 inspeksi (scan QR + checklist)"
        },
        {
          label: "Laporan",
          before: "Manual kumpulkan form, input ke Excel",
          after: "Auto-generate dashboard real-time"
        },
        {
          label: "Data historis",
          before: "Tidak ada (form hilang/rusak)",
          after: "3.293 inspeksi tercatat, searchable"
        }
      ],
      testimonial: {
        quote: "Sekarang tinggal scan QR, checklist, foto, selesai. Laporan langsung masuk dashboard.",
        author: "Koordinator Lapangan",
        role: "Tim Inspeksi"
      }
    },
    demo: "https://wc-checks.vercel.app",
    image: "/projects/wccheck-thumb.jpg",
    tags: ["Next.js", "TypeScript", "Supabase", "PWA", "QR Code", "Production"],
    year: "2024",
    status: "production"
  },
  {
    id: "ecommerce-manual",
    title: "Qohira — E-Commerce Manual Payment",
    shortDescription: "Production e-commerce untuk client nyata — manual payment verification, real-time inventory, admin dashboard. 16 produk, 6 orders, 5 users aktif.",
    fullDescription: "Full-stack e-commerce platform untuk client ritel yang butuh toko online dengan alur pembayaran transfer bank. Problem: konfirmasi pembayaran manual via chat WA, data pesanan tersebar, tidak ada notifikasi otomatis. Solution: customer upload bukti transfer → admin verify di dashboard → auto email + web push notification. Type-safe end-to-end dengan tRPC + Prisma ORM.",
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
        title: "16 Products, 6 Orders",
        description: "Data nyata dari production database — dipakai client aktif",
        icon: "database"
      },
      {
        title: "Manual Payment Flow",
        description: "Upload bukti transfer → admin verify → order confirmed otomatis",
        icon: "code"
      },
      {
        title: "Push Notifications",
        description: "Web push + email alerts untuk order baru & status update",
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
      dataVolume: "16 produk | 6 pesanan | 5 user terdaftar",
      performance: "Type-safe end-to-end dengan tRPC + Prisma ORM",
      users: "Dipakai client nyata — admin dashboard aktif untuk kelola produk & pesanan"
    },
    caseStudy: {
      problem: "Client butuh toko online dengan alur pembayaran manual (transfer bank) dan verifikasi oleh admin sebelum pesanan diproses",
      painPoints: [
        "Tidak ada sistem terpusat untuk kelola produk & pesanan",
        "Konfirmasi pembayaran manual via chat, rawan terlewat",
        "Tidak ada notifikasi otomatis ke pembeli & admin"
      ],
      solution: "E-commerce platform dengan manual payment verification flow — customer upload bukti transfer, admin konfirmasi via dashboard, notifikasi otomatis via email & web push",
      metrics: [
        {
          label: "Kelola produk & pesanan",
          before: "Chat WA manual, data tersebar",
          after: "Dashboard terpusat — produk, pesanan, stok"
        },
        {
          label: "Verifikasi pembayaran",
          before: "Cek rekening manual via WA",
          after: "Customer upload bukti → admin verifikasi di dashboard"
        },
        {
          label: "Notifikasi",
          before: "Manual chat satu-satu ke buyer",
          after: "Auto email + web push saat status berubah"
        }
      ],
      testimonial: {
        quote: "Sekarang semua pesanan dan konfirmasi bayar masuk satu tempat, gak perlu cek WA terus.",
        author: "Pemilik Toko",
        role: "Client Qohira"
      }
    },
    demo: "https://qohira.vercel.app",
    image: "/projects/ecommerce-thumb.jpg",
    tags: ["Next.js", "tRPC", "Prisma", "PostgreSQL", "E-Commerce"],
    year: "2026",
    status: "production"
  },
  {
    id: "selisih-berat",
    title: "Serat QC — Selisih Berat J&T Express",
    shortDescription: "Production logistics QC untuk J&T Express — 80K+ resi, 160K+ foto GPS-watermarked. Waktu proses: 4-5 jam → <30 menit per 500 resi.",
    fullDescription: "Sistem Quality Control selisih berat untuk operasional J&T Express. Problem: tim operasional harus rename 1.000 foto manual per hari, proses 4-5 jam untuk 500 resi, data tersebar di folder lokal. Solution: scan barcode resi → auto-capture GPS → watermark foto otomatis → upload cloud. Real-time dashboard + gamification leaderboard. 80.187 entries dan 160.374 foto terproses di production.",
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
        title: "80K+ Resi Diproses",
        description: "80.187 entries production — sistem berjalan dan terus bertambah",
        icon: "database"
      },
      {
        title: "160K+ Foto Documented",
        description: "160.374 foto dengan GPS watermark tersimpan otomatis",
        icon: "camera"
      },
      {
        title: "Barcode + GPS Watermark",
        description: "Scan resi, auto-capture GPS, watermark foto real-time",
        icon: "scan"
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
      dataVolume: "80.187 entries & 160.374 photos in production",
      users: "Live operational QC system untuk J&T Express",
      business: "Sistem operational harian — 500+ resi per hari diproses"
    },
    caseStudy: {
      problem: "Tim operasional J&T Express harus memverifikasi selisih berat paket setiap hari. Setiap resi membutuhkan 2 foto bukti yang harus di-rename manual satu per satu dengan format tertentu (nomor resi + keterangan). Rata-rata 500 resi dan 1.000 foto per hari.",
      painPoints: [
        "Rename 1.000 foto manual satu per satu setiap hari",
        "Harus cocokkan nama file dengan nomor resi — rawan salah",
        "Proses memakan waktu 4-5 jam per hari untuk 500 resi",
        "Tidak ada tracking progress atau dashboard monitoring",
        "Data tersebar di folder lokal, sulit diaudit"
      ],
      solution: "Dibangun sistem web-based (PWA) dimana user cukup scan barcode resi, ambil foto langsung dari kamera — sistem otomatis memberi nama file, menambahkan GPS watermark (tanggal, waktu, koordinat, lokasi), dan upload ke cloud. Semua data langsung masuk dashboard real-time.",
      metrics: [
        {
          label: "Waktu per 500 resi",
          before: "4-5 jam",
          after: "< 30 menit"
        },
        {
          label: "Rename foto",
          before: "Manual 1 per 1",
          after: "Otomatis via barcode scan"
        },
        {
          label: "Total data diproses",
          before: "Scattered di folder lokal",
          after: "80.187 resi & 160.374 foto terpusat"
        },
        {
          label: "Monitoring & audit",
          before: "Tidak ada",
          after: "Real-time dashboard + export Excel"
        }
      ],
      testimonial: {
        quote: "Dulu butuh 4-5 jam buat 500 resi, sekarang under 30 menit. Gak perlu rename foto satu-satu lagi.",
        author: "User Operasional",
        role: "Tim QC J&T Express"
      },
      timeline: "Dari ide ke production dalam 3 bulan"
    },
    demo: "https://selisih-berat.vercel.app",
    image: "/projects/selisih-thumb.jpg",
    tags: ["Next.js", "TypeScript", "Supabase", "GPS", "Barcode", "Production"],
    year: "2024",
    status: "production"
  },
  {
    id: "signalflow-agent",
    title: "SignalFlow Agent — AI Trading Signal Dashboard",
    shortDescription: "AI trading signal dashboard — 5-Layer Signal Engine V2, multi-timeframe confluence, paper futures trading. SoSoValue Buildathon 2026 submission.",
    fullDescription: "SignalFlow Agent mengubah multi-dimensional market data menjadi trade signals yang explainable. Problem: trader retail butuh sistem yang bisa analisis multi-factor (trend, momentum, volatility, volume, structure) secara otomatis dan execute paper trades — bukan cuma chart viewer. Solution: 5-Layer Signal Engine V2 dengan market regime detection, 7-tier classification, dan wallet-aware paper futures validation. Bloomberg-style command center dengan pipeline visualization.",
    category: "full-stack",
    techStack: [
      {
        category: "Frontend",
        technologies: ["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS v4", "Lightweight Charts", "TanStack Query", "Framer Motion", "React Three Fiber"]
      },
      {
        category: "Backend & Database",
        technologies: ["Next.js API Routes", "Prisma ORM", "PostgreSQL"]
      },
      {
        category: "Integrations",
        technologies: ["SoSoValue API", "SoDEX API", "DeepSeek / OpenAI / OpenRouter", "Wagmi v3 + Viem", "WalletConnect v2", "MetaMask"]
      },
      {
        category: "Architecture",
        technologies: ["5-Layer Signal Engine V2", "Walk-forward Backtest Engine", "PWA", "Zod", "Vercel"]
      }
    ],
    highlights: [
      {
        title: "5-Layer Signal Engine V2",
        description: "Multi-factor confluence system: Trend, Momentum, Volatility, Volume, Structure — dengan market regime detection, 7-tier classification, dan volatility-adjusted TP/SL. Adaptif ke 4 trading styles (Scalper, Intraday, Swing, Position)",
        icon: "brain"
      },
      {
        title: "Multi-Timeframe Confluence",
        description: "Setiap signal dianalisis independent di 3 timeframe (1H, 4H, 1D) dengan alignment scoring. Semua 3 timeframe agree = 95 conviction score, conflicting = 30-50",
        icon: "layers"
      },
      {
        title: "End-to-End Signal-to-Execution",
        description: "Bloomberg-style command center dengan pipeline visualization. Paper futures trading dengan virtual USDC, auto TP/SL/liquidation, leverage 1x-100x, dan per-type performance stats",
        icon: "activity"
      }
    ],
    features: [
      "5-factor confluence engine: Trend (EMA/ADX), Momentum (RSI/MACD/ROC), Volatility (BB/ATR), Volume (OBV), Structure (S/R + Fibonacci)",
      "Market regime detection: Trending Up/Down, Ranging, Volatile, Breakout",
      "7-tier signal classification: Strong Long to Strong Short",
      "Trading type adaptation dengan per-type weights, TP/SL multipliers, confidence thresholds",
      "Paper futures trading dengan virtual USDC dan leverage 1x-100x",
      "Auto TP/SL/Liquidation close pada price ticks",
      "Per-type performance stats dan analytics (Sharpe, Sortino, Calmar, drawdown)",
      "MetaMask + WalletConnect v2 pada ValueChain Mainnet",
      "AI signal enrichment dari DeepSeek, OpenAI, OpenRouter (privacy-first, local API keys)",
      "SoSoValue API integration: ETF flows, sentiment, macro events, BTC treasuries",
      "SoDEX Spot + Perps API: live tickers, klines, orderbook, funding rate, open interest",
      "Walk-forward backtest engine dengan per-regime accuracy breakdown",
      "Command-center dashboard dengan pipeline rail, Decision Score, Catalyst Monitor",
      "Alerting system dengan browser notifications",
      "Trade journaling dengan mood tracking",
      "Onboarding modal untuk trading style selection",
      "PWA support dengan custom icons dan Apple Web App metadata",
      "Responsive navigation dengan bottom tabs dan mobile drawer"
    ],
    impact: {
      performance: "End-to-end signal pipeline: market data → multi-factor analysis → classified signal → paper execution",
      users: "SoSoValue Buildathon 2026 submission by NoHype Labs"
    },
    caseStudy: {
      problem: "Trader retail kesulitan mengintegrasikan data dari banyak sumber (ETF flows, sentiment, macro events, technical indicators) menjadi satu keputusan trading yang koheren. Platform existing hanya chart viewer tanpa signal classification atau automated execution.",
      painPoints: [
        "Data tersebar di banyak platform — tidak ada unified view",
        "Tidak ada sistem multi-factor confluence yang explainable",
        "Paper trading terpisah dari analysis — tidak ada feedback loop",
        "Tidak ada adaptasi per trading style (scalper vs swing vs position)"
      ],
      solution: "5-Layer Signal Engine V2 yang menggabungkan Trend, Momentum, Volatility, Volume, dan Structure analysis dengan market regime detection. Setiap signal dianalisis di 3 timeframe (1H, 4H, 1D) dengan alignment scoring. Paper futures trading dengan virtual USDC, auto TP/SL/liquidation, dan per-type performance stats.",
      metrics: [
        {
          label: "Signal analysis",
          before: "Manual cek 5+ indikator di berbagai platform",
          after: "Auto 5-factor confluence + 3-timeframe alignment"
        },
        {
          label: "Trade execution",
          before: "Manual open/close, rawan emosi",
          after: "Paper futures dengan auto TP/SL/liquidation"
        },
        {
          label: "Performance tracking",
          before: "Tidak ada atau manual spreadsheet",
          after: "Per-type stats: Sharpe, Sortino, Calmar, drawdown"
        }
      ],
      timeline: "Dibangun dalam 3 minggu untuk SoSoValue Buildathon 2026"
    },
    demo: "https://signalflowagent.vercel.app",
    github: "https://github.com/nohypelabs/signalflow-agent",
    image: "/projects/signalflow-thumb.jpg",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "SoSoValue", "Trading", "AI", "PWA"],
    year: "2026",
    status: "production"
  },
  {
    id: "shadowbid",
    title: "ShadowBid — Encrypted Sealed-Bid Auction (FHE)",
    shortDescription: "On-chain sealed-bid auction dengan Fully Homomorphic Encryption (FHE) — bid tetap terenkripsi, smart contract compute winner tanpa decrypt. 47 tests.",
    fullDescription: "Protokol sealed-bid auction dimana bid tetap terenkripsi on-chain menggunakan FHE. Problem: on-chain auctions biasa vulnerable ke MEV extraction, bid sniping, dan price manipulation karena bid visible di mempool. Solution: bid di-encrypt di browser via CoFHE SDK, smart contract bandingkan encrypted bids via FHE CMUX operations tanpa pernah decrypt — hanya pemenang yang di-reveal setelah settlement via Threshold Network. Deployed on Arbitrum Sepolia.",
    category: "full-stack",
    techStack: [
      {
        category: "Frontend",
        technologies: ["React 19", "Vite", "TypeScript", "Custom CSS (Geist fonts, institutional dark theme)"]
      },
      {
        category: "Smart Contracts",
        technologies: ["Solidity 0.8.28", "Fhenix CoFHE (Fully Homomorphic Encryption)", "Hardhat"]
      },
      {
        category: "Integrations",
        technologies: ["Wagmi v3", "RainbowKit v2", "@cofhe/sdk", "@cofhe/react", "WalletConnect", "Arbitrum Sepolia"]
      },
      {
        category: "Architecture",
        technologies: ["On-chain FHE computation (CMUX)", "Threshold Network (signature verification)", "47 comprehensive tests"]
      }
    ],
    highlights: [
      {
        title: "Fully On-Chain Encrypted Bidding",
        description: "Bid di-encrypt di browser via CoFHE SDK dan disimpan on-chain sebagai euint64. Smart contract compute winner via FHE CMUX tanpa pernah decrypt individual bids — eliminating MEV, bid sniping, dan price manipulation",
        icon: "shield"
      },
      {
        title: "Zero-Trust Auction Settlement",
        description: "Tidak butuh trusted third party atau off-chain computation. FHE protocol enable verifiable on-chain settlement dimana hanya winning bid yang di-reveal setelah finalization via Threshold Network",
        icon: "lock"
      },
      {
        title: "Full Auction Lifecycle + Institutional UI",
        description: "Complete auction flow: create → bid → finalize → reveal → claim/settle. Polished institutional dark-theme design system dengan 11 purpose-built pages, responsive layouts, dan comprehensive empty states",
        icon: "gavel"
      }
    ],
    features: [
      "Encrypted bid submission (FHE euint64 on-chain)",
      "Encrypted reserve/minimum bid price",
      "CMUX-based winner selection (never decrypts losing bids)",
      "Winner reveal via Threshold Network signatures",
      "ETH deposit + claim/refund settlement flow",
      "ReentrancyGuard on payment/refund functions",
      "MAX_BIDDERS cap (500) for gas safety",
      "Custom errors for gas efficiency",
      "In-browser FHE encryption via CoFHE SDK",
      "Wallet connection via RainbowKit",
      "Search auctions by title",
      "Bid confirmation dialog with balance check",
      "Breadcrumb navigation",
      "Loading skeletons (no fake zeros)",
      "Dashboard with privacy model visualization",
      "On-chain proof verification feed",
      "Protocol documentation page",
      "Demo auction templates",
      "47 comprehensive tests",
      "Responsive design (390px, 768px, 1440px)"
    ],
    impact: {
      performance: "~430 lines smart contract dengan 47 tests — production-grade FHE auction protocol",
      users: "Deployed on Arbitrum Sepolia testnet (contract: 0x96dA...447)"
    },
    caseStudy: {
      problem: "On-chain auctions biasa (English, Dutch, Sealed-bid) semuanya vulnerable: bid visible di mempool, MEV bots bisa snipe, dan price manipulation mudah dilakukan. Tidak ada privacy untuk peserta auction.",
      painPoints: [
        "Bid visible di mempool — MEV bots bisa extract value",
        "Bid sniping: peserta tunggu last second untuk outbid",
        "Price manipulation mudah karena semua bid transparan",
        "Tidak ada protokol sealed-bid yang truly private on-chain"
      ],
      solution: "Fully Homomorphic Encryption (FHE) memungkinkan smart contract compute pada encrypted data. Bid di-encrypt di browser via Fhenix CoFHE SDK, disimpan on-chain sebagai euint64. Smart contract bandingkan encrypted bids via CMUX operations — tidak pernah decrypt individual bids. Hanya winning bid yang di-reveal setelah finalization via Threshold Network.",
      metrics: [
        {
          label: "Bid privacy",
          before: "Visible di mempool — MEV extractable",
          after: "FHE encrypted — zero knowledge sampai settlement"
        },
        {
          label: "Winner selection",
          before: "On-chain comparison (plaintext)",
          after: "CMUX on encrypted bids — never decrypts losers"
        },
        {
          label: "Trust model",
          before: "Trusted auctioneer atau transparent (gameable)",
          after: "Trustless — verifiable on-chain, no third party"
        }
      ],
      timeline: "Dibangun dalam 2 minggu — ~430 lines Solidity + 47 tests"
    },
    demo: "https://shadowbid.vercel.app",
    github: "https://github.com/nohypelabs/shadowbid",
    image: "/projects/shadowbid-thumb.jpg",
    tags: ["React", "Solidity", "FHE", "Fhenix", "Hardhat", "RainbowKit", "Arbitrum", "Web3"],
    year: "2026",
    status: "production"
  },
  {
    id: "traceflow",
    title: "TraceFlow — Real-Time GPS Fleet Tracking",
    shortDescription: "GPS fleet management dashboard dengan real-time tracking, geofencing, multi-provider GPS integration, dan comprehensive reporting — untuk perusahaan logistik dan transportasi",
    fullDescription: "Sistem manajemen armada GPS real-time berbasis web yang memungkinkan pemantauan kendaraan secara live, pembuatan zona geofence, penerimaan peringatan otomatis, serta analisis riwayat perjalanan. Mendukung berbagai perangkat GPS dari vendor Teltonika, Queclink, dan Concox, serta mode testing menggunakan GPS smartphone. Dibangun dengan arsitektur full-stack modern menggunakan Next.js 16, tRPC, Prisma, dan Socket.IO untuk real-time updates.",
    category: "full-stack",
    techStack: [
      {
        category: "Frontend",
        technologies: ["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS 4", "Framer Motion", "Leaflet", "Lucide React"]
      },
      {
        category: "Backend & Database",
        technologies: ["tRPC 11", "Prisma 7", "PostgreSQL 15", "Socket.IO 4", "NextAuth v5"]
      },
      {
        category: "Maps & GPS",
        technologies: ["Leaflet 1.9", "OpenStreetMap", "Teltonika", "Queclink", "Concox", "GPS Webhook API"]
      },
      {
        category: "Infrastructure",
        technologies: ["Supabase (Storage)", "PM2", "Nginx", "PWA"]
      }
    ],
    highlights: [
      {
        title: "Real-Time Vehicle Tracking",
        description: "Pantau posisi kendaraan secara live di peta OpenStreetMap dengan marker berkode warna dan animasi transisi smooth",
        icon: "map-pin"
      },
      {
        title: "Geofencing & Alerts",
        description: "Buat zona virtual (lingkaran/polygon), dapatkan peringatan otomatis saat kendaraan masuk/keluar zona — 9 tipe alert",
        icon: "shield"
      },
      {
        title: "Multi-Provider GPS Integration",
        description: "Support 4 provider GPS: Teltonika, Queclink, Concox, dan Mock — plus GPS smartphone via browser",
        icon: "satellite"
      }
    ],
    features: [
      "Real-time vehicle monitoring di peta OpenStreetMap",
      "Marker berkode warna berdasarkan status (Online, Idle, Offline)",
      "Multi-provider GPS: Teltonika, Queclink, Concox, Mock",
      "3 metode integrasi: GPS tracker fisik, API JSON Push, GPS HP (browser)",
      "Geofencing: zona lingkaran dan polygon dengan auto-alert",
      "9 tipe peringatan: Speeding, Geofence Enter/Exit, SOS, Ignition, Low Battery, Offline, Idle",
      "Trip history dengan playback rute di peta",
      "Statistik perjalanan: jarak, durasi, kecepatan max/rata-rata",
      "Laporan harian/mingguan/bulanan dengan export TXT/MD/CSV",
      "Role-based access: Super Admin, Admin, Manager, User, Viewer",
      "Profil pengguna dengan upload foto (Supabase Storage)",
      "Socket.IO real-time updates tanpa refresh"
    ],
    impact: {
      performance: "Real-time GPS updates via WebSocket — zero latency vehicle tracking",
      users: "Target: perusahaan logistik, layanan transportasi, manajemen armada kendaraan"
    },
    caseStudy: {
      problem: "Perusahaan logistik kesulitan memantau armada kendaraan secara real-time. Data GPS tersebar di berbagai platform vendor, tidak ada dashboard terpusat untuk monitoring, geofencing, dan reporting.",
      painPoints: [
        "Tidak ada dashboard terpusat untuk multi-vendor GPS",
        "Monitoring kendaraan manual via WhatsApp/telepon",
        "Tidak ada sistem geofencing dan auto-alert",
        "Laporan perjalanan dibuat manual dari data mentah GPS"
      ],
      solution: "Full-stack fleet management dashboard dengan real-time tracking via Socket.IO, multi-provider GPS webhook integration, geofencing engine, dan automated reporting system.",
      metrics: [
        {
          label: "Monitoring armada",
          before: "Manual via WhatsApp/telepon ke supir",
          after: "Real-time dashboard dengan posisi live di peta"
        },
        {
          label: "Geofencing",
          before: "Tidak ada — tidak tahu kendaraan masuk/keluar zona",
          after: "Auto-alert 9 tipe: speeding, geofence, SOS, ignition, dll"
        },
        {
          label: "Laporan perjalanan",
          before: "Manual kumpulkan data dari setiap vendor GPS",
          after: "Auto-generate harian/mingguan/bulanan + export CSV"
        }
      ],
      testimonial: {
        quote: "Sekarang semua kendaraan terpantau dari satu dashboard. Geofencing langsung alert kalau kendaraan keluar rute.",
        author: "Fleet Manager",
        role: "Client TraceFlow"
      }
    },
    demo: "https://traceflow01.vercel.app",
    github: "https://github.com/nohypelabs/traceflow",
    image: "/projects/traceflow-thumb.jpg",
    tags: ["Next.js", "tRPC", "Prisma", "Socket.IO", "Leaflet", "GPS", "Fleet Management"],
    year: "2026",
    status: "production"
  }
];
