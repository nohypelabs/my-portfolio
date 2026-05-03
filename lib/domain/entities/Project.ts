/**
 * Domain Entity: Project
 * Represents a portfolio project with all its metadata
 */

export interface TechStack {
  category: string;
  technologies: string[];
}

export interface ProjectHighlight {
  title: string;
  description: string;
  icon?: string;
}

export interface CaseStudyMetric {
  label: string;
  before: string;
  after: string;
}

export interface CaseStudy {
  problem: string;
  painPoints: string[];
  solution: string;
  metrics: CaseStudyMetric[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  timeline?: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'full-stack' | 'frontend' | 'backend' | 'mobile';
  techStack: TechStack[];
  highlights: ProjectHighlight[];
  features: string[];
  impact?: {
    users?: string;
    dataVolume?: string;
    performance?: string;
  };
  caseStudy?: CaseStudy;
  github?: string;
  demo?: string;
  image: string;
  tags: string[];
  year: string;
  status: 'production' | 'development' | 'archived';
}
