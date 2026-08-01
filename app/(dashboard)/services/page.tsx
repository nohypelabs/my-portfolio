import { createClient } from '@/lib/supabase/server';
import { ServicesContent } from './ServicesContent';
import type { Service, PricingPackage, ProcessStep, FAQ } from '@/lib/supabase/types';

const fallbackServices: Service[] = [
  {
    id: '1', title: 'Web Application', slug: 'web-app',
    description: 'Sistem manajemen berbasis web yang powerful dan scalable. Dari dashboard admin hingga sistem enterprise.',
    features: ['Custom Dashboard', 'CRUD Operations', 'Real-time Data', 'Responsive Design', 'API Integration'],
    icon: 'Globe', sort_order: 1, is_active: true, created_at: '', updated_at: '',
  },
  {
    id: '2', title: 'Mobile Application', slug: 'mobile-app',
    description: 'Aplikasi Android native maupun hybrid yang performant dan user-friendly.',
    features: ['Android Native', 'Cross-platform', 'Push Notifications', 'Offline Support', 'Play Store Deploy'],
    icon: 'Smartphone', sort_order: 2, is_active: true, created_at: '', updated_at: '',
  },
  {
    id: '3', title: 'API & Backend', slug: 'api-backend',
    description: 'Arsitektur backend yang robust, API yang terdokumentasi, dan database yang teroptimasi.',
    features: ['REST API', 'Database Design', 'Authentication', 'Cloud Deployment', 'CI/CD Pipeline'],
    icon: 'Server', sort_order: 3, is_active: true, created_at: '', updated_at: '',
  },
  {
    id: '4', title: 'Maintenance & Support', slug: 'maintenance',
    description: 'Dukungan teknis berkelanjutan setelah project selesai. Bug fix, update, dan monitoring.',
    features: ['Bug Fixing', 'Security Updates', 'Performance Monitoring', 'Backup Management', '24/7 Support'],
    icon: 'Wrench', sort_order: 4, is_active: true, created_at: '', updated_at: '',
  },
  {
    id: '5', title: 'Konsultasi Teknis', slug: 'konsultasi',
    description: 'Analisis kebutuhan, arsitektur sistem, dan rekomendasi teknologi untuk project Anda.',
    features: ['Needs Analysis', 'Architecture Design', 'Tech Stack Recommendation', 'Cost Estimation', 'Project Roadmap'],
    icon: 'MessageCircle', sort_order: 5, is_active: true, created_at: '', updated_at: '',
  },
];

const fallbackPackages: PricingPackage[] = [
  {
    id: '1', name: 'Starter', slug: 'starter', description: 'Landing page & company profile untuk mulai go-online',
    price_min: 500000, price_max: 1500000, price_unit: 'IDR',
    features: ['Landing Page 1 halaman', 'Responsive Design', 'Basic SEO', 'Contact Form / WhatsApp Button', 'Deploy ke Hosting', '1x Revisi'],
    is_popular: false, cta_text: 'Pilih Starter', cta_link: null, sort_order: 1, is_active: true, created_at: '', updated_at: '',
  },
  {
    id: '2', name: 'Basic', slug: 'basic', description: 'Company profile lengkap untuk bisnis yang mulai serius',
    price_min: 1500000, price_max: 3000000, price_unit: 'IDR',
    features: ['Company Profile Multi-halaman', 'Responsive & Mobile-friendly', 'SEO + Google Index', 'Contact Form + Maps', 'Admin Dashboard Sederhana', '2x Revisi Desain', 'Deploy + Domain Setup'],
    is_popular: false, cta_text: 'Pilih Basic', cta_link: null, sort_order: 2, is_active: true, created_at: '', updated_at: '',
  },
  {
    id: '3', name: 'Standard', slug: 'standard', description: 'Web app + admin dashboard untuk manajemen bisnis',
    price_min: 3000000, price_max: 8000000, price_unit: 'IDR',
    features: ['Web App + Admin Dashboard', 'Database & API', 'Authentication (Login/Register)', 'CRUD Operations', 'Responsive & Mobile-friendly', '3x Revisi Desain', 'Deploy + Domain Setup', '1 Bulan Maintenance'],
    is_popular: true, cta_text: 'Pilih Standard', cta_link: null, sort_order: 3, is_active: true, created_at: '', updated_at: '',
  },
  {
    id: '4', name: 'Premium', slug: 'premium', description: 'Full-stack system: web + mobile + integrasi lengkap',
    price_min: 8000000, price_max: 20000000, price_unit: 'IDR',
    features: ['Web App + Android App', 'Full Backend & API', 'Database Design & Optimization', 'Push Notifications', 'Admin Dashboard Lengkap', 'Unlimited Revisi', 'Deploy Web + Play Store', '3 Bulan Maintenance', 'Source Code Ownership'],
    is_popular: false, cta_text: 'Pilih Premium', cta_link: null, sort_order: 4, is_active: true, created_at: '', updated_at: '',
  },
  {
    id: '5', name: 'Custom', slug: 'custom', description: 'Konsultasi gratis untuk kebutuhan spesial Anda',
    price_min: 0, price_max: 0, price_unit: 'IDR',
    features: ['Konsultasi Gratis', 'Analisis Kebutuhan', 'Estimasi Harga Transparan', 'Fleksibel Sesuai Scope', 'Timeline Disesuaikan'],
    is_popular: false, cta_text: 'Konsultasi Gratis', cta_link: null, sort_order: 5, is_active: true, created_at: '', updated_at: '',
  },
];

const fallbackSteps: ProcessStep[] = [
  { id: '1', step_number: 1, title: 'Discovery', description: 'Analisis kebutuhan bisnis Anda. Kita diskusi mendalam tentang masalah yang ingin diselesaikan, target user, dan ekspektasi hasil.', icon: 'Search', sort_order: 1, is_active: true, created_at: '', updated_at: '' },
  { id: '2', step_number: 2, title: 'Design', description: 'Wireframe dan UI/UX design. Anda review dan approve setiap screen sebelum development dimulai.', icon: 'Palette', sort_order: 2, is_active: true, created_at: '', updated_at: '' },
  { id: '3', step_number: 3, title: 'Development', description: 'Build sistem dengan clean code dan best practices. Progress update rutin setiap minggu.', icon: 'Code', sort_order: 3, is_active: true, created_at: '', updated_at: '' },
  { id: '4', step_number: 4, title: 'Testing', description: 'QA dan UAT menyeluruh. Semua fitur ditest sebelum launch untuk memastikan kualitas.', icon: 'CheckCircle', sort_order: 4, is_active: true, created_at: '', updated_at: '' },
  { id: '5', step_number: 5, title: 'Deploy', description: 'Launch ke production. Setup hosting, domain, SSL, dan monitoring. Sistem siap digunakan user.', icon: 'Rocket', sort_order: 5, is_active: true, created_at: '', updated_at: '' },
  { id: '6', step_number: 6, title: 'Support', description: 'Maintenance pasca-launch. Bug fix, update, dan optimasi berkelanjutan sesuai paket yang dipilih.', icon: 'Headphones', sort_order: 6, is_active: true, created_at: '', updated_at: '' },
];

const fallbackFaqs: FAQ[] = [
  { id: '1', question: 'Berapa lama waktu pengerjaan sebuah project?', answer: 'Tergantung kompleksitas. Landing page: 1-2 minggu. Web app standar: 4-8 minggu. Full system (web + mobile): 8-16 minggu. Timeline pasti akan diinformasikan setelah tahap discovery.', category: 'project', sort_order: 1, is_active: true, created_at: '', updated_at: '' },
  { id: '2', question: 'Apakah bisa custom sesuai kebutuhan bisnis saya?', answer: 'Tentu! Semua project dibuat custom dari nol sesuai kebutuhan Anda. Tidak pakai template. Setiap fitur didesain untuk menyelesaikan masalah spesifik bisnis Anda.', category: 'project', sort_order: 2, is_active: true, created_at: '', updated_at: '' },
  { id: '3', question: 'Teknologi apa yang digunakan?', answer: 'Stack utama: Next.js, React, TypeScript untuk web. Kotlin/Flutter untuk Android. PostgreSQL/Supabase untuk database. Deploy di Vercel/Railway. Semua teknologi modern dan production-proven.', category: 'technical', sort_order: 3, is_active: true, created_at: '', updated_at: '' },
  { id: '4', question: 'Apakah ada maintenance setelah project selesai?', answer: 'Ya, setiap paket include maintenance. Basic: tidak include. Standard: 1 bulan. Premium: 3 bulan. Setelah itu bisa perpanjang dengan biaya terpisah.', category: 'project', sort_order: 4, is_active: true, created_at: '', updated_at: '' },
  { id: '5', question: 'Bagaimana sistem pembayaran?', answer: 'Pembayaran bertahap: 50% di awal (setelah design approval), 50% setelah selesai. Untuk project besar, bisa dibicarakan skema cicilan. Transfer bank atau e-wallet.', category: 'payment', sort_order: 5, is_active: true, created_at: '', updated_at: '' },
  { id: '6', question: 'Apakah source code menjadi milik saya?', answer: 'Ya, untuk paket Premium source code sepenuhnya milik Anda. Untuk paket Basic dan Standard, source code bisa dibeli terpisah.', category: 'legal', sort_order: 6, is_active: true, created_at: '', updated_at: '' },
  { id: '7', question: 'Bisa revisi berapa kali?', answer: 'Basic: 1x revisi desain. Standard: 3x revisi desain + 2x revisi development. Premium: unlimited revisi selama masa development. Revisi di luar scope awal ada biaya tambahan.', category: 'project', sort_order: 7, is_active: true, created_at: '', updated_at: '' },
  { id: '8', question: 'Apakah bisa integrasi dengan sistem yang sudah ada?', answer: 'Bisa! Kami berpengalaman integrasi dengan berbagai sistem: payment gateway (Midtrans, Xendit), API pihak ketiga, database existing, dan sistem legacy.', category: 'technical', sort_order: 8, is_active: true, created_at: '', updated_at: '' },
];

async function getServices(supabase: any): Promise<Service[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    if (error || !data || data.length === 0) return fallbackServices;
    return data;
  } catch {
    return fallbackServices;
  }
}

async function getPackages(supabase: any): Promise<PricingPackage[]> {
  try {
    const { data, error } = await supabase
      .from('pricing_packages')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    if (error || !data || data.length === 0) return fallbackPackages;
    return data;
  } catch {
    return fallbackPackages;
  }
}

async function getSteps(supabase: any): Promise<ProcessStep[]> {
  try {
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    if (error || !data || data.length === 0) return fallbackSteps;
    return data;
  } catch {
    return fallbackSteps;
  }
}

async function getFaqs(supabase: any): Promise<FAQ[]> {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    if (error || !data || data.length === 0) return fallbackFaqs;
    return data;
  } catch {
    return fallbackFaqs;
  }
}

export default async function ServicesPage() {
  const supabase = await createClient();
  const [services, packages, steps, faqs] = await Promise.all([
    getServices(supabase),
    getPackages(supabase),
    getSteps(supabase),
    getFaqs(supabase),
  ]);

  return (
    <ServicesContent
      services={services}
      packages={packages}
      steps={steps}
      faqs={faqs}
    />
  );
}
