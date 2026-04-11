export interface Project {
  id: number;
  title: string;
  description: string;
  status: "start" | "in-progress" | "completed";
  clientId: number;
}

export interface CreateProjectPayload {
  title: string;
  description: string;
  status?: "start" | "in-progress" | "completed";
  clientId: number;
}
