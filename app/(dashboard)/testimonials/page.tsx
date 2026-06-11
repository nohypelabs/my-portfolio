import { createClient } from '@/lib/supabase/server';
import { TestimonialsContent } from './TestimonialsContent';
import type { Testimonial } from '@/lib/supabase/types';

const fallbackTestimonials: Testimonial[] = [
  { id: '1', name: 'Manager Operasional', position: 'Logistics Manager', company: 'J&T Express', content: 'Sistem audit selisih berat yang dibangun sangat membantu operasional kami. Data real-time dan report otomatis menghemat waktu tim.', rating: 5, avatar_url: null, is_featured: true, sort_order: 1, is_active: true, created_at: '', updated_at: '' },
  { id: '2', name: 'Owner', position: 'Founder', company: 'LakuPOS', content: 'POS dan inventory system yang dibuat sangat user-friendly. Karyawan kami bisa langsung pakai tanpa training lama.', rating: 5, avatar_url: null, is_featured: true, sort_order: 2, is_active: true, created_at: '', updated_at: '' },
  { id: '3', name: 'IT Manager', position: 'Head of IT', company: 'WC Check', content: 'Aplikasi monitoring kebersihan yang reliable. Deploy ke 50+ lokasi tanpa masalah. Maintenance juga responsif.', rating: 5, avatar_url: null, is_featured: true, sort_order: 3, is_active: true, created_at: '', updated_at: '' },
  { id: '4', name: 'Project Manager', position: 'PM', company: 'Qohira', content: 'E-commerce platform yang dibangun handle ribuan transaksi dengan lancar. Tim sangat profesional dan komunikatif.', rating: 5, avatar_url: null, is_featured: false, sort_order: 4, is_active: true, created_at: '', updated_at: '' },
];

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (error || !data || data.length === 0) return fallbackTestimonials;
    return data;
  } catch {
    return fallbackTestimonials;
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return <TestimonialsContent testimonials={testimonials} />;
}
