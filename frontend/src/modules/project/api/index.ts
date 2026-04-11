import { apiClient } from '../../../services/apiClient';
import type { Project, CreateProjectPayload } from '../types';

export const fetchProjectsByClient = (clientId: number): Promise<Project[]> => {
  return apiClient.get(`/projects/${clientId}`);
};

export const createProject = (data: CreateProjectPayload): Promise<Project> => {
  return apiClient.post('/projects', data);
};
