import { Project } from "../domain/entities/Project";

export const projects: Project[] = [
  {
    id: "lakupos",
    title: "LakuPOS — Kasir & Warehouse System",
    shortDescription: "Sistem kasir & gudang untuk toko ritel sungguhan: scan barcode, bayar QRIS, stok antar cabang nyambung otomatis. Arsitektur DDD dengan test end-to-end.",
    fullDescription: "Aplikasi Point of Sale dan manajemen gudang yang dibangun untuk toko ritel. Masalahnya, client butuh satu sistem yang bisa nampung kasir multi-cabang, scan barcode, dan pembayaran QRIS — sebelumnya tiap cabang rekap sendiri pakai Excel. Solusinya, POS yang dioptimalkan untuk tablet dengan 3 cara scan barcode (USB, kamera, upload foto), stok antar outlet yang langsung sinkron, dan QRIS yang ke-generate otomatis. Dibangun dengan arsitektur DDD, test Playwright end-to-end, dan unit test Jest.",
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
        description: "3 cara scan: manual/USB scanner, kamera HP, atau upload foto barcode",
        icon: "scan"
      },
      {
        title: "Multi-outlet & Stok Transfer",
        description: "Stok tiap cabang langsung sinkron, lengkap dengan transfer dan stok opname",
        icon: "building"
      },
      {
        title: "DDD & Clean Architecture",
        description: "Codebase yang beres: arsitektur berlapis, test E2E & unit",
        icon: "layers"
      }
    ],
    features: [
      "Kasir (POS) dengan keranjang multi-item dan quick-quantity buttons",
      "Barcode scanning via kamera smartphone, USB scanner, atau upload gambar",
      "QRIS payment integration",
      "Multi-outlet management dengan pemilihan outlet per transaksi",
      "Stok per outlet yang selalu update dengan low-stock alerts",
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
      performance: "Siap produksi dengan test E2E",
      users: "Dipakai client sungguhan buat operasional kasir & gudang harian",
      business: "Client aktif — sistem kasir harian untuk retail multi-outlet"
    },
    caseStudy: {
      problem: "Client butuh sistem kasir yang bisa nampung multi-outlet, scan barcode, dan pembayaran QRIS dalam satu aplikasi",
      painPoints: ["Sistem kasir sebelumnya gak support multi-outlet", "Stok antar cabang dicatat manual"],
      solution: "POS full-stack dengan arsitektur DDD, stok antar outlet yang langsung sinkron, dan UI yang dioptimalkan untuk tablet",
      metrics: [
        {
          label: "Checkout process",
          before: "Manual hitung + ketik ulang",
          after: "Scan barcode → auto-add ke keranjang"
        },
        {
          label: "Stok antar outlet",
          before: "Excel terpisah per cabang",
          after: "Langsung sinkron + transfer antar outlet"
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
    shortDescription: "Sistem inspeksi kebersihan toilet berbasis QR: 3.293 inspeksi, 53 user, 49 lokasi. Client langganan 12 bulan — pendapatan terkunci.",
    fullDescription: "Sistem monitoring kebersihan toilet berbasis web untuk Proservice Indonesia. Masalahnya, inspeksi masih pakai form kertas: gampang hilang atau rusak, data historisnya nol, dan manajemen gak bisa lihat kondisinya saat itu juga. Solusinya, tiap lokasi dikasih QR code, petugas scan lalu isi checklist 11 komponen lengkap dengan foto, semua langsung masuk dashboard. Hasilnya: 3.293 inspeksi tercatat, 53 user (14 aktif tiap minggu), 49 lokasi. Client lanjut langganan 12 bulan.",
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
        title: "3.293 Inspeksi",
        description: "Total inspeksi tercatat di produksi, terus nambah tiap hari",
        icon: "clipboard-check"
      },
      {
        title: "53 User & 49 Lokasi",
        description: "14 user aktif tiap minggu ngurusin 49 titik inspeksi",
        icon: "users"
      },
      {
        title: "QR Code + Langsung Update",
        description: "Scan QR per lokasi, dashboard langsung kebaca",
        icon: "qr-code"
      }
    ],
    features: [
      "QR Code Scanning & Auto-generated QR codes",
      "Multi-component inspection checklist (11 komponen)",
      "Dashboard dengan analytics yang langsung update",
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
      dataVolume: "3.293 inspeksi | 53 user | 49 lokasi di produksi",
      performance: "Efisiensi inspeksi naik 70% dibanding manual",
      users: "14 user aktif tiap minggu — sistem operasional yang beneran dipake",
      business: "Langganan 12 bulan terkunci — client bertahan 100%"
    },
    caseStudy: {
      problem: "Inspeksi kebersihan toilet masih manual pakai form kertas, gak ada monitoring saat itu juga",
      painPoints: ["Form kertas gampang hilang/rusak", "Gak ada data historis", "Gak bisa dipantau langsung dari jauh"],
      solution: "Sistem inspeksi berbasis web dengan QR code, dokumentasi foto, dan dashboard yang langsung kebaca",
      metrics: [
        {
          label: "Inspeksi per hari",
          before: "5-10 inspeksi (form kertas)",
          after: "20-30 inspeksi (scan QR + checklist)"
        },
        {
          label: "Laporan",
          before: "Kumpulin form manual, input ke Excel",
          after: "Dashboard ke-generate otomatis"
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
    shortDescription: "Toko online untuk client ritel sungguhan: verifikasi pembayaran manual, stok yang selalu update, dashboard admin. 16 produk, 6 pesanan, 5 user aktif.",
    fullDescription: "Platform e-commerce full-stack untuk client ritel yang butuh toko online dengan alur pembayaran transfer bank. Masalahnya, konfirmasi pembayaran masih lewat chat WA, data pesanan berceceran, dan gak ada notifikasi otomatis. Solusinya, customer upload bukti transfer, admin verifikasi di dashboard, lalu email dan notifikasi web push keluar otomatis. Type-safe dari depan sampai belakang pakai tRPC + Prisma ORM.",
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
        title: "16 Produk, 6 Pesanan",
        description: "Data asli dari database produksi, dipakai client aktif",
        icon: "database"
      },
      {
        title: "Alur Pembayaran Manual",
        description: "Upload bukti transfer → admin verifikasi → pesanan dikonfirmasi otomatis",
        icon: "code"
      },
      {
        title: "Notifikasi Push",
        description: "Web push + email buat pesanan baru dan update status",
        icon: "zap"
      }
    ],
    features: [
      "Product catalog dengan categories & filtering",
      "Shopping cart dengan cek stok langsung",
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
      performance: "Type-safe dari depan sampai belakang dengan tRPC + Prisma ORM",
      users: "Dipakai client sungguhan — dashboard admin aktif buat kelola produk & pesanan"
    },
    caseStudy: {
      problem: "Client butuh toko online dengan alur pembayaran manual (transfer bank) dan verifikasi admin sebelum pesanan diproses",
      painPoints: [
        "Gak ada satu tempat buat kelola produk & pesanan",
        "Konfirmasi pembayaran lewat chat, rawan kelewat",
        "Gak ada notifikasi otomatis ke pembeli & admin"
      ],
      solution: "Platform e-commerce dengan alur verifikasi pembayaran manual: customer upload bukti transfer, admin konfirmasi lewat dashboard, notifikasi otomatis via email & web push",
      metrics: [
        {
          label: "Kelola produk & pesanan",
          before: "Chat WA manual, data berceceran",
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
    shortDescription: "Quality control logistik untuk J&T Express: 80K+ resi, 160K+ foto ber-watermark GPS. Waktu proses: 4-5 jam jadi kurang dari 30 menit per 500 resi.",
    fullDescription: "Sistem Quality Control selisih berat untuk operasional J&T Express. Masalahnya, tim harus rename 1.000 foto manual tiap hari, proses 4-5 jam untuk 500 resi, dan data numpuk di folder lokal. Solusinya, scan barcode resi, lokasi ke-capture otomatis, foto ke-watermark, lalu upload ke cloud. Dashboard langsung kebaca plus leaderboard ala game. Di produksi: 80.187 entry dan 160.374 foto terproses.",
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
        description: "80.187 entry di produksi, sistem jalan terus dan nambah tiap hari",
        icon: "database"
      },
      {
        title: "160K+ Foto Terdokumentasi",
        description: "160.374 foto dengan watermark GPS tersimpan otomatis",
        icon: "camera"
      },
      {
        title: "Barcode + Watermark GPS",
        description: "Scan resi, lokasi ke-capture, foto langsung ke-watermark",
        icon: "scan"
      }
    ],
    features: [
      "Barcode scanner untuk No Resi (JNT packages)",
      "Auto GPS capture & reverse geocoding",
      "GPS watermark on photos (Date, Time, Coordinates, Location)",
      "Dashboard dengan statistik yang langsung update",
      "Gamified leaderboard system (Beginner → Diamond levels)",
      "User earnings calculation (500-1500 IDR per entry)",
      "Photo management dengan Cloudinary",
      "Export to Excel/CSV",
      "PWA support dengan offline capability",
      "Role-based access (Admin vs User)"
    ],
    impact: {
      dataVolume: "80.187 entry & 160.374 foto di produksi",
      users: "Sistem QC operasional yang dipakai J&T Express tiap hari",
      business: "Operasional harian — 500+ resi per hari diproses"
    },
    caseStudy: {
      problem: "Tim operasional J&T Express harus verifikasi selisih berat paket tiap hari. Setiap resi butuh 2 foto bukti yang harus di-rename manual satu-satu dengan format tertentu (nomor resi + keterangan). Rata-rata 500 resi dan 1.000 foto per hari.",
      painPoints: [
        "Rename 1.000 foto manual satu-satu tiap hari",
        "Harus cocokin nama file sama nomor resi, rawan salah",
        "Proses makan waktu 4-5 jam per hari buat 500 resi",
        "Gak ada pantauan progress atau dashboard",
        "Data numpuk di folder lokal, susah diaudit"
      ],
      solution: "Sistem berbasis web (PWA) di mana user cukup scan barcode resi dan ambil foto dari kamera. Sistem yang kasih nama file, nambahin watermark GPS (tanggal, waktu, koordinat, lokasi), dan upload ke cloud. Semua langsung masuk dashboard.",
      metrics: [
        {
          label: "Waktu per 500 resi",
          before: "4-5 jam",
          after: "< 30 menit"
        },
        {
          label: "Rename foto",
          before: "Manual satu-satu",
          after: "Otomatis lewat scan barcode"
        },
        {
          label: "Total data diproses",
          before: "Berceceran di folder lokal",
          after: "80.187 resi & 160.374 foto terpusat"
        },
        {
          label: "Monitoring & audit",
          before: "Gak ada",
          after: "Dashboard langsung kebaca + export Excel"
        }
      ],
      testimonial: {
        quote: "Dulu butuh 4-5 jam buat 500 resi, sekarang kurang dari 30 menit. Gak perlu rename foto satu-satu lagi.",
        author: "User Operasional",
        role: "Tim QC J&T Express"
      },
      timeline: "Dari ide ke produksi dalam 3 bulan"
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
    shortDescription: "Dashboard sinyal trading berbasis AI: 5-Layer Signal Engine V2, analisis multi-timeframe, paper futures trading. Submission SoSoValue Buildathon 2026.",
    fullDescription: "SignalFlow Agent ngubah data pasar yang multidimensi jadi sinyal trading yang bisa dijelasin. Masalahnya, trader retail butuh sistem yang bisa analisis banyak faktor (trend, momentum, volatility, volume, struktur) otomatis dan jalanin paper trade — bukan cuma penampil chart. Solusinya, 5-Layer Signal Engine V2 dengan deteksi regime pasar, klasifikasi 7 tingkat, dan validasi paper futures yang sadar saldo. Command center ala Bloomberg dengan visualisasi pipeline.",
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
        description: "Sistem konfluensi multi-faktor: Trend, Momentum, Volatility, Volume, Struktur — plus deteksi regime pasar, klasifikasi 7 tingkat, dan TP/SL yang menyesuaikan volatilitas. Adaptif ke 4 gaya trading (Scalper, Intraday, Swing, Position)",
        icon: "brain"
      },
      {
        title: "Konfluensi Multi-Timeframe",
        description: "Tiap sinyal dianalisis di 3 timeframe (1H, 4H, 1D) dengan skor keselarasan. Kalau 3 timeframe sepakat = skor keyakinan 95, kalau bentrok = 30-50",
        icon: "layers"
      },
      {
        title: "Dari Sinyal ke Eksekusi",
        description: "Command center ala Bloomberg dengan visualisasi pipeline. Paper futures trading dengan USDC virtual, TP/SL/likuidasi otomatis, leverage 1x-100x, dan statistik performa per tipe",
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
      performance: "Pipeline sinyal utuh: data pasar → analisis multi-faktor → sinyal terklasifikasi → eksekusi paper",
      users: "Submission SoSoValue Buildathon 2026 oleh nasaq.id"
    },
    caseStudy: {
      problem: "Trader retail kesulitan nyatuin data dari banyak sumber (ETF flows, sentimen, event makro, indikator teknikal) jadi satu keputusan trading yang koheren. Platform yang ada cuma penampil chart, tanpa klasifikasi sinyal atau eksekusi otomatis.",
      painPoints: [
        "Data berceceran di banyak platform, gak ada satu tampilan utuh",
        "Gak ada sistem konfluensi multi-faktor yang bisa dijelasin",
        "Paper trading terpisah dari analisis, gak ada umpan balik",
        "Gak ada adaptasi per gaya trading (scalper vs swing vs position)"
      ],
      solution: "5-Layer Signal Engine V2 yang nyatuin analisis Trend, Momentum, Volatility, Volume, dan Struktur dengan deteksi regime pasar. Tiap sinyal dianalisis di 3 timeframe (1H, 4H, 1D) dengan skor keselarasan. Paper futures trading dengan USDC virtual, TP/SL/likuidasi otomatis, dan statistik performa per tipe.",
      metrics: [
        {
          label: "Analisis sinyal",
          before: "Cek manual 5+ indikator di berbagai platform",
          after: "Otomatis 5-faktor + keselarasan 3 timeframe"
        },
        {
          label: "Eksekusi trading",
          before: "Buka/tutup manual, rawan emosi",
          after: "Paper futures dengan TP/SL/likuidasi otomatis"
        },
        {
          label: "Pantau performa",
          before: "Gak ada atau spreadsheet manual",
          after: "Statistik per tipe: Sharpe, Sortino, Calmar, drawdown"
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
    shortDescription: "Lelang tertutup on-chain dengan Fully Homomorphic Encryption (FHE): bid tetap terenkripsi, smart contract hitung pemenang tanpa pernah buka isi bid. 47 test.",
    fullDescription: "Protokol lelang tertutup di mana bid tetap terenkripsi on-chain pakai FHE. Masalahnya, lelang on-chain biasa gampang kena MEV extraction, bid sniping, dan manipulasi harga karena bid keliatan di mempool. Solusinya, bid dienkripsi di browser lewat CoFHE SDK, smart contract bandingin bid terenkripsi via operasi FHE CMUX tanpa pernah decrypt, cuma pemenang yang kebuka setelah settlement via Threshold Network. Deployed di Arbitrum Sepolia.",
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
        title: "Bidding Terenkripsi Penuh On-Chain",
        description: "Bid dienkripsi di browser via CoFHE SDK dan disimpan on-chain sebagai euint64. Smart contract hitung pemenang via FHE CMUX tanpa pernah buka bid individu, jadi MEV, bid sniping, dan manipulasi harga gak mempan",
        icon: "shield"
      },
      {
        title: "Settlement Tanpa Pihak Ketiga",
        description: "Gak butuh pihak ketiga yang dipercaya atau komputasi off-chain. Protokol FHE memungkinkan settlement on-chain yang bisa diverifikasi, cuma bid pemenang yang kebuka setelah finalisasi via Threshold Network",
        icon: "lock"
      },
      {
        title: "Lifecycle Lelang Lengkap + UI Institusional",
        description: "Alur lelang utuh: buat → bid → finalisasi → reveal → klaim/settle. Design system institusional dark-theme dengan 11 halaman, layout responsif, dan empty state yang lengkap",
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
      performance: "~430 baris smart contract dengan 47 test — protokol lelang FHE siap produksi",
      users: "Deployed di Arbitrum Sepolia testnet (contract: 0x96dA...447)"
    },
    caseStudy: {
      problem: "Lelang on-chain biasa (English, Dutch, sealed-bid) semuanya punya celah: bid keliatan di mempool, bot MEV bisa snipe, dan manipulasi harga gampang. Gak ada privasi buat peserta lelang.",
      painPoints: [
        "Bid keliatan di mempool, bot MEV bisa ekstrak nilai",
        "Bid sniping: peserta nunggu detik terakhir buat outbid",
        "Manipulasi harga gampang karena semua bid transparan",
        "Gak ada protokol sealed-bid yang beneran privat on-chain"
      ],
      solution: "Fully Homomorphic Encryption (FHE) bikin smart contract bisa komputasi data terenkripsi. Bid dienkripsi di browser via Fhenix CoFHE SDK, disimpan on-chain sebagai euint64. Smart contract bandingin bid terenkripsi via operasi CMUX, tanpa pernah buka bid individu. Cuma bid pemenang yang kebuka setelah finalisasi via Threshold Network.",
      metrics: [
        {
          label: "Privasi bid",
          before: "Keliatan di mempool, bisa di-extract MEV",
          after: "Terenskripsi FHE — nol informasi sampai settlement"
        },
        {
          label: "Penentuan pemenang",
          before: "Perbandingan on-chain (plaintext)",
          after: "CMUX di bid terenkripsi, bid kalah gak pernah kebuka"
        },
        {
          label: "Model kepercayaan",
          before: "Percaya auctioneer atau transparan (bisa dimanipulasi)",
          after: "Trustless — bisa diverifikasi on-chain, tanpa pihak ketiga"
        }
      ],
      timeline: "Dibangun dalam 2 minggu — ~430 baris Solidity + 47 test"
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
    shortDescription: "Dashboard manajemen armada GPS: tracking kendaraan live, geofencing, integrasi multi-provider GPS, dan laporan lengkap — buat perusahaan logistik dan transportasi",
    fullDescription: "Sistem manajemen armada GPS berbasis web yang bisa pantau kendaraan secara live, bikin zona geofence, terima peringatan otomatis, dan analisis riwayat perjalanan. Support berbagai perangkat GPS dari vendor Teltonika, Queclink, dan Concox, plus mode testing pakai GPS smartphone. Dibangun full-stack pakai Next.js 16, tRPC, Prisma, dan Socket.IO buat update yang langsung kebaca.",
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
        title: "Tracking Kendaraan Live",
        description: "Pantau posisi kendaraan di peta OpenStreetMap dengan marker warna dan animasi transisi yang mulus",
        icon: "map-pin"
      },
      {
        title: "Geofencing & Peringatan",
        description: "Bikin zona virtual (lingkaran/polygon), dapet peringatan otomatis pas kendaraan masuk/keluar zona — 9 tipe alert",
        icon: "shield"
      },
      {
        title: "Integrasi Multi-Provider GPS",
        description: "Support 4 provider GPS: Teltonika, Queclink, Concox, dan Mock — plus GPS smartphone via browser",
        icon: "satellite"
      }
    ],
    features: [
      "Monitoring kendaraan langsung di peta OpenStreetMap",
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
      "Update Socket.IO langsung tanpa refresh"
    ],
    impact: {
      performance: "Update GPS langsung via WebSocket, pantau kendaraan tanpa jeda",
      users: "Target: perusahaan logistik, layanan transportasi, manajemen armada kendaraan"
    },
    caseStudy: {
      problem: "Perusahaan logistik kesulitan pantau armada kendaraan. Data GPS berceceran di berbagai platform vendor, gak ada dashboard terpusat buat monitoring, geofencing, dan laporan.",
      painPoints: [
        "Gak ada dashboard terpusat buat GPS multi-vendor",
        "Pantau kendaraan manual lewat WhatsApp/telepon",
        "Gak ada sistem geofencing dan peringatan otomatis",
        "Laporan perjalanan dibuat manual dari data mentah GPS"
      ],
      solution: "Dashboard manajemen armada full-stack dengan tracking live via Socket.IO, integrasi webhook GPS multi-provider, mesin geofencing, dan sistem laporan otomatis.",
      metrics: [
        {
          label: "Monitoring armada",
          before: "Manual via WhatsApp/telepon ke supir",
          after: "Dashboard langsung dengan posisi live di peta"
        },
        {
          label: "Geofencing",
          before: "Gak ada — gak tau kendaraan masuk/keluar zona",
          after: "Peringatan otomatis 9 tipe: speeding, geofence, SOS, ignition, dll"
        },
        {
          label: "Laporan perjalanan",
          before: "Manual kumpulin data dari tiap vendor GPS",
          after: "Ke-generate otomatis harian/mingguan/bulanan + export CSV"
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
