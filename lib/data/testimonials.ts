export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating: number;
  project?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Operations Manager",
    role: "Operations Head",
    company: "Logistics Company",
    content: "The WC Check system transformed our facility management. QR code scanning and real-time analytics reduced our inspection time by 70%. The PWA feature means our team can work offline in areas with poor connectivity.",
    rating: 5,
    project: "WC Check"
  },
  {
    id: "2",
    name: "Warehouse Supervisor",
    role: "Logistics Supervisor",
    company: "J&T Express Partner",
    content: "Selisih Berat app streamlined our weight audit process completely. The GPS watermarking and barcode scanning features are game-changers. We've processed over 25,000 entries with zero data integrity issues.",
    rating: 5,
    project: "Selisih Berat"
  },
  {
    id: "3",
    name: "School Administrator",
    role: "IT Administrator",
    company: "Educational Institution",
    content: "Eduvate solved all our school management headaches in one platform. From attendance to grade management, everything works seamlessly. The parent portal feature improved our communication significantly.",
    rating: 5,
    project: "Eduvate"
  },
  {
    id: "4",
    name: "Business Owner",
    role: "Restaurant Chain Owner",
    company: "F&B Industry",
    content: "AGDS POS competes with expensive solutions like Moka and Pawoon at a fraction of the cost. Multi-outlet management and real-time inventory tracking are exactly what we needed. Performance is outstanding!",
    rating: 5,
    project: "AGDS Corp POS"
  },
  {
    id: "5",
    name: "Tech Lead",
    role: "Senior Developer",
    company: "Software Company",
    content: "Abdul's code quality is impressive. Clean architecture with DDD patterns, comprehensive testing, and modern tech stack. The tRPC implementation is type-safe and well-structured. Would recommend for any serious project.",
    rating: 5
  }
];
