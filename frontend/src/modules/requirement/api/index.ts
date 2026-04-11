import { apiClient } from '../../../services/apiClient';
import type { Requirement } from '../types';

export const getRequirement = (leadId: number): Promise<Requirement> => {
  return apiClient.get(`/requirements/${leadId}`);
};

export const createRequirement = (data: Omit<Requirement, 'id'>): Promise<Requirement> => {
  return apiClient.post('/requirements', data);
};
