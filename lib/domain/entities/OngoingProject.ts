/**
 * Domain Entity: Ongoing Project
 * Represents a project in planning or development phase
 */

export interface OngoingProject {
  id: string;
  name: string;
  description: string;
  status: 'Planning' | 'In Progress' | 'On Hold';
  startDate: string;
  estimatedCompletion: string;
  techStack: string[];
  progress?: number; // 0-100
  keyGoals?: string[];
  demo?: string;
}
