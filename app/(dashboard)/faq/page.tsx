import { createClient } from '@/lib/supabase/server';
import { FAQContent } from './FAQContent';
import type { FAQ } from '@/lib/supabase/types';

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

async function getFaqs(): Promise<FAQ[]> {
  try {
    const supabase = await createClient();
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

export default async function FAQPage() {
  const faqs = await getFaqs();
  return <FAQContent faqs={faqs} />;
}
