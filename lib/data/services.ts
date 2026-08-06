export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  icon: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_min: number;
  price_max: number;
  price_unit: string;
  features: string[];
  is_popular: boolean;
  cta_text: string;
  cta_link: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProcessStep {
  id: string;
  step_number: number;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const stamp = { created_at: '', updated_at: '' };

export const services: Service[] = [
  {
    id: '2',
    title: 'Dashboard Operasional',
    slug: 'dashboard-operasional',
    description: 'Untuk tim yang capek kerja di Excel, chat, atau form manual dan butuh dashboard yang mempermudah kontrol harian.',
    features: [
      'Admin panel, role, dan workflow internal',
      'QC, POS, inspection, tracking, dan reporting',
      'Database, API, dan handoff operasional yang jelas',
      'Monitoring langsung dan notifikasi',
      'Import/export data dan rekapitulasi otomatis',
    ],
    icon: 'Server',
    sort_order: 1,
    is_active: true,
    ...stamp,
  },
  {
    id: '3',
    title: 'Aplikasi Android Lapangan',
    slug: 'web-app-android',
    description: 'Untuk use case yang butuh login, notifikasi, data langsung, atau tim lapangan yang harus tetap bisa kerja dari mobile.',
    features: [
      'Web app custom dengan backend siap produksi',
      'Android companion untuk tim lapangan',
      'Push notification, GPS, dan mode offline',
      'Build bertahap dari MVP sampai scale-up',
      'Deploy web + Play Store',
    ],
    icon: 'Smartphone',
    sort_order: 2,
    is_active: true,
    ...stamp,
  },
  {
    id: '1',
    title: 'Website & Company Profile',
    slug: 'company-profile-website',
    description: 'Untuk bisnis yang butuh surface lebih serius, CTA lebih jelas, dan presentasi brand yang lebih rapi di mata calon client.',
    features: [
      'Landing page dan company profile multi-halaman',
      'Copy hierarchy yang lebih meyakinkan',
      'SEO, mobile-friendly, dan siap diarahkan ke order',
      'Contact form / WhatsApp CTA',
      'Analytics dan tracking konversi dasar',
    ],
    icon: 'Globe',
    sort_order: 3,
    is_active: true,
    ...stamp,
  },
];

export const packages: PricingPackage[] = [
  {
    id: '1',
    name: 'Starter',
    slug: 'starter',
    description: 'Landing page, simple profile, atau halaman campaign yang butuh cepat tayang.',
    price_min: 500000,
    price_max: 1500000,
    price_unit: 'IDR',
    features: [
      'Landing page 1 halaman',
      'Responsive design',
      'Contact form / WhatsApp button',
      'Deploy ke hosting',
      '1x revisi desain',
    ],
    is_popular: false,
    cta_text: 'Pilih Starter',
    cta_link: null,
    sort_order: 1,
    is_active: true,
    ...stamp,
  },
  {
    id: '2',
    name: 'Basic',
    slug: 'basic',
    description: 'Company profile multi-halaman, CTA jelas, dan fondasi yang lebih siap dipakai closing.',
    price_min: 1500000,
    price_max: 3000000,
    price_unit: 'IDR',
    features: [
      'Company profile multi-halaman',
      'SEO + Google Index',
      'Copy hierarchy yang meyakinkan',
      'Contact form + Maps',
      '2x revisi desain',
      'Deploy + domain setup',
    ],
    is_popular: true,
    cta_text: 'Pilih Basic',
    cta_link: null,
    sort_order: 2,
    is_active: true,
    ...stamp,
  },
  {
    id: '3',
    name: 'Custom System',
    slug: 'custom-system',
    description: 'Dashboard internal, workflow operasional, atau web app yang butuh logic dan database.',
    price_min: 3000000,
    price_max: 20000000,
    price_unit: 'IDR',
    features: [
      'Web app + admin dashboard',
      'Database & API siap produksi',
      'Authentication dan role management',
      'Android companion bila dibutuhkan',
      '3x revisi desain',
      'Deploy + 1 bulan maintenance',
    ],
    is_popular: false,
    cta_text: 'Diskusikan Kebutuhan',
    cta_link: null,
    sort_order: 3,
    is_active: true,
    ...stamp,
  },
];

export const steps: ProcessStep[] = [
  {
    id: '1',
    step_number: 1,
    title: 'Bedah Kebutuhan',
    description: 'Kami pecah dulu tujuan bisnis, pain point, dan CTA utama sebelum ngomong desain. Estimasi 1-2 hari.',
    icon: 'Search',
    sort_order: 1,
    is_active: true,
    ...stamp,
  },
  {
    id: '2',
    step_number: 2,
    title: 'Flow & Visual Direction',
    description: 'Struktur halaman, hirarki copy, dan arah visual dibikin jelas biar eksekusi tidak muter. Estimasi 2-4 hari.',
    icon: 'Palette',
    sort_order: 2,
    is_active: true,
    ...stamp,
  },
  {
    id: '3',
    step_number: 3,
    title: 'Build & Integration',
    description: 'Mulai dari surface yang paling penting, lanjut ke backend, form, dashboard, atau integrasi jika dibutuhkan. Estimasi 1-6 minggu.',
    icon: 'Code',
    sort_order: 3,
    is_active: true,
    ...stamp,
  },
  {
    id: '4',
    step_number: 4,
    title: 'Launch & Support',
    description: 'Setelah live, kami bantu rapikan feedback, monitoring, dan improvement yang memang relevan. Berkelanjutan.',
    icon: 'Headphones',
    sort_order: 4,
    is_active: true,
    ...stamp,
  },
];

export const faqs: FAQ[] = [
  { id: '1', question: 'Berapa lama waktu pengerjaan sebuah project?', answer: 'Tergantung kompleksitas. Landing page: 1-2 minggu. Web app standar: 4-8 minggu. Full system (web + mobile): 8-16 minggu. Timeline pasti akan diinformasikan setelah tahap discovery.', category: 'project', sort_order: 1, is_active: true, ...stamp },
  { id: '2', question: 'Apakah bisa custom sesuai kebutuhan bisnis saya?', answer: 'Bisa. Semua project dibuat custom dari nol sesuai kebutuhan Anda, tidak pakai template. Setiap fitur dirancang untuk menyelesaikan masalah spesifik bisnis Anda.', category: 'project', sort_order: 2, is_active: true, ...stamp },
  { id: '3', question: 'Teknologi apa yang digunakan?', answer: 'Stack utama: Next.js, React, TypeScript untuk web. Kotlin/Flutter untuk Android. PostgreSQL/Supabase untuk database. Deploy di Vercel/Railway. Semua teknologi modern dan terbukti dipakai di produksi.', category: 'technical', sort_order: 3, is_active: true, ...stamp },
  { id: '4', question: 'Apakah ada maintenance setelah project selesai?', answer: 'Ya, setiap paket include maintenance. Basic: 1 bulan. Custom System: 1 bulan. Setelah itu bisa perpanjang dengan biaya terpisah.', category: 'project', sort_order: 4, is_active: true, ...stamp },
  { id: '5', question: 'Bagaimana sistem pembayaran?', answer: 'Pembayaran bertahap: 50% di awal (setelah design approval), 50% setelah selesai. Untuk project besar, bisa dibicarakan skema cicilan. Transfer bank atau e-wallet.', category: 'payment', sort_order: 5, is_active: true, ...stamp },
  { id: '6', question: 'Apakah source code menjadi milik saya?', answer: 'Ya, untuk paket Custom System source code sepenuhnya milik Anda. Untuk paket Starter dan Basic, source code bisa dibeli terpisah.', category: 'legal', sort_order: 6, is_active: true, ...stamp },
  { id: '7', question: 'Bisa revisi berapa kali?', answer: 'Starter: 1x revisi desain. Basic: 2x revisi desain. Custom System: 3x revisi desain + revisi development sesuai scope. Revisi di luar scope awal ada biaya tambahan.', category: 'project', sort_order: 7, is_active: true, ...stamp },
  { id: '8', question: 'Apakah bisa integrasi dengan sistem yang sudah ada?', answer: 'Bisa! Kami berpengalaman integrasi dengan berbagai sistem: payment gateway (Midtrans, Xendit), API pihak ketiga, database existing, dan sistem legacy.', category: 'technical', sort_order: 8, is_active: true, ...stamp },
  { id: '9', question: 'Saya tidak paham teknis, apakah tetap bisa bekerja sama?', answer: 'Justru itu kondisi yang paling umum. Kami tidak pakai jargon di proses kerja sama: brief diterjemahkan ke bahasa operasional, Anda cukup konfirmasi alur kerja yang benar, sisanya kami yang kerjakan. Anda selalu lihat hasilnya dalam bentuk yang bisa dicek langsung, bukan diagram teknis.', category: 'project', sort_order: 9, is_active: true, ...stamp },
  { id: '10', question: 'Kalau sistem sudah jalan lalu ada error, bagaimana?', answer: 'Setiap paket include masa maintenance (Basic dan Custom System: 1 bulan). Selama masa itu, laporan error ditangani langsung tanpa biaya tambahan. Setelah masa maintenance, tersedia paket dukungan lanjutan bulanan, jadi sistem Anda tidak pernah dibiarkan tanpa penanganan.', category: 'project', sort_order: 10, is_active: true, ...stamp },
];
