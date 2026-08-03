const idTranslations = {
  // Featured projects
  featuredProjects: "Showcase Sistem Nyata",
  viewAllProjects: "Lihat Semua Showcase",

  // Live Metrics
  liveProductionData: "Verifikasi Data Live",
  liveMetricsDesc: "Data real-time yang diambil langsung dari database produksi aktif. Bukti nyata sistem kami benar-benar bekerja.",
  loading: "MEMUAT DATA...",
  fetched: "Terakhir Diambil",
  visitApp: "Lihat Sistem",
  liveMetricsFooter: "Koneksi data real-time via API serverless ke database produksi. Halaman auto-refresh setiap 5 menit.",
  fetchLatest: "Muat Ulang Data",
  fetching: "Mengambil data...",
  fetchHint: "Klik untuk menarik data terbaru langsung dari database produksi",
  databases: "Database",

  // CV Page
  cvProfile: "Profil Singkat",
  cvEducation: "Pendidikan Formal",
  cvBackground: "Latar Belakang Operasional",
  cvWorkExperience: "Pengalaman Kerja & Proyek",
  cvTechnicalSkills: "Keahlian Teknis",
  cvLanguages: "Bahasa",
  cvPortfolioProjects: "Showcase Proyek Web",
  cvFrontend: "Frontend",
  cvBackend: "Backend & API",
  cvDatabase: "Penyimpanan",
  cvDevOps: "DevOps & Tools",
  cvArchitecture: "Arsitektur",
  cvTesting: "Pengujian",
  cvGeneralIT: "IT Umum",
  cvDownloadPDF: "Unduh Profil Deck",
  cvProduction: "produksi aktif",

  // Energy Saver Panel
  energyUsage: "Energy",
  energyLow: "Low",
  energyMed: "Med",
  energyHigh: "High",
  playerDarkMode: "Dark mode untuk menghemat baterai",
  playerReduceMotion: "Hemat CPU/GPU — matikan animasi",
  energyPanelTitle: "Konsumsi energi halaman",
  energyPanelBody:
    "Dark mode menurunkan daya layar OLED, dan mematikan animasi mengurangi kerja CPU/GPU. Dua-duanya bikin baterai perangkat lebih awet dan jejak energi kunjungan ini lebih kecil.",
  energyPanelDarkLabel: "Dark mode",
  energyPanelDarkHint: "Latar gelap, lebih hemat di layar OLED.",
  energyPanelMotionLabel: "Kurangi animasi",
  energyPanelMotionHint:
    "Menghentikan smooth scroll, reveal teks, marquee, dan render 3D.",
  energyPanelToggleAria: "Buka panel konsumsi energi",
  energyPanelCurrent: "Level sekarang",
};

export const translations = {
  en: idTranslations,
  id: idTranslations,
};

export type TranslationKey = keyof typeof translations.en;
