export interface Requirement {
  id: number;
  projectTitle: string;
  description: string;
  technologyStack: string[];
  specialRequirements?: string;
  estimatedDays: number;
  targetAudience?: string;
  developersRequired: number;
  experienceLevel: "junior" | "mid" | "senior";
  budget: number;
  paymentType: "fixed" | "hourly";
  hourlyRate?: number;
  leadId: number;
}
