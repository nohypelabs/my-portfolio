-- ============================================
-- NASAQ.ID Portfolio Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  icon TEXT NOT NULL DEFAULT 'Code',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Pricing packages table
CREATE TABLE IF NOT EXISTS pricing_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price_min BIGINT NOT NULL DEFAULT 0,
  price_max BIGINT NOT NULL DEFAULT 0,
  price_unit TEXT NOT NULL DEFAULT 'IDR',
  features TEXT[] DEFAULT '{}',
  is_popular BOOLEAN DEFAULT false,
  cta_text TEXT NOT NULL DEFAULT 'Pesan Sekarang',
  cta_link TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Process steps table
CREATE TABLE IF NOT EXISTS process_steps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Search',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT,
  company TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  avatar_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- FAQ table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Orders table (customer orders)
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  package_id UUID REFERENCES pricing_packages(id) ON DELETE SET NULL,
  project_description TEXT NOT NULL,
  budget_range TEXT,
  timeline TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'quoted', 'accepted', 'in_progress', 'completed', 'cancelled')),
  admin_notes TEXT,
  quoted_price BIGINT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Site settings table (key-value for editable content)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_sort ON services(sort_order);
CREATE INDEX IF NOT EXISTS idx_pricing_slug ON pricing_packages(slug);
CREATE INDEX IF NOT EXISTS idx_pricing_sort ON pricing_packages(sort_order);
CREATE INDEX IF NOT EXISTS idx_process_sort ON process_steps(sort_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- ============================================
-- RLS Policies
-- ============================================
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Public can view active services" ON services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active pricing" ON pricing_packages
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active process steps" ON process_steps
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active testimonials" ON testimonials
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active faqs" ON faqs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view settings" ON site_settings
  FOR SELECT USING (true);

-- Admin can do everything (check email)
CREATE POLICY "Admin full access on services" ON services
  FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = 'admin@nasaq.id')
  );

CREATE POLICY "Admin full access on pricing" ON pricing_packages
  FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = 'admin@nasaq.id')
  );

CREATE POLICY "Admin full access on process_steps" ON process_steps
  FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = 'admin@nasaq.id')
  );

CREATE POLICY "Admin full access on testimonials" ON testimonials
  FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = 'admin@nasaq.id')
  );

CREATE POLICY "Admin full access on faqs" ON faqs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = 'admin@nasaq.id')
  );

CREATE POLICY "Admin full access on orders" ON orders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = 'admin@nasaq.id')
  );

CREATE POLICY "Admin full access on settings" ON site_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = 'admin@nasaq.id')
  );

-- Customers can view their own orders
CREATE POLICY "Customers can view own orders" ON orders
  FOR SELECT USING (customer_id = auth.uid());

-- Customers can create orders
CREATE POLICY "Customers can create orders" ON orders
  FOR INSERT WITH CHECK (customer_id = auth.uid());

-- ============================================
-- Seed Data
-- ============================================

-- Services
INSERT INTO services (title, slug, description, features, icon, sort_order) VALUES
('Web Application', 'web-app', 'Sistem manajemen berbasis web yang powerful dan scalable. Dari dashboard admin hingga sistem enterprise.', ARRAY['Custom Dashboard', 'CRUD Operations', 'Real-time Data', 'Responsive Design', 'API Integration'], 'Globe', 1),
('Mobile Application', 'mobile-app', 'Aplikasi Android native maupun hybrid yang performant dan user-friendly.', ARRAY['Android Native', 'Cross-platform', 'Push Notifications', 'Offline Support', 'Play Store Deploy'], 'Smartphone', 2),
('API & Backend', 'api-backend', 'Arsitektur backend yang robust, API yang terdokumentasi, dan database yang teroptimasi.', ARRAY['REST API', 'Database Design', 'Authentication', 'Cloud Deployment', 'CI/CD Pipeline'], 'Server', 3),
('Maintenance & Support', 'maintenance', 'Dukungan teknis berkelanjutan setelah project selesai. Bug fix, update, dan monitoring.', ARRAY['Bug Fixing', 'Security Updates', 'Performance Monitoring', 'Backup Management', '24/7 Support'], 'Wrench', 4),
('Konsultasi Teknis', 'konsultasi', 'Analisis kebutuhan, arsitektur sistem, dan rekomendasi teknologi untuk project Anda.', ARRAY['Needs Analysis', 'Architecture Design', 'Tech Stack Recommendation', 'Cost Estimation', 'Project Roadmap'], 'MessageCircle', 5)
ON CONFLICT (slug) DO NOTHING;

-- Pricing packages
INSERT INTO pricing_packages (name, slug, description, price_min, price_max, features, is_popular, cta_text, sort_order) VALUES
('Basic', 'basic', 'Untuk kebutuhan sederhana dan landing page profesional', 5000000, 15000000, ARRAY['Landing Page / Website Company Profile', 'Responsive Design', 'Basic SEO', 'Contact Form', '1x Revisi Desain', 'Deploy ke Hosting'], false, 'Pilih Basic', 1),
('Standard', 'standard', 'Untuk bisnis yang butuh sistem manajemen lengkap', 15000000, 40000000, ARRAY['Web App + Admin Dashboard', 'Database & API', 'Authentication (Login/Register)', 'CRUD Operations', 'Responsive & Mobile-friendly', '3x Revisi Desain', 'Deploy + Domain Setup', '1 Bulan Maintenance'], true, 'Pilih Standard', 2),
('Premium', 'premium', 'Full-stack system: web + mobile + API + deployment', 40000000, 100000000, ARRAY['Web App + Android App', 'Full Backend & API', 'Database Design & Optimization', 'Push Notifications', 'Admin Dashboard Lengkap', 'Unlimited Revisi', 'Deploy Web + Play Store', '3 Bulan Maintenance', 'Source Code Ownership'], false, 'Pilih Premium', 3),
('Custom', 'custom', 'Konsultasi gratis untuk kebutuhan spesial Anda', 0, 0, ARRAY['Konsultasi Gratis', 'Analisis Kebutuhan', 'Estimasi Harga Transparan', 'Fleksibel Sesuai Scope', 'Timeline Disesuaikan'], false, 'Konsultasi Gratis', 4)
ON CONFLICT (slug) DO NOTHING;

-- Process steps
INSERT INTO process_steps (step_number, title, description, icon, sort_order) VALUES
(1, 'Discovery', 'Analisis kebutuhan bisnis Anda. Kita diskusi mendalam tentang masalah yang ingin diselesaikan, target user, dan ekspektasi hasil.', 'Search', 1),
(2, 'Design', 'Wireframe dan UI/UX design. Anda review dan approve setiap screen sebelum development dimulai.', 'Palette', 2),
(3, 'Development', 'Build sistem dengan clean code dan best practices. Progress update rutin setiap minggu.', 'Code', 3),
(4, 'Testing', 'QA dan UAT menyeluruh. Semua fitur ditest sebelum launch untuk memastikan kualitas.', 'CheckCircle', 4),
(5, 'Deploy', 'Launch ke production. Setup hosting, domain, SSL, dan monitoring. Sistem siap digunakan user.', 'Rocket', 5),
(6, 'Support', 'Maintenance pasca-launch. Bug fix, update, dan optimasi berkelanjutan sesuai paket yang dipilih.', 'Headphones', 6)
ON CONFLICT DO NOTHING;

-- Testimonials
INSERT INTO testimonials (name, position, company, content, rating, is_featured, sort_order) VALUES
('Manager Operasional', 'Logistics Manager', 'J&T Express', 'Sistem audit selisih berat yang dibangun sangat membantu operasional kami. Data real-time dan report otomatis menghemat waktu tim.', 5, true, 1),
('Owner', 'Founder', 'LakuPOS', 'POS dan inventory system yang dibuat sangat user-friendly. Karyawan kami bisa langsung pakai tanpa training lama.', 5, true, 2),
('IT Manager', 'Head of IT', 'WC Check', 'Aplikasi monitoring kebersihan yang reliable. Deploy ke 50+ lokasi tanpa masalah. Maintenance juga responsif.', 5, true, 3),
('Project Manager', 'PM', 'Qohira', 'E-commerce platform yang dibangun handle ribuan transaksi dengan lancar. Tim sangat profesional dan komunikatif.', 5, false, 4)
ON CONFLICT DO NOTHING;

-- FAQs
INSERT INTO faqs (question, answer, category, sort_order) VALUES
('Berapa lama waktu pengerjaan sebuah project?', 'Tergantung kompleksitas. Landing page: 1-2 minggu. Web app standar: 4-8 minggu. Full system (web + mobile): 8-16 minggu. Timeline pasti akan diinformasikan setelah tahap discovery.', 'project', 1),
('Apakah bisa custom sesuai kebutuhan bisnis saya?', 'Tentu! Semua project dibuat custom dari nol sesuai kebutuhan Anda. Tidak pakai template. Setiap fitur didesain untuk menyelesaikan masalah spesifik bisnis Anda.', 'project', 2),
('Teknologi apa yang digunakan?', 'Stack utama: Next.js, React, TypeScript untuk web. Kotlin/Flutter untuk Android. PostgreSQL/Supabase untuk database. Deploy di Vercel/Railway. Semua teknologi modern dan production-proven.', 'technical', 3),
('Apakah ada maintenance setelah project selesai?', 'Ya, setiap paket include maintenance. Basic: tidak include. Standard: 1 bulan. Premium: 3 bulan. Setelah itu bisa perpanjang dengan biaya terpisah.', 'project', 4),
('Bagaimana sistem pembayaran?', 'Pembayaran bertahap: 50% di awal (setelah design approval), 50% setelah selesai. Untuk project besar, bisa dibicarakan skema cicilan. Transfer bank atau e-wallet.', 'payment', 5),
('Apakah source code menjadi milik saya?', 'Ya, untuk paket Premium source code sepenuhnya milik Anda. Untuk paket Basic dan Standard, source code bisa dibeli terpisah.', 'legal', 6),
('Bisa revisi berapa kali?', 'Basic: 1x revisi desain. Standard: 3x revisi desain + 2x revisi development. Premium: unlimited revisi selama masa development. Revisi di luar scope awal ada biaya tambahan.', 'project', 7),
('Apakah bisa integrasi dengan sistem yang sudah ada?', 'Bisa! Kami berpengalaman integrasi dengan berbagai sistem: payment gateway (Midtrans, Xendit), API pihak ketiga, database existing, dan sistem legacy.', 'technical', 8)
ON CONFLICT DO NOTHING;

-- Site settings
INSERT INTO site_settings (key, value) VALUES
('company_info', '{"name": "nasaq.id", "tagline": "We build production-grade web & mobile systems", "email": "hello@nasaq.id", "phone": "+6281234567890", "whatsapp": "+6281234567890", "address": "Bandung, Indonesia"}'::jsonb),
('social_links', '{"github": "https://github.com/nohypelabs", "linkedin": "https://linkedin.com/in/abdulgofur", "instagram": "https://instagram.com/nasaq.id"}'::jsonb)
ON CONFLICT (key) DO NOTHING;
