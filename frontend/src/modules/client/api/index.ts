import { apiClient } from '../../../services/apiClient';
import type { Client, CreateClientPayload } from '../types';

export const fetchClients = (): Promise<Client[]> => {
  return apiClient.get('/clients');
};

export const createClient = (data: CreateClientPayload): Promise<Client> => {
  return apiClient.post('/clients', data);
};
