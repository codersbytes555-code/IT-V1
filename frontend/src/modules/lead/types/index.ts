export interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  source: string;
  status: "new" | "contacted" | "converted" | "dead";
  createdAt: string;
}

export interface CreateLeadPayload {
  name: string;
  email: string;
  phone?: string;
  source: string;
}
