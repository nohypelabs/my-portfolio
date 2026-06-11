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

export interface Testimonial {
  id: string;
  name: string;
  position: string | null;
  company: string | null;
  content: string;
  rating: number;
  avatar_url: string | null;
  is_featured: boolean;
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

export interface Order {
  id: string;
  customer_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  service_id: string | null;
  package_id: string | null;
  project_description: string;
  budget_range: string | null;
  timeline: string | null;
  status: 'pending' | 'reviewing' | 'quoted' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  admin_notes: string | null;
  quoted_price: number | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}
