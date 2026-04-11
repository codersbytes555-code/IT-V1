import type { Lead } from '../../lead/types';

export interface Client {
  id: number;
  leadId: number;
  lead: Lead;
  projects?: any[];
}

export interface CreateClientPayload {
  leadId: number;
}
