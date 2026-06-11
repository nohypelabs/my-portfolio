import { createClient } from '@/lib/supabase/server';
import { ServicesContent } from './ServicesContent';
import type { Service } from '@/lib/supabase/types';

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

async function getServices(): Promise<Service[]> {
  try {
    const supabase = await createClient();
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

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesContent services={services} />;
}
