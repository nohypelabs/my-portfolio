import { createClient } from '@/lib/supabase/server';
import { ProcessContent } from './ProcessContent';
import type { ProcessStep } from '@/lib/supabase/types';

const fallbackSteps: ProcessStep[] = [
  { id: '1', step_number: 1, title: 'Discovery', description: 'Analisis kebutuhan bisnis Anda. Kita diskusi mendalam tentang masalah yang ingin diselesaikan, target user, dan ekspektasi hasil.', icon: 'Search', sort_order: 1, is_active: true, created_at: '', updated_at: '' },
  { id: '2', step_number: 2, title: 'Design', description: 'Wireframe dan UI/UX design. Anda review dan approve setiap screen sebelum development dimulai.', icon: 'Palette', sort_order: 2, is_active: true, created_at: '', updated_at: '' },
  { id: '3', step_number: 3, title: 'Development', description: 'Build sistem dengan clean code dan best practices. Progress update rutin setiap minggu.', icon: 'Code', sort_order: 3, is_active: true, created_at: '', updated_at: '' },
  { id: '4', step_number: 4, title: 'Testing', description: 'QA dan UAT menyeluruh. Semua fitur ditest sebelum launch untuk memastikan kualitas.', icon: 'CheckCircle', sort_order: 4, is_active: true, created_at: '', updated_at: '' },
  { id: '5', step_number: 5, title: 'Deploy', description: 'Launch ke production. Setup hosting, domain, SSL, dan monitoring. Sistem siap digunakan user.', icon: 'Rocket', sort_order: 5, is_active: true, created_at: '', updated_at: '' },
  { id: '6', step_number: 6, title: 'Support', description: 'Maintenance pasca-launch. Bug fix, update, dan optimasi berkelanjutan sesuai paket yang dipilih.', icon: 'Headphones', sort_order: 6, is_active: true, created_at: '', updated_at: '' },
];

async function getSteps(): Promise<ProcessStep[]> {
  try {
    const supabase = await createClient();
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

export default async function ProcessPage() {
  const steps = await getSteps();
  return <ProcessContent steps={steps} />;
}
