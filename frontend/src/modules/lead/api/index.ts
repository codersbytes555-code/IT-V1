import { apiClient } from '../../../services/apiClient';
import type { Lead, CreateLeadPayload } from '../types';

export const fetchLeads = (): Promise<Lead[]> => {
  return apiClient.get('/leads');
};

export const createLead = (data: CreateLeadPayload): Promise<Lead> => {
  return apiClient.post('/leads', data);
};

export const updateLeadStatus = (id: number, status: string): Promise<Lead> => {
  return apiClient.patch(`/leads/${id}/status`, { status });
};
