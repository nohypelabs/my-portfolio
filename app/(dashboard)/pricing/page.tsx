import { createClient } from '@/lib/supabase/server';
import { PricingContent } from './PricingContent';
import type { PricingPackage } from '@/lib/supabase/types';

const fallbackPackages: PricingPackage[] = [
  {
    id: '1', name: 'Basic', slug: 'basic', description: 'Untuk kebutuhan sederhana dan landing page profesional',
    price_min: 5000000, price_max: 15000000, price_unit: 'IDR',
    features: ['Landing Page / Website Company Profile', 'Responsive Design', 'Basic SEO', 'Contact Form', '1x Revisi Desain', 'Deploy ke Hosting'],
    is_popular: false, cta_text: 'Pilih Basic', cta_link: null, sort_order: 1, is_active: true, created_at: '', updated_at: '',
  },
  {
    id: '2', name: 'Standard', slug: 'standard', description: 'Untuk bisnis yang butuh sistem manajemen lengkap',
    price_min: 15000000, price_max: 40000000, price_unit: 'IDR',
    features: ['Web App + Admin Dashboard', 'Database & API', 'Authentication (Login/Register)', 'CRUD Operations', 'Responsive & Mobile-friendly', '3x Revisi Desain', 'Deploy + Domain Setup', '1 Bulan Maintenance'],
    is_popular: true, cta_text: 'Pilih Standard', cta_link: null, sort_order: 2, is_active: true, created_at: '', updated_at: '',
  },
  {
    id: '3', name: 'Premium', slug: 'premium', description: 'Full-stack system: web + mobile + API + deployment',
    price_min: 40000000, price_max: 100000000, price_unit: 'IDR',
    features: ['Web App + Android App', 'Full Backend & API', 'Database Design & Optimization', 'Push Notifications', 'Admin Dashboard Lengkap', 'Unlimited Revisi', 'Deploy Web + Play Store', '3 Bulan Maintenance', 'Source Code Ownership'],
    is_popular: false, cta_text: 'Pilih Premium', cta_link: null, sort_order: 3, is_active: true, created_at: '', updated_at: '',
  },
  {
    id: '4', name: 'Custom', slug: 'custom', description: 'Konsultasi gratis untuk kebutuhan spesial Anda',
    price_min: 0, price_max: 0, price_unit: 'IDR',
    features: ['Konsultasi Gratis', 'Analisis Kebutuhan', 'Estimasi Harga Transparan', 'Fleksibel Sesuai Scope', 'Timeline Disesuaikan'],
    is_popular: false, cta_text: 'Konsultasi Gratis', cta_link: null, sort_order: 4, is_active: true, created_at: '', updated_at: '',
  },
];

async function getPackages(): Promise<PricingPackage[]> {
  try {
    const supabase = await createClient();
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

export default async function PricingPage() {
  const packages = await getPackages();
  return <PricingContent packages={packages} />;
}
